import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../axiosInstance';
import { useAuth } from '../../store/auth';
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


  const [admin, setAdmin] = useState(null);
  const { token } = useAuth(); // get token from auth context

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await BaseUrl.get("/admin/admin-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(res.data.admin); // your controller sends { msg: userData }
      } catch (err) {
        console.error("Error fetching student profile:", err.response?.data || err.message);
      }
    };

    if (token) fetchAdmin();
  }, [token]);

  if (!admin) {
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
        "/admin/change-password-admin",
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
              <img
          src={`http://localhost:8000/media/admin/${admin.profile}`}
          alt="student profile"
          className="h-[200px] w-[200px] object-cover rounded-lg shadow-md mb-4 md:mb-0 md:order-2"
        />

      <>
        <div className=" md:order-1">
          <p className="text-2xl font-semibold">
            Hello 👋 {admin.firstName} {admin.lastName}
          </p>
          <div className="mt-3">
            <p className="text-lg font-normal mb-2">
              Enrollment No: {admin.employeeId}
            </p>
            <p className="text-lg font-normal mb-2">Gender: {admin.gender}</p>
            <p className="text-lg font-normal mb-2">
              Phone Number: +91 {admin.phoneNumber}
            </p>
            <p className="text-lg font-normal mb-2">
              Email Address: {admin.email}
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 "
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-3">
              <input className="border px-3 py-2 rounded"
                // type="password"
                id='currentPassword'
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleFormChange}
                required
              />
              <input className="border px-3 py-2 rounded"
                // type="password"
                id='newPassword'
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleFormChange}
                required
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
      </>

    </div>
  )
}


