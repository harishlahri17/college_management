import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../axiosInstance'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function StudentList({onEdit}) {

    const [studentList, setStudentList] = useState([]);

    const getStudentList = async () => {
        try {
            const { data } = await BaseUrl.get("/admin/student-list");
            setStudentList(data?.list); // backend key is list

            // console.log("adminList", data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getStudentList();
    }, []);

    const deleteFaculty = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            const { data } = await BaseUrl.delete(`/admin/delete-student/${id}`); // ✅ fixed
            if (data?.Success) {
                toast.success(data.Message);
                setStudentList(prev => prev.filter(student => student._id !== id));
            } else {
                toast.error(data?.Message || "Failed to delete student");
            }
        } catch (error) {
            console.error(error);
           toast.error("Something went wrong while deleting the student.");
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
                            Semester
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.length > 0 ? (
                        studentList.map((student, index) => (
                            <tr key={student._id} className="bg-blue-50 border-b">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <img
                                        src={student.profile} //  serve image from backend
                                        alt={student.firstName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    {student.firstName} {student.middleName} {student.lastName}
                                </td>
                                <td className="px-6 py-4">{student.gender}</td>
                                <td className="px-6 py-4">{student.email}</td>
                                <td className="px-6 py-4">{student.phoneNumber}</td>
                                <td className="px-6 py-4">{student.branch?.branch}</td>
                                <td className="px-6 py-4">{student.semester}</td>

                                <td className="px-6 py-4">
                                    <button type="button" class="text-blue-500  border border-blue-500 hover:text-white hover:bg-blue-500  
                                    font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => onEdit(student._id)} >
                                        <FaRegEdit />
                                    </button>
                                    <button type="button" class="text-blue-500  border border-blue-500 hover:text-white hover:bg-blue-500  
                                    font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => deleteFaculty(student._id)} >
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
