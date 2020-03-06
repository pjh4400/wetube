import routes from "../routes";
import Video from "../models/Video"; //지금 import해온 Video는 Database의 element가 아니라, 단지 model 일 뿐이다.
//즉, element를 받는 통로일 뿐이지 element 자체는 아니다.

export const home = async (req, res) => {//async : 나를 기다려주는 무언가를 위한 자바스크립트 코드.
  try{
    const videos = await Video.find({}).sort({_id: -1});
    res.render("home",{ pageTitle: "Home", videos});
  } catch(error) {
    console.log(error);
    res.render("home",{ pageTitle: "Home", videos : [] });
  }
};

//await : 다음 과정이 끝날 때까지 잠시 기다려 달라는 의미, Video.find() : 데이터베이스에 있는 모든 videos를 가져올 것이다. await 키워드는 async 없이는 쓸 수 없음(error)

export const search = async (req, res) =>
{
  const {
    query : {term: searchingBy}
  } = req;
  let videos = [];
  try {
    videos = await Video.find({title : {$regex : searchingBy, $options: "i"} });
    //$regex = 설정한 단어를 "포함"하는 것을 모두 찾음.
    //$options : "i" = insesnsitive(대소문자구분x)
    //찾으면 재할당(reassign)하므로 앞에서 videos를 const로 선언하지 않았다.
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "search", searchingBy, videos });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "upload"});

export const postUpload = async (req,res) => {
  const {
    body : {title, description},
    file : {path}
  } = req;
const newVideo = await Video.create({
  fileUrl: path,
  title,
  description
});
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const { params : {id}} = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video});
  } catch(error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params : {id}
  } = req;
  try{
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video});
  } catch(error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params : {id},
    body : { title, description }
  } = req;
  try {
    await Video.findByIdAndUpdate(id, {title, description}); //우리는 업데이트만 하고, 정보를 가져올 필요가 없으므로 변수에 따로 저장해줄 필요는 없다.
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: {id}
  } = req;
  try {
    await Video.findByIdAndRemove(id);
  } catch (error){
    console.log(error);
  }
  res.redirect(routes.home);
};
