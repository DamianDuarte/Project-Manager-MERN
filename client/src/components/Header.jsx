import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Header = () => {

    const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

    const handleLogout = () =>
  {
    setAuth({});
    sessionStorage.removeItem('token');
    navigate('/');
  }

    return (
        <div className="px-4 py-5 bg-white bshadw bg-opacity-40 border-b border-purple-900">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h2 className="text-4xl text-purple-900 font-black md:w-1/4">Projects Manager</h2>
            <input type="text" placeholder="Buscar projecto..." className="rounded-lg w:3/3 md:w-1/3 lg:w-1/3 p-2 border bshadw focus:outline-none  focus:ring-purple-800  bg-purple-200"/>
            <div className="flex justify-between items-center gap-4">
                <Link
                 to='/projects'
                 className="font-bold uppercase text-white"
                >
                    Proyectos
                </Link>
                <button
                type="button"
                 onClick={handleLogout}
                className="text-white text-sm bg-purple-800 p-2 rounded-md uppercase font-bold hover:bg-purple-900 transition-colors"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    </div>
    )
}
