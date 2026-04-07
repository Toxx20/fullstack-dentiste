import React, { useEffect, useState } from 'react'
import API from '../api'
import { useNavigate, useParams } from "react-router-dom";
import Image from '../assets/cabinet2.jpg'



export default function Rdv_edit() {

const { id } = useParams()
const [type, setType] = useState('AU')
const [date, setDate] = useState('')
const [description, setDescription] = useState('')
const [nom,setNom]= useState('')
const [clients, setClients] = useState([])  
const navigate = useNavigate(); 

        // Charger les clients ET le rdv existant
        useEffect(() => {
        const fetchData = async () => {
            const [rdvRes, clientsRes] = await Promise.all([
            API.get(`/clients/${id}/`),
            API.get('/utilisateurs/')
            ])
            const rdv = rdvRes.data
            setType(rdv.type)
            setDate(rdv.date.slice(0, 16))  // format datetime-local
            setDescription(rdv.description)
            setNom(rdv.nom.id)            
            setClients(clientsRes.data)
        }
        fetchData()
        }, [id])

        const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.patch(`/clients/${id}/`, {
            type,
            date,
            description,
            nom_id: nom
            })
            alert('Rendez-vous modifié !')
            navigate('/')
        } catch (error) {
            console.error(error.response?.data)
            alert('Erreur lors de la modification.')
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
                        <h2 className=' text-xl font-bold'> Modifier le rendez-vous!</h2>
                        <select
                        id='type'
                        className='rounded-md py-2 px-4 bg-white/30 backdrop-blur-md
                        text-black text-xl font-extralight outline-none'
                        value={type} onChange={(e) => setType(e.target.value)}
                        >
                        <option value="A">Appareil</option>
                        <option value="AU">Autre</option>
                        <option value="B">Blanchir</option>
                        <option value="S">Soin</option>
                        </select>
                    
                        <input name='date' type="datetime-local" 
                        className='rounded-md py-2 px-4
                        bg-white/30 backdrop-blur-md text-black 
                        text-xl font-extralight outline-none' 
                        value={date}  onChange={(e) => setDate(e.target.value)}
                        required
                        />

                        <textarea name='description' placeholder='description'
                        className='rounded-md py-2 px-4
                        bg-white/30 backdrop-blur-md text-black 
                        text-xl font-extralight outline-none' 
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        required/>

                        <select id='select-nom'
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
                        <div className='gap-3 flex justify-center'>
                        <button type='submit'  className='bg-lime-400 rounded-2xl px-2 text-white font-bold py-3 border-2
                        border-white transition-all hover:scale-110 duration-300
                        hover:text-amber-400 cursor-pointer'> Enregistrer</button>

                        <button type='button'  onClick={() => navigate(-1)} className='bg-blue-500 px-5 rounded-2xl
                        text-white font-bold py-3 border-2
                        border-white transition-all hover:scale-110 duration-300
                        hover:text-amber-400 cursor-pointer'> Annuler</button>

                        </div>
                    </div>
                    
                </form>
                
            </div>
        </div>
    </div>
)
}
