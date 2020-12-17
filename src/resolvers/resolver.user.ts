import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnectionManager, Repository } from "typeorm";
import { User } from "../model/model.user";
import { UserRepository } from "../repository/repo.user";
import { LoginInput, UserInput } from "./InputType/user.inputType";
import { LoginResponse } from "./ResponseType/user.responseType";
import { ServerContext } from '../middleware/ServerContext';
import { createRefreshToken, createAccessToken, isAuth } from '../middleware/Auth';


@Resolver()
export class UserResolver {
  constructor(
    private readonly repo = getConnectionManager()
      .get("gamepartner")
      .getCustomRepository(UserRepository)
  ) {}

  @Mutation(() => Boolean)
  async createUser(@Arg("user", () => UserInput) user: UserInput) {
    try {
      await this.repo.insert(user);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("user", () => LoginInput) user: LoginInput,
    @Ctx() { res }: ServerContext
  ): Promise<LoginResponse> {
    try {
      const isValid = await this.repo.LoginUser(user);
      if (isValid) {
        res.cookie(
          "jid",
          createRefreshToken(user),
          {
              httpOnly: true
          }
        );

        return {
            accessToken: createAccessToken(user)
        };

      } else {
        return {
          accessToken: "COULD NOT LOGINED",
        };
      }
    } catch (err) {
      return err;
    }
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async user() {
    return await this.repo.findAllUser();
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  test(
      @Ctx() {payload}:ServerContext
  ){
      console.log(payload);
      return 'test';
  }
}
