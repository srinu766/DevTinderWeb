
import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:7777/api/testUser";

  // 🟢 Get all users
  const getUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // 🟢 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Handle image file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🟢 Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("age", form.age);
    if (file) formData.append("UserImage", file);

    try {
      if (editId) {
        await axios.patch(`${API}/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ name: "", email: "", age: "" });
      setFile(null);
      getUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // 🟢 Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // 🟢 Edit user
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age,
    });
    setEditId(user._id);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">User Management (MERN + Image)</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 border p-4 rounded-lg shadow-md bg-white"
        encType="multipart/form-data"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="file"
          name="UserImage"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />

        <button
          className={`${
            editId ? "bg-yellow-500" : "bg-blue-600"
          } text-white px-4 py-2 rounded w-full`}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3 text-center">All Users</h3>
        <table className="border w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {user.UserImage ? (
                    <img
                      src={`http://localhost:7777/${user.UserImage}`}
                      alt={user.name}
                      className="w-12 h-12 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.age}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
