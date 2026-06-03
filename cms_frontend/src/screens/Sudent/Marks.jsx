// import React from 'react'

// export default function Marks() {
//     return (
//         <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
//             <div className="mt-14 w-full flex gap-20">

//                 <div className="w-1/2 shadow-md p-4">
//                     <p className="border-b-2 border-red-500 text-2xl font-semibold pb-2">
//                         Internal Marks (Out of 40)
//                     </p>
//                     <div className="mt-5">


//                         <div
//                             className="flex justify-between items-center w-full text-lg mt-2"
//                         >
//                             <p className="w-full"></p>
//                             <span></span>
//                         </div>

//                     </div>
//                 </div>

//                 <div className="w-1/2 shadow-md p-4">
//                     <p className="border-b-2 border-red-500 text-2xl font-semibold pb-2">
//                         External Marks (Out of 60)
//                     </p>
//                     <div className="mt-5">


//                         <div

//                             className="flex justify-between items-center w-full text-lg mt-2"
//                         >
//                             <p className="w-full"></p>
//                             <span></span>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../axiosInstance";
import { useAuth } from "../../store/auth";

export default function Marks() {
  const { token } = useAuth();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await BaseUrl.get("/student/marks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMarks(res.data.marks);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMarks();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Loading marks...</p>;

  if (marks.length === 0)
    return <p className="text-center mt-10">No marks available.</p>;

  return (
    <div className="w-[85%] mx-auto mt-10 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold mb-4">Your Marks</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2">Subject</th>
            <th className="border p-2">Internal (40)</th>
            <th className="border p-2">External (60)</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m) => (
            <tr key={m._id} className="bg-blue-50">
              <td className="border p-2">{m.subject.subject} ({m.subject.code})</td>
              <td className="border p-2">{m.internalMarks ?? "-"}</td>
              <td className="border p-2">{m.externalMarks ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

