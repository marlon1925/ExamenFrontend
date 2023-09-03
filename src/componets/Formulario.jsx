import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";

export const Formulario = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();
    const [mensaje, setMensaje] = useState({});
    
    const onSubmit = async (data) => {
        try {
            if (paciente?._id) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`;
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, data, options);
                navigate('/dashboard/listar');
            } else {
                const token = localStorage.getItem('token');
                data.id = auth._id;
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post(url, data, options);
                navigate('/dashboard/listar');
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>The pet's name: </label>
                <Controller
                    name='nombre'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Only letters are accepted',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='The pets name'
                                maxLength={20}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='propietario:'
                    className='text-gray-700 uppercase font-bold text-sm'>Owner name: </label>
                <Controller
                    name='propietario'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Only letters are accepted',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Enter owner name'
                                maxLength={20}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email',
                        },
                        
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Enter the owner email'
                                maxLength={60}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <Controller
                    name='celular'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Valid phone with 10 digits',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Owner cell phone'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'>Conventional telephone: </label>
                <Controller
                    name='convencional'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[0-9]{15}$/,
                            message: 'Valid phone with 15 digits',
                        },
                        }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Enter the conventional number'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='Salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Departure date: </label>
                <Controller
                    name='salida'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="date"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Enter the departure date'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            
            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Symptoms:</label>
                <Controller
                    name='sintomas'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio'
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <textarea
                                {...field}
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Enter pets symptoms'
                                maxLength={200}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor="image" className="text-gray-700 uppercase font-bold text-sm">
                Patient photo:
                </label>
                <div className="mb-5 form-floating">
                    <input
                        className="form-control"
                        id="image"
                        type="file"
                        placeholder="Select an image..."
                        required
                        name="image"
                    />
                    <label htmlFor="image">Image</label>
                </div>
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?._id ? 'Actualizar paciente' : 'Registrar paciente'}
            />

        </form>
    )
}
 