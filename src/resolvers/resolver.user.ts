import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {  getConnection, getConnectionManager, getCustomRepository, getManager } from "typeorm";
import { User } from '../model/model.user';
import { UserRepository } from '../repository/repo.user';
import { UserInput } from './InputType/user.inputType';

// const manager = getConnectionManager().get("gamepartner");
// const repo = manager.getCustomRepository(UserRepository);

@Resolver()
export class UserResolver{

    @Mutation(() => Boolean)
    async createUser(@Arg("user", () => UserInput) user:UserInput){
        try{
            await User.insert(user);
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    @Query(() => [User])
    async user(){
        return await User.find()
    }

}