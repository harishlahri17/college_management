import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import Timetable from './Timetable';
import Marks from './Marks';
import Material from './Material';
import Notice from './Notice';
import Profile from './Profile';

export default function Home() {
     const [selectedMenu, setSelectedMenu] = useState("Profile");
  return (
    <section>
        <>
          <Navbar />
          <ul className="flex justify-center items-center gap-4 md:gap-6 lg:gap-10 
            flex-wrap md:flex-nowrap  w-[85%] mx-auto my-8">
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selectedMenu === "Profile"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
              onClick={() => setSelectedMenu("Profile")}
            >
              My Profile
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selectedMenu === "Timetable"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
              onClick={() => setSelectedMenu("Timetable")}
            >
              Timetable
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selectedMenu === "Marks"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
              onClick={() => setSelectedMenu("Marks")}
            >
              Marks
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selectedMenu === "Material"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
              onClick={() => setSelectedMenu("Material")}
            >
              Material
            </li>
            <li
              className={`text-center text-xs sm:text-sm md:text-base rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selectedMenu === "Notice"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
                }`}
              onClick={() => setSelectedMenu("Notice")}
            >
              Notice
            </li>
          </ul>
          <>
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Marks" && <Marks /> }
            {selectedMenu === "Material" && <Material /> }
            {selectedMenu === "Notice" && <Notice /> }
            {selectedMenu === "Profile" && <Profile /> }
          </>
        </>
    </section>
  )
}
