import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";



export const RecoverPassword = () => {

    const [alert, setAlert] = useState({});

    const [password, setPassword] = useState("");

    const [tokenChecked, setTokenChecked] = useState(false);

    const {token} = useParams();
    const navigate = useNavigate();

    const handleShowAlert = (msg) => {
        setAlert({msg});
        setTimeout(() => {
            setAlert({});
        }, 3000);
    }

    useEffect(() => {
      const checkToken = async () => {
        try{

          const {data} = await clientAxios.get(`/auth/reset-password?token=${token}`);
          console.log(data);
          setTokenChecked(true);

        }
        catch(error){
          console.error(error);
          handleShowAlert(error.response.data.msg);
        }
      }

      checkToken();

    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!password){
        return handleShowAlert("Escribí tu nueva contraseña");
      }

      try{
      const {data} = await clientAxios.post(`/auth/reset-password?token=${token}`, {password})

      Swal.fire({
        icon: 'info',
        title: 'Contraseña reestablecida',
        text: data.msg,
        confirmButtonText: 'Iniciar sesión',
        allowOutsideClick: false
      }).then((result) => {
        if(result.isConfirmed){
          navigate('/');
        }
      }
      )

    }
    catch(error){
      console.error(error);
      handleShowAlert(error.response.data.msg);
    }
  }

    return (
      <>
        <h1 className="text-purple-800 font-black text-3xl capitalize">
          Reestablecé tu contraseña
        </h1>
        {
          alert.msg && <Alert {...alert} />
        }
        {
          tokenChecked &&
          (
            <form
            onSubmit={handleSubmit}
            className="my-10 p-8 bg-white rounded-lg border bshadw"
            noValidate
          >
            <div className="my-5">
              <label
                htmlFor="password"
                className="text-purple-500 block font-bold uppercase"
              >
                Nueva contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Escribí tu nueva contraseña"
                className="w-full mt-3 p-3 border rounded focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-800 w-full py-3 text-white uppercase font-sans rounded  hover:bg-purple-900 transition-colors mb-4 "
            >
              Reestablecer tu contraseña
            </button>
          </form>
          )
        }
  
       
      </>
    );
  };
  