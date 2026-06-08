// import React, { useState } from 'react';
// import { FiSearch } from "react-icons/fi";
// import { BaseUrl } from '../../axiosInstance';

// export default function StudentInfo() {
//   const [enrollmentNo, setEnrollmentNo] = useState("");
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setError("");
//     setStudent(null);

//     if (!enrollmentNo.trim()) {
//       setError("Please enter an enrollment number");
//       return;
//     }

//     try {
//       // ✅ Hit the Faculty route, because you placed API in FacultyDetails.js
//       const { data } = await BaseUrl.get(`/faculty/student-info/${enrollmentNo}`);

//       if (data?.Success) {
//         setStudent(data.Data);
//       } else {
//         setError(data?.Message || "Student not found");
//       }
//     } catch (err) {
//       console.error("Error fetching student:", err);
//       setError("Something went wrong while fetching student");
//     }
//   };

//   const handleClear = () => {
//     setStudent(null);       // clear student data
//     setEnrollmentNo("");    // clear input field too (optional)
//   };

//   return (
//     <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
//       <div className="flex justify-between items-center w-full">
//         Student Details

//         <div className="flex justify-end items-center w-full">
//           {student && (
//             <button
//               onClick={handleClear}
//               className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border
//                border-blue-500 hover:border-transparent rounded"
//             >
//               Clear Data
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="my-6 mx-auto w-full">
//         {/* Search Form */}
//         <form
//           onSubmit={handleSearch}
//           className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto"
//         >
//           <input
//             type="text"
//             className="px-6 py-3 w-full outline-none"
//             placeholder="Enrollment No."
//             value={enrollmentNo}
//             onChange={(e) => setEnrollmentNo(e.target.value)}
//           />
//           <button className="px-4 text-2xl hover:text-blue-500" type="submit">
//             <FiSearch />
//           </button>
//         </form>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//         {/* Student Details */}
//         {student && (
//           <div className="mx-auto w-full bg-blue-50 mt-10 flex justify-between items-center p-10 rounded-md shadow-md">
//             <div>
//               <p className="text-2xl font-semibold">
//                 {student.firstName} {student.middleName} {student.lastName}
//               </p>
//               <div className="mt-3">
//                 <p className="text-lg font-normal mb-2">
//                   Enrollment No: {student.enrollmentNo}
//                 </p>
//                 <p className="text-lg font-normal mb-2">
//                   Phone Number: +91 {student.phoneNumber}
//                 </p>
//                 <p className="text-lg font-normal mb-2">
//                   Email Address: {student.email}
//                 </p>
//                 <p className="text-lg font-normal mb-2">
//                   Branch: {student.branch}
//                 </p>
//                 <p className="text-lg font-normal mb-2">
//                   Semester: {student.semester}
//                 </p>
//               </div>
//             </div>
//             <img
//               src={`http://localhost:8000/media/student/${student.profile}`}
//               alt="student profile"
//               className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../axiosInstance";

export default function StudentInfo() {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enrollmentNo.trim()) {
      setStudent(null);
      setError("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const { data } = await BaseUrl.get(`/faculty/student-info/${enrollmentNo}`);
        if (data?.Success) {
          setStudent(data.Data);
          setError("");
        } else {
          setStudent(null);
          setError(data?.Message || "Student not found");
        }
      } catch (err) {
        console.error("Error fetching student:", err);
        setStudent(null);
        setError("Something went wrong while fetching student");
      }
    }, 500); // debounce 500ms

    // Cleanup function to clear the timeout on each render
    return () => clearTimeout(timeout);
  }, [enrollmentNo]); // Only dependency is enrollmentNo

  const handleClear = () => {
    setStudent(null);
    setEnrollmentNo("");
    setError("");
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        Student Details
        <div className="flex justify-end items-center w-full">
          {student && (
            <button
              onClick={handleClear}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Clear Data
            </button>
          )}
        </div>
      </div>

      <div className="my-6 mx-auto w-full">
        <div className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto">
          <input
            type="text"
            className="px-6 py-3 w-full outline-none"
            placeholder="Enrollment No."
            value={enrollmentNo}
            onChange={(e) => setEnrollmentNo(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {student && (
          <div className="mx-auto w-full bg-blue-50 mt-10 flex justify-between items-center p-10 rounded-md shadow-md">
            <div>
              <p className="text-2xl font-semibold">
                {student.firstName} {student.middleName} {student.lastName}
              </p>
              <div className="mt-3">
                <p className="text-lg font-normal mb-2">Enrollment No: {student.enrollmentNo}</p>
                <p className="text-lg font-normal mb-2">Phone Number: +91 {student.phoneNumber}</p>
                <p className="text-lg font-normal mb-2">Email Address: {student.email}</p>
                <p className="text-lg font-normal mb-2">Branch: {student.branch?.branch}</p>
                <p className="text-lg font-normal mb-2">Semester: {student.semester}</p>
              </div>
            </div>
            <img
              src={student.profile}
              alt="student profile"
              className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
