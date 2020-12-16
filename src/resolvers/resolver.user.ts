import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnectionManager, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from '../model/model.user';
import { UserRepository } from '../repository/repo.user';
import { UserInput } from './InputType/user.inputType';

@Resolver()
export class UserResolver{

    constructor(
        private readonly repo = getConnectionManager().get("gamepartner").getCustomRepository(UserRepository)
    ){}

   

    @Mutation(() => Boolean)
    async createUser(@Arg("user", () => UserInput) user:UserInput){
        try{
            await this.repo.insert(user);
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    @Query(() => [User])
    async user(){
        return await this.repo.findAllUser()
    }

}