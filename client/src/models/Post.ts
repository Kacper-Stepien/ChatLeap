import Author from "./Author";
import Comment from "./Comment";
import Like from "./Like";

type Post = {
  _id: string;
  text: string;
  createdAt: string;
  modifiedAt: string;
  author: Author;
  comments: Comment[];
  likes: Like[];
};

export default Post;
