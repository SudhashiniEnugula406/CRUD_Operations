import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState(null); // Start with null to handle loading state
  const [error, setError] = useState(null); // Track errors
  const { id } = useParams();
  const getUserApi = "http://localhost:3000/user";

  // Memoize the getUser function using useCallback
  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`${getUserApi}/${id}`);
      setUser(response.data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user details. Please try again later.");
    }
  }, [id, getUserApi]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!user) {
    return <p className="loading-message">Loading user details...</p>;
  }

  return (
    <div className="user mt-5">
      <h2>Edit User</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditUser;
