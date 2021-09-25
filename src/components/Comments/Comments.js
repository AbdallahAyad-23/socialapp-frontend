import axios from "../../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store";
import Comment from "../Comment/Comment";
import Spinner from "../Spinner/Spinner";
import styles from "./Comments.module.css";
const Comments = ({ post, comments, setComments }) => {
  const [comment, setComment] = useState("");
  const { state } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/posts/${post._id}/comments`).then((res) => {
      console.log(res);
      setComments(res.data);
    });
  }, []);
  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const createComment = (e) => {
    if (e.keyCode === 13) {
      setComment("");
      axios
        .post(`/posts/${post._id}/comments`, { content: comment })
        .then((res) => {
          const comment = res.data;
          comment.userId = state.user;
          setComments((prevComments) => [comment, ...prevComments]);
        });
    }
  };
  const deleteComment = (commentId) => {
    axios.delete(`/posts/${post._id}/comments/${commentId}`).then((res) => {
      const deletedComment = res.data;
      setComments((prevComments) => {
        return prevComments.filter(
          (comment) => comment._id != deletedComment._id
        );
      });
    });
  };

  const editComment = (commentId, content) => {
    axios
      .put(`/posts/${post._id}/comments/${commentId}`, { content })
      .then((res) => {
        console.log(res.data);
        const newComment = res.data;
        newComment.userId = state.user;
        setComments((prevComments) => {
          return prevComments.map((prevComment) => {
            if (prevComment._id.toString() === newComment._id.toString()) {
              return newComment;
            }
            return prevComment;
          });
        });
      });
  };
  return (
    <div className={styles.comments}>
      {state.user && (
        <div className={styles.comment_create}>
          <img
            className={styles.author_img}
            src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${state.user.imageUrl}?alt=media`}
            alt="user"
          />
          <input
            className={styles.comment_input}
            onChange={commentChangeHandler}
            onKeyUp={createComment}
            placeholder="Write a comment..."
            value={comment}
            type="text"
          />
        </div>
      )}
      <ul className={`${comments ? styles.comments_list : styles.spinner_div}`}>
        {comments ? (
          comments
            .sort(function (a, b) {
              return a.createdAt < b.createdAt
                ? 1
                : a.createdAt > b.createdAt
                ? -1
                : 0;
            })
            .map((comment) => (
              <Comment
                comment={comment}
                deleteComment={deleteComment}
                editComment={editComment}
                key={comment._id}
              />
            ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default Comments;
