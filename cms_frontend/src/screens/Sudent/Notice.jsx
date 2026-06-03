import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../axiosInstance';

export default function Notice() {

  const [noticeList, setNoticeList] = useState([]);
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
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
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
                  <div>
                    <p className="font-semibold">{item.topic}</p>
                    <p>{item.discription}</p>
                    <span className="text-sm text-gray-600">
                      Posted on {createdDate}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  )
}
