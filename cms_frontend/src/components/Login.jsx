import React, { useState } from 'react'
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../axiosInstance";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [selected, setSelected] = useState("Student");
  const [formData, setFormData] = useState({
    enrollmentNo: "",
    employeeId: "",
    password: "",
  });

  // Handle input change
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  // ================= STUDENT LOGIN =================
  const studentHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await BaseUrl.post("/student/student-login", formData);

      if (data?.Success) {
        toast.success(data?.Message);

        // Save token in localStorage for future protected routes
        // localStorage.setItem("token", res.data.Token);

        storeTokenInLS(data.token);

        setFormData({
          enrollmentNo: "",
          password: "",
        });

        navigate("/student");
      } else {
        alert(data.Message);
      }
    } catch (error) {
      console.error("Error on Login:", error);
      toast.error(error?.response?.data?.Message || "Something went wrong");
    }
  };

  // ================= FACULTY LOGIN =================
  const facultyHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await BaseUrl.post("/faculty/faculty-login", {
        employeeId: formData.employeeId,
        password: formData.password,
      });

      if (data?.Success) {
        toast.success(data?.Message);
        storeTokenInLS(data.token);
        setFormData({ enrollmentNo: "", employeeId: "", password: "" });
        navigate("/faculty");
      } else {
        toast.error(data?.Message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "Something went wrong");
    }
  };

  // ================= ADMIN LOGIN =================
  const adminHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await BaseUrl.post("/admin/admin-login", {
        employeeId: formData.employeeId,
        password: formData.password,
      });

      if (data?.Success) {
        toast.success(data?.Message);
        storeTokenInLS(data.token);
        setFormData({ enrollmentNo: "", employeeId: "", password: "" });
        navigate("/admin");
      } else {
        toast.error(data?.Message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "Something went wrong");
    }
  };


  return (
    <div className="bg-white h-[100vh] w-full flex justify-between items-center">
      <img
        className="w-[60%] h-[100vh] object-cover"
        src="https://images.unsplash.com/photo-1527891751199-7225231a68dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
      />

      {selected === "Student" && (
        <div className="w-[40%] flex justify-center items-start flex-col pl-8">
          <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
            student Login
          </p>
          <form onSubmit={studentHandleSubmit}
            className="flex justify-center items-start flex-col w-full mt-10"

          >
            <div className="flex flex-col w-[70%]">
              <label className="mb-1" htmlFor="enrollmentNo">
                Enrollment No.
              </label>
              <input
                type="number"
                id="enrollmentNo"
                value={formData.enrollmentNo}
                onChange={handleFormChange}
                required
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"

              />
            </div>
            <div className="flex flex-col w-[70%] mt-3">
              <label className="mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleFormChange}
                required
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"

              />
            </div>
            <button type='submit' className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
              Login
              <span className="ml-2">
                <FiLogIn />
              </span>
            </button>
          </form>
        </div>
      )}
      {selected === "Faculty" && (
        <div className="w-[40%] flex justify-center items-start flex-col pl-8">
          <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
            Faculty Login
          </p>
          <form onSubmit={facultyHandleSubmit}
            className="flex justify-center items-start flex-col w-full mt-10"

          >
            <div className="flex flex-col w-[70%]">
              <label className="mb-1" htmlFor="employeeId">
                Employee ID
              </label>
              <input
                type="number"
                id="employeeId"
                required
                value={formData.employeeId}
                onChange={handleFormChange}
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"

              />
            </div>
            <div className="flex flex-col w-[70%] mt-3">
              <label className="mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={handleFormChange}
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"

              />
            </div>
            <button type='submit' className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
              Login
              <span className="ml-2">
                <FiLogIn />
              </span>
            </button>
          </form>
        </div>
      )}
      {selected === "Admin" && (
        <div className="w-[40%] flex justify-center items-start flex-col pl-8">
          <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
            Admin Login
          </p>
          <form onSubmit={adminHandleSubmit}
            className="flex justify-center items-start flex-col w-full mt-10"

          >
            <div className="flex flex-col w-[70%]">
              <label className="mb-1" htmlFor="employeeId">
                Employee ID
              </label>
              <input
                type="number"
                id="employeeId"
                value={formData.employeeId}
                onChange={handleFormChange}
                required
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"

              />
            </div>
            <div className="flex flex-col w-[70%] mt-3">
              <label className="mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleFormChange}
                required
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"

              />
            </div>
            {/* <div className="flex w-[70%] mt-3 justify-start items-center">
            <input type="checkbox" id="remember" className="accent-blue-500" />{" "}
            Remember Me
          </div> */}
            <button type='submit' className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
              Login
              <span className="ml-2">
                <FiLogIn />
              </span>
            </button>
          </form>
        </div>
      )}

      <div className="absolute top-4 right-4">
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selected === "Student" && "border-b-2 border-green-500"
            }`}
          onClick={() => setSelected("Student")}
        >
          Student
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selected === "Faculty" && "border-b-2 border-green-500"
            }`}
          onClick={() => setSelected("Faculty")}
        >
          Faculty
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selected === "Admin" && "border-b-2 border-green-500"
            }`}
          onClick={() => setSelected("Admin")}
        >
          Admin
        </button>
      </div>
      {/* <Toaster position="bottom-center" /> */}
    </div>
  )
}


// import React, { useState } from "react";
// import { FiLogIn } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { BaseUrl } from "../axiosInstance";

// export default function Login() {
//   const [selected, setSelected] = useState("Student");

//   const [formData, setFormData] = useState({
//     enrollmentNo: "",
//     password: "",
//   });

//   // Handle input change
//   const handleFormChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   }

//   const studentHandleSubmit = async (e) => {
//     e.preventDefault();// revent page reload
//     try {
//       const { login } = await BaseUrl.post("/student/student-login", formData);
//       if (login?.Success) {
//         alert(login?.Message);

//         // setFormData({
//         //   branch: "",
//         // })
//       }
//     } catch (error) {
//       console.error("Error on Login:", error);
//       alert(error || "Something went wrong ");
//     }
//   }

//   return (
//     <div className="bg-white h-[100vh] w-full flex flex-col lg:flex-row relative">
//       {/* Left side image */}
//       <img
//         className="w-full lg:w-[60%] h-[40vh] lg:h-[100vh] object-cover"
//         src="https://images.unsplash.com/photo-1527891751199-7225231a68dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
//         alt="Login Banner"
//       />

//       {/* Right side form */}
//       <div className="w-full lg:w-[40%] flex justify-center items-start flex-col pl-6 lg:pl-8 pt-6 lg:pt-0">
//         {/* Toggle buttons above heading */}
//         <div className="flex space-x-6 mb-4">
//           {["Student", "Faculty", "Admin"].map((role) => (
//             <button
//               key={role}
//               onClick={() => setSelected(role)}
//               className={`text-blue-500 text-base font-semibold hover:text-blue-700 transition-all ${selected === role && "border-b-2 border-green-500"
//                 }`}
//             >
//               {role}
//             </button>
//           ))}
//         </div>

//         {/* Heading */}
//         <h1 className="text-3xl font-semibold pb-2 border-b-2 border-green-500 mb-10">
//           {selected} Login
//         </h1>

//         {/* Form */}
//         <form className="flex flex-col w-[70%] space-y-4">
//           <div className="flex flex-col w-full">
//             <label htmlFor="eno" className="mb-1">
//               {selected} Login ID
//             </label>
//             <input
//               type="number"
//               id="eno"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//             />
//           </div>

//           <div className="flex flex-col w-full">
//             <label htmlFor="password" className="mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//             />
//           </div>

//           <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 transition-all flex justify-center items-center w-fit">
//             Login
//             <span className="ml-2">
//               <FiLogIn />
//             </span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
