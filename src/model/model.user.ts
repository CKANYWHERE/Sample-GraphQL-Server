import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity({name:"t_User"})
export class User extends BaseEntity{
    
    @Field()
    @PrimaryColumn({name:"UserId"})
    userId!: string;

    @Field()
    @Column({name:"Password"})
    password!: string;

    @Field()
    @Column({name:"Sex"})
    sex!: string;

    @Field(() => Int)
    @Column({name:"Age"})
    age?:number;

    @Field()
    @Column({name:"BirthDay"})
    birthDay?:string;

    @Field()
    @Column({name:"FavoritGame"})
    favoritGame!:string;

    @Field()
    @Column({name:"Introduce"})
    introduce?:string;

    @Field()
    @Column({name:"ImgPath"})
    imgPath!:string;

    @Field()
    @Column({name:"PhoneNumber"})
    phoneNumber!:string;

    @Field()
    @Column({name:"RegisterDate",default:'now()'})
    registerDate!:Date;

    @Column({name:"TokenVersion",default:'0'})
    tokenVersion!:number;

}