import React from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import API from '../api'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";



export default function Login({close,openRegister}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate(); 
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await API.post('login/', {
        email: email,
        password: password
      });

      const data = res.data;

      // Stocker tokens
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      login({
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
        access: data.access,
      });

      alert("Connexion réussie");
      close();
      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert("Email ou mot de passe incorrect");
    }
  }


  return (
        <div className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-xl w-96 max-w-md sm:p-8">
        <div className="flex justify-end">
          <button onClick={close} title='fermer'>
            <X className='text-red-600 cursor-pointer'/>
          </button>
        </div>

      <h2 className="text-2xl font-bold mb-4">Connexion</h2>

      <div className='flex flex-col gap-y-2'>
        <input 
          type="email" 
          placeholder="Email"
          className="w-full mb-3 p-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Mot de passe"
          className="w-full mb-4 p-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <button className="bg-blue-700 text-white 
        px-7 py-2 rounded-lg transition-all hover:scale-95 
        border border-white cursor-pointer"
        onClick={handleLogin}
        >

          Login
        </button>

      <p 
        onClick={openRegister}
        
        className="text-center mt-3 mx-auto cursor-pointer font-medium underline"
      >
        s'inscrire
      </p>

      </div>

    </div>
  )
}
