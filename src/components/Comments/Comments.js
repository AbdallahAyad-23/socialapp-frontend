import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./Comments.module.css";
const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${postId}/comments`).then((res) => {
      console.log(res);
      setComments(res.data);
    });
  }, []);
  return (
    <ul className={`${comments ? styles.comments : styles.spinner_div}`}>
      {comments ? (
        comments.map((comment) => (
          <li className={styles.comment_div}>
            <img
              className={styles.author_img}
              src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${comment.userId.imageUrl}?alt=media`}
              alt="user"
            />
            <div className={styles.comment}>
              <h5>{comment.userId.username}</h5>
              <p>{comment.content}</p>
            </div>
          </li>
        ))
      ) : (
        <Spinner />
      )}
    </ul>
  );
};

export default Comments;
