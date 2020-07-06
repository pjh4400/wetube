import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); // passport 에서 사용될 수 있는 LocalStrategy 인스턴스 생성

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());