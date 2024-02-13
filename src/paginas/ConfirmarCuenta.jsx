import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";

function ConfirmarCuenta() {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmar_cuenta = async () => {
      try {

        const url = `/veterinarios/confirmar/${id}`;
        
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);

        console.log(data.msg);
        
        return;
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
    confirmar_cuenta();
  }, []); // Se pone un array vacio para que se ejecute una sola vez cuando el componente este listo


  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-black text-7xl pl-7">Confirma tu Cuenta y Comienza a Administrar {""} <span className="text-black">tus Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {! cuentaConfirmada && (
              <>
                <p className="text-xl mt-8 mb-10 text-center text-indigo-600 font-bold">La cuenta ya fue confirmada anteriormente, inicia sesión</p>
                <Link
                  className="block text-center my-5 text-gray-500"
                  to="/">Iniciar Sesión</Link>
              </>
            )}

            {cuentaConfirmada && (
              <>
                <p className="text-xl mt-8 mb-10 text-center text-indigo-600 font-bold">Cuenta confirmada correctamente, inicia sesión</p>
                <Link
                  className="block text-center my-5 text-gray-500"
                  to="/">Iniciar Sesión</Link>
              </>
            )}
        </div>
    </>
  )
}

export default ConfirmarCuenta
