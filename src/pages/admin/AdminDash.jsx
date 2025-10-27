import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    email: "",
    task: "",
    lastDate: "",
    status: "",
  });
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("https://demo-ifuf.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        setMessage(data.message || "Failed to fetch tasks.");
      }
    } catch (err) {
      setMessage("Error fetching tasks.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://demo-ifuf.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.task,
          description: "",
          lastDate: formData.lastDate,
          status: formData.status,
          email: formData.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Task added successfully!");
        setFormData({ email: "", task: "", lastDate: "", status: "" });
        fetchTasks();
      } else {
        setMessage(data.message || " Something went wrong.");
      }
    } catch (err) {
      setMessage(" Error adding task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <h4>Add Task</h4>
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="User Email (required)"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="task"
          placeholder="Task"
          value={formData.task}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="date"
          name="lastDate"
          value={formData.lastDate}
          onChange={handleChange}
          required
        />
        <select
          className="form-control mb-2"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-success">Add Task</button>
        {message && <div className="mt-2 alert alert-info">{message}</div>}
      </form>

      <h4>All Tasks</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Task</th>
            <th>Last Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr key={i}>
              <td>{t.userId?.email || "Unknown"}</td>
              <td>{t.title}</td>
              <td>{t.lastDate?.split("T")[0]}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
