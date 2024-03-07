import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function University() {
  const [form, setFrom] = useState({ name: "", image:"" });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [universityId, setUniversityId] = useState(null);
  const [universities, setUniversities] = useState(null);
  const navigate = useNavigate();
  function changeHandler(e) {
    setFrom({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }
  function saveUniversity() {
    try {
      console.log("Hello");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios
        .post("http://localhost:9855/university", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getAll();
          resetForm();
        });
    } catch (e) {
      console.log("failed to submit form");
    }
  }
  function updateUniversities() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("_id", universityId);
      axios
        .put("http://localhost:9855/university", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getAll();
          resetForm();
        });
    } catch (e) {
      console.log("failed to submit form");
    }
  }
  function onUniversitySubmit() {
    let errors = false;
    let error = { name: "", image: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      console.log("Please enter a name");
      error = { ...error, name: "Uiversity Name Empty" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Image Empty" };
    }
    if (errors) {
      setFormError(error);
      console.log("suraj Parihar");
    } else {
      setFormError(error);
      {
        universityId ? updateUniversities() : saveUniversity();
      }
    }
  }

  function resetForm() {
    setFrom({ name: "", image: null });
  }
  function getAll() {
    axios
      .get("http://localhost:9855/university")
      .then((d) => {
        setUniversities(d.data.univData);
        console.log(d.data.univData);
      })
      .catch((e) => {
        console.log("Something Went Wrong wit get API");
      });
  }
  function renderUniv() {
    console.log("renderUniv");
    return universities?.map((item) => {
      return(
      <tr>
        <td>
          <img
            src={"http://localhost:9855/" + item.image}
            height="150"
            width="150"
          ></img>
        </td>
        <td>{item.name}</td>
        <td>
          <button
            onClick={() => {
              navigate(
                ROUTES.departmentAdmin.name +
                  "?id=" +
                  item._id +
                  "&name=" +
                  item.name
              );
            }}
            className="btn btn-success"
          >
            Add Department
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              setUniversityId(item._id);
              setFrom({ ...form, name: item.name, image: item.image });
            }}
            className="btn btn-info"
          >
            Edit
          </button>
        </td>
        <td>
          <button onClick={()=>{
            deleteUniversity(item._id);
          }} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )});
  }
  useEffect(() => {
    getAll();
    console.log("Hello World");
  }, []);
  function deleteUniversity(id){
    let ans=window.confirm("Are you sure you want to delete");
    if (!ans) return;
    try {
      axios.delete("http://localhost:9855/university",{data:{_id:id}}).then((d)=>{
        alert(d.data.message)
        getAll();
      }).catch((e)=>{
        console.log("Error With Delete API");
      })
    } catch (e) {
      console.log("Error With Delete API");
    }
  }
  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header">
            {universityId ? "Edit University" : "New University"}
          </div>
          <div class="card-body">
            <div className="row">
              <label class="text-primary col-lg-3">Name</label>
              <div className="col-lg-9">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={form.name}
                  placeholder="Enter Name"
                  onChange={changeHandler}
                />
                <div>
                  <p className="text-danger">{formError.name}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <label class="text-primary col-lg-3">Image</label>
              <div className="col-lg-9">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Select image"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setFrom({ ...form, image: file });
                  }}
                />
                <div>
                  <p className="text-danger">{formError.image}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            {universityId ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  onUniversitySubmit();
                }}
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => {
                  onUniversitySubmit();
                  console.log("suraj");
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border m-2 p-2">
        <table className="table table-border table-stripped table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Add Department</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderUniv()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default University;
