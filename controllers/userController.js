import routes from "../routes";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join"});

export const postJoin = (req, res) => {
//  console.log(req.body); // post 형식이므로 body 가 존재!
  const {
    body: {name,email,password,password2}
  } = req;
  if (password !== password2) {
    res.status(400); //비밀번호가 일치하지않으면 잘못된 요청이므로 페이지에  상태번호로 400번(에러)을 전달. 비밀번호를 저장하겠냐고 물어보지 않는다.
    res.render("join", { pageTitle: "Join"});
  } else {
    // To Do: Register User
    // To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => res.render("login");
export const postLogin = (req, res) => {
  res.redirect(routes.home);
  //나중에는 데이터베이스에 있는 비밀번호랑 일치한지 검사
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
