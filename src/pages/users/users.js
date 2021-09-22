import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import styles from "./users.module.css";
import { AuthContext } from "../../store";

const Users = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const unsend = (friendId, requestId) => {
    axios
      .delete(`/friends/${friendId}?unsend=true`)
      .then(dispatch({ type: "UPDATE_REQUESTS", payload: { requestId } }));
  };

  const unfriend = (friendId, requestId) => {
    axios.delete(`/friends/${friendId}/unfriend`).then((res) => {
      console.log(res.data);
      dispatch({ type: "UPDATE_REQUESTS", payload: { requestId } });
    });
  };

  const decline = (friendId, requestId) => {
    axios
      .delete(`/friends/${friendId}`)
      .then(dispatch({ type: "UPDATE_REQUESTS", payload: { requestId } }));
  };

  const accept = (friendId, requestId) => {
    axios.patch(`/friends/${friendId}`).then((res) => {
      const request = res.data;
      dispatch({ type: "ACCEPT_REQUEST", payload: { requestId } });
    });
  };

  const add = (friendId, recipient) => {
    axios.post(`/friends/${friendId}`).then((res) => {
      const request = res.data;
      request.requester = state.user;
      request.recipient = recipient;
      console.log("request", request);
      dispatch({ type: "ADD_FRIEND", payload: { request } });
    });
  };
  useEffect(() => {
    axios.get("/users").then((res) => {
      setUsers(res.data.users);
    });
    if (!state.requests) {
      console.log("it should");
      axios.get("/user/friends").then((res) => {
        const friendRequests = res.data;
        dispatch({ type: "SET_REQUESTS", payload: { friendRequests } });
      });
    }
  }, []);
  let obj = {};
  if (state.requests) {
    state.requests.forEach((request) => {
      if (request.requester._id.toString() === state.user._id.toString()) {
        obj[request.recipient._id] = {
          user: request.recipient,
          status: request.status,
          requestId: request._id,
        };
      } else {
        obj[request.requester._id] = {
          user: request.requester,
          status: request.status,
          requestId: request._id,
        };
      }
    });
  }
  return (
    <div className={styles.users}>
      {users && (
        <ul className={styles.users_list}>
          {users.map((user) => (
            <li className={styles.user} key={user._id}>
              <div className={styles.user_info}>
                <img
                  className={styles.user_image}
                  src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${user.imageUrl}?alt=media`}
                />
                <p>{user.username}</p>
              </div>

              {!obj[user._id] && (
                <button
                  onClick={() => add(user._id, user)}
                  className={styles.btn}
                >
                  Add
                </button>
              )}
              {obj[user._id] && obj[user._id].status == 1 && (
                <button
                  className={styles.btn}
                  onClick={() =>
                    unsend(obj[user._id].user._id, obj[user._id].requestId)
                  }
                >
                  Unsend
                </button>
              )}
              {obj[user._id] && obj[user._id].status == 2 && (
                <div>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      accept(obj[user._id].user._id, obj[user._id].requestId)
                    }
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      decline(obj[user._id].user._id, obj[user._id].requestId)
                    }
                    className={styles.btn}
                  >
                    Decline
                  </button>
                </div>
              )}
              {obj[user._id] && obj[user._id].status == 3 && (
                <button
                  onClick={() =>
                    unfriend(obj[user._id].user._id, obj[user._id].requestId)
                  }
                  className={styles.btn}
                >
                  Unfriend
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
