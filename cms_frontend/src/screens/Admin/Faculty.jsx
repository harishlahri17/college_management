import React, { useState } from 'react'
import AddFaculty from './Faculty/AddFaculty';
import FacultyList from './Faculty/FacultyList';
import EditFaculty from './Faculty/EditFaculty';


export default function Faculty() {
  const [selected, setSelected] = useState("list");
  const [editFacultyId, setEditFacultyId] = useState(null);// store which faculty to edit

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        Faculty Details
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "list" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("list")}
          >
            List
          </button>
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Faculty
          </button>
        </div>
      </div>
      {selected === "list" && <FacultyList onEdit = {(id) => {
        setEditFacultyId(id);
        setSelected("edit")
      }} /> }
      {selected === "add" && <AddFaculty />}
      {selected === "edit" && <EditFaculty facultyId={editFacultyId} /> }
    </div>
  )
}
