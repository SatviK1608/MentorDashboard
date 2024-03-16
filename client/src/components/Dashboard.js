import React, { useEffect, useState } from 'react';
import './utils/Dashboard.css';
import { toast } from 'sonner';
const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://mentor-dashboard-api-three.vercel.app/dashboard', {
          method: 'get'
        }).then(resp => resp.json()).then(data => data);
        setStudents(response.students);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);
  const add = async (studentid) => {


    let mid = localStorage.getItem('mid');
    const result = JSON.stringify({ studentid: studentid, mid: mid });
    try {
      const response = await fetch("https://mentor-dashboard-api-three.vercel.app/add", {
        method: 'post', body: result, headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.json()
      ).then(
        data => data
      );
      console.log(response);
      if (response.message === "Added Successfully") {
        toast.success("Student added successfully");
      }
      else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error");
      toast.error("An error occurred while adding student")
    }
  }

  const marksAssigned = async () => {
    try {
      const response = await fetch('https://mentor-dashboard-api-three.vercel.app/marksAssigned', {
        method: 'get'
      }).then(resp => resp.json()).then(data => data);
      setStudents(response.filteredData);
    }
    catch (error) {
      console.log("error")
    }
  }
  const marksNotAssigned = async () => {
    const response = await fetch('https://mentor-dashboard-api-three.vercel.app/marksNotAssigned', {
      method: 'get'
    }).then(resp => resp.json()).then(data => data);
    setStudents(response.filteredData);
  }
  const clearFilter = async () => {
    const response = await fetch('https://mentor-dashboard-api-three.vercel.app/dashboard', {
      method: 'get'
    }).then(resp => resp.json()).then(data => data);
    setStudents(response.students);
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
