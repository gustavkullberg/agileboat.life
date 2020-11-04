import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
import { authenticate } from "../../utils/authenticate"

const collectionName = 'keaper';

const handler = nextConnect();
handler.use(middleware);


handler.get(async (req, res) => {
    const { roles } = authenticate(req.headers.authorization.split("Bearer ")[1]);
    if (roles.includes("captain")) {
        const {kullbergIsKeyper} = await req.db.collection(collectionName).findOne();
        res.json({kullbergIsKeyper});
    } else {
        res.status(401).json({message: "Not Authorized"});
    }
})

handler.post(async (req, res) => {
    const { roles } = authenticate(req.headers.authorization.split("Bearer ")[1]);
    if (roles.includes("captain")) {

        const { kullbergIsKeyper } = JSON.parse(req.body);
        const result = await req.db.collection(collectionName).findOne();
        if (!result) {
            await req.db.collection(collectionName).insertOne({kullbergIsKeyper})
        } else {
                await req.db.collection(collectionName).updateOne({ _id: ObjectId(result._id) },
                    { $set: { "kullbergIsKeyper": kullbergIsKeyper } }
                )
        }
            res.json({ kullbergIsKeyper });
    } else {
        res.status(401).json({message: "Not Authorized"});
    }
})
export default handler;
