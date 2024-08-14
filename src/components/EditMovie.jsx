import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMovie, setEditMovie] = useState({
    title: "",
    actorname: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/movie/${id}`);
      setEditMovie(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMovie((preData) => ({ ...preData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/movie/${id}`, editMovie);
      alert("Movie Update Successfully");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <form
        className="d-flex justify-content-center gap-5"
        onSubmit={handleFormSubmit}
      >
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={editMovie.title}
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Actor Name"
            name="actorname"
            onChange={handleChange}
            value={editMovie.actorname}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-outline-success">
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
