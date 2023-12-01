import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: String,
});

export default model("Category", CategorySchema);
