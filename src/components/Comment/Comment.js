import React, { useContext } from "react";
import styles from "./Comment.module.css";
import { AuthContext } from "../../store";
const Comment = ({ comment, deleteComment }) => {
  console.log(comment);
  const { state } = useContext(AuthContext);
  return (
    <li className={styles.comment_div} key={comment._id}>
      <img
        className={styles.author_img}
        src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${comment.userId.imageUrl}?alt=media`}
        alt="user"
      />
      <div className={styles.comment}>
        <div className={styles.comment_header}>
          <h5>{comment.userId.username}</h5>
          {state.user._id == comment.userId._id && (
            <div className={styles.comment_head_actions}>
              <i className={`far fa-edit ${styles.comment_edit}`}></i>
              <i
                onClick={() => deleteComment(comment._id)}
                className={`far fa-trash-alt ${styles.comment_delete}`}
              ></i>
            </div>
          )}
        </div>
        <p>{comment.content}</p>
      </div>
    </li>
  );
};

export default Comment;
