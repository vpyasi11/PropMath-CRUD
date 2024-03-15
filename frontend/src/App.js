import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editedUser, setEditedUser] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://propmath-crud.onrender.com/users"); // GET API
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsModalOpen(true);
    setModalType("edit");
    setIsNewUser(false);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setEditedUser({});
    setIsModalOpen(true);
    setModalType("add");
    setIsNewUser(true); 
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://propmath-crud.onrender.com/users/${userId}`); // DELETE API
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewUser) {
        await axios.post("https://propmath-crud.onrender.com/users", editedUser);  // POST API (CREATE)
      } else if (modalType === "edit") {
        await axios.put(
          `https://propmath-crud.onrender.com/${selectedUser._id}`,       // PUT API (UPDATE)
          editedUser 
        );
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className="bg-slate-300 h-screen w-100 pt-10">
      <h1 className="text-3xl font-bold text-center">CRUD App Assignment</h1>

      <div className="flex justify-center mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      <div className="relative overflow-x-auto px-10 mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 text-white">
                  <button
                    className="mr-2 bg-blue-600 py-2 px-4 rounded"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 py-2 px-4 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">
              {modalType === "add" ? "Add User" : "Edit User"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editedUser.name || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={editedUser.email || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={editedUser.phone || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {modalType === "add" ? "Add User" : "Save"}
              </button>
              <button
                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
