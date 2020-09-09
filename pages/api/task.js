import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
const ObjectID = require('mongodb').ObjectID;

const collectionName = 'tasks';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const tasks = await req.db.collection(collectionName).find().toArray();
  res.json(tasks);
});

handler.post(async (req, res) => {
  const { title, comment } = JSON.parse(req.body);
  const date = new Date().toISOString();
  await req.db
    .collection(collectionName)
    .insertOne({ title, comment, createdDate: date, editedDate: date, completed: false });
  res.json({ success: true });
});

handler.patch(async (req, res) => {
  const { id, completed } = JSON.parse(req.body);
  const date = new Date().toISOString();
  try {
    await req.db
      .collection(collectionName)
      .updateOne({ _id: ObjectID(id) }, { $set: { editedDate: date, completed: completed } });
    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
});

export default handler;
