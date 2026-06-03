import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Branch from './Branch'
import Notice from './Notice'
import Faculty from './Faculty'
import Student from './Student'
import Profile from './Profile'
import Subject from './Subject'
import Admin from './Admin'



export default function Home() {

  const [selectedMenu, setSelectedMenu] = useState("Profile")
  return (
     
        <>
          <Navbar />
          <div className="w-[100%] mx-auto mt-8 flex justify-center items-start flex-col container">
            <ul className="flex justify-center items-center gap-4 md:gap-6 lg:gap-10  flex-wrap md:flex-nowrap  w-[90%] mx-auto">
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Profile"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Profile")}
              >
                Profile
              </li>
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Student"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Student")}
              >
                Student
              </li>
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Faculty"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Faculty")}
              >
                Faculty
              </li>
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Branch"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Branch")}
              >
                Branch
              </li>
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Notice"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Notice")}
              >
                Notice
              </li>
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Subjects"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Subjects")}
              >
                Subjects
              </li>
              <li
                className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Admin"
                    ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                    : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
                onClick={() => setSelectedMenu("Admin")}
              >
                Admins
              </li>
            </ul>
          </div>
          <>
            {selectedMenu === "Branch" && <Branch />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "Student" && <Student />}
            {selectedMenu === "Faculty" && <Faculty />}
            {selectedMenu === "Subjects" && <Subject />}
            {selectedMenu === "Admin" && <Admin />}
            {selectedMenu === "Profile" && <Profile />}
          </>
        </>

      
  )
}
