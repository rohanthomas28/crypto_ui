import axios from "axios";
import Cookies from 'js-cookie';
import { useState } from "react";
import  {useNavigate}   from "react-router-dom";
import { BASE_URL } from "./config";

const Login = () => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [msg, setMsg] = useState('');
    const [msgclr, setMsgClr] = useState('');

    const  handleLogin = async(e) => {
        e.preventDefault();
        console.log("userName", userName);
        console.log("password", password);

        setUserName("");
        setPassword("");

        if(userName.trim() === "" || password.trim() == ""){
            setMsgClr("bg-red-500");
            setMsg("Invalid username or password");
        }else{
            const response = await axios.get(`${BASE_URL}/account-exists/${userName}`);
            console.log("response", response);

            const loginDetails = response.data;
            Cookies.set('loginDetails', JSON.stringify(loginDetails));

            if(userName == "admin" && password == 1234){
                navigate('/dashboard');
            }else if(response.data.message === "Account found"){
                    navigate('/profile');
            }
            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" >
            <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-6">
                Sign in
            </h1>
            {msg && <div className={`p-2 mb-4 text-center text-white ${msgclr}`}>{msg}</div>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Enter your username'
                />
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                />
                </div>
                <div className="mb-4">
                </div>
                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Login
                </button>
            </form>
            </div>
        </div>
    );
};

export default Login;
