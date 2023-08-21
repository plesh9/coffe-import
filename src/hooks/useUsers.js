import { useState } from "react";
import { usersApi } from "../api/usersApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersIsLoading, setLoading] = useState(false);

  const onGetUsers = async (e) => {
    setLoading(true);

    try {
      await usersApi.getUsers().then((response) => {
        if (!response.data) return;

        setUsers(response.data);
      });
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { onGetUsers, usersIsLoading, users };
};
