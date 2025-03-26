import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './login.jsx'; // Ensure this path is correct
import './App.css';
import Dashboard from './Dashboard.jsx';
import Profile from './profile.jsx';
import Wallet from './wallet.jsx';
import UserList from './UserList.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/user_list" element={<UserList />} />
      </Routes>
    </>
  );
}

export default App;
