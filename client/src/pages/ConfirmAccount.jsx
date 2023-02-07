import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert } from "../components/Alert";
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';

export const ConfirmAccount = () => {

  const params = useParams();
  const {token} = params;

  const navigate = useNavigate();

  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({msg});
    setTimeout(() => {
      setAlert({});
    },);
  };

  useEffect(() => {
   const confirmAccount = async () => {
     try {

       const {data} = await clientAxios.get(`/auth/checked?token=${token}`);

       Swal.fire({
         icon: 'success',
          title: 'Cuenta confirmada',
          text: data.msg,
          showConfirmButtonText: 'Iniciar sesión',
          allowOutsideClick: false

       }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
       });
     } catch (error) {
       console.error(error);
       handleShowAlert(error.response.data.msg);
       navigate('/register');
     }
   }

    confirmAccount();

  }, []);

    return (
      <>
         <h1 className="text-purple-800 font-black text-3xl capitalize">
          Confirma tu cuenta
        </h1>
        <div className='mt-20 md:mt-5 bshadw px-5 py-10 rounded bg-white'>
          {
              alert.msg && ( <Alert {...alert} /> )
          }
            <> 
              <nav>
            <Link
              to={"/register"}
            >
              ¿No tenés una cuenta? Registrate
            </Link>
            <Link
              to={"/"}
            >
              ¿Estás registrado? Iniciá sesión
            </Link>
          </nav>

            </>
      
        </div>
          
      </>
    )
  }
  