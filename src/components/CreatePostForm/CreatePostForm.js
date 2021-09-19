import React, { useState } from "react";
import styles from "./CreatePostForm.module.css";
const CreatePostForm = ({ title, btn, fn, intialContent }) => {
  const [content, setContent] = useState(intialContent);

  const onChangeHandler = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => fn(e, content)}>
      <h1>{title}</h1>
      <textarea
        className={styles.input}
        placeholder={btn === "Post" ? "What's on your mind?" : undefined}
        value={content}
        onChange={onChangeHandler}
      />
      <button className={styles.submit}>{btn}</button>
    </form>
  );
};

export default CreatePostForm;
