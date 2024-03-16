import React, { useState, useEffect } from 'react';
import "./utils/Edit.css"
import { toast } from 'sonner';
const Edit = () => {
  const sid = localStorage.getItem('sid');
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      const result = JSON.stringify({ sid: sid });
      try {
        const response = await fetch("https://mentor-dashboard-api-three.vercel.app/editMarks", {
          method: 'post', body: result, headers: {
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(
          data => data
        );
        setStudent(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [sid]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student);
    const result = JSON.stringify({ student: student, sid: sid });
    try {
      const response = await fetch("https://mentor-dashboard-api-three.vercel.app/edit/submit", {
        method: 'post', body: result, headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.json()
      ).then(
        data => data
      );
      if (response.message === "Updated marks") {
        toast.success("Marks updated successfully");
      }
      else {
        toast.error("Couldn't update marks as they were freezed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>

        <br />
        <label>
          Ideation:
          <input type="number" name="ideation" value={student.ideation} onChange={handleChange} />
        </label>
        <br />
        <label>
          Execution:
          <input type="number" name="execution" value={student.execution} onChange={handleChange} />
        </label>
        <br />
        <label>
          Viva:
          <input type="number" name="viva" value={student.viva} onChange={handleChange} />
        </label>
        <br />
        <label>
          Pitch:
          <input type="number" name="pitch" value={student.pitch} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Edit;
