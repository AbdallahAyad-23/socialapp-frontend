import React, { useContext, useEffect, useState } from "react";
import styles from "./FriendRequests.module.css";
import axios from "../../utils/axios";
import { AuthContext } from "../../store";
const FriendRequests = () => {
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    axios.get("/user/friends").then((res) => {
      const friendRequests = res.data;
      console.log(friendRequests);
      dispatch({ type: "SET_REQUESTS", payload: { friendRequests } });
    });
  }, []);
  const unsend = (friendId, requestId) => {
    axios
      .delete(`/friends/${friendId}?unsend=true`)
      .then(dispatch({ type: "UPDATE_REQUESTS", payload: { requestId } }));
  };

  const accept = (friendId, requestId) => {
    axios
      .patch(`/friends/${friendId}`)
      .then(dispatch({ type: "UPDATE_REQUESTS", payload: { requestId } }));
  };

  const decline = (friendId, requestId) => {
    axios
      .delete(`/friends/${friendId}`)
      .then(dispatch({ type: "UPDATE_REQUESTS", payload: { requestId } }));
  };

  return (
    <div className={styles.friend_requests}>
      {state.requests &&
      state.requests.filter((request) => request.status != 3).length > 0 ? (
        <ul className={styles.friend_requests_list}>
          {state.requests.map((obj) => {
            switch (obj.status) {
              case 1:
                return (
                  <li className={styles.request} key={obj._id}>
                    <div className={styles.request_div}>
                      <img
                        className={styles.img}
                        src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${obj.recipient.imageUrl}?alt=media`}
                      />
                      <p>{obj.recipient.username}</p>
                    </div>
                    <button
                      className={styles.btn}
                      onClick={() => unsend(obj.recipient._id, obj._id)}
                    >
                      Unsend
                    </button>
                  </li>
                );
              case 2:
                return (
                  <li className={styles.request} key={obj._id}>
                    <div className={styles.request_div}>
                      <img
                        className={styles.img}
                        src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${obj.requester.imageUrl}?alt=media`}
                      />
                      <p>{obj.requester.username}</p>
                    </div>
                    <button
                      className={styles.btn}
                      onClick={() => accept(obj.requester._id, obj._id)}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => decline(obj.requester._id, obj._id)}
                      className={styles.btn}
                    >
                      Decline
                    </button>
                  </li>
                );
            }
          })}
        </ul>
      ) : (
        <p>There are no requests</p>
      )}
    </div>
  );
};

export default FriendRequests;
