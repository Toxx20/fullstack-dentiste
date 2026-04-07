import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


import Navbar from "./layout/Navbar"
import Rdv from "./components/Rdv";
import Footer from "./layout/Footer"
import Liste_rdv from "./components/Liste_rdv";
import Profile from "./components/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rdv_edit from "./components/Rdv_edit";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <BrowserRouter>
    <main className="flex flex-col min-h-screen w-full bg-linear-to-b
    from-cyan-100 to-cyan-200 via-cyan-300">

      {/* HEADER */}
      <header className="py-5 container mx-auto">
        <Navbar setShowLogin={setShowLogin}/>
      </header>

      {/* CONTENT */}
      <div className="w-full flex-1">
        <div className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/ajouter" element={<Rdv />}/>
          <Route path="/" element={<Liste_rdv/>} />
          <Route path="/profile" element={<Profile/>} />
          {/* <Route path="/rdv-info" element={<Rdv_info/>} /> */}
          <Route path="/rdv/:id/edit/" element={<Rdv_edit/>} />
        </Routes>
      </div>
      </div>

      {/* FOOTER */}
      <footer className="justify-end w-full py-5">
        <div className="">
        <Footer/>
        </div>
      </footer>

      {/* LOGIN MODAL */}
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            
            {/* background flou */}
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              //onClick={() => setShowLogin(false)}
            ></div>

            {/* contenu du login */}
            <div className="relative z-10">
              <Login 
              close={() => setShowLogin(false)}
              openRegister={() => {
                setShowRegister(true)
                setShowLogin(false)
              }}
              />
              
            </div>
          </div>
        )}

        {/* REGISTER MODAL */}
        {showRegister && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            
            {/* background flou */}
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              //onClick={() => setShowRegister(false)}
            ></div>

            {/* contenu du register */}
            <div className="relative z-10">
              <Register 
              close={() => setShowRegister(false)}
              openLogin={() => {
                setShowRegister(false)
                setShowLogin(true)
              }}

              />
            </div>

          </div>
        )}

    </main>
    </BrowserRouter>
  )
}

export default App
