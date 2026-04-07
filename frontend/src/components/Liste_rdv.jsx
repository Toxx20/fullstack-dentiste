import React from 'react'
import { Eye,Pencil, Trash2,UserRoundPlus } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import API from '../api'
import { useState,useEffect } from 'react';


export default function Liste_rdv() {
  const [clients, setClients] = useState([])
  const [page, setPage] = useState(1)
  const PAR_PAGE = 7
  const navigate = useNavigate()
  const[deleteId,setDeleteId] = useState(null)
  const[viewId,setViewId]= useState(null)

  const TYPE_LABELS = {
    A: "Appareil",
    AU: "Autre",
    B: "Blanchir",
    S: "Soin"
    }

    useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await API.get('/clients/')  
        setClients(res.data)
      } catch (error) {
        console.error("Erreur lors du fetch :", error)
      }
    }
    fetchClients()
  }, [])

  const totalPages = Math.ceil(clients.length / PAR_PAGE)
  const debut = (page - 1) * PAR_PAGE
  const clientsPage = clients.slice(debut, debut + PAR_PAGE)

  const handleDelete = async () => {
    try {
      await API.delete(`/clients/${deleteId}/`)
      setClients(clients.filter(c => c.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col items-center gap-2.5'>

      {/* Titre */}
      <div className='flex gap-2'>
      <Link to='/ajouter' title='ajouter'>
      <UserRoundPlus size={25} strokeWidth={2.75}
      className='text-emerald-700 hover:text-yellow-400 cursor-pointer' />
      </Link>
      <h1 className='font-amarante max-w-md text-xl text-emerald-700 sm:text-3xl'>LISTE DE RENDEZ-VOUS</h1>
      </div>

      {/* Tableau de liste client */}
      <div className='w-full overflow-x-auto' >
      <table className='table-auto min-w-full border-separate border-spacing-5'>
        <thead>
          <tr className=''>
            <th>Nom et prénoms</th>
            <th>Type de soin</th>
            <th>Date</th>
            {/* <th>Nombre de dent(s)</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsPage.map((client) => (

          <tr key={client.id} className=' text-center'>
            <td className='text-xl font-amarante'>{client.nom.username} </td>
            <td className='text-xl font-amarante'>{TYPE_LABELS[client.type]}</td>
            <td>{new Date(client.date).toLocaleString()} </td>
            <td className='flex justify-center gap-x-2 cursor-pointer'>
              <Eye size={25} strokeWidth={2.75} 
              className='text-green-400' onClick={() => setViewId(client.id)} />

              <Pencil size={25} strokeWidth={2.75} 
              className='text-blue-400'onClick={()=>navigate(`/rdv/${client.id}/edit`)}/>

              <Trash2 size={25} strokeWidth={2.75} 
              className='text-red-400' onClick={() => setDeleteId(client.id)}/>

            </td>
          </tr>
            ))}
        </tbody>
      </table>
      {/* Modal de suppression — en dehors du tableau */}
    {deleteId && (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-2xl p-6 w-80 flex flex-col gap-4 shadow-xl'>
          <h2 className='text-lg font-bold text-gray-800 underline'>Confirmer la suppression</h2>
          <p className='text-gray-600'>
            Cette action est irréversible. Voulez-vous vraiment 
            supprimer ce rendez-vous de <span className='font-bold'>{clients.find(c => c.id === deleteId)?.nom.username} </span>?
          </p>
          <div className='flex gap-3 justify-end'>
            <button
              onClick={() => setDeleteId(null)}
              className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer'
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              className='px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer'
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Modal de View — en dehors du tableau */}
    {viewId && (() => {
      const rdv = clients.find(c => c.id === viewId)
      return (
        <div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
          onClick={() => setViewId(null)} // ← ferme en cliquant dehors
        >
          <div
            className='bg-white rounded-2xl p-6 w-96 flex flex-col gap-3 shadow-xl'
            onClick={(e) => e.stopPropagation()} // ← empêche la fermeture si clic dedans
          >
            <h2 className='text-lg font-bold text-emerald-700 font-amarante text-center underline'>Détail du Rendez-vous</h2>
            
            <div className='flex flex-col gap-2 text-gray-700'>
              <p>Client : <span className='font-bold'>{rdv.nom.username}</span></p>
              <p>Email : <span className='font-bold'>{rdv.nom.email}</span></p>
              <p>Type de soin : <span className='font-bold'>{TYPE_LABELS[rdv.type]}</span></p>
              <p>Date : <span className='font-bold'>{new Date(rdv.date).toLocaleString()}</span></p>
              <p>Description : <span className='font-bold'>{rdv.description}</span></p>
            </div>

            <div className='flex justify-end gap-3 mt-2'>
              <button
                onClick={() => setViewId(null)}
                className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer'
              >
                Fermer
              </button>
              <button
                onClick={() => { navigate(`/rdv/${viewId}/edit`); setViewId(null) }}
                className='px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )
    })()}

      </div>
{/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center gap-2 mt-2'>

          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            className='px-3 py-1 rounded-lg border border-emerald-700 text-emerald-700
            disabled:opacity-30 hover:bg-emerald-700 hover:text-white transition-all cursor-pointer'
          >
            Previous
          </button>

          <span className='px-3 py-1 rounded-lg bg-emerald-700 text-white font-semibold'>
            {page}
          </span>

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className='px-3 py-1 rounded-lg border border-emerald-700 text-emerald-700
            disabled:opacity-30 hover:bg-emerald-700 hover:text-white transition-all cursor-pointer'
          >
            Next
          </button>

        </div>
      )}

      {/* Infos */}
      <p className='text-sm text-gray-400'>
        {clients.length === 0
          ? 'Aucun rendez-vous'
          : `${debut + 1}–${Math.min(debut + PAR_PAGE, clients.length)} sur ${clients.length} rendez-vous`
        }
      </p>
    </div>
  )
}
