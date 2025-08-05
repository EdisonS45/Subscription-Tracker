import User from "../models/user.model.js"

export const getAllUsers = async(req,res,next)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1)*limit;
    try{
        const users = await User.find().skip(skip).limit(limit);
        const totalDocuments = await User.countDocuments();
        res.status(200).json({
            success:true,
            data:{
                users,
                totalCount:totalDocuments,
                pages:Math.ceil(totalDocuments/limit)
            },
            
        })
    }catch(error){
        next(error)
    }
}