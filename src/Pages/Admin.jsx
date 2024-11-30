import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Admin.css";

const Admin = () => {
  const [problems, setProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProblem, setNewProblem] = useState({ description: "", input: "", output: "" });
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "" });

  // Fetch problems and users on component mount
  useEffect(() => {
    fetchProblems();
    fetchUsers();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("/problems"); // Replace with your API endpoint
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users"); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddProblem = async () => {
    try {
      const response = await axios.post("/problems", newProblem); // Replace with your API endpoint
      setProblems([...problems, response.data]);
      setNewProblem({ description: "", input: "", output: "" });
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleDeleteProblem = async (id) => {
    try {
      await axios.delete(`/problems/${id}`); // Replace with your API endpoint
      setProblems(problems.filter((problem) => problem.id !== id));
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post("/users", newUser); // Replace with your API endpoint
      setUsers([...users, response.data]);
      setNewUser({ username: "", email: "", role: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`); // Replace with your API endpoint
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-container">
      {/* Partition 1: Manage Problems */}
      <div className="admin-partition">
        <h2>Manage Problems</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Input</th>
              <th>Output</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.description}</td>
                <td>{problem.input}</td>
                <td>{problem.output}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteProblem(problem.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Add New Problem</h3>
        <input
          type="text"
          placeholder="Description"
          value={newProblem.description}
          onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Input"
          value={newProblem.input}
          onChange={(e) => setNewProblem({ ...newProblem, input: e.target.value })}
        />
        <input
          type="text"
          placeholder="Output"
          value={newProblem.output}
          onChange={(e) => setNewProblem({ ...newProblem, output: e.target.value })}
        />
        <button className="create-btn" onClick={handleAddProblem}>
          Add Problem
        </button>
      </div>

      {/* Partition 2: Manage Users */}
      <div className="admin-partition">
        <h2>Manage Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button className="create-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default Admin;
