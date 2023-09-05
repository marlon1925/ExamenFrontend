import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import Mensaje from '../componets/Alertas/Mensaje';
import logoDog from '../assets/dog-hand.webp';
import { Link } from 'react-router-dom';

const Restablecer = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({});
    const { actualizarPassword } = useContext(AuthContext);
    const [tokenback, setTokenBack] = useState(false);
    const { control, formState: { errors }, handleSubmit, reset, getValues } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`;
            const respuesta = await axios.get(url);
            if (respuesta.data) {
                setTokenBack(true);
                setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            } else {
                // Aquí puedes manejar el caso en el que la respuesta no contenga datos válidos
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || 'An error occurred', tipo: false });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);
    const onSubmit = async (data) => {
        if (data.passwordnuevo === "" || data.repeatpassword === "") {
            setMensaje({ respuesta: "All fields must be entered", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        const resultado = await actualizarPassword(data);
        setMensaje(resultado);
        setTimeout(() => {
            setMensaje({});
        }, 3000);
        reset();
    };




    const validateConfirmPassword = (value) => {
        const newPassword = getValues('passwordnuevo');
        if (value !== newPassword) {
            return 'Passwords do not match';
        }
        return true;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Welcome again</h1>
            <small className="text-gray-400 block my-4 text-sm">Please enter your details</small>
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description" />
            {tokenback && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1">
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
                                    validate: {
                                        hasUppercase: (value) => {
                                            if (!/(?=.*[A-Z])/.test(value)) {
                                                return 'Password must contain at least one uppercase letter';
                                            }
                                            return true;
                                        },
                                        hasSpecialCharacter: (value) => {
                                            if (!/(?=.*[^A-Za-z0-9])/.test(value)) {
                                                return 'Password must contain at least one special character';
                                            }
                                            return true;
                                        },
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

                        <label className="mb-2 block text-sm font-semibold">Confirm password</label>
                        <div className="relative">
                            <Controller
                                name="repeatpassword"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Repeat password is required',
                                    validate: {
                                        confirmPassword: validateConfirmPassword,
                                    },
                                }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            id='repeatpassword'
                                            type={showPassword ? 'text' : 'password'}
                                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2 ${errors.repeatpassword ? 'border-red-500' : 'border-gray-300'
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
                            {errors.repeatpassword && (
                                <p className="text-red-500 text-sm">{errors.repeatpassword.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            type="submit"
                            className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                            value='Actualizar' />
                    </div>
                </form>
            )}

            <div className="flex flex-col items-center justify-center">
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">You can now Log in</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover-bg-gray-900 hover:text-white">Login</Link>
            </div>
        </div>
    );
};

export default Restablecer;
