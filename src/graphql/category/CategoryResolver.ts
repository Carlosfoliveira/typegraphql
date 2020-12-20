import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import CategorySchema from "../../models/CategorySchema";
import Category from "./Category";

@InputType()
class CategoryInput implements Partial<Category> {
  @Field()
  description: string;
  @Field()
  name: string;
}

@Resolver(Category)
class CategoryResolver {

  @Query(() => [Category])
  async categories() {
    const categories = await CategorySchema.find();
    return categories;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("categoryInput") categoryInput: CategoryInput) {
    const category = await CategorySchema.create(categoryInput);
    return category;
  }

}

export default CategoryResolver;