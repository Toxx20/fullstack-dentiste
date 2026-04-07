import React, { useState } from 'react'
import {Menu} from 'lucide-react'
import { Link,useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"


export default function Navbar({setShowLogin }) {
    const [invisible,setInvisible]=useState(false)
    
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const masquer=()=>{
        return setInvisible(!invisible)
    }
    return (
        <div>
        <div className='flex gap-2 justify-between  items-center font-prompt'>
            {/* Logo */}
            <div className='flex'>
            <h2 className='text-2xl'>🦷✨</h2>
            <h4 className='text-xl font-bold bg-linear-to-r
            from-amber-200 to-amber-300 text-transparent bg-clip-text'>
            Nifyko
            </h4>
            </div>

            {/* Nav menu */}
            <div className='hidden md:flex gap-2'>
                <nav className='border-3 border-gray-200 transition-all  hover:border-yellow-400 rounded-2xl p-2 font-extralight'>
                    <Link to='/service' > Nos services</Link>
                </nav>
                <nav className='border-3 border-gray-200 transition-all  hover:border-yellow-400 rounded-2xl p-2 font-extralight'>
                    <Link to='/' > Nos clients</Link>
                </nav>
                <nav className='border-3 border-gray-200 transition-all  hover:border-yellow-400 rounded-2xl p-2 font-extralight '>
                    <Link to='/specialiste' > Nos Spécialistes</Link>

                </nav>
            </div>

            {/* Menu qui va apparître sur le mobile */}
            <div className='flex md:hidden'>
                <button onClick={masquer}>  <Menu className='cursor-pointer'/></button>
            </div>

            {/* profile */}
            <div className='flex gap-x-4 relative'>
            {!user ? (
                <button
                onClick={() => setShowLogin(true)}
                className='border-3 border-amber-50 rounded-2xl p-3 bg-blue-800 
                text-amber-100 transition-all duration-200 hover:scale-90
                cursor-pointer'
                >
                se connecter
                </button>
            ) : (
                <div className='relative'>
                
                {/* Avatar */}
                <div
                    onClick={() => setOpen(!open)}
                    className=' py-3 px-5 bg-blue-500 rounded-full text-white font-bold cursor-pointer'
                >
                    {user.username.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                {open && (
                    <div className='absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50'>
                    
                    <p className='px-4 py-2 text-gray-700 font-semibold'>
                        {user.username}
                    </p>

                    <hr />

                    <button
                        className='w-full text-left px-4 py-2 hover:bg-gray-100'
                        onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                        }}
                    >
                        Profil
                    </button>

                    <button
                        className='w-full text-left px-4 py-2 hover:bg-red-100 text-red-500'
                        onClick={() => {
                        logout();
                        setOpen(false);
                        }}
                    >
                        Logout
                    </button>

                    </div>
                )}
                </div>
            )}
            </div>

        </div>
            {/* Nav menu sur mobile */}
            {invisible && (
            <div className=' flex flex-col md:hidden gap-2  items-center'>
                <nav className='border-3 border-gray-200 transition-all  hover:border-yellow-400 rounded-2xl p-2 font-extralight'>
                    <Link to='/service' > Nos services</Link>
                </nav>
                <nav className='border-3 border-gray-200 transition-all  hover:border-yellow-400 rounded-2xl p-2 font-extralight'>
                    <Link to="/">Nos clients</Link>
                </nav>
                <nav className='border-3 border-gray-200 transition-all  hover:border-yellow-400 rounded-2xl p-2 font-extralight '>
                    <Link to="/specialiste">Nos Spécialistes</Link>
                </nav>
            </div>
            )}

        </div>
        
    )
}
