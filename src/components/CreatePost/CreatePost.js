import React, { useContext, useState } from "react";
import styles from "./CreatePost.module.css";
import { AuthContext } from "../../store";
import Backdrop from "../Backdrop/Backdrop";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
const CreatePost = () => {
  const { state } = useContext(AuthContext);
  const [showCreate, setShowCreate] = useState(false);
  return (
    <>
      {showCreate && <Backdrop setShowCreate={setShowCreate} />}
      {showCreate && <CreatePostForm setShowCreate={setShowCreate} />}
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
