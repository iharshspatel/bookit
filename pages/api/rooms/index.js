import nc from "next-connect";
import dbConnect from "../../../config/dbConnect"
import { allRooms, newRoom } from "../../../controllers/roomControllers";
import onError from '../../../middlewares/errors';

const handlers = nc({ onError });

dbConnect();

handlers.get(allRooms)
handlers.post(newRoom)

export default handlers;