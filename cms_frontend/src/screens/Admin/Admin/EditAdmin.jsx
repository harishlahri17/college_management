import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../../axiosInstance";
import { toast } from "react-toastify";

export default function EditAdmin({ adminId }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    profile: null, // file
  });

  const [preview, setPreview] = useState(null);// review image 


  // Fetch selected admin data
  useEffect(() => {
    if (!adminId) return;

    const fetchAdmin = async () => {
      try {
        const { data } = await BaseUrl.get(`/admin/admin/${adminId}`);
        if (data?.Success) {
          const admin = data?.admin;
          setFormData({
            employeeId: admin.employeeId || "",
            firstName: admin.firstName || "",
            middleName: admin.middleName || "",
            lastName: admin.lastName || "",
            phoneNumber: admin.phoneNumber || "",
            email: admin.email || "",
            gender: admin.gender || "",
            profile: null, // reset file input
          });
          setPreview(`http://localhost:8000/media/admin/${admin.profile}`);
        }
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchAdmin();
  }, [adminId]);

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
      payload.append("employeeId", formData.employeeId);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("gender", formData.gender);
      if (formData.profile) {
        payload.append("profile", formData.profile); // only if new file uploaded
      }

      const { data } = await BaseUrl.put(`/admin/update-admin/${adminId}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data?.Success) {
        toast.success("Admin updated successfully");
      } else {
        toast.error(data?.Message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green py-1 px-3"
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
          className="w-full bg-blue-50 rounded border py-1 px-3"
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
          className="w-full bg-blue-50 rounded border py-1 px-3"
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
          className="w-full bg-blue-50 rounded border py-1 px-3"
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
          className="w-full bg-blue-50 rounded border py-1 px-3"
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
          className="w-full bg-blue-50 rounded border py-1 px-3"
        />
      </div>

      <div className="w-[40%]">
        <label htmlFor="gender" className="leading-7 text-sm ">
          Select Gender
        </label>
        <select
          id="gender"
          value={formData.gender}
          onChange={handleFormChange}
          className="px-2 bg-blue-50 py-3 rounded-sm w-full"
        >
          <option value="">-- Select --</option>
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
          className="px-2 bg-blue-50 py-3 rounded-sm w-full flex justify-center items-center cursor-pointer"
        >
          Upload
        </label>
        <input hidden type="file" id="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {preview && (
        <div className="w-full flex justify-center items-center">
          <img src={preview} alt="admin" className="h-36" />
        </div>
      )}

      <button type="submit" className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white">
        Update Admin
      </button>
    </form>
  );
}
