import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  hello() {
    return "word!";
  }
}