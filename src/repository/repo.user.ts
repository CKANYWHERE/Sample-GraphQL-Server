import { EntityRepository, Repository } from "typeorm";
import { User } from '../model/model.user';
import { UserInput } from "../resolvers/InputType/user.inputType";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    /*
        모든 유저 찾는 쿼리
    */
    async findAllUser(){
        return await this.createQueryBuilder("t_User")
                    .getMany();
    }

    /*
        User insert 하는 코드
        @params UserInput
    */
    async insertUser(user: UserInput){
        await this.insert(user)
    }

}