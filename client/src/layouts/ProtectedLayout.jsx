import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import useAuth from "../hooks/useAuth";



export const ProtectedLayout = () => {

    const {auth, loading} = useAuth()

    if(loading){
        return <h1>Cargando...</h1>
    }

    return (
      <>
      {auth._id ? (
       <div>
       <Header />
       <div className="md:flex md:min-h-screen">
         <Sidebar />
         <main className="flex-1 p-10">
           <Outlet />
         </main>
       </div>
     </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
    );     
};
     
