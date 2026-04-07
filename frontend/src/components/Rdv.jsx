import React from 'react'
import Image from '../assets/cabinet2.jpg'
import API from '../api'
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";



export default function Rdv() {
    
    const [type, setType] = useState('AU')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [nom,setNom]= useState('')
    const [clients, setClients] = useState([])  
    const navigate = useNavigate(); 


    useEffect(() => {
    const fetchClients = async () => {
        try {
            const res = await API.get('/utilisateurs/')
            console.log(res.data)
            setClients(res.data)
        } catch (error) {
            console.error('Erreur fetch clients:', error)
        }
    }
    fetchClients()
}, [])

    const handleSubmit = async (e) => {
    e.preventDefault() // empêche le reload de la page
    try {
    const response = await API.post('/create/', { 
        type: type,
        date: date,
        description: description,
        nom_id: nom
    })
    console.log('Réponse backend:', response.data)
    alert('Rendez-vous créé !')
    // reset du formulaire
    setType('AU')
    setDate('')
    setDescription('')
    setNom('')
    
    navigate("/")
    
    } catch (error) {
    console.error('Erreur lors de la création:', error)
    alert('Erreur lors de la création du rendez-vous.')
    console.error("Erreur lors de la création:", error.response?.data)

    }
    }

    return (
        <div>
            <div className=' hidden md:flex justify-between gap-2 pb-5'>
                {/* texte à gauche */}
                <div className=' font-amarante max-w-md text-3xl text-emerald-700'>
                    Sublimez Votre Sourire 
                    Grâce à des Soins Dentaires Experts.
                </div>
                {/* texte à droite */}
                <div className='pl-8 flex text-md  max-w-md justify-end items-end text-emerald-700 '>
                    Profitez d'une visite sereine centrée sur vous.
                    Grâce à nos soins délicats et
                    nos technologies avancées,
                    retrouvez un sourire que vous serez fier de montrer.
                </div>
            </div>
    
            {/* Texte sur mobile */}
            <div className=' flex md:hidden flex-col justify-center items-center gap-y-3 pb-5'>
                {/* texte à gauche */}
                <div className=' font-amarante max-w-md text-3xl text-emerald-700'>
                    Sublimez Votre Sourire 
                    Grâce à des Soins Dentaires Experts.
                </div>
                {/* texte à droite */}
                <div className=' flex text-md  max-w-md text-emerald-700'>
                    Profitez d'une visite sereine centrée sur vous.
                    Grâce à nos soins délicats et
                    nos technologies avancées,
                    retrouvez un sourire que vous serez fier de montrer.
                </div>
            </div>
    
    
            <div className='relative'>
                {/* fond */}
                <div className=''>
                    <img src={Image} 
                    className='border-gray-500 
                    border-2 rounded-2xl  
                    h-100 w-full object-cover 
                    ' alt="image" />
                </div>
                {/* formulaire */}
                <div className='absolute 
                inset-0 flex justify-end 
                items-center p-6'>
                    <form onSubmit={handleSubmit}>
                        <div className=' flex flex-col gap-y-4 p-6 rounded-xl'>
                            <h2 className=' text-xl font-bold'> Prendre un rendez-vous!</h2>
                            <select
                            className='rounded-md py-2 px-4 bg-white/30 backdrop-blur-md
                            text-black text-xl font-extralight outline-none'
                            value={type} onChange={(e) => setType(e.target.value)}
                            >
                            <option value="A">Appareil</option>
                            <option value="AU">Autre</option>
                            <option value="B">Blanchir</option>
                            <option value="S">Soin</option>
                            </select>
                        
                            <input type="datetime-local" 
                            className='rounded-md py-2 px-4
                            bg-white/30 backdrop-blur-md text-black 
                            text-xl font-extralight outline-none' 
                            value={date}  onChange={(e) => setDate(e.target.value)}
                            required
                            />
    
                            <textarea  placeholder='description'
                            className='rounded-md py-2 px-4
                            bg-white/30 backdrop-blur-md text-black 
                            text-xl font-extralight outline-none' 
                            value={description} onChange={(e) => setDescription(e.target.value)}
                            required/>

                            <select
                            className='rounded-md py-2 px-4 bg-white/30 backdrop-blur-md
                            text-black text-xl font-extralight outline-none'
                            value={nom} onChange={(e) => setNom(e.target.value)} required
                            >
                            <option value='' className='text-black bg-white'>-- Choisir un client --</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id} className='text-black bg-white'>
                                    {client.username} 
                                </option>
                            ))}
                            </select>
    
                            <button type='submit' className='bg-lime-400 rounded-md text-white font-bold py-2 border-2 border-white transition-all hover:scale-110 duration-300 hover:text-amber-400 cursor-pointer'> Valider</button>
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
