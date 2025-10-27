import React, { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`https://demo-ifuf.onrender.com/mytasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTasks(data.tasks || []);
        } else {
          console.log("Unauthorized:", data.message);
          alert("Session expired. Please login again.");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Tasks</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            {/* <th>Description</th> */}
            <th>Last Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                {/* <td>{task.description}</td> */}
                <td>{task.lastDate}</td>
                <td>{task.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
