import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../axiosInstance'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function AdminList({ onEdit }) {

  const [adminList, setAdminList] = useState([]);
  const getAdminList = async () => {
    try {
      const { data } = await BaseUrl.get("/admin/admin-list");
      setAdminList(data?.list); // backend key is list

      console.log("adminList", data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAdminList();
  }, []);


  
  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      const { data } = await BaseUrl.delete(`/admin/delete-admin/${id}`); //  fixed
      if (data?.Success) {
        toast.success(data.Message);
        setAdminList(prev => prev.filter(admin => admin._id !== id));
      } else {
        toast.error(data?.Message || "Failed to delete admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the admin.");
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {adminList.length > 0 ? (
            adminList.map((admin, index) => (
              <tr key={admin._id} className="bg-blue-50 border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={admin.profile} // serve image from backend cloudinary
                    alt={admin.firstName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  {admin.firstName} {admin.middleName} {admin.lastName}
                </td>
                <td className="px-6 py-4">{admin.gender}</td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">{admin.phoneNumber}</td>
                <td className="px-6 py-4">
                  <button type="button" class="text-blue-500  border border-blue-500 hover:text-white hover:bg-blue-500  
                  font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => onEdit(admin._id)} >
                    <FaRegEdit />
                  </button>
                  <button type="button" class="text-blue-500  border border-blue-500 hover:text-white hover:bg-blue-500  
                  font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => deleteAdmin(admin._id)}>
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
