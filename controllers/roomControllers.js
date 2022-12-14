import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'
//Get All Room => /api/rooms
const allRooms = catchAsyncErrors(async (req,res) => {
    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()
        
    let rooms = await apiFeatures.query;
    let fiteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query.clone();

    res.status(200).json({
        success:true,
        roomsCount,
        resPerPage,
        fiteredRoomsCount,
        rooms
    })
})

//Create New Room => /api/rooms
const newRoom = catchAsyncErrors(async (req,res) => {
    const room = await Room.create(req.body);
        res.status(200).json({
            success:true,
            room
        })
})

//Get room details Room => /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req,res, next) => {
    const room = await Room.findById(req.query.id);

    if(!room){
        return next(new ErrorHandler("Room not found", 404));
    }

    res.status(200).json({
            success:true,
            room
        })
})


//Get room details Room => /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req,res) => {

    let room = await Room.findById(req.query.id);

    if(!room){
        return next(new ErrorHandler("Room not found", 404));
    } 

    room  = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
         success:true,
        room
    })


})

//Delete room  => /api/rooms/:id
const deleteRoom =catchAsyncErrors(async (req,res) => {

    let room = await Room.findById(req.query.id);

    if(!room){
        return next(new ErrorHandler("Room not found", 404));
    } 
    room  = await Room.deleteOne();


    res.status(200).json({
         success:true,
         message: 'Room is Deleted'
    })


})

export{
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}