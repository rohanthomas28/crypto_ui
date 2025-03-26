import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";
import { BASE_URL } from "./config";

const UserList = () => {
    const tableRef = useRef(null);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getAddress`);
                setUserList(response.data.users || []);
                console.log("Fetched users:", response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (tableRef.current && userList.length > 0) {
            new DataTable(tableRef.current, {
                searchable: true,
                sortable: false
            });
        }
    }, [userList]);

    return (
        <div className="overflow-x-auto">
            <table
                ref={tableRef}
                id="search-table"
                className="min-w-full border border-gray-300 divide-y divide-gray-300"
            >
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="border border-gray-400 px-4 py-2">UserId</th>
                        <th className="border border-gray-400 px-4 py-2">Evm Address</th>
                        <th className="border border-gray-400 px-4 py-2">Bitcoin Mainnet</th>
                        <th className="border border-gray-400 px-4 py-2">Bitcoin Testnet</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 ? (
                        userList.map((user, index) => (
                            <tr key={index} className="even:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.UserId}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.evmAddress}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.btcMainnetAddress}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.btcTestnetAddress}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-gray-500 px-4 py-2">
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
