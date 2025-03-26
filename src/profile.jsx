import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "./config";

const Profile = () => {
    const [userAddress, setUserAddress] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const loginDetails = Cookies.get("loginDetails");
        if (loginDetails) {
            const parseDetails = JSON.parse(loginDetails);
            setUserId(parseDetails.userId);
        }
    }, []);

    useEffect(() => {
        const gameTable = async () => {
            if (!userId) return;
            const response = await axios.get(`${BASE_URL}/getAddress/${userId}`);
            console.log("response", response.data);
            setUserAddress(response.data);
        };
        gameTable();
    }, [userId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {userAddress ? (
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
                        User Details
                    </h1>

                    <div className="space-y-3">
                        <p className="text-gray-700">
                            <strong className="font-semibold">User ID:</strong> {userAddress.userId}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-semibold">EVM Address:</strong> {userAddress.evmAddress}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-semibold">BTC Testnet Address:</strong> {userAddress.btcTestnetAddress}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-semibold">BTC Mainnet Address:</strong> {userAddress.btcMainnetAddress}
                        </p>
                    </div>
                </div>
            ) : (
                <h1 className="text-xl font-semibold text-blue-500 animate-pulse">
                    Loading...
                </h1>
            )}
        </div>
    );
};

export default Profile;
