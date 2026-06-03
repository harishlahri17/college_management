import React, { useState } from 'react'
import AddStudent from './Student/AddStudent';
import StudentList from './Student/StudentList';
import EditStudent from './Student/EditStudent';

export default function Student() {
  const [selected, setSelected] = useState("list");
  const [editStudentId, setEditStudentId] = useState(null)

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        Student Details
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "list" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("list")}
          >
            List
          </button>
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Student
          </button>
   
        </div>
      </div>
      {selected === "list" && <StudentList onEdit={(id) =>{
        setEditStudentId(id);
        setSelected("edit");
      }}/>}
      {selected === "add" && <AddStudent />}
      {selected === "edit" && <EditStudent  studentId = {editStudentId} />}
    </div>
  )
}
