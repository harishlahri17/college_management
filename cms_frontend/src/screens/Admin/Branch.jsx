import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../axiosInstance';
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-toastify';

export default function Branch() {

  const [selected, setSelected] = useState("add");
  const [BranchList, setBranchList] = useState([]);

  const [formData, setFormData] = useState({
    branch: "",
  });

  // Handle input change
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();// revent page reload
    try {
      const { data } = await BaseUrl.post("/admin/add-branch", formData);
      if (data?.Success) {
        toast.success(data?.Message);

        setFormData({
          branch: "",
        })
      }
    } catch (error) {
      console.error("Error on adding Branch:", error);
      toast.error(error || "Something went wrong ");
    }
  }

  const getBranchList = async () => {
    try {
      const { data } = await BaseUrl.get("/admin/branch-list");
      setBranchList(data?.list); // backend key is list

      // console.log("adminList", data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBranchList();
  }, []);

  const deleteBranch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Branch?")) return;

    try {
      const { data } = await BaseUrl.delete(`/admin/delete-branch/${id}`); 
      if (data?.Success) {
        toast.error(data.Message);
      } else {
        toast.error(data?.Message || "Failed to delete student");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the Branch.");
    }
  };


  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        {/* <Heading title="Add Branch" /> */}
        Add branch
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Branch
          </button>
          <button
            className={`${selected === "view" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Branch
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full mt-8" >
            <div className="w-[40%]">
              <label htmlFor="branch" className="leading-7 text-sm ">
                Enter Branch Name
              </label>
              <input
                type="name"
                id="branch"
                value={formData.branch}
                onChange={handleFormChange}

                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type='submit' className="mt-6 bg-blue-500 px-6 py-3 text-white"
            >
              Add Branch
            </button>

          </form>
        </div>

      )}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {BranchList &&
              BranchList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
                  >
                    <div>{item.branch}</div>
                    <button
                      className="text-2xl hover:text-red-500"
                    onClick={() => deleteBranch(item._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  )
}
