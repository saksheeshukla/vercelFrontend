import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "../assets/logo.png";
const MainPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    url: "",
    build: "choose"
  });
  const[borderColor, setBorderColor] = useState("");
  const [message, setMessage] = useState("");
  const [projectAvailability, setProjectAvailability] = useState(null);
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  useEffect(() => {
    const checkProjectAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/check-project?name=${formData.project}`);
        setProjectAvailability(response.data.available);
      } catch (error) {
        console.error("Error checking project availability:", error);
      }
    };

    checkProjectAvailability();
  }, [formData.project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    checkProjectAvailability(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/submit-form', formData);
      setMessage("Successfully submitted.");
      setRedirect(true); // Set redirect to true after successful submission
      console.log(response.data); 
    } catch (error) {
      setMessage("Error: Project name must be unique.");
    }
  };

  // Redirect to the project status page if redirect state is true
  if (redirect) {
    return <Redirect to="/project-status" />;
  }

  return (

    <div>
      
      <img src={logo} alt="Vercel Logo" i className="logo" />
      <div id="main">      
      <h1>Login To Vercel</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="input_box">
          {/* Label for name input */}
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="ack">
          {/* Display project name availability message */}
          {formData.project !== "" && projectAvailability !== null && (
            <p style={{ color: projectAvailability ? "green" : "red" }}>
              {projectAvailability ? "Project name is available" : "Project name is not available"}
            </p>
            
          )}
        </div>
        
        <label htmlFor="project" className="input_box">
          {/* Label for project input */}
        </label>
        <input
          type="text" 
          placeholder="Enter your Project name"
          name="project"
          value={formData.project}
          onChange={handleChange}
          className={formData.project !== "" && projectAvailability !== null ? (projectAvailability ? "green-border" : "red-border") : ""}
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
    </div>
  );
};

export default MainPage;
