import nc from "next-connect";
import dbConnect from "../../../config/dbConnect"
import { allRooms, newRoom } from "../../../controllers/roomControllers";

const handlers = nc();

dbConnect();

handlers.get(allRooms)
handlers.post(newRoom)

export default handlers;