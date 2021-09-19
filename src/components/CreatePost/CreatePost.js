import React, { useContext, useState } from "react";
import axios from "../../utils/axios";
import styles from "./CreatePost.module.css";
import { AuthContext } from "../../store";
import Backdrop from "../Backdrop/Backdrop";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
const CreatePost = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [showCreate, setShowCreate] = useState(false);

  const createPost = (e, content) => {
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
    <>
      {showCreate && <Backdrop setShow={setShowCreate} />}
      {showCreate && (
        <CreatePostForm
          intialContent=""
          fn={createPost}
          title="Create Post"
          btn="Post"
        />
      )}
      <div className={styles.create_post}>
        <img
          className={styles.author_img}
          src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${state.user.imageUrl}?alt=media`}
          alt="user"
        />
        <div
          className={styles.post_input}
          onClick={() => setShowCreate(true)}
        >{`What's on your mind, ${state.user.firstname}?`}</div>
      </div>
    </>
  );
};

export default CreatePost;
