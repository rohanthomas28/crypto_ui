import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

const Wallet = () => {
    const [systemWallet, setSystemWallet] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/system-wallets-address`);
                console.log(response.data);
                setSystemWallet(response.data);
            } catch (error) {
                console.error("Error fetching wallet data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Wallet Information
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {Object.entries(systemWallet).map(([key, wallet]) => (
                    <div
                        key={key}
                        className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                            {key.replace(/-/g, ' ')}
                        </h2>
                        <p className="text-gray-700">
                            <strong>BTC Mainnet Address:</strong> {wallet.btcMainnetAddress}
                        </p>
                        <p className="text-gray-700">
                            <strong>BTC Testnet Address:</strong> {wallet.btcTestnetAddress}
                        </p>
                        <p className="text-gray-700">
                            <strong>EVM Address:</strong> {wallet.evmAddress}
                        </p>
                        <p className={`text-sm mt-2 font-medium ${wallet.exists ? 'text-green-500' : 'text-red-500'}`}>
                            {wallet.exists ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wallet;
