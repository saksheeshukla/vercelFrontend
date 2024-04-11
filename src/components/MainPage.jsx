import React, { useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    project: "", // Corrected field name to match MongoDB schema
    url: "",
    build: "choose"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/submit-form', formData);
      setMessage("Successfully submitted.");
    } catch (error) {
      setMessage("Error: Project name must be unique.");
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/submit-form', formData);
        setMessage("Successfully submitted.");
        console.log(response.data); 
    } catch (error) {
        setMessage("Error: Project name must be unique.");
    }
};

  return (
    <div id="main">
      <h1>VERCEL</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="input_box">
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="project" className="input_box">
        </label>
        <input
          type="text" 
          placeholder="Enter your Project name"
          name="project"
          value={formData.project}
          onChange={handleChange}
        />

        <label htmlFor="url" className="input_box">
        </label>
        <input
          type="text"
          placeholder="Enter your URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />

        <label htmlFor="build" className="input_box">
        </label>
        <select
          id="select"
          name="build"
          value={formData.build}
          onChange={handleChange}
        >
          <option value="choose">Select Directory</option>
          <option value="src">src</option>
          <option value="dist">dist</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MainPage;
