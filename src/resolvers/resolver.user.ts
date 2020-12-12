import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { User } from '../model/model.user';
import { UserInput } from './InputType/user.inputType';

@Resolver()
export class UserResolver{

    @Mutation(() => Boolean)
    
    async createUser(@Arg("user") user:UserInput){
        return true
    }

    @Query(() => [User])
    async user(){
        return await User.find()
    }

}