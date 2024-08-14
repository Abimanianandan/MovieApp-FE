import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const DisplayMovie = () => {
  const [movie, setMovie] = useState([]);
  const [deleteMovie, setDeleteMovie] = useState([]);
  const [error, setError] = useState("");
  const [newMovie, setNewMovie] = useState({
    title: "",
    actorname: ""
  });

  useEffect(() => {
    fetchData();
  }, [deleteMovie]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://movieapp-be.onrender.com/api/movie/getAllMovies"
      );
      setMovie(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://movieapp-be.onrender.com/api/movie/${id}`);
      alert("Movie Deleted SuccessFully");
      setDeleteMovie((preData) => preData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((preData) => ({ ...preData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://movieapp-be.onrender.com/api/movie/create",
        newMovie
      );

      setMovie(response.data.message);
      alert("Movie Created Successfully");
      setNewMovie({ title: "", actorname: "" });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }

      console.log(error.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row mt-5 g-4 ">
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
              value={newMovie.title}
              onChange={handleChange}
              required
            />
           <span className="text-danger mt-3">{error}</span> 
          </div>

          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Actor Name"
              name="actorname"
              value={newMovie.actorname}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="col-auto">
            <button type="submit" className="btn btn-outline-success">
              Add Movie
            </button>
          </div>
        </form>
      </div>
      <hr className="mt-5" />
       <SearchBar movie={movie} setMovie={setMovie}  handleDelete={handleDelete}/>
    </div>
  );
};

export default DisplayMovie;
