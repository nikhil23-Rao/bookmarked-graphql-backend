// Modules Imported For Use
import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import fs from "fs";
import path from "path";
// User Created Modules
import { connectToDB } from "./db";
import { Book } from "./model/Book";
// Middleware
import cors from "cors";
import compression from "compression";

// Defining Express And Adding Additional Middleware
const app = express();
app.use("*", cors());
app.use(compression());

// Connect To MongoDB
connectToDB();

// Arguments Interface For Requesting A Book By It's Title
interface ArgsInt {
  books_count: string;
  authors: string;
  original_publication_year: number;
  title: string;
  language_code: string;
  average_rating: Float32Array;
  ratings_count: number;
  image_url: string;
  small_image_url: string;
}

// GraphQL + Apollo Resolvers
const resolvers = {
  Query: {
    // Will Return All Books In DB
    getAllBooks: async () => {
      const books: mongoose.Document[] = await Book.find();
      return books;
    },
    // Will Return The Books That Include Or Match The Title
    getBookByTitle: async (_: any, args: ArgsInt) => {
      const title: RegExp = new RegExp(".*" + args.title + ".*", "i");
      const book: mongoose.Document<any>[] = await Book.find({ title });
      return book;
    },
  },
};

// Create Instance Of Apollo Server So We Get The UI Of Apollo Server In Express Server
const server: ApolloServer = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

// Applying All Middleware To The Server And Defining The Path To Be Located At /graphql
server.applyMiddleware({ app, path: "/graphql" });

// Creating A New Express Server For The Web
app.listen(4000, () => {
  console.log(`GraphQL is now running on http://localhost:4000/graphql`);
});
