import Author from "./Author";

type Comment = {
  _id: string;
  text: string;
  post: string;
  author: Author;
  createdAt: string;
  modifiedAt: string;
};

export default Comment;
