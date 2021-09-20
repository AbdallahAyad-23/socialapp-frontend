import React, { useContext, useRef } from "react";
import styles from "./profile.module.css";
import Post from "../../components/Post/Post";
import { AuthContext } from "../../store";
import axios from "../../utils/axios";
const Profile = () => {
  const { state, dispatch } = useContext(AuthContext);
  const fileRef = useRef(null);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      return;
    }
    const formData = new FormData();
    formData.append("profile", file);
    axios
      .post("/profile", formData)
      .then((res) => {
        const newProfileImg = res.data.profileImage;
        dispatch({ type: "NEW_PROFILE", payload: { newProfileImg } });
        dispatch({ type: "UPDATE_POSTS" });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.profile}>
      <div className={styles.profile_img_div}>
        <img
          className={styles.profile_img}
          src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${state.user.imageUrl}?alt=media`}
          alt="profile_image"
        />
        <i
          className={`fas fa-camera ${styles.file_input_icon}`}
          onClick={() => fileRef.current.click()}
        ></i>
        <input
          onChange={handleFileUpload}
          type="file"
          hidden
          ref={fileRef}
          accept="image/png, image/jpeg"
        />
      </div>
      <ul className={styles.posts}>
        {state.posts &&
          state.posts
            .filter(
              (post) => post.userId._id.toString() === state.user._id.toString()
            )
            .map((post) => <Post key={post._id} post={post} />)}
      </ul>
    </div>
  );
};

export default Profile;
