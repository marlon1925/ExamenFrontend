import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import Mensaje from "../Alertas/Mensaje"
import { useForm, Controller } from "react-hook-form";


const FormularioPerfil = () => {
    const [mensaje, setMensaje] = useState({})
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            id: auth._id,
            nombre: auth.nombre || "",
            apellido: auth.apellido || "",
            direccion: auth.direccion || "",
            telefono: auth.telefono || "",
            email: auth.email || ""
        }
    });

    const onSubmit = async (data) => {
        if (Object.values(data).includes("")) {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        const resultado = await actualizarPerfil(data);
        setMensaje(resultado);
        setTimeout(() => {
            setMensaje({});
        }, 3000);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            <div>
                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Full name:
                </label>
                <Controller
                    name="nombre"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Only letters are accepted',
                        },
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="text"
                                placeholder="Enter your name"
                                maxLength={20}
                                className={`block w-full rounded-md border ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                required
                            />
                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor="apellido"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Last name:
                </label>
                <Controller
                    name="apellido"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Campo Obligatorio",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Only letters are accepted',
                        },
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="text"
                                placeholder="Enter your last name"
                                maxLength={20}
                                className={`block w-full rounded-md border ${errors.apellido ? "border-red-500" : "border-gray-300"
                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                required
                            />
                            {errors.apellido && (
                                <p className="text-red-500 text-sm">{errors.apellido.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor="direccion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Address:
                </label>
                <Controller
                    name="direccion"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Campo Obligatorio"
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="text"
                                placeholder="Enter your address"
                                maxLength={150}
                                className={`block w-full rounded-md border ${errors.direccion ? "border-red-500" : "border-gray-300"
                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                required
                            />
                            {errors.direccion && (
                                <p className="text-red-500 text-sm">{errors.direccion.message}</p>
                            )}
                        </div>
                    )}
                />
                {errors.direccion && (
                    <p className="text-red-500 text-sm">{errors.direccion.message}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="telefono"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Phone:
                </label>
                <Controller
                    name="telefono"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Campo Obligatorio",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Valid phone with 10 digits',
                        },
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="text"
                                placeholder="Enter your phone"
                                className={`block w-full rounded-md border ${errors.telefono ? "border-red-500" : "border-gray-300"
                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                required
                            />
                            {errors.telefono && (
                                <p className="text-red-500 text-sm">{errors.telefono.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Email:
                </label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Campo Obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email",
                        },
                        maxLength: {
                            value:100,
                            message: "Maximum length reached",
                        },
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                maxLength={100}
                                className={`block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                value="Actualizar"
            />
        </form>
    );
};

export default FormularioPerfil;