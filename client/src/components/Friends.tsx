import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import UserModel from ".././models/Author";
import Friend from "./Friend";
import classes from "./Friends.module.scss";

const Friends = () => {
  const { userID, token } = useContext(AuthContext);
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.container];

  const [friends, setFriends] = useState<UserModel[]>([]);

  const getFriends = async () => {
    const address = process.env.REACT_APP_SERVER + "/users";
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setFriends(data.data.users);
        console.log(data.data.users);
      } else {
        console.log(data.message);
      }
      console.log(data.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className={styleClasses.join(" ")}>
      <h2 className={classes.header}>Friends</h2>
      <div className={classes.friends}>
        {friends.map(
          (friend) =>
            friend._id !== userID && (
              <Friend key={friend._id} friend={friend} theme={theme} />
            )
        )}
      </div>
    </div>
  );
};

export default Friends;
