import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NuevoPassword() {

  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);

  const params = useParams();

  const { token } = params;

  console.log(token);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);

        setAlerta({
          msg: 'Coloca tu Nuevo Password'
        })

        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error en el enlace',
          error: true
        })
      }
    }
    comprobarToken();
  }, []);


  const handleSubmit = async e => {
    e.preventDefault();

    if ( password.length < 6 ) {
      setAlerta({
        msg: 'El Password debe ser mínimo de 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg
      })

      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-7xl pl-7">Reestablece tu Password y no pierdas a  {""} <span className="text-black">tus Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta 
                alerta={alerta}
            />}

            
            { tokenValido && (
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nuevo Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Tu Nuevo Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <input 
                    type="submit"
                    value="Reestablecer Contraseña"
                    className="border w-full py-3 px-10 mt-5 bg-indigo-700 text-white rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto md:"
                />
              </form>
            )}

            { passwordModificado && (
              <Link
                  className="block text-center my-5 text-gray-500"
                  to="/">Inicia Sesión</Link>
            )}

        </div>
    </>
  )
}

export default NuevoPassword
