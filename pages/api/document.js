import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
import { authenticate } from "../../utils/authenticate" 

const collectionName = 'document';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const { roles } = authenticate(req.headers.authorization.split("Bearer ")[1]);
  if (roles.includes("captain")) {
    const documents = await req.db.collection(collectionName).find().toArray();
    const documentList = documents.map(d => ({ fileName: d.fileName, fileSize: d.fileSize, createdDate: d.createdDate, id: d._id }))
    res.json(documentList);
  } else {
    res.status(401).json({message: "Not Authorized"});
  }
});

handler.post(async (req, res) => {
  const { roles } = authenticate(req.headers.authorization.split("Bearer ")[1]);
  if (roles.includes("captain")) {
    const { dataUrl, fileName, fileSize } = JSON.parse(req.body);
    const date = new Date().toISOString();
    await req.db
      .collection(collectionName)
      .insertOne({ dataUrl, fileName, fileSize, createdDate: date });
    res.json({ success: true });
  } else {
    res.status(401).json({message: "Not Authorized"});
  }
});

export default handler;
