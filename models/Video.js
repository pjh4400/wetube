import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: 'File URL is required'
  },
  title: {
    type:String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now //현재 날짜를 반환하는 함수
    //Date.now는 함수를 실행하고, Date.now()는 현재 날짜를 반환바든다.
  },
  comments: [{ //Comment의 ID를 가지고 있는 객체배열
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const model = mongoose.model("Video", VideoSchema);
export default model;
