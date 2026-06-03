import React  from 'react'
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';



export default function Navbar() {

    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const logoutHandle = () => {

        logoutUser();
        navigate("/")
    }
    return (
        <div className="shadow-md px-6 py-4 flex justify-between items-center">
            <p
                className="font-semibold text-2xl flex justify-center items-center cursor-pointer"
            >
                <span className="mr-2">
                    <RxDashboard />
                </span>
                Dashboard
            </p>
            <button onClick={logoutHandle}
                className="flex justify-center items-center text-red-500 px-3 py-2 font-semibold rounded-sm"
            >
                Logout
                <span className="ml-2">
                    <FiLogOut />
                </span>
            </button>
        </div>
    )
}
