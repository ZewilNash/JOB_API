const User = require("../modals/User");

const mongoose = require('mongoose');

const Job = require("../modals/Job");

const getAllJobs = async (req,res) => {

    const jobs = await Job.find({createdBy:req.user.userId}).sort("createdAt");

    res.status(200).json({jobs , success:true});


}

const getJob = async (req,res) => {
    const {user:{userId} , params:{id:jobId}} = req;

    

    const job = await job.findOne({_id:jobId , createdBy:userId});

   

    if(!job){
        res.status(404).json({msg:`No job with id ${jobId}` , success:false});
    }

    res.status(200).json({success:true , job});
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    
    const job = await Job.create(req.body)
    
    res.status(201).json({
        job,success:true
    });
}

const updateJob = async (req,res) => {
    const {user:{userId} , params:{id:jobId} , body:{company,position}} = req;


    if (company === "" || position === ""){
        res.status(400).json({msg:`position and company must not be empty` , success:false});
    }

    const job = await Job.findOne({_id:jobId , createdBy:userId});

    if (!job) {

        res.status(404).json({msg:`Job Not Found` , success:false});
    }

   const updatedJob =  Job.findByIdAndUpdate({_id:jobId , createdBy:userId},req.body , {new:true});

   res.status(200).json({
       success:true,
       msg:"Job updated successfully",
       updatedJob
   })

}

const deleteJob = async (req,res) => {

    const {user:{userId} , params:{id:jobId}} = req;

    const job = await Job.findOne({_id:jobId , createdBy:userId})

    if (!job) {

        res.status(404).json({msg:`Job Not Found` , success:false});
    }

    res.status(200).json({
        success:true,
        job,
        msg:"Job deleted successfully",
    })
    
}   


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}