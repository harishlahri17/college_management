import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BaseUrl } from "../../axiosInstance";

export default function Timetable() {
  const [selected, setSelected] = useState("add");
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [timetables, setTimetables] = useState([]);

  // ✅ Fetch branches
  useEffect(() => {
    BaseUrl.get("/admin/branch-list")
      .then((res) => setBranches(res.data.list))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch timetables
  const fetchTimetables = () => {
    BaseUrl.get("/faculty/timetable-list")
      .then((res) => setTimetables(res.data.timetables))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  // ✅ Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Upload timetable
  const handleUpload = async () => {
    if (!branchId || !semester || !file) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("branch", branchId);
    formData.append("semester", semester);
    formData.append("timetable", file);

    try {
      await BaseUrl.post("/faculty/add-timetable", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Timetable uploaded");
      setBranchId("");
      setSemester("");
      setFile(null);
      setPreview(null);
      fetchTimetables();
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  // ✅ Delete timetable
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable?")) return;
    try {
      await BaseUrl.delete(`/delete-timetable/${id}`);
      fetchTimetables();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-bold">Timetable Management</h2>
        <div>
          <button
            className={`${selected === "add" && "border-b-2 border-blue-500"} px-4 py-2 mr-4`}
            onClick={() => setSelected("add")}
          >
            Add Timetable
          </button>
          <button
            className={`${selected === "view" && "border-b-2 border-blue-500"} px-4 py-2`}
            onClick={() => setSelected("view")}
          >
            View Timetables
          </button>
        </div>
      </div>

      {/* ADD TIMETABLE */}
      {selected === "add" && (
        <div className="w-full flex justify-center mt-12">
          <div className="w-1/2 flex flex-col items-center">
            <p className="mb-4 text-xl font-medium">Add Timetable</p>

            {/* Branch Select */}
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
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
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4"
            >
              <option value="">-- Select Semester --</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  {s} Semester
                </option>
              ))}
            </select>

            {/* File Upload */}
            <label
              htmlFor="upload"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
            >
              Upload Timetable
            </label>
            <input
              type="file"
              id="upload"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-60 border rounded" />
              </div>
            )}

            {/* Submit Button */}
            <button
              className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
              onClick={handleUpload}
            >
              Add Timetable
            </button>
          </div>
        </div>
      )}

      {/* VIEW TIMETABLES */}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {timetables.map((tt) => (
              <li
                key={tt._id}
                className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
              >
                <div>
                  <p className="font-medium">
                    {tt.branch?.branch} - {tt.semester} Semester
                  </p>
                  <a
                    href={`http://localhost:8000/media/timetable/${tt.timetable}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View doc
                  </a>
                  {/* <img
                    src={`http://localhost:8000/media/timetables/${tt.timetable}`}
                    alt="Timetable"
                    className="w-40 mt-2 border"
                  /> */}
                </div>
                <button
                  className="text-2xl hover:text-red-500"
                  onClick={() => handleDelete(tt._id)}
                >
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

