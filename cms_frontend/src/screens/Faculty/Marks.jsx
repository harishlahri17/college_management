import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../axiosInstance"; // ✅ use your axios instance

export default function Marks() {

  const [branches, setBranches] = useState([]);
  const [semester, setSemester] = useState("");
  const [branchId, setBranchId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [examType, setExamType] = useState("");
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});

  // Fetch branch list on mount
  useEffect(() => {
    BaseUrl.get("/admin/branch-list")
      .then((res) => setBranches(res.data.list))
      .catch((err) => console.error(err));
  }, []);

  //  Fetch subjects & students whenever branch or semester changes
  useEffect(() => {
    if (branchId && semester) {
      // Fetch subjects
      BaseUrl.get(`/faculty/subjects?branchId=${branchId}&semester=${semester}`)
        .then((res) => setSubjects(res.data.subjects || []))
        .catch((err) => console.error(err));

      // Fetch students
      BaseUrl.get(`/faculty/students?branchId=${branchId}&semester=${semester}`)
        .then((res) => setStudents(res.data.students || []))
        .catch((err) => console.error(err));
    } else {
      setSubjects([]);
      setStudents([]);
    }
  }, [branchId, semester]);

  //  Handle marks input
  const handleMarksChange = (studentId, value) => {
    setMarksData((prev) => ({ ...prev, [studentId]: value }));
  };

  //  Upload marks for selected subject & exam type
  const uploadMarks = async () => {
    if (!subjectId || !examType) {
      alert(" Please select subject & exam type");
      return;
    }

    try {
      for (let student of students) {
        if (marksData[student._id]) {
          await BaseUrl.post("/faculty/upload-marks", {
            studentId: student._id,
            branchId,
            semester,
            subjectId,
            examType,
            marks: marksData[student._id],
          });
        }
      }
      alert("Marks uploaded successfully!");
      setMarksData({});
    } catch (error) {
      console.error(error);
      alert(" Error uploading marks");
    }
  };

  return (
    <div className="w-[95%] md:w-[85%] mx-auto flex flex-col my-10">
      {/* Header */}
      <div className="relative flex justify-between items-center w-full">
        Faculty Details
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Close
        </button>
      </div>

      {/* Filters */}
      <div className="mt-10 w-full flex flex-col md:flex-row justify-evenly items-center gap-6">
        {/* Branch */}
        <div className="w-full md:w-1/4">
          <label htmlFor="branch" className="leading-7 text-base">
            Select Branch
          </label>
          <select
            id="branch"
            onChange={(e) => setBranchId(e.target.value)}
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
            value={branchId}
          >
            <option value="">-- Select Branch --</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.branch}
              </option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div className="w-full md:w-1/4">
          <label htmlFor="semester" className="leading-7 text-base">
            Select Semester
          </label>
          <select
            id="semester"
            onChange={(e) => setSemester(e.target.value)}
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
            value={semester}
          >
            <option value="">-- Select Semester --</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                {s} Semester
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="w-full md:w-1/4">
          <label htmlFor="subject" className="leading-7 text-base">
            Select Subject
          </label>
          <select
            id="subject"
            onChange={(e) => setSubjectId(e.target.value)}
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
            value={subjectId}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.subject} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type */}
        <div className="w-full md:w-1/4">
          <label htmlFor="examType" className="leading-7 text-base">
            Select Exam Type
          </label>
          <select
            id="examType"
            onChange={(e) => setExamType(e.target.value)}
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
            value={examType}
          >
            <option value="">-- Select Exam Type --</option>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </div>
      </div>
      {/* Student List + Marks Input */}
      {students.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Students List</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2">Enrollment No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu._id} className="bg-blue-50">
                  <td className="border p-2">{stu.enrollmentNo}</td>
                  <td className="border p-2">
                    {stu.firstName} {stu.lastName}
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="border p-1 w-24"
                      value={marksData[stu._id] || ""}
                      onChange={(e) =>
                        handleMarksChange(stu._id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button
            onClick={uploadMarks}
             className="bg-blue-500 px-6 py-3 mt-8 self-center rounded text-white">
            Upload Marks
          </button> */}
        </div>
      )}
      
      <button
        onClick={uploadMarks}
        className="bg-blue-500 px-6 py-3 mt-8 self-center rounded text-white">
        Upload Marks
      </button>
    </div>
  );
}
