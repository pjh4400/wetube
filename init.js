import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video"; //데이터베이스가 video.js 파일을 인식하도록 import

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening); //생성된 서버가 port를 바라보게 한다.
