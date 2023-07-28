import { useState, useEffect } from "react";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import UserModel from ".././models/Author";
import Friend from "./Friend";
import LoadingSPpinner from "./LoadingSpinner";

import classes from "./Friends.module.scss";

const Friends = () => {
  const { user, token, setLoggedOutUser } = useAuth();
  const { theme } = useTheme();
  const styleClasses = [classes[theme], classes.container];

  const [friendsDownloading, setFriendsDownloading] = useState(true);
  const [friends, setFriends] = useState<UserModel[]>([]);

  useEffect(() => {
    getFriends();
  }, []);

  if (!user || !token) {
    setLoggedOutUser();
    return null;
  }

  const { userID } = user;

  const getFriends = async () => {
    const address = process.env.REACT_APP_SERVER + "/users";
    setFriendsDownloading(true);
    try {
      const response = await fetch(address, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setFriendsDownloading(false);
      if (data.status === "success") {
        setFriends(data.data.users);
      } else if (data.message === "jwt expired") {
        setLoggedOutUser();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      {!friendsDownloading && (
        <div className={classes.friends}>
          {friends.map(
            (friend) =>
              friend._id !== userID && (
                <Friend key={friend._id} friend={friend} theme={theme} />
              )
          )}
        </div>
      )}
      {!friendsDownloading && friends.length === 0 && (
        <p className={classes.noFriends}>There are no friends</p>
      )}
      {friendsDownloading && (
        <LoadingSPpinner message="Downloading friends list" />
      )}
    </div>
  );
};

export default Friends;
