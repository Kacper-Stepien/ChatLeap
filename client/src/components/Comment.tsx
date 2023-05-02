import CommentModel from ".././models/Comment";
import formatDate from "../utils/FormatDate";
import classes from "./Comment.module.scss";

const Comment: React.FC<CommentModel> = (comment: CommentModel) => {
  const styleClasses = [classes.comment];
  return (
    <div key={comment._id} className={styleClasses.join(" ")}>
      <div className={classes.userPhoto}>
        <img src="/user.jpg" />
      </div>
      <div className={classes.content}>
        <p className={classes.authorName}>
          {comment.author.name + " " + comment.author.surname}
        </p>
        <p className={classes.text}>{comment.text}</p>
      </div>
      <div>
        <p className={classes.date}>{formatDate(comment.createdAt)}</p>
      </div>
    </div>
  );
};

export default Comment;
