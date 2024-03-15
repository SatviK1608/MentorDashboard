import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './utils/Dashboard.css';
import { toast } from 'sonner';
const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://mentor-dashboard-api-three.vercel.app/dashboard', {
        });
        setStudents(response.data.students);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);
  const add = async (studentid) => {


    let mid = localStorage.getItem('mid');
    try {
      const response = await axios.post("https://mentor-dashboard-api.vercel.app-three/add", { studentid, mid });
      if (response.data.message === "Added Successfully") {
        toast.success("Student added successfully");
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error");
      toast.error("An error occurred while adding student")
    }
  }

  const marksAssigned = async () => {
    try {
      const response = await axios.get("https://mentor-dashboard-api.vercel.app-three/marksAssigned");
      setStudents(response.data.filteredData);
    }
    catch (error) {
      console.log("error")
    }
  }
  const marksNotAssigned = async () => {
    const response = await axios.get("https://mentor-dashboard-api.vercel.app-three/marksNotAssigned");
    setStudents(response.data.filteredData);
  }
  const clearFilter = async () => {
    const response = await axios.get("https://mentor-dashboard-api.vercel.app-three/dashboard", {});
    setStudents(response.data.students);
  }

  return (
    <div >
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Add</th>
            <th>Ideation</th>
            <th>Execution</th>
            <th>Viva</th>
            <th>Pitch</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td><button onClick={() => add(student.id)}>Add</button></td>
              <td>{student.marks.ideation}</td>
              <td>{student.marks.execution}</td>
              <td>{student.marks.viva}</td>
              <td>{student.marks.pitch}</td>
              <td>{parseInt(student.marks.ideation) + parseInt(student.marks.execution) + parseInt(student.marks.viva) + parseInt(student.marks.pitch)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="btn">
        <h2>Filters</h2>
        <div>
          <button onClick={marksAssigned} className='filter-buttons'>Marks Assigned</button>
          <button onClick={marksNotAssigned} className='filter-buttons'>Marks Not Assigned</button>
          <button onClick={clearFilter} className='filter-buttons'>All students</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
