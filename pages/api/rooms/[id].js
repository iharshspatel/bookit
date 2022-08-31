import nc from "next-connect";
import dbConnect from "../../../config/dbConnect"
import {getSingleRoom, updateRoom, deleteRoom} from "../../../controllers/roomControllers";
import onError from '../../../middlewares/errors';

const handlers = nc({ onError });

dbConnect();

handlers.get(getSingleRoom);
handlers.put(updateRoom);
handlers.delete(deleteRoom);

export default handlers;