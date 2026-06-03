// import React, { useEffect, useState } from 'react'
// import { BaseUrl } from '../../axiosInstance';
// import { RiDeleteBin6Line } from "react-icons/ri";

// export default function Subject() {

//   const [selected, setSelected] = useState("add");
//   const [subjectList, setSubjectList] = useState([]);

//   const [formData, setFormData] = useState({
//     subject: "",
//     code: "",
//   });

//   // Handle input change
//   const handleFormChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();// revent page reload
//     try {
//       const { data } = await BaseUrl.post("/admin/add-subject", formData);
//       if (data?.Success) {
//         alert(data?.Message);

//         setFormData({
//           subject: "",
//           code: "",
//         })
//       }
//     } catch (error) {
//       console.error("Error on adding Branch:", error);
//       alert(error || "Something went wrong ");
//     }
//   }

//   const getSubjectList = async () => {
//     try {
//       const { data } = await BaseUrl.get("/admin/subject-list");
//       setSubjectList(data?.list); // backend key is list

//       // console.log("adminList", data);
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(() => {
//     getSubjectList();
//   }, []);

//   const deleteSubject = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this Subject?")) return;

//     try {
//       const { data } = await BaseUrl.delete(`/admin/delete-subject/${id}`);
//       if (data?.Success) {
//         alert(data.Message);
//       } else {
//         alert(data?.Message || "Failed to delete Subject");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong while deleting the Subject.");
//     }
//   };

//   return (
//     <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
//       <div className="flex justify-between items-center w-full">
//         Subject Details
//         <div className="flex justify-end items-center w-full">
//           <button
//             className={`${selected === "add" && "border-b-2 "
//               }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
//             onClick={() => setSelected("add")}
//           >
//             Add Subject
//           </button>
//           <button
//             className={`${selected === "view" && "border-b-2 "
//               }border-blue-500 px-4 py-2 text-black rounded-sm`}
//             onClick={() => setSelected("view")}
//           >
//             View Subject
//           </button>
//         </div>
//       </div>
//       {selected === "add" && (
//         <div className="flex flex-col justify-center items-center w-full mt-8">
//           <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full mt-8">
//             <div className="w-[40%] mb-4">
//               <label htmlFor="code" className="leading-7 text-sm">
//                 Enter Subject Code
//               </label>
//               <input
//                 type="name"
//                 id="code"
//                 value={formData.code}
//                 onChange={handleFormChange}
//                 className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               />
//             </div>
//             <div className="w-[40%]">
//               <label htmlFor="subject" className="leading-7 text-sm ">
//                 Enter Subject Name
//               </label>
//               <input
//                 type="name"
//                 id="subject"
//                 value={formData.subject}
//                 onChange={handleFormChange}
//                 className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               />
//             </div>
//             <button
//               type='submit' className="mt-6 bg-blue-500 px-6 py-3 text-white"
//             >
//               Add Subject
//             </button>
//           </form>
//         </div>
//       )}
//       {selected === "view" && (
//         <div className="mt-8 w-full">
//           <ul>
//             {subjectList &&
//               subjectList.map((item) => {
//                 return (
//                   <li
//                     key={item.code}
//                     className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
//                   >
//                     <div>
//                       {item.code} - {item.subject}
//                     </div>
//                     <button
//                       className="text-2xl hover:text-red-500"
//                     onClick={() => deleteSubject(item._id)}
//                     >
//                       <RiDeleteBin6Line />
//                     </button>
//                   </li>
//                 );
//               })}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../axiosInstance';
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-toastify';

export default function Subject() {
  const [selected, setSelected] = useState("add");
  const [subjectList, setSubjectList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  const [formData, setFormData] = useState({
    branchId: "",
    semester: "",
    subject: "",
    code: "",
  });

  // Filters
  const [filterBranch, setFilterBranch] = useState("");
  const [filterSemester, setFilterSemester] = useState("");

  // Handle input change
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await BaseUrl.post("/admin/add-subject", formData);
      if (data?.Success) {
        toast.success(data?.Message);
        setFormData({ branchId: "", semester: "", subject: "", code: "" });
        getSubjectList();
      }
    } catch (error) {
      console.error("Error on adding Subject:", error);
      toast.error(error || "Something went wrong ");
    }
  };

  const getSubjectList = async () => {
    try {
      const { data } = await BaseUrl.get("/admin/subject-list");
      setSubjectList(data?.list);
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchList = async () => {
    try {
      const { data } = await BaseUrl.get("/admin/branch-list"); // must exist in backend
      setBranchList(data?.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjectList();
    getBranchList();
  }, []);

  const deleteSubject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Subject?")) return;

    try {
      const { data } = await BaseUrl.delete(`/admin/delete-subject/${id}`);
      if (data?.Success) {
        toast.success(data.Message);
        getSubjectList();
      } else {
        toast.error(data?.Message || "Failed to delete Subject");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the Subject.");
    }
  };

  // Filter subjects
  const filteredSubjects = subjectList.filter((item) => {
    const branchMatch = filterBranch ? item.branch?._id === filterBranch : true;
    const semesterMatch = filterSemester ? String(item.semester) === filterSemester : true;
    return branchMatch && semesterMatch;
  });

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        Subject Details
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 border-blue-500"} px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Subject
          </button>
          <button
            className={`${selected === "view" && "border-b-2 border-blue-500"} px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Subject
          </button>
        </div>
      </div>

      {/* ADD SUBJECT FORM */}
      {selected === "add" && (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full mt-8">
          {/* Branch Dropdown */}
          <div className="w-[40%] mb-4">
            <label htmlFor="branchId" className="leading-7 text-sm">Select Branch</label>
            <select
              id="branchId"
              value={formData.branchId}
              onChange={handleFormChange}
              className="w-full bg-blue-50 rounded border py-2 px-3"
            >
              <option value="">-- Select Branch --</option>
              {branchList.map((branch) => (
                <option key={branch._id} value={branch._id}>{branch.branch}</option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="w-[40%] mb-4">
            <label htmlFor="semester" className="leading-7 text-sm">Select Semester</label>
            <select
              id="semester"
              value={formData.semester}
              onChange={handleFormChange}
              className="w-full bg-blue-50 rounded border py-2 px-3"
            >
              <option value="">-- Select Semester --</option>
              {[1,2,3,4,5,6,7,8].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          {/* Subject Code */}
          <div className="w-[40%] mb-4">
            <label htmlFor="code" className="leading-7 text-sm">Enter Subject Code</label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={handleFormChange}
              className="w-full bg-blue-50 rounded border py-2 px-3"
            />
          </div>

          {/* Subject Name */}
          <div className="w-[40%] mb-4">
            <label htmlFor="subject" className="leading-7 text-sm">Enter Subject Name</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleFormChange}
              className="w-full bg-blue-50 rounded border py-2 px-3"
            />
          </div>

          <button type='submit' className="mt-6 bg-blue-500 px-6 py-3 text-white">
            Add Subject
          </button>
        </form>
      )}

      {/* VIEW SUBJECTS TABLE WITH FILTER */}
      {selected === "view" && (
        <div className="mt-8 w-full">
          {/* Filter Section */}
          <div className="flex gap-6 mb-6">
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
               className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1"
            >
              <option value="">-- All Branches --</option>
              {branchList.map((branch) => (
                <option key={branch._id} value={branch._id}>{branch.branch}</option>
              ))}
            </select>

            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
             className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1"
            >
              <option value="">-- All Semesters --</option>
              {[1,2,3,4,5,6,7,8].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <table className="w-[80%] border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Branch</th>
                <th className="p-2 border border-gray-300">Semester</th>
                <th className="p-2 border border-gray-300">Code</th>
                <th className="p-2 border border-gray-300">Subject</th>
                <th className="p-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="p-2 border border-gray-300">{item.branch?.branch}</td>
                    <td className="p-2 border border-gray-300">{item.semester}</td>
                    <td className="p-2 border border-gray-300">{item.code}</td>
                    <td className="p-2 border border-gray-300">{item.subject}</td>
                    <td className="p-2 border border-gray-300">
                      <button
                        className="text-2xl hover:text-red-500"
                        onClick={() => deleteSubject(item._id)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-gray-500 text-center">
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

