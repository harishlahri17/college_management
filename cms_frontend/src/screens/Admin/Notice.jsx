import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../axiosInstance';
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-toastify';

export default function Notice() {

  const [selected, setSelected] = useState("add");
  const [noticeList, setNoticeList] = useState([]);

  const [formData, setFormData] = useState({
    topic: "",
    discription: "",
  });

  // Handle input change
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();// revent page reload
    try {
      const { data } = await BaseUrl.post("/admin/add-notice", formData);
      if (data?.Success) {
        toast.success(data?.Message);

        setFormData({
          topic: "",
          discription: "",
        })
      }
    } catch (error) {
      console.error("Error on adding Notice:", error);
      toast.error(error || "Something went wrong ");
    }
  }

  const getNoticeList = async () => {
    try {
      const { data } = await BaseUrl.get("/admin/notice-list");
      setNoticeList(data?.list); // backend key is list

      // console.log("adminList", data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getNoticeList();
  }, []);

  const deleteNotice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Notice?")) return;

    try {
      const { data } = await BaseUrl.delete(`/admin/delete-notice/${id}`);
      if (data?.Success) {
        toast.success(data.Message);
      } else {
        toast.error(data?.Message || "Failed to delete Notice");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the Notice.");
    }
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        Notice Details
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Notice
          </button>
          <button
            className={`${selected === "view" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Notice
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full mt-8">
            <div className="w-[40%] mb-4">
              <label htmlFor="topic" className="leading-7 text-sm">
                Topic
              </label>
              <input
                type="name"
                id="topic"
                value={formData.topic}
                onChange={handleFormChange}
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="w-[40%]">
              <label htmlFor="discription" className="leading-7 text-sm ">
                Enter Discrition
              </label>
              <input
                type="name"
                id="discription"
                value={formData.discription}
                onChange={handleFormChange}
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type='submit' className="mt-6 bg-blue-500 px-6 py-3 text-white"
            >
              Add Subject
            </button>
          </form>
        </div>
      )}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {noticeList &&
              noticeList.map((item) => {
                const createdDate = new Date(item.createdAt).toLocaleDateString();
                return (
                  <li
                    key={item.topic}
                    className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[100%]"
                  >
                    {/* <div>
                    {createdDate} - {item.topic} - {item.discription}
                    </div> */}
                    <div>
                      <p className="font-semibold">{item.topic}</p>
                      <p>{item.discription}</p>
                      <span className="text-sm text-gray-600">
                        Posted on {createdDate}
                      </span>
                    </div>
                    <button
                      className="text-2xl hover:text-red-500"
                      onClick={() => deleteNotice(item._id)}
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
