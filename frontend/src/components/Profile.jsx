import React from 'react'
import { useEffect, useState } from 'react'
import API from '../api'
import { useAuth } from "../context/useAuth";

export default function Profile() {
    const [user, setUser] = useState(null)

    const { user: authUser } = useAuth();

    useEffect(() => {
    const fetchUser = async () => {
        try {
        const res = await API.get('me/');
        setUser(res.data);
        } catch (error) {
        console.error(error);
        setUser(null);
        }
    };

    if (authUser) {
        fetchUser();
    } else {
        setUser(null);
    }

    }, [authUser]);

    if (!authUser) {
        return (
        <p className="text-center mt-10">
            Connectez-vous pour voir vos informations
        </p>
        );
    }

    if (!user) {
        return <p className="text-center mt-10">Chargement...</p>;
    }
    return (
    <div>
        <div className='text-center py-4 font-amarante text-3xl text-emerald-700'>Bienvenue {user.username}!</div>
        <h1 className='text-center py-4 font-lato font-black text-2xl'>Votre information personnelles:</h1>
        <div className='flex flex-col text-center max-w-sm mx-auto  p-6
        bg-white/50 backdrop-blur-md font-amarante rounded-2xl shadow-2xl'>
            <h2 className='underline font-semibold' >Nom: </h2>
            <p> {user.first_name} </p>

            <h2 className='underline font-semibold' >Prénoms: </h2>
            <p> {user.last_name} </p>

            <h2 className='underline font-semibold'>Nom d'utilisateur: </h2>
            <p> {user.username} </p>

            <h2 className='underline font-semibold'>Age: </h2>
            <p>{user.age} </p>

            <h2 className='underline font-semibold'>Email: </h2>
            <p>{user.email} </p>

            <h2 className='underline font-semibold'>Adresse: </h2>
            <p>{user.adresse} </p>

            <h2 className='underline font-semibold'>Téléphone 1: </h2>
            <p>{user.telephone1} </p>

            <h2 className='underline font-semibold'>Téléphone 2: </h2>
            <p>{user.telephone2} </p>

            <h2 className='underline font-semibold'>Role: </h2>
            <p>{user.role} </p>

            <h2 className='underline font-semibold'>Année d'éxpérience: </h2>
            <p>{user.annee_experience} </p>



        </div>
    </div>
    )
}
