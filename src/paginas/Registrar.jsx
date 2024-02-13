import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

function Registrar() {
    
    // Declaración del hook de los states
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');

    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        // Valida si algún campo del formulario está vacío
        if ( [nombre, email, password, repetirPassword].includes('') ) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if ( password !== repetirPassword ) {
            setAlerta({ msg: 'Los Password no son iguales', error: true });
            return;
        }

        if ( password.length < 6 ) {
            setAlerta({ msg: 'El Password es muy corto, ingresa mínimo 6 caracteres', error: true });
            return;
        }

        setAlerta({});

        // Crear el Usuario en la API
        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password });

            setAlerta({
                msg: 'Creado correctamente, revisa tu Email',
                error: false
            });
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
            <h1 className="text-indigo-600 font-black text-7xl pl-7">Crea una cuenta y Administra {""} <span className="text-black">tus Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta 
                alerta={alerta}
            />}

            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre
                    </label>
                    <input 
                        type="text"
                        placeholder="Tu Nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Repetir Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Repite tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repetirPassword}
                        onChange={ e => setRepetirPassword(e.target.value) }
                    />
                </div>

                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="border w-full py-3 px-10 mt-5 bg-indigo-700 text-white rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto md:"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-gray-500"
                    to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar
