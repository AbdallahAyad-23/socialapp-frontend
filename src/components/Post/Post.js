import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import { DateTime } from "luxon";
import { AuthContext } from "../../store";
import Comments from "../Comments/Comments";
import Backdrop from "../Backdrop/Backdrop";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import styles from "./Post.module.css";
const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/posts/${post._id}/likes`).then((res) => {
      setLikes(res.data);
    });
  }, []);
  useEffect(() => {
    if (likes && state.user) {
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
    setLiked(true);
    axios
      .post(`/posts/${postId}/likes`)
      .then((res) => {
        const newLike = res.data;
        setLikes((prevLikes) => [...prevLikes, newLike]);
      })
      .catch((err) => setLiked(false));
  };

  const unlike = (postId) => {
    setLiked(false);
    axios
      .delete(`/posts/${postId}/likes`)
      .then((res) => {
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like._id !== res.data._id)
        );
      })
      .catch((err) => setLiked(true));
  };

  const editPost = (e, content) => {
    e.preventDefault();
    if (post.content !== content && content.length !== 0) {
      axios.put(`/posts/${post._id}`, { content }).then((res) => {
        setShowEdit(false);
        const newPost = res.data;
        newPost.userId = state.user;
        dispatch({ type: "EDIT_POST", payload: { newPost } });
      });
    }
  };

  const deletePost = (postId) => {
    axios.delete(`/posts/${postId}`).then((res) => {
      dispatch({ type: "DELETE_POST", payload: { id: res.data._id } });
    });
  };

  const toggleShowComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <div className={styles.post}>
      {showEdit && <Backdrop setShow={setShowEdit} />}
      {showEdit && (
        <CreatePostForm
          fn={editPost}
          title="Edit Post"
          btn="Edit"
          intialContent={post.content}
        />
      )}
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
        {state.user.userId == post.userId.userId && (
          <div className={styles.post_head_actions}>
            <i
              onClick={() => setShowEdit(true)}
              className={`far fa-edit ${styles.post_edit}`}
            ></i>
            <i
              onClick={() => deletePost(post._id)}
              className={`far fa-trash-alt ${styles.post_delete}`}
            ></i>
          </div>
        )}
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
        {post.comments.length > 0 && (
          <p>
            <span>
              {comments.length ? comments.length : post.comments.length}
            </span>{" "}
            Comments
          </p>
        )}
      </div>
      {showComment && (
        <Comments comments={comments} setComments={setComments} post={post} />
      )}
    </div>
  );
};

export default Post;
