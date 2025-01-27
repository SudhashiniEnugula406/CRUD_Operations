import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = "http://localhost:3000/user";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete user function
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${showUserApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Remove deleted user from state
      setUser((prevUserList) => prevUserList.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all users
  const getUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(showUserApi);
      setUser(response.data); // Ensure data is an array of users with unique `id`s
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on component mount
  useEffect(() => {
    getUsers();
  }, []);

  // Render message if no users are found
  if (user.length === 0 && !isLoading) {
    return <h1>No users found</h1>;
  }

  return (
    <div className="mt-5">
      {isLoading && <Loader />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td> {/* Display the user's unique ID */}
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    to={`/edit-user/${item.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                  </Link>
                  <Link
                    to={`/user/${item.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Show
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)} // Use the correct `id`
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
