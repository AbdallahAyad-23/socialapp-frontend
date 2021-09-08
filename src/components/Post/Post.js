import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import { DateTime } from "luxon";
import { AuthContext } from "../../store";
import Comments from "../Comments/Comments";
import styles from "./Post.module.css";
const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/posts/${post._id}/likes`).then((res) => {
      setLikes(res.data);
    });
  }, []);
  useEffect(() => {
    if (likes) {
      console.log(likes);
      const isLiked =
        likes.filter(
          (like) =>
            like.userId.toString() === state.user._id.toString() ||
            like.userId._id.toString() === state.user._id.toString()
        ).length !== 0;
      setLiked(isLiked);
    }
  }, [likes.length]);

  const like = (postId) => {
    // dispatch({ type: "like", payload: { id: postId } });
    setLiked(true);
    axios.post(`/posts/${postId}/likes`).then((res) => {
      const newLike = res.data;
      setLikes((prevLikes) => [...prevLikes, newLike]);
    });
  };

  const unlike = (postId) => {
    // dispatch({ type: "unlike", payload: { id: postId } });
    setLiked(false);
    axios.delete(`/posts/${postId}/likes`).then((res) => {
      setLikes((prevLikes) =>
        prevLikes.filter((like) => like._id !== res.data._id)
      );
    });
  };
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
        {!liked ? (
          <i onClick={() => like(post._id)} className="far fa-thumbs-up"></i>
        ) : (
          <i
            onClick={() => unlike(post._id)}
            className={`far fa-thumbs-up ${styles.liked}`}
          ></i>
        )}
        <i onClick={toggleShowComment} className="far fa-comment-alt"></i>
      </div>
      <div className={styles.post_footer}>
        {likes.length > 0 && (
          <p>
            <span>{likes.length}</span> Likes
          </p>
        )}
        {/* {post.comments.length > 0 && (
          <p>
            <span>{post.comments.length}</span> Comments
          </p>
        )} */}
      </div>
      {showComment && (
        <div className={styles.comments}>
          <div className={styles.comment}>
            <img
              className={styles.author_img}
              src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${post.userId.imageUrl}?alt=media`}
              alt="user"
            />
            <input className={styles.comment_input} type="text" />
          </div>
          <Comments postId={post._id} />
        </div>
      )}
    </div>
  );
};

export default Post;
