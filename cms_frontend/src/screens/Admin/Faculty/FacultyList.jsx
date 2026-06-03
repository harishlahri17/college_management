import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../axiosInstance'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function FacultyList({ onEdit }) {
    const [facultyList, setfacultyList] = useState([]);
    const getFacultyList = async () => {
        try {
            const { data } = await BaseUrl.get("/admin/faculty-list");
            setfacultyList(data?.list); // backend key is list

            console.log("adminList", data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getFacultyList();
    }, []);


    const deleteFaculty = async (id) => {
        if (!window.confirm("Are you sure you want to delete this faculty?")) return;

        try {
            const { data } = await BaseUrl.delete(`/admin/delete-faculty/${id}`); //  fixed
            if (data?.Success) {
                toast.success(data.Message);
                setfacultyList(prev => prev.filter(faculty => faculty._id !== id));
            } else {
                toast.error(data?.Message || "Failed to delete Faculty");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting the Faculty.");
        }
    };

    return (


        <div class=" w-full mt-10 relative overflow-x-auto">
            <table class=" w-full text-sm text-left rtl:text-right ">
                <thead class="text-xs bg-blue-100 uppercase ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Profile
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Number
                        </th>
                        <th scope="col" class="px-6 py-3">
                           Branch
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Post
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Experiace
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {facultyList.length > 0 ? (
                        facultyList.map((faculty, index) => (
                            <tr key={faculty._id} className="bg-blue-50 border-b">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <img
                                        src={`http://localhost:8000/media/faculty/${faculty.profile}`} //  serve image from backend
                                        alt={faculty.firstName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    {faculty.firstName} {faculty.middleName} {faculty.lastName}
                                </td>
                                <td className="px-6 py-4">{faculty.gender}</td>
                                <td className="px-6 py-4">{faculty.email}</td>
                                <td className="px-6 py-4">{faculty.phoneNumber}</td>
                                <td className="px-6 py-4">{faculty.branch?.branch}</td>
                                <td className="px-6 py-4">{faculty.post}</td>
                                <td className="px-6 py-4">{faculty.experience}</td>

                                <td className="px-6 py-4">
                                    <button type="button" class="text-blue-500  border border-blue-500 hover:text-white hover:bg-blue-500  
                    font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => onEdit(faculty._id)} >
                                        <FaRegEdit />
                                    </button>
                                    <button type="button" class="text-blue-500  border border-blue-500 hover:text-white hover:bg-blue-500  
                    font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => deleteFaculty(faculty._id)} >
                                        <RiDeleteBin6Line />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-6">
                                No Admin Found
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>

    )
}
