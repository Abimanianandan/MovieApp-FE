import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const SearchBar = ({movie,setMovie, handleDelete}) => {
    const[name,setName] = useState("")

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async() =>{
        const response = await axios.get("https://movieapp-be.onrender.com/api/movie/getAllMovies")
        setMovie(response.data.message)
    }

  return (
    <div className="container mt-5 ">
        <nav className="navbar bg-body-tertiary">
  <div className="container-fluid ">
    <form className="d-flex form-control bg-info" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" name='title' value={name} onChange={e=>setName(e.target.value)}/>
    </form>
  </div>
</nav>
<div className= "d-flex flex-wrap justify-content-center gap-2 mt-2 bg-dark " >
{ movie.map((item,index)=>{
    return (
      <div key={index}>
          {item.title.toLowerCase().includes(name.toLowerCase()) ? (
            <div className="col ms-3 mt-5">
              <div className="card" style={{width: "18rem"}}>
                <img src={item.image} className="card-img-top" alt="movie-image" style={{height:'220px'}}/>
                <div className="card-body">
                    <h5 className="fw-bolder">Movie : {item.title}</h5>
                  <p className="fw-bolder">Actor : {item.actorname} </p>
                 
                  <div className="d-flex gap-3">
                  <Link  to={`/${item._id}`}><MdEditSquare className='fs-3'/></Link>
                  <RiDeleteBin6Line className='fs-3 text-danger' onClick={()=>handleDelete(item._id)}/>
                  </div>
                 
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
      </div>
    );
})}
</div>
</div>


  )
}

export default SearchBar