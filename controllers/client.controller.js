const db = require('../models');
const Op = db.sequelize.Op;
const Client = db.client;



exports.CreateClient = async (req,res) => {
    try{
        const client_info = {
            name:req.body.name
        }
        const created_client = await Client.create(client_info);
        if(created_client){
            return res.status(200).json({
                success:true,
                message:"The client was created",
                data:created_client
            })
        }
        return res.status(400).json({
            success:false,
            message:"The client could not be created successfully"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:`${err}`  
        });
    }
}




    
