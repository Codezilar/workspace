import mongoose from 'mongoose';
const schema = new mongoose.Schema({ userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true}, jobId:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true,index:true}, coverLetter:{type:String,required:true}, resume:String, status:{type:String,enum:['SUBMITTED','UNDER_REVIEW','SHORTLISTED','ACCEPTED','REJECTED'],default:'SUBMITTED',index:true} },{timestamps:true}); schema.index({userId:1,jobId:1},{unique:true});
export default mongoose.models.Application || mongoose.model('Application',schema);
