import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2'

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {


  const [alert, setAlert] = useState({});
  const [sending, setSending] = useState(false);


  const {formValues, setFormValues, handleInputChange, reset} = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formValues);

    if ([name, email, password, password2].includes('')) {
      handleShowAlert('Todos los campos son obligatorios');
      return null;
    }

    if(!exRegEmail.test(email)) {
      handleShowAlert('Email no válido');
      return null;
    }

    if(password !== password2) {
      handleShowAlert('Las contraseñas no coinciden');
      return null;
    }
    try {

      setSending(true);

      const {data} = await clientAxios.post('/auth/register',{
        name,
        email,
        password
      });

      setSending(false);

      console.log(data.msg);

      Swal.fire({
        icon: 'info',
        title: 'Gracias por registrarte!',
        text: data.msg
      });
      reset();
      
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response.data.msg);
      reset();
    }

  }

  const handleShowAlert = (msg) => {
    setAlert({msg});
    setTimeout(() => {
      setAlert({});
    }, 3000);
  }

  return (

   <>
    <h1 className='text-purple-800 font-black text-3xl capitalize'>Creá tu cuenta</h1>
    {
      alert.msg && <Alert {...alert} />
    }

    <form 
      action="" 
      className='my-10 p-8 bg-white rounded-lg border bshadw'
      onSubmit={handleSubmit}
      noValidate
    >

        <div className="my-5">
          <label htmlFor="name" className="text-purple-500 block font-bold uppercase">Nombre</label>
          <input 
            id="name"
            type="text"
            placeholder="Ingresá tu nombre"
            className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
            value={name}
            name="name"
            onChange={handleInputChange}
            />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="text-purple-500 block font-bold uppercase">Correo electrónico</label>
          <input 
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
            value={email}
            name="email"
            onChange={handleInputChange}
            
            />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="text-purple-500 block font-bold uppercase">Contraseña</label>
          <input 
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
            value={password}
            name="password"
            onChange={handleInputChange}        
            />
        </div>
        <div className="my-5">
          <label htmlFor="password2" className="text-purple-500 block font-bold uppercase">Confirma tu contraseña</label>
          <input 
            id="password2"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
            value={password2}
            name="password2"
            onChange={handleInputChange}
            />
        </div>
        <button
          type="submit"
          className="bg-purple-800 w-full py-3 text-white uppercase font-sans rounded  hover:bg-purple-900 transition-colors mb-4 disabled:bg-purple-300 disabled:cursor-not-allowed"
          disabled={sending}
        >
          Crear cuenta
        </button>
    </form>
    <nav className='md:flex md:justify-between'>
      <Link
        to={'/'}
        className=" text-purple-500 block text-center my-3 text-sm uppercase "
      >
        ¿Estás registrado? Iniciá sesión
      </Link>
      <Link
        to={'/forget-password'}
        className=" text-purple-500 block text-center my-3 text-sm uppercase "
      >
        Olvidé mi password
      </Link>
      
    </nav>
  </>
  )
}
