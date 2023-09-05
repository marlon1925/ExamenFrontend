import logoDog from '../assets/dog-hand.webp'
import { Link } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';


const Restablecer = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({});
    const [tokenback, setTokenBack] = useState(false);
    const { control, formState: { errors }} = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            setTokenBack(true)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])

    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
            const respuesta = await axios.post(url, form)
            setForm({})
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Welcome again</h1>
            <small className="text-gray-400 block my-4 text-sm">Please enter your details</small>
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description" />
            {tokenback &&
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label className="mb-2 block text-sm font-semibold">Current password</label>
                        <div className="relative">
                            <Controller
                                name="passwordactual"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Current password is required',
                                }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            id='passwordactual'
                                            type={showPassword ? 'text' : 'password'}
                                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2 ${errors.passwordactual ? 'border-red-500' : 'border-gray-300'
                                                } pr-10`}
                                            placeholder='**************'
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center justify-center focus:outline-none pr-2"
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                    </>
                                )}
                            />
                            {errors.passwordactual && (
                                <p className="text-red-500 text-sm">{errors.passwordactual.message}</p>
                            )}
                        </div>

                        <label className="mb-2 block text-sm font-semibold">New password</label>
                        <div className="relative">
                            <Controller
                                name="passwordnuevo"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'New password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long',
                                    },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[^A-Za-z0-9])/, // Requiere al menos una mayúscula y un carácter especial
                                        message: 'Password must contain at least one uppercase letter and one special character',
                                    },
                                }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            id='passwordnuevo'
                                            type={showPassword ? 'text' : 'password'}
                                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2 ${errors.passwordnuevo ? 'border-red-500' : 'border-gray-300'
                                                } pr-10`}
                                            placeholder='**************'
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center justify-center focus:outline-none pr-2"
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                    </>
                                )}
                            />
                            {errors.passwordnuevo && (
                                <p className="text-red-500 text-sm">{errors.passwordnuevo.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Send
                        </button>
                    </div>
                </form>
            }

            <div className="flex flex-col items-center justify-center">
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">You can now Log in</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
            </div>

        </div>
    )
}

export default Restablecer
