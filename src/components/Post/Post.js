import React, { useState } from "react";
import { DateTime } from "luxon";
import Comments from "../Comments/Comments";
import styles from "./Post.module.css";
const Post = ({ post, like }) => {
  const [showComment, setShowComment] = useState(false);
  const toggleShowComment = () => {
    setShowComment((prev) => !prev);
  };
  return (
    <div className={styles.post}>
      <div className={styles.post_head}>
        <div className={styles.post_author}>
          <img
            className={styles.author_img}
            src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${post.userId.imageUrl}?alt=media`}
            alt="user"
          />
          <div className={post.creation}>
            <h4>{post.userId.username}</h4>
            <p className={styles.post_date}>{post.createdAt}</p>
          </div>
        </div>
        <div className={styles.post_head_actions}>
          <i className={`far fa-edit ${styles.post_edit}`}></i>
          <i className={`far fa-trash-alt ${styles.post_delete}`}></i>
        </div>
      </div>
      <div className={styles.post_content}>{post.content}</div>
      <div className={styles.post_mid_actions}>
        <i onClick={() => like(post._id)} className="far fa-thumbs-up"></i>
        <i onClick={toggleShowComment} className="far fa-comment-alt"></i>
      </div>
      <div className={styles.post_footer}>
        {post.likesCount > 0 && (
          <p>
            <span>{post.likesCount}</span> Likes
          </p>
        )}
        {post.commentsCount > 0 && (
          <p>
            <span>{post.commentsCount}</span> Comments
          </p>
        )}
      </div>
      {showComment && (
        <div className={styles.comment}>
          <img
            className={styles.author_img}
            src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${post.userId.imageUrl}?alt=media`}
            alt="user"
          />
          <input className={styles.comment_input} type="text" />
          <Comments postId={post._id} />
        </div>
      )}
    </div>
  );
};

export default Post;
