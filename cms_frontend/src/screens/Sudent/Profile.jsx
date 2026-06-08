import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { BaseUrl } from '../../axiosInstance';
import { toast } from 'react-toastify';

export default function Profile() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Handle input change
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const [student, setStudent] = useState(null);
  const { token } = useAuth(); // get token from auth context

  // console.log(token);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await BaseUrl.get("/student/student-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(res.data.student); // your controller sends { msg: userData }
      } catch (err) {
        console.error("Error fetching student profile:", err.response?.data || err.message);
      }
    };

    if (token) fetchStudent();
  }, [token]);

  if (!student) {
    return (
      <div className="w-[85%] mx-auto my-8">
        <p className="text-xl font-semibold">Loading profile...</p>
      </div>
    );
  }


  // change password 
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await BaseUrl.put(
        "/student/change-password-student",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.Message);
      setFormData({
        currentPassword: "",
        newPassword: "",
      })
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err.response?.data?.Message || "Error changing password");
    }
  };

  return (

    <div className="w-[85%] mx-auto my-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">

      {/* Profile Image first on small screens, second on large */}
      <img
        src={student.profile}
        alt="student profile"
        className="h-[200px] w-[200px] object-cover rounded-lg shadow-md 
          mb-4 md:mb-0 md:order-2"
      />

      {/* Info Section */}
      <div className=" md:order-1">
        <p className="text-2xl font-semibold">
          Hello 👋 {student.firstName} {student.lastName}
        </p>
        <div className="mt-3 space-y-2">
          <p className="text-lg font-normal">Enrollment No: {student.enrollmentNo}</p>
          <p className="text-lg font-normal">Branch: {student.branch?.branch}</p>
          <p className="text-lg font-normal">Semester: {student.semester}</p>
          <p className="text-lg font-normal">Phone Number: +91 {student.phoneNumber}</p>
          <p className="text-lg font-normal">Email Address: {student.email}</p>
        </div>

        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 "
        >
          {showPasswordForm ? "Cancel" : "Change Password"}
        </button>

        {showPasswordForm && (
          <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-3">
            <input
              type="password"
              id='currentPassword'
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleFormChange}
              required
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              id='newPassword'
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleFormChange}
              required
              className="border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 "
            >
              Save Password
            </button>
          </form>
        )}
      </div>

    </div>

    // <div className="w-[85%] mx-auto my-8 flex justify-between items-start">

    //   <>
    //     <div>
    //       <p className="text-2xl font-semibold">
    //         Hello 👋 {student.firstName} {student.lastName}
    //       </p>
    //       <div className="mt-3">
    //         <p className="text-lg font-normal mb-2">
    //           Enrollment No: {student.enrollmentNo}
    //         </p>
    //         <p className="text-lg font-normal mb-2">Branch: {student.branch?.branch}</p>
    //         <p className="text-lg font-normal mb-2">
    //           Semester: {student.semester}
    //         </p>
    //         <p className="text-lg font-normal mb-2">
    //           Phone Number: +91 {student.phoneNumber}
    //         </p>
    //         <p className="text-lg font-normal mb-2">
    //           Email Address: {student.email}
    //         </p>
    //       </div>
    //       {/* <button
    //         className={` "bg-red-100 text-red-600" : "bg-blue-600 text-white"`}

    //       >

    //       </button>

    //       <form
    //         className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"

    //       >
    //         <input
    //           type="password"
    //           value=''
    //           placeholder="Current Password"
    //           className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
    //         />
    //         <input
    //           type="password"
    //           value=''
    //           placeholder="New Password"
    //           className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
    //         />
    //         <button
    //           className="mt-4 hover:border-b-2 hover:border-blue-500"

    //           type="submit"
    //         >
    //           Change Password
    //         </button>
    //       </form> */}

    //       <button
    //         onClick={() => setShowPasswordForm(!showPasswordForm)}
    //         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
    //       >
    //         {showPasswordForm ? "Cancel" : "Change Password"}
    //       </button>

    //       {showPasswordForm && (
    //         <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-3">
    //           <input className="border px-3 py-2 rounded"
    //             // type="password"
    //             id='currentPassword'
    //             placeholder="Current Password"
    //             value={formData.currentPassword}
    //             onChange={handleFormChange}
    //             required
    //           />
    //           <input className="border px-3 py-2 rounded"
    //             // type="password"
    //             id='newPassword'
    //             placeholder="New Password"
    //             value={formData.newPassword}
    //             onChange={handleFormChange}
    //             required
    //           />
    //           <button
    //             type="submit"
    //             className="bg-green-600 text-white px-4 py-2 rounded"
    //           >
    //             Save Password
    //           </button>
    //         </form>
    //       )}

    //     </div>

    //     <img
    //       src={`http://localhost:8000/media/student/${student.profile}`}
    //       alt="student profile"
    //       className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
    //     />
    //   </>

    // </div>
  )
}
