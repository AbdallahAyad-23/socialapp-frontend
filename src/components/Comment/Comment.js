import React, { useContext, useState } from "react";
import styles from "./Comment.module.css";
import { AuthContext } from "../../store";
const Comment = ({ comment, deleteComment, editComment }) => {
  const [edit, setEdit] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const { state } = useContext(AuthContext);
  const editCommentHandler = (e) => {
    if (
      newContent.trimEnd() !== comment.content.trimEnd() &&
      newContent.trim() !== ""
    ) {
      editComment(comment._id, newContent.trimEnd());
      setEdit(false);
    } else {
      setEdit(false);
    }
  };
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
              <i
                onClick={() => setEdit((prevEdit) => !prevEdit)}
                className={`far fa-edit ${styles.comment_edit}`}
              ></i>
              <i
                onClick={() => deleteComment(comment._id)}
                className={`far fa-trash-alt ${styles.comment_delete}`}
              ></i>
            </div>
          )}
        </div>
        {!edit ? (
          <p>{comment.content}</p>
        ) : (
          <div className={styles.edit_div}>
            <textarea
              className={styles.edit_area}
              onChange={(e) => setNewContent(e.target.value)}
              value={newContent}
              autoFocus={edit}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.trimEnd().length,
                  e.currentTarget.value.trimEnd().length
                )
              }
            />
            <i
              className={`fas fa-check-circle ${styles.edit_done}`}
              onClick={editCommentHandler}
            ></i>
          </div>
        )}
      </div>
    </li>
  );
};

export default Comment;
