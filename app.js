import express from "express";
import morgan from "morgan"; //logging(어디서 무슨 일이 일어났는지) 해주는 애(우리가 유지보수 쉽도록)
import helmet from "helmet"; //node.js 앱의 보안을 위한 것
import cookieParser from "cookie-parser"; //session을 다루기위해 cookie에 사용자정보 저장
import bodyParser from "body-parser"; //서버가 유저로부터 받은 데이터(form)를 request 객체로 접근
//import { userRouter } from "./router" //default로 export하지 않기 때문에 변수명을 나타냄. 라우터를 모두 각각 devide&conquer
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";
const app = express(); //app.js 파일을 import하면 줄 객체.(우리는 init.js에 줄것)

/*
//미들웨어 : 사용자가 요청을 했을때 요청과 사용자 사이에 동작하는 것. (req와 res 사이.)
const handleHome = (req,res) => res.send("Hello from home");
const handleProfile = (req,res) => res.send("You are on my profile");
*/
app.use(helmet());
app.set('view engine',"pug");
app.use(cookieParser());//app.use(cookieParser);//서버가 받은 유저 COOKIE를 이해
app.use(bodyParser.json());// 유저로부터 json 형태로 받음
app.use(bodyParser.urlencoded({extended: true}));//유저로부터 form형태로 받음
app.use(morgan("dev"));

app.use(localMiddleware);





//우리는 전역url 과 두개의 지역 url을 다룰 것.
app.use(routes.home,globalRouter); //전역 라우터
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app; //누군가 내 파일을 import 하면 app 객체를 줄 것임.
