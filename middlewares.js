import multer from "multer";
import routes from "./routes"

const multerVideo = multer({dest: "uploads/videos/"});

export const localMiddleware = (req,res,next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || {}; //user 객체가 비어있는 경우, 빈 객체를 넘겨준다.  
  // passport 가 로그인 시킬때 쿠키/seriallize 등등을 지원하며, user 가 담긴 object도 request 객체에 올려준다.
  next();
};

export const videoUpload = multerVideo.single("videoFile");
