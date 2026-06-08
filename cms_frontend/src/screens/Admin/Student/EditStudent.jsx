import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../axiosInstance';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";

export default function EditStudent({ studentId }) {

    const [formData, setFormData] = useState({
        enrollmentNo: "",
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        branch: "",
        semester: "",
        profile: null,//file
    });

    const [preview, setPreview] = useState(null);// review image 

    // Fetch selected student data
    useEffect(() => {
        if (!studentId) return;

        const fetchStudent = async () => {
            try {
                const { data } = await BaseUrl.get(`/admin/single-student/${studentId}`);
                console.log(data);
                if (data?.Success) {
                    const student = data?.student;
                    setFormData({
                        enrollmentNo: student.enrollmentNo || "",
                        firstName: student.firstName || "",
                        middleName: student.middleName || "",
                        lastName: student.lastName || "",
                        phoneNumber: student.phoneNumber || "",
                        email: student.email || "",
                        gender: student.gender || "",
                        branch: student.branch || "",
                        semester: student.semester || "",
                        profile: null, // reset file input
                    });
                    setPreview(student.profile);
                }
            } catch (error) {
                console.error("Error fetching faculty:", error);
            }
        };

        fetchStudent();
    }, [studentId]);

    // fetch branch list 
    const [branchList, setBranchList] = useState([]);
    const getBranchList = async () => {
        try {
            const { data } = await BaseUrl.get("/admin/branch-list"); // must exist in backend
            setBranchList(data?.list);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getBranchList();
    }, []);

    // Handle text/select input
    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile: file });
        setPreview(URL.createObjectURL(file));
    };

    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = new FormData();
            payload.append("firstName", formData.firstName);
            payload.append("middleName", formData.middleName);
            payload.append("lastName", formData.lastName);
            payload.append("enrollmentNo", formData.enrollmentNo);
            payload.append("email", formData.email);
            payload.append("phoneNumber", formData.phoneNumber);
            payload.append("gender", formData.gender);
            payload.append("branch", formData.branch);
            payload.append("semester", formData.semester);
            if (formData.profile) {
                payload.append("profile", formData.profile); // only if new file uploaded
            }

            const { data } = await BaseUrl.put(`/admin/update-Student/${studentId}`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data?.Success) {
                toast.success("Faculty updated successfully");
            } else {
                toast.error(data?.Message || "Update failed");
            }
        } catch (error) {
            console.error("Error updating admin:", error);
            toast.error("Something went wrong");
        }
    };

    const deleteProfileImage = async () => {
        try {
            const { data } = await BaseUrl.delete(`/admin/delete-student-image/${studentId}`);

            if (data.Success) {
                toast.success(data.Message);

                setPreview(null);

                setFormData({
                    ...formData,
                    profile: null,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.Message ||
                "Failed to delete image"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}

            className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
        >
            <div className="w-[40%]">
                <label htmlFor="firstName" className="leading-7 text-sm ">
                    Enter First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[40%]">
                <label htmlFor="middleName" className="leading-7 text-sm ">
                    Enter Middle Name
                </label>
                <input
                    type="text"
                    id="middleName"
                    value={formData.middleName}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[40%]">
                <label htmlFor="lastName" className="leading-7 text-sm ">
                    Enter Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[40%]">
                <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
                    Enter Enrollment No
                </label>
                <input
                    type="number"
                    id="enrollmentNo"
                    value={formData.enrollmentNo}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[40%]">
                <label htmlFor="email" className="leading-7 text-sm ">
                    Enter Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[40%]">
                <label htmlFor="phoneNumber" className="leading-7 text-sm ">
                    Enter Phone Number
                </label>
                <input
                    type="number"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[40%]">
                <label htmlFor="semester" className="leading-7 text-sm ">
                    Select Semester
                </label>
                <select
                    id="semester"
                    className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                    value={formData.semester}
                    onChange={handleFormChange}
                >
                    <option defaultValue>-- Select --</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                </select>
            </div>
            <div className="w-[40%]">
                <label htmlFor="branch" className="leading-7 text-sm ">
                    Select Branch
                </label>
                <select
                    id="branch"
                    className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                    value={formData.branch}
                    onChange={handleFormChange}
                >
                    <option value="">-- Select Branch --</option>
                    {branchList.map((branch) => (
                        <option key={branch._id} value={branch._id}>{branch.branch}</option>
                    ))}

                </select>
            </div>
            <div className="w-[40%]">
                <label htmlFor="gender" className="leading-7 text-sm ">
                    Select Gender
                </label>
                <select
                    id="gender"
                    className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                    value={formData.gender}
                    onChange={handleFormChange}
                >
                    <option defaultValue>-- Select --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="w-[40%]">
                <label htmlFor="file" className="leading-7 text-sm ">
                    Select Profile
                </label>
                <label
                    htmlFor="file"
                    className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
                >
                    Upload new profile
                    <span className="ml-2">
                        <FiUpload/>
                    </span>
                </label>
                <input
                    hidden
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}

                />
            </div>

            {preview && (
                <div className="w-full flex justify-center items-center">
                    <div className="relative">
                        <img src={preview} alt="admin" className="h-36" />
                        <button
                            type="button"
                            onClick={deleteProfileImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white h-8 w-8 flex items-center justify-center"
                        >
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
            >
                Update Student
            </button>
        </form>
    )
}
