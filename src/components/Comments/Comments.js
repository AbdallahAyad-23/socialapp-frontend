import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    axios.get(`/posts/${postId}`).then((res) => {
      console.log(res);
      setComments(res.data.comments);
    });
  }, []);
  return (
    <ul>{comments && comments.map((comment) => <li>{comment.content}</li>)}</ul>
  );
};

export default Comments;
