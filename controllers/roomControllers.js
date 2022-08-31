import Room from '../models/room'

//Get All Room => /api/rooms
const allRooms = async (req,res) => {
    const room = await Room.find();

    res.status(200).json({
        success:true,
        count:room.length,
        room
    })
}

//Create New Room => /api/rooms
const newRoom = async (req,res) => {
    const room = await Room.create(req.body);

    try{
        res.status(200).json({
            success:true,
            room
        })
    }catch(error){
        res.status((404).json({
            success:false,
            error:error.message
        }))
    }

}

//Get room details Room => /api/rooms/:id
const getSingleRoom = async (req,res) => {
    const room = await Room.findById(req.query.id);

    if(!room){
        res.status((404).json({
            success:false,
            error:'Room not found'
        }))
    }

    try{
        res.status(200).json({
            success:true,
            room
        })
    }catch(error){
        res.status(404).json({
            success:false,
            error:error.message
        })
    }

}


//Get room details Room => /api/rooms/:id
const updateRoom = async (req,res) => {

    let room = await Room.findById(req.query.id);
    try{  

    if(!room){
        res.status(404).json({
            success:false,
            error:'Room not found'
        })
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
    }catch(error){
        res.status(404).json({
            success:false,
            error:error.message
        })
    }

}

//Delete room  => /api/rooms/:id
const deleteRoom = async (req,res) => {

    let room = await Room.findById(req.query.id);
    try{  

    if(!room){
        res.status(404).json({
            success:false,
            error:'Room not found'
        })
    } 
    room  = await Room.deleteOne();


    res.status(200).json({
         success:true,
         message: 'Room is Deleted'
    })
    }catch(error){
        res.status(404).json({
            success:false,
            error:error.message
        })
    }

}

export{
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}