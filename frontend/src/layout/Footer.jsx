import React from 'react'

export default function Footer() {
    return (
    <div className='flex gap-3 justify-between px-4 text-white bg-gray-600 py-7'>
        {/* Date + tout droit résérvé */}
        <div>
            © {new Date().getFullYear()}
            – Tous droits réservés
        </div>
        {/* A propos */}
        <div>
            <a href="#" className='transition-all hover:text-amber-200'>A propos</a>
        </div>
        {/* Contact */}
        <div>
            <a href="#"className='transition-all hover:text-amber-200'>Contact</a>
            
        </div>
    </div>
    )
}
