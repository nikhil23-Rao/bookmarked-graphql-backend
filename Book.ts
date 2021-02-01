// Importing ORM In This Case Mongoose
import mongoose from "mongoose";

// Creating A New Mongo Schema
const bookSchema: mongoose.Schema<
  mongoose.Document<any>,
  mongoose.Model<mongoose.Document<any>>
> = new mongoose.Schema({
  books_count: String,
  authors: String,
  original_publication_year: Number,
  title: String,
  language_code: String,
  average_rating: Number,
  ratings_count: Number,
  image_url: String,
  small_image_url: String,
});

// Exporting And Creating The Model
export const Book: mongoose.Model<mongoose.Document<any>> = mongoose.model(
  "Book",
  bookSchema
);
