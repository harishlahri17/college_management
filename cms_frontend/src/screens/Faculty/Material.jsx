// import React, { useState } from 'react'
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FiUpload } from "react-icons/fi";

// export default function Timetable() {

//   const [selected, setSelected] = useState("add");
//   return (

//     <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
//       <div className="flex justify-between items-center w-full">
//         {/* <Heading title="Add Branch" /> */}
//         Add branch
//         <div className="flex justify-end items-center w-full">
//           <button
//             className={`${selected === "add" && "border-b-2 "
//               }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
//             onClick={() => setSelected("add")}
//           >
//             Add Material
//           </button>
//           <button
//             className={`${selected === "view" && "border-b-2 "
//               }border-blue-500 px-4 py-2 text-black rounded-sm`}
//             onClick={() => setSelected("view")}
//           >
//             View Materal
//           </button>
//         </div>
//       </div>
//       {selected === "add" && (
//         <div className="w-full flex justify-evenly items-center mt-12">
//           <div className="w-1/2 flex flex-col justify-center items-center">
//             <p className="mb-4 text-xl font-medium">Add Timetable</p>

//             <select
//               value=''
//               name="branch"
//               id="branch"
//               className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
//             >
//               <option defaultValue>-- Select Branch --</option>
//               <option value="cse">cse</option>
//               <option value="civil">civil</option>
//               <option value="mech">mech</option>

//             </select>
//             <select
//               value=''
//               name="semester"
//               id="semester"
//               className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
//             >
//               <option defaultValue>-- Select Semester --</option>
//               <option value="1">1st Semester</option>
//               <option value="2">2nd Semester</option>
//               <option value="3">3rd Semester</option>
//               <option value="4">4th Semester</option>
//               <option value="5">5th Semester</option>
//               <option value="6">6th Semester</option>
//               <option value="7">7th Semester</option>
//               <option value="8">8th Semester</option>
//             </select>
//                     <select
//               value=''
//               name="subject"
//               id="subject"
//               className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
//             >
//               <option defaultValue>-- Select Subject --</option>
//               <option value="cse">englist</option>
//               <option value="m3">m3</option>
//             </select>

//             <label
//               htmlFor="upload"
//               className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
//             >
//               Upload Material
//               <span className="ml-2">
//                 <FiUpload/>
//               </span>
//             </label>

//             <input
//               type="file"
//               name="upload"
//               id="upload"
//               accept="image/*"
//               hidden

//             />
//             <button
//               className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"

//             >
//               Add Material
//             </button>
//           </div>
//         </div>

//       )}
//       {selected === "view" && (
//         <div className="mt-8 w-full">
//           <ul>

//             <li

//               className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
//             >
//               <div>gvfjuyh</div>
//               <button
//                 className="text-2xl hover:text-red-500"

//               >
//                 <RiDeleteBin6Line />
//               </button>
//             </li>

//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }


import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { BaseUrl } from "../../axiosInstance";

export default function Material() {
  const [selected, setSelected] = useState("add");
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    branch: "",
    semester: "",
    subject: "",
    material: null,
  });

  // ✅ Fetch Branches
  useEffect(() => {
    BaseUrl.get("/admin/branch-list")
      .then((res) => setBranches(res.data.list))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch Subjects
  useEffect(() => {
    BaseUrl.get("/admin/subject-list")
      .then((res) => setSubjects(res.data.list))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch Materials
  const fetchMaterials = () => {
    BaseUrl.get("/faculty/materials")
      .then((res) => setMaterials(res.data.materials))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // ✅ Handle File Change
  const handleFileChange = (e) => {
    setFormData({ ...formData, material: e.target.files[0] });
  };

  // ✅ Handle Upload
  const handleUpload = async () => {
    if (!formData.branch || !formData.semester || !formData.subject || !formData.material) {
      alert("All fields are required!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("branch", formData.branch);
    uploadData.append("semester", formData.semester);
    uploadData.append("subject", formData.subject);
    uploadData.append("material", formData.material);

    try {
      await BaseUrl.post("/faculty/add-material", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Material uploaded successfully!");
      setFormData({ branch: "", semester: "", subject: "", material: null });
      fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Material
  const handleDelete = async (id) => {
    try {
      await BaseUrl.delete(`/faculty/delete-material/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      {/* Toggle Buttons */}
      <div className="flex justify-between items-center w-full">
        Material
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 border-blue-500"} px-4 py-2 text-black mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Material
          </button>
          <button
            className={`${selected === "view" && "border-b-2 border-blue-500"} px-4 py-2 text-black`}
            onClick={() => setSelected("view")}
          >
            View Material
          </button>
        </div>
      </div>

      {/* Add Material */}
      {selected === "add" && (
        <div className="w-full flex justify-evenly items-center mt-12">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <p className="mb-4 text-xl font-medium">Add Material</p>

            {/* Branch Select */}
            <select
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4"
            >
              <option value="">-- Select Branch --</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branch}
                </option>
              ))}
            </select>

            {/* Semester Select */}
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4"
            >
              <option value="">-- Select Semester --</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  {sem} Semester
                </option>
              ))}
            </select>

            {/* Subject Select */}
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4"
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.subject}
                </option>
              ))}
            </select>

            {/* File Upload */}
            <label
              htmlFor="upload"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
            >
              {formData.material ? formData.material.name : "Upload Material (PDF)"}
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
            <input type="file" id="upload" accept="application/pdf" hidden onChange={handleFileChange} />

            <button className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm" onClick={handleUpload}>
              Add Material
            </button>
          </div>
        </div>
      )}

      {/* View Materials */}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {materials.map((m) => (
              <li key={m._id} className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]">
                <div>
                  <p>
                    <strong>Branch:</strong> {m.branch?.branch} | <strong>Semester:</strong> {m.semester} |{" "}
                    <strong>Subject:</strong> {m.subject?.subject}
                  </p>
                  <a
                    href={`http://localhost:8000/media/material/${m.material}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View PDF
                  </a>
                </div>
                <button className="text-2xl hover:text-red-500" onClick={() => handleDelete(m._id)}>
                  <RiDeleteBin6Line />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

