import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function useQuary(){
  const{search}=useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search]);
}


function Department() {
  const queryParam=useQuary();
const [departmentId,setDepartmentId]=useState(null);
const [departments,setDeapertments]=useState(null);
const [form,setForm]=useState({name:"",image:null,universityId:queryParam.get("id")});
const [formError,setFormError]=useState({name:"",image:""});
function renderDep(){
  return departments?.map((item)=>{
    return(
      <tr>
        <td><img src={"http://localhost:9855/"+item.image} width={150} height={150}></img></td>
        <td>{item.name}</td>
        <td></td>
        <td>
          <button onClick={()=>{
          }} className="btn btn-danger">Delete</button>
        </td>
        <td>
          <button onClick={()=>{
            setDepartmentId(item._id);
            setForm({...form,name:item.name,image:item.image})
          }} className="btn btn-info">Edit</button>
        </td>
      </tr>
    )
  })
}
useEffect(()=>{
  getAll()
},[]
)
function getAll(){
  axios.get("http://localhost:9855/department?suraj="+queryParam.get("id")).then((d)=>{
    setDeapertments(d.data.depData);
  }).catch((e)=>{
    console.log("Something went wrong");
  })
}
  return (
    <div>
      <Header />
      <div className="mx-auto">
      <div class="card text-center">
        <div class="card-header">
          {departmentId ? "Edit Department" : "New Department"}
        </div>
        <div class="card-body">
        <div className="row">
          <label className="col-sm-4">University Name</label>
          <div className="col-sm-8">
            <input disabled type="text" className="form-control" value={queryParam.get("name")} name="name" />
          </div>
          </div>
          <div className="row">
          <label className="col-sm-4">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" name="name" />
          </div>
          </div>
          <div className="row">
          <label className="col-sm-4">Image</label>
          <div className="col-sm-8">
            <input type="file" className="form-control" name="name" />
          </div>
          </div>
        </div>
        <div class="card-footer text-muted">
          {departmentId ? (
            <button className="btn btn -info">Update</button>
          ) : (
            <button className="btn btn-info">Save</button>
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
          <tbody>{renderDep()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
