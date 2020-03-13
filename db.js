import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL, //process.env로 이 url에서 db를 가져옴.
  {
    useNewUrlParser: true,
    useFindAndModify: false
      //내가 MongoDB를 사용할 떄마다,
      //이 Configuration 을 추가(true)하거나, 사용안함(false)으로 하라는 뜻
  }
);

const db = mongoose.connection; //mongoDb와의 연결
const handleOpen = () => console.log("♬ Connected to DB");
const handleError = error => console.log("× Error on DB Connection:${error}");

db.once("open",handleOpen);
//한번 실행하는 함수. connection을 열고, 성공여부를 확인 할 수 있는 함수(handleOpen)을 실행
db.on("error",handleError);
