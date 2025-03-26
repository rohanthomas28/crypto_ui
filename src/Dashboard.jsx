import React, { useEffect,useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "./config";
import Sidebar from './Sidebar.jsx';

const Dashboard = () => {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState("");

    const handleCreateAccounts = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${BASE_URL}/createAccounts`,{userId});
            setUserData(response.data);
        }catch(error){
            console.error("Error creating account:", error);
        }
        
    }
    return(
        <>
        <Sidebar></Sidebar>
            <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
                <form 
                    onSubmit={handleCreateAccounts} 
                    className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
                >
                    <label 
                        htmlFor="userId" 
                        className="block text-lg font-medium text-gray-700"
                    >
                        UserId:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter The UserName"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="submit"
                        value="Create"
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600"
                    />
                </form>

                {userData ? (
                    <div className="w-full max-w-md mt-6 p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                            User Details
                        </h1>
                        <p className="text-gray-700"><strong>UserId:</strong> {userId}</p>
                        <p className="text-gray-700"><strong>EVM Address:</strong> {userData.address.evm.address}</p>
                        <p className="text-gray-700"><strong>BTC Testnet Address:</strong> {userData.address.bitcoin.testnet}</p>
                        <p className="text-gray-700"><strong>BTC Mainnet Address:</strong> {userData.address.bitcoin.mainnet}</p>
                    </div>
                ) : (
                    <h1 className="mt-6 text-xl font-semibold text-blue-500">
                      
                    </h1>
                )}
            </div>
        </>
    )
}

export default Dashboard;