import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

export const Login = () => {

  const [alert, setAlert] = useState({});
  const {setAuth} = useAuth();
  const navigate = useNavigate()

  const handleShowAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }

    reset();
  };

  const { formValues, handleInputChange, reset } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      handleShowAlert("Todos los campos son obligatorios");
      return null;
    }

    try {

      const {data} = await clientAxios.post('/auth/login',{
        email,
        password
      })

      //console.log(data);

      setAuth(data.user);
      sessionStorage.setItem('token', data.token);

      navigate('/projects')
      
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response?.data.msg)
    }


  };

return (
    <>
      <h1 className='text-purple-800 font-black text-3xl capitalize'>Inicia sesión</h1>
      {
        alert.msg && <Alert {...alert} />
      }

      <form 
      onSubmit={handleSubmit}
      className='my-10 p-8 bg-white bg-opacity-10 rounded-lg border bshadw' 
      noValidate >

          <div className="my-5">
            <label htmlFor="email" className="text-purple-500 block font-bold uppercase">Correo electrónico</label>
            <input 
              id="email"
              type="email"
              placeholder="Ingrese su email"
              className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
              autoComplete='off'
              name="email"
              value={email}
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
              name="password"
              value={password}
              onChange={handleInputChange}
              />
          </div>
          <button
            type="submit"
            className="bg-purple-800 w-full py-3 text-white uppercase font-sans rounded  hover:bg-purple-900 transition-colors mb-4 "
          >
            Iniciar sessión
          </button>
      </form>
      <nav className='md:flex md:justify-between'>
        <Link
          to={'/register'}
          className=" text-purple-500 block text-center my-3 text-sm uppercase "
        >
          ¿No tenés una cuenta? Registrate
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
