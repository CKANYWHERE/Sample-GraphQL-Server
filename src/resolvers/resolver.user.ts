import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnectionManager } from "typeorm";
import { User } from '../model/model.user';
import { UserRepository } from '../repository/repo.user';
import { UserInput } from './InputType/user.inputType';

@Resolver()
export class UserResolver{

    @Mutation(() => Boolean)
    async createUser(@Arg("user", () => UserInput) user:UserInput){
        try{
            const manager = getConnectionManager().get("gamepartner")
            const repo = manager.getCustomRepository(UserRepository)
            await repo.insert(user);
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    @Query(() => [User])
    async user(){
        const manager = getConnectionManager().get("gamepartner")
        const repo = manager.getCustomRepository(UserRepository)
        return await repo.findAllUser()
    }

}