import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { BaseUrl } from '../../axiosInstance';

export default function Timetable() {
    const { token } = useAuth();
    const [timetable, setTimetable] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const res = await BaseUrl.get("/student/timetable", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTimetable(res.data.timetable);
            } catch (err) {
                console.error("Error fetching timetable:", err.response?.data || err.message);
                setTimetable(null);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchTimetable();
    }, [token]);

    if (loading) return <p className="text-center mt-10">Loading timetable...</p>;

    if (!timetable) {
        return <p className="text-center mt-10">No Timetable Available At The Moment!</p>;
    }

    return (
        <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
 
            <div className="flex justify-between items-center w-full">

                <p
                    className="flex justify-center items-center text-lg font-medium cursor-pointer hover:text-red-500 
                    hover:scale-110 ease-linear transition-all duration-200 hover:duration-200 hover:ease-linear hover:transition-all"
                >
                    Semester: {timetable.semester},{timetable.branch?.branch} Download
                    <span className="ml-2">

                    </span>
                </p>
            </div>
            <img
                className="mt-8 rounded-lg shadow-md w-[70%] mx-auto"
                src={`http://localhost:8000/media/timetable/${timetable.timetable}`}
                alt="timetable"
            />
            <p className="mt-10">No Timetable Available At The Moment!</p>

        </div>
    )
}
