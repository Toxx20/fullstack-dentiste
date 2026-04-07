import React, { useState } from "react";
import { X } from "lucide-react";

export default function Register({ close, openLogin }) {

  const [type, setType] = useState("")

  const TYPE_ROLES = {
    Ad : "Adjoint",
    Do : "Docteur",
    Cl : "Client"

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
          type="text"
          placeholder="Nom"
          className="w-full mb-3 p-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Prénoms"
          className="w-full mb-3 p-2 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full mb-3 p-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Numéro de téléphone 1"
          className="w-full mb-3 p-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Numéro de téléphone 2"
          className="w-full mb-3 p-2 rounded-lg"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full mb-4 p-2 rounded-lg"
        />

        <select name="" id="" value={type}  onChange={(e) => setType(e.target.value)}
        className='rounded-md py-2 px-4 bg-white/30 backdrop-blur-md
        text-black text-xl font-extralight outline-none'>
        <option value="Ad">Admin</option>
        <option value="Do">Docteur</option>
        <option value="Cl">Client</option>
        </select>
        
        {type === "Do" &&
        <input
          type="number"
          placeholder="Année d'éxpérience"
          className="w-full mb-3 p-2 rounded-lg"
        />
        }
      

      <div className="flex flex-col">
        <button
          className="bg-blue-700 text-white 
        px-7 py-2 rounded-lg transition-all hover:scale-95 
        border border-white cursor-pointer"
        >
          S'inscrire
        </button>
      </div>
      </div>

      <p
        onClick={() => {
          openLogin();
        }}
        className=" text-center mt-3 mx-auto cursor-pointer  
        text-sm font-medium underline"
      >
        Déjà un compte ?
      </p>
    </div>
  );
}
