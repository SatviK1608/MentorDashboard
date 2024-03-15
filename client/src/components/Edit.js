import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./utils/Edit.css"
import { toast } from 'sonner';
const Edit = () => {
  axios.defaults.withCredentials = true;
  const sid = localStorage.getItem('sid');
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.post('https://mentor-dashboard-api-three.vercel.app/editMarks', { sid });
        setStudent(response.data);
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
    try {
      const result = await axios.post("https://mentor-dashboard-api-three.vercel.app/edit/submit", { student, sid });
      if (result.data.message === "Updated marks") {
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
