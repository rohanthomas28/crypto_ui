import React, { useState } from 'react'
import logo from './logo.png';

// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const menuItems = [
  {
    icons: <IoHomeOutline size={30} />,
    label: 'Home'
  },
  {
    icons: <CiBoxList size={30} />,
    label: 'User List'
  },
  {
    icons: <CiUser size={30} />,
    label: 'Create User'
  }
]

export default function Sidebar() {

  const [open, setOpen] = useState(true)

  return (
    <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? 'w-60' : 'w-16'}`}>

      {/* Header */}
      <div className=' px-3 py-2 h-20 flex justify-between items-center'>
        <img src={logo} alt="Logo" className={`${open ? 'w-10' : 'w-0'} rounded-md`} />
        <div><MdMenuOpen size={34} className={` duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} /></div>
      </div>

      {/* Body */}

      <ul className='flex-1'>
        {
          menuItems.map((item, index) => {
            return (
              <li key={index} className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                <div>{item.icons}</div>
                <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}>{item.label}</p>
              </li>
            )
          })
        }
      </ul>
      

    </nav>
  )
}
