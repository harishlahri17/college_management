import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Timetable from './Timetable'
import Marks from './Marks'
import Material from './Material'
import Notice from '../Sudent/Notice'
import Profile from './Profile'
import Student from './Student'

export default function Home() {
    const [selectedMenu , setSelectedMenu] = useState("My Profile")
  return (
    <section>
    
        <>
          <Navbar />
          <ul className="flex justify-center items-center gap-4 md:gap-6 lg:gap-10 
            flex-wrap md:flex-nowrap  w-[85%] mx-auto my-8">
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "My Profile"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("My Profile")}
            >
              My Profile
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Student Info"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Student Info")}
            >
              Student Info
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Upload Marks"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Upload Marks")}
            >
              Upload Marks
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Timetable"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Timetable")}
            >
              Timetable
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
                selectedMenu === "Material"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Material")}
            >
              Material
            </li>
          </ul>
          <>
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Upload Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
            {selectedMenu === "Student Info" && <Student />}
          </>
        </>
      
     
    </section>
  )
}
