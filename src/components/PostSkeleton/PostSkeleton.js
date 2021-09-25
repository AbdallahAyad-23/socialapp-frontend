import React from "react";
import styles from "./PostSkeleton.module.css";
const PostSkeleton = () => {
  return (
    <div className={styles.post}>
      <div className={styles.post_head}>
        <div className={styles.post_author}>
          <div className={styles.author_img}></div>
          <div className={styles.info}>
            <h4 className={styles.username}></h4>
            <p className={styles.post_date}></p>
          </div>
        </div>
      </div>
      <div className={styles.post_content}></div>
      <div className={styles.post_content}></div>
      <div className={styles.post_content}></div>
      <div className={styles.post_mid_actions}>
        <i className="far fa-thumbs-up"></i>

        <i className="far fa-comment-alt"></i>
      </div>
    </div>
  );
};

export default PostSkeleton;
