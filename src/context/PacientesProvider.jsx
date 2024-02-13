import { createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

    const { auth } = useAuth();

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
      const obtenerPacientes = async () => {
          try {
            const token = localStorage.getItem('token');

            if ( !token ) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios('/pacientes', config);

            setPacientes(data);

            return;
          } catch (error) {
            console.log(error.response.data.msg);
          }

          setCargando(false);
        }
        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {
      
      const token = localStorage.getItem('token');
    
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
      };

      if ( paciente.id ) {

        try {
          const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

          const pacienteActualizado = pacientes.map( pacienteState => pacienteState._id === 
              data._id ? data : pacienteState );

          setPacientes(pacienteActualizado);
        } catch (error) {
          console.log(error.response.data.msg);
        }
        
      } else {

        try {
            const { data } = await clienteAxios.post('/pacientes', paciente, config);
  
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
  
            setPacientes([pacienteAlmacenado, ...pacientes]);
        } catch (error) {
            console.log(error.response.data.msg)
        }
      }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
      const confirmar = confirm('¿Estás seguro que deseas eliminar este registro?');

      if ( confirmar ) {
        try {
          const token = localStorage.getItem('token');
    
          const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
          };

          const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

          const pacienteActualizado = pacientes.filter( pacientesState => pacientesState._id !== id );

          setPacientes(pacienteActualizado);

          alert('¡Paciente Eliminado Correctamente!');
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
      <PacientesContext.Provider
          value={{
              pacientes,
              guardarPaciente,
              setEdicion,
              paciente,
              eliminarPaciente
          }}
      >
          {children}
      </PacientesContext.Provider>
    )
}

export default PacientesContext;
