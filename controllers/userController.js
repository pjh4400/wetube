import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join"});

export const postJoin = async (req, res, next) => {
  console.log(req.body); // post 형식이므로 body 가 존재!
  const {
    body: {name,email,password,password2}
  } = req;
  if (password !== password2) {
    res.status(400); //비밀번호가 일치하지않으면 잘못된 요청이므로 페이지에 상태번호로 400번(에러)을 전달. 비밀번호를 저장하겠냐고 물어보지 않는다.
    res.render("join", { pageTitle: "Join"});
  } else {
    try{
      const user = await User({
        name,
        email
      });
      await User.register(user,password);
      next(); // 회원 가입 후 다음 미들웨어로 이동(로그인 기능)
    } catch (error){
      console.log(error);
      res.redirect(routes.home); // 로그인 요류 -> 홈으로 이동
    }
  }
};

export const getLogin = (req, res) => 
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,  // 로그인이 실패한 경우 로그인화면 다시
  successRedirect: routes.home    // 성공한 경우 홈 화면
})

export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
