import { EntityRepository, IsNull, Repository } from "typeorm";
import { User } from '../model/model.user';
import { LoginInput, UserInput } from "../resolvers/InputType/user.inputType";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    /*
        모든 유저 찾는 쿼리
    */
    async findAllUser(){
        return await this.createQueryBuilder()
                    .getMany();
    }

    /*
        User insert 하는 코드
        @params UserInput
    */
    async insertUser(user: UserInput){
        await this.insert(user)
    }

    /*
        User Login 시켜주는 쿼라
        @params LoginInput
    */
    async LoginUser(user: LoginInput){
        const authUser = await this.createQueryBuilder()
        .where("User.UserId = :uid",{uid:user.userId})
        .andWhere("User.Password = :upw",{upw:user.password})
        .getOne()

        if(authUser === undefined){
            return false
        }else{
            return true
        }
    }

}