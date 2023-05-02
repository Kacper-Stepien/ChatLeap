import Comment from "./Comment";
import Like from "./Like";

type Post = {
  _id: string;
  text: string;
  createdAt: string;
  modifiedAt: string;
  author: {
    _id: string;
    name: string;
    surname: string;
    email: string;
    nick: string;
  };
  comments: Comment[];
  likes: Like[];
};

export default Post;
