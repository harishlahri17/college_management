import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { BaseUrl } from '../../../axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../../store/auth';


export default function AddAdmin() {

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    password: "",
    profile: null,//file
  });

  // Handle input change
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const [preview, setPreview] = useState(null); // for showing image preview

  const handleFilechange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile: file });
    setPreview(URL.createObjectURL(file));
  }

  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault(); // prevent page reload
    try {
      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("middleName", formData.middleName);
      payload.append("lastName", formData.lastName);
      payload.append("employeeId", formData.employeeId);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("gender", formData.gender);
      payload.append("password", formData.password);
      payload.append("profile", formData.profile);

      const { data } = await BaseUrl.post("/admin/add-admin", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data?.Success) {
        toast.success(data?.Message);// showing alert message

        storeTokenInLS(data.token);
        // reset the form
        setFormData({
          employeeId: "",
          firstName: "",
          middleName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          gender: "",
          password: "",
          profile: null,
        })
        setPreview(null);
      }
    } catch (error) {
      // toast.error(error || "Something went wrong ");
      toast.error(
        error?.response?.data?.Message || "Something went wrong"
      );
    }
  }


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
        <label htmlFor="middlename" className="leading-7 text-sm ">
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
        <label htmlFor="gender" className="leading-7 text-sm ">
          Select Gender
        </label>
        <select
          id="gender"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
          value={formData.gender}
          onChange={handleFormChange}
        >
          <option value="">-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="password" className="leading-7 text-sm ">
          Enter Password
        </label>
        <input
          type="text"
          id="password"
          value={formData.password}
          onChange={handleFormChange}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[95%] flex justify-evenly items-center">
        <div className="w-[40%]">
          <label htmlFor="file" className="leading-7 text-sm ">
            Select Profile
          </label>
          <label
            htmlFor="file"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
          >
            Upload
            <span className="ml-2">
              <FiUpload />
            </span>
          </label>
          <input
            hidden
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFilechange}
          />
        </div>
      </div>

      {preview && (
        <div className="w-full flex justify-center items-center">
          <img src={preview} alt="admin" className="h-36" />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white"
      >
        Add New Admin
      </button>
    </form>
  )
}
