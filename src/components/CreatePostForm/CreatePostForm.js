import React, { useState, useContext } from "react";
import axios from "../../utils/axios";
import styles from "./CreatePostForm.module.css";
import { AuthContext } from "../../store";
const CreatePostForm = ({ setShowCreate }) => {
  const [content, setContent] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  const onChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const createPost = (e) => {
    e.preventDefault();
    if (content.length !== 0) {
      axios.post("/posts", { content }).then((res) => {
        setShowCreate(false);
        const newPost = res.data;
        newPost.userId = state.user;
        dispatch({ type: "ADD_POST", payload: newPost });
      });
    }
  };
  return (
    <form className={styles.form} onSubmit={createPost}>
      <h1>Create Post</h1>
      <textarea
        className={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChange={onChangeHandler}
      />
      <button className={styles.submit}>Post</button>
    </form>
  );
};

export default CreatePostForm;
