import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/create.css";
import { useNavigate } from "react-router-dom";

// making an interface for user details
interface User {
  name: string;
  email: string;
  phone: string;
}

export const CreateUser: React.FC = () => {
  //useState define for diiferent functioning

  const [user, setUser] = useState<User>({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  //function for proper input handleing

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // form validation it validate the proper user details
  const validation = (): boolean => {
    const newError: string[] = [];

    if (!user.name) newError.push("Name is required");
    if (!user.email) newError.push("Email is required");
    if (user.phone.length != 10) newError.push("enter the valid number");
    return newError.length === 0;
  };

  //form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //checking for the validation
    if (!validation()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        user
      );
      toast.success("User created successfully.");
      setUser(response.data);

      //for checking the new added output
      console.log(response.data);

      // redirect to the home page
      navigate("/");
    } catch (error: any) {
      //checking for api error
      setApiError(error);
      console.log(apiError);

      toast.error("Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    //form modle
    <div className="container">
      <h2 id="H"> {loading ? "processing" : "Create False"}</h2>
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
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};
