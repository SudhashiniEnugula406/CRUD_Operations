import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa"; // Import the icons
import "./Common.css";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <span className="navbar-text">React CRUD</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome /> Home {/* Add Home icon here */}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="create-user">
                  <FaUser /> Create User {/* Add User icon here */}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="show-user">
                  <FaUser /> Show User {/* Add User icon here */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
