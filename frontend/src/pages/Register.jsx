import React, { useState } from "react";
import { X } from "lucide-react";
import API from "../api";

export default function Register({ close, openLogin }) {

  const [form, setForm] = useState({
    username: '',
    email: '',
    age: '',
    adresse: '',
    telephone1: '',
    telephone2: '',
    password: '',
    role: 'Cl',
    annee_experience: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

  const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(form.telephone1)) {
      setErrors(prev => ({ ...prev, telephone1: ["Le numéro doit contenir exactement 10 chiffres."] }))
      return
    }
    if (!phoneRegex.test(form.telephone2)) {
      setErrors(prev => ({ ...prev, telephone2: ["Le numéro doit contenir exactement 10 chiffres."] }))
      return
    }

    const data = { ...form }
    if (data.role !== 'Do') delete data.annee_experience

    try {
      await API.post('/register/', data)
      alert('Compte créé avec succès !')
      close()
      openLogin()
    } catch (error) {
      setErrors(error.response?.data || {})
      console.error(error.response?.data)
    }
  }

  return (
    <div className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96">
      <div className="flex justify-end">
        <button onClick={close} title="fermer">
          <X className="text-red-600 cursor-pointer" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">S'inscrire</h2>

      <div className="flex flex-col gap-y-2">

        <input
          id="username" name="username" type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 rounded-lg"
          value={form.username} onChange={handleChange}
        />
        {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}

        <input
          id="email" name="email" type="email"
          placeholder="Email"
          className="w-full p-2 rounded-lg"
          value={form.email} onChange={handleChange}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

        <input
          id="age" name="age" type="number"
          placeholder="Âge"
          className="w-full p-2 rounded-lg"
          value={form.age} onChange={handleChange}
        />
        {errors.age && <p className='text-red-500 text-sm'>{errors.age}</p>}

        <input
          id="adresse" name="adresse" type="text"
          placeholder="Adresse"
          className="w-full p-2 rounded-lg"
          value={form.adresse} onChange={handleChange}
        />
        {errors.adresse && <p className='text-red-500 text-sm'>{errors.adresse}</p>}

        <input
          id="telephone1" name="telephone1" type="text"
          placeholder="Numéro de téléphone 1"
          className="w-full p-2 rounded-lg"
          value={form.telephone1} onChange={handleChange}
        />
        {errors.telephone1 && <p className='text-red-500 text-sm'>{errors.telephone1}</p>}

        <input
          id="telephone2" name="telephone2" type="text"
          placeholder="Numéro de téléphone 2"
          className="w-full p-2 rounded-lg"
          value={form.telephone2} onChange={handleChange}
        />
        {errors.telephone2 && <p className='text-red-500 text-sm'>{errors.telephone2}</p>}

        <input
          id="password" name="password" type="password"
          placeholder="Mot de passe"
          className="w-full p-2 rounded-lg"
          value={form.password} onChange={handleChange}
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

        <select
          id="role" name="role"
          value={form.role} onChange={handleChange}
          className='rounded-md py-2 px-4 bg-white/30 backdrop-blur-md
          text-black text-xl font-extralight outline-none'
        >
          <option value="Ad">Admin</option>
          <option value="Do">Docteur</option>
          <option value="Cl">Client</option>
        </select>

        {form.role === "Do" && (
          <input
            id="annee_experience" name="annee_experience" type="number"
            placeholder="Années d'expérience"
            className="w-full p-2 rounded-lg"
            value={form.annee_experience} onChange={handleChange}
          />
        )}
        {errors.annee_experience && <p className='text-red-500 text-sm'>{errors.annee_experience}</p>}

        {errors.non_field_errors && (
          <p className='text-red-500 text-sm'>{errors.non_field_errors}</p>
        )}

        <button
          className="bg-blue-700 text-white px-7 py-2 rounded-lg 
          transition-all hover:scale-95 border border-white cursor-pointer mt-2"
          onClick={handleSubmit}
        >
          S'inscrire
        </button>

      </div>

      <p
        onClick={openLogin}
        className="text-center mt-3 mx-auto cursor-pointer text-sm font-medium underline"
      >
        Déjà un compte ?
      </p>
    </div>
  );
}