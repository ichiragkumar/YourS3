import mongoose, { Schema } from 'mongoose';

const uploadSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    pathOfFile: {
        type: String,
        required : true,
    },
    onUploadDate: {
        type: Date,
        required: true,
    },
    onDownloadDate: {
        type: Date,
        required: true,
    },
    onUpdatedDate: {
        type: Date,
        required: true,
    },
    onDeletedDate: {
        type: Date,
        required: true,
    }

}, {timestamps: true});
const UploadFileSchema = mongoose.model('Upload', uploadSchema); 
export default UploadFileSchema;