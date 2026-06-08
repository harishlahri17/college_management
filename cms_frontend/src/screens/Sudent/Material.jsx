import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import { BaseUrl } from '../../axiosInstance';
import { FaDownload } from "react-icons/fa";

export default function Material() {
    const { token } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [materials, setMaterials] = useState([]);

    // Fetch subjects for logged-in student
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await BaseUrl.get("/student/subjects", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSubjects(res.data.subjects);
            } catch (err) {
                console.error("Error fetching subjects:", err.response?.data || err.message);
            }
        };

        if (token) fetchSubjects();
    }, [token]);

    // Fetch materials when a subject is selected
    useEffect(() => {
        const fetchMaterials = async () => {
            if (!selectedSubject) return;

            try {
                const res = await BaseUrl.get(`/student/material/${selectedSubject}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMaterials(res.data.materials);
            } catch (err) {
                console.error("Error fetching materials:", err.response?.data || err.message);
                setMaterials([]);
            }
        };

        fetchMaterials();
    }, [selectedSubject, token]);

    const downloadPDF = async (url, filename) => {
        const response = await fetch(url);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">

            <div className="mt-8 w-full flex justify-center items-center flex-col">
                <div className="flex justify-center items-center w-[40%]">
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700"
                    >
                        <option value="">-- Select Subject --</option>
                        {subjects.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.subject} ({sub.code})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-8 w-full">
                    {materials.length === 0 && selectedSubject && (
                        <p className="text-center">No materials available for this subject.</p>
                    )}

                    {materials.map((mat) => (
                        <div
                            key={mat._id}
                            className="border-blue-500 flex justify-between items-center border-2 w-full  shadow-sm py-4 px-6 relative mb-4"
                        >
                            <div>
                                <p className="font-medium flex justify-start items-center cursor-pointer group">
                                    <span className="group-hover:text-blue-500 ml-1">
                                        {mat.subject.subject} ({mat.subject.code})
                                    </span>
                                </p>
                                <p className="text-base font-normal mt-1">
                                    ({mat.originalName})
                                </p>
                            </div>

                            <button onClick={() =>
                                downloadPDF(
                                    mat.material,
                                    mat.originalName
                                )
                            } target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl hover:text-black">
                                <FaDownload />
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
