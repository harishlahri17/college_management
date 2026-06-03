import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../axiosInstance';
import { toast } from 'react-toastify';

export default function EditFaculty({ facultyId }) {

    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        branch: "",
        experience: "",
        post: "",
        profile: null,//file
    });

    const [preview, setPreview] = useState(null);// review image 

    // Fetch selected faculty data
    useEffect(() => {
        if (!facultyId) return;

        const fetchFaculty = async () => {
            try {
                const { data } = await BaseUrl.get(`/admin/single-faculty/${facultyId}`);
                console.log(data);
                if (data?.Success) {
                    const faculty = data?.faculty;
                    setFormData({
                        employeeId: faculty.employeeId || "",
                        firstName: faculty.firstName || "",
                        middleName: faculty.middleName || "",
                        lastName: faculty.lastName || "",
                        phoneNumber: faculty.phoneNumber || "",
                        email: faculty.email || "",
                        gender: faculty.gender || "",
                        branch: faculty.branch || "",
                        experience: faculty.experience || "",
                        post: faculty.post || "",
                        profile: null, // reset file input
                    });
                    setPreview(`http://localhost:8000/media/faculty/${faculty.profile}`);
                }
            } catch (error) {
                console.error("Error fetching faculty:", error);
            }
        };

        fetchFaculty();
    }, [facultyId]);

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

    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = new FormData();
            payload.append("firstName", formData.firstName);
            payload.append("middleName", formData.middleName);
            payload.append("lastName", formData.lastName);
            payload.append("employeeId", formData.employeeId);
            payload.append("email", formData.email);
            payload.append("phoneNumber", formData.phoneNumber);
            payload.append("gender", formData.gender);
            payload.append("branch", formData.branch);
            payload.append("experience", formData.experience);
            payload.append("post", formData.post);
            if (formData.profile) {
                payload.append("profile", formData.profile); // only if new file uploaded
            }

            const { data } = await BaseUrl.put(`/admin/update-faculty/${facultyId}`, payload, {
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
                <label htmlFor="employeeId" className="leading-7 text-sm ">
                    Enter Employee Id
                </label>
                <input
                    type="number"
                    id="employeeId"
                    value={formData.employeeId}
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
                <label htmlFor="branch" className="leading-7 text-sm ">
                    Select Department
                </label>
                <select
                    id="branch"
                    className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                    value={formData.branch}
                    onChange={handleFormChange}
                >
                    {branchList.map((branch) => (
                        <option key={branch._id} value={branch._id}>{branch.branch}</option>
                    ))}
                </select>
            </div>
            <div className="w-[40%]">
                <label htmlFor="post" className="leading-7 text-sm ">
                    Enter POST
                </label>
                <input
                    type="text"
                    id="post"
                    value={formData.post}
                    onChange={handleFormChange}
                    className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="w-[95%] flex justify-evenly items-center">
                <div className="w-[25%]">
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
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="w-[25%]">
                    <label htmlFor="experience" className="leading-7 text-sm ">
                        Enter Experience
                    </label>
                    <input
                        type="number"
                        id="experience"
                        value={formData.experience}
                        onChange={handleFormChange}
                        className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="w-[25%]">
                    <label htmlFor="file" className="leading-7 text-sm ">
                        Select Profile
                    </label>
                    <label
                        htmlFor="file"
                        className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
                    >
                        Upload
                        <span className="ml-2">
                            file upload
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
            </div>

            {preview && (
                <div className="w-full flex justify-center items-center">
                    <img src={preview} alt="Faculty" className="h-36" />
                </div>
            )}

            <button
                type="submit"
                className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white"
            >
                Update Faculty
            </button>
        </form>
    )
}
