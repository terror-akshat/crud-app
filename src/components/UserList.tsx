import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/userList.css";
import { useNavigate } from "react-router-dom";

// making an interface for user details

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  //fetching the details form the external api 
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error: any) {
      toast.error("Something went wrong while fetching users.");
    }
  };


  //fucntion for editing
  const editUser = (id: number) => {

    //redirect to the update page with prefill value of user
    navigate(`/UserUpdate/${id}`);
  };


  //function for delete user 
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully.");
    } catch (error: any) {
      toast.error("Error deleting user.");
    }
  };

  return (
    <div className="container">
      <h2 id="H">User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
             {user.name} - {user.email} - {user.phone}
            <button onClick={() => editUser(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
        <button onClick={() => navigate("/create")}>Create User</button>
      </ul>
    </div>
  );
};
