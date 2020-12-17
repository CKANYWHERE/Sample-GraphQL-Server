import { Router } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../repository/repo.user";
import { LoginInput } from "../resolvers/InputType/user.inputType";
import { getConnectionManager } from "typeorm";
import { createAccessToken, sendRefreshToken, createRefreshToken } from '../middleware/Auth';
const router = Router();

router.post("/refresh_token", async (req, res) => {
  const repo = getConnectionManager()
    .get("gamepartner")
    .getCustomRepository(UserRepository);

  const token = req.cookies.jid;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);

  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  const checkUser = new LoginInput();
  checkUser.userId = payload.userId;
  checkUser.password = req.body.pw;

  const isValidate = await repo.LoginUser(checkUser);

  if(isValidate){
    sendRefreshToken(res, createRefreshToken(checkUser))
    res.send({ok:true, accessToken:createAccessToken(checkUser)})
  }else{
    res.send({ok:false, accessToken:''})
  }
});

export default router;
