import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/db';
import { authenticate } from "../../../utils/authenticate"

const collectionName = 'document';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
    const { roles } = authenticate(req.headers.authorization.split("Bearer ")[1]);
    if (roles.includes("captain")) {
        const id = req.query.id;
        const document = await req.db.collection(collectionName).findOne({ _id: ObjectId(id) })
        res.json(document);
    } else {
        res.status(401).json({message: "Not Authorized"});
    }
})
export default handler;
