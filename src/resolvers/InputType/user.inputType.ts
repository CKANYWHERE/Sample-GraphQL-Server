import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserInput{

    @Field()
    userId!:string;

    @Field()
    password!:string;

    @Field()
    sex!:string;

    @Field(() => Int)
    age?:number;

    @Field()
    birthDay?:string;

    @Field()
    favoritGame!:string;

    @Field()
    introduce?:string;

    @Field()
    imgPath!:string;

    @Field()
    phoneNumber!:string;

}