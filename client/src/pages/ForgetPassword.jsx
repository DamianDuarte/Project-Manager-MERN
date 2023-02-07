import { useState } from "react";
import { Await, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

export const ForgetPassword = () => {

  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if(!email) {
      return handleShowAlert("El campo email es obligatorio");
    }

    try {
      
      setSending(true);

     const {data} = await clientAxios.post("/auth/send-token", {email});
     
      setSending(false);

     Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: data.msg,
        confirmButtonText: 'Iniciar sesión',
        allowOutsideClick: false
     })

     setEmail("");


    } catch (error) {
      handleShowAlert(error.response.data.msg);
      setEmail("");
    }
  }

  const handleShowAlert = (msg) => {
    setAlert({msg});
    setTimeout(() => {
      setAlert({});
    },3000);
  }

  return (
    <>
      <h1 className="text-purple-800 font-black text-3xl capitalize">
        Recupera tu acceso 
      </h1>
      {
        alert.msg && ( <Alert {...alert} /> )
      }

      <form
        onSubmit={handleSubmit}
        className="my-10 p-8 bg-white rounded-lg border bshadw"
        noValidate
      >
        <div className="my-5">
          <label htmlFor="email" className="text-purple-500 block font-bold uppercase">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button
          type="submit"
          className="bg-purple-800 w-full py-3 text-white uppercase font-sans rounded  hover:bg-purple-900 transition-colors mb-4"
          disabled={sending}
        >
          Recuperar contraseña
        </button>
      </form>
      <nav className="md:flex md:justify-between">
        <Link
          to={"/register"}
          className=" text-purple-500 block text-center my-3 text-sm uppercase "
        >
          ¿No tenés una cuenta? Registrate
        </Link>
        <Link
          to={"/"}
          className=" text-purple-500 block text-center my-3 text-sm uppercase "
        >
          ¿Estás registrado? Iniciá sesión
        </Link>
      </nav>
    </>
  );
};
