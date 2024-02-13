import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const CambiarPassword = () => {

    const { guardarPassword } = useAuth();

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });

    const handleSumit = async e => {
        e.preventDefault();
        
        if ( Object.values(password).some( campo => campo === '' ) ) {
            setAlerta({
                msg: 'Ambos campos son obligatorios',
                error: true
            });
            
            setTimeout(() => {
                setAlerta({});
            }, 3000);

            return;
        }

        if ( password.pwd_nuevo.length < 6 ) {
            setAlerta({
                msg: 'El Password debe tener como mínimo 6 caracteres',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 3000);
            
            return;
        }

        const respuesta = await guardarPassword(password);

        setAlerta(respuesta);

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    const { msg } = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>

        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Password aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta 
                    alerta={alerta}
                />}

                <form
                    onSubmit={handleSumit}
                >
                    <div className="my-3">
                        <label className="uppercase text-gray-600 font-bold">
                            Password Actual
                        </label>
                        <input 
                            type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            name="pwd_actual"
                            placeholder="Escribe tu password actual"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase text-gray-600 font-bold">
                            Password Nuevo
                        </label>
                        <input 
                            type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            name="pwd_nuevo"
                            placeholder="Escribe tu nuevo password"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword