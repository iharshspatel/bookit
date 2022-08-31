import nc from "next-connect";
import dbConnect from "../../../config/dbConnect"
import {getSingleRoom, updateRoom, deleteRoom} from "../../../controllers/roomControllers";

const handlers = nc();

dbConnect();

handlers.get(getSingleRoom);
handlers.put(updateRoom);
handlers.delete(deleteRoom);

export default handlers;