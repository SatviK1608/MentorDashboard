import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './utils/Mentees.css';
import { toast } from 'sonner';
const Mentees = () => {
  const [mentees, setMentees] = useState([]);
  let mid = localStorage.getItem('mid');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const result = JSON.stringify({ mid: mid })
      try {

        const response = await fetch("https://mentor-dashboard-api-three.vercel.app/mentees", {
          method: 'post', body: result, headers: {
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(
          data => data
        );
        setMentees(response.mentees);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
    // eslint-disable-next-line
  }, [])




  const deleteMentee = async (studentid) => {
    const result = JSON.stringify({ studentid: studentid, mid: mid })
    try {

      const response = await fetch("https://mentor-dashboard-api-three.vercel.app/delete", {
        method: 'post', body: result, headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.json()
      ).then(
        data => data
      );
      if (response.message === "Deleted Successfully") {
        toast.success("Mentee deleted successfully");
        var m = mentees.filter((item) => {
          return item.id !== studentid;
        })
        setMentees(m);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error");
      toast.error("An error occurred while deleting student")
    }
  }

  const confirmResult = async (studentid) => {
    const result = JSON.stringify({ studentid: studentid })
    try {
      // eslint-disable-next-line
      const response = await fetch("https://mentor-dashboard-api-three.vercel.app/confirm", {
        method: 'post', body: result, headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.json()
      ).then(
        data => data
      );
      toast.success("Marks have been locked");
    } catch (err) {
      console.log("error")
      toast.error("An error occurred while locking results");
    }
  }
  const editMarks = async (studentId) => {
    localStorage.setItem("sid", studentId);
    navigate("/edit")
  }

  return (
    <div>
      <h1>My Mentees</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Confirm Result</th>
          </tr>
        </thead>
        <tbody>
          {mentees.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td><button onClick={() => editMarks(student.id)}>Edit Marks</button></td>
              <td><button onClick={() => deleteMentee(student.id)}>Delete</button></td>
              <td><button onClick={() => confirmResult(student.id)}>Lock Result</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mentees;
