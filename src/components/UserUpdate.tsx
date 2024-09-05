import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/UpdateUser.css";
import { useNavigate, useParams } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const UserUpdate: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  //this function will  work acoording to the id of the user when edit were hit  for predefine value

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error: any) {
        // if there is some api error issue

        setApiError(error);
        console.log(apiError);
        navigate("/");
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  //function handle for updating user details and redirect to the home page

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        setLoading(true);
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          user
        );

        //logig for geting the updateing value
        console.log(response.data);

        navigate("/");
      } catch (error: any) {
        setApiError(error);
        console.log(apiError);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h2>{loading ? "processing" : "Update User"}</h2>
      {user && (
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label>Phone :</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <button type="submit">Update User</button>
        </form>
      )}
    </div>
  );
};
