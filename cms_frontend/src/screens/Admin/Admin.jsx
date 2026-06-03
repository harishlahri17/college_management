import React, { useState } from 'react'
import AddAdmin from './Admin/AddAdmin';
import AdminList from './Admin/AdminList';
import EditAdmin from './Admin/EditAdmin';

export default function Admin() {
  const [selected, setSelected] = useState("list");
  const [editAdminId, setEditAdminId] = useState(null); // store which admin to edit
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        Admin Details
        <div className="flex justify-end items-center w-full">
           <button
            className={`${
              selected === "list" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("list")}
          >
            List
          </button>
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Admin
          </button>
          {/* <button
            className={`${
              selected === "edit" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("edit")}
          >
            Edit Admin
          </button> */}
        </div>
      </div>
      {/* {selected === "list" && <AdminList />}
      {selected === "add" && <AddAdmin />} */}
      {/* {selected === "edit" && <EditAdmin />} */}

      {selected === "list" && (
        <AdminList onEdit={(id) => {   // 🔥 pass edit handler
          setEditAdminId(id);
          setSelected("edit");
        }} />
      )}
      {selected === "add" && <AddAdmin />}
      {selected === "edit" && <EditAdmin adminId={editAdminId} />}
    </div>
  )
}
