import React, { useState } from 'react'
import { Formulario } from '../componets/Formulario'

const Crear = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Patients</h1>
            <hr className='my-4' />
            <p className='mb-8'>This module allows you to register a new patient</p>
            <Formulario isEditMode = {isEditMode} />
        </div>
    )
}

export default Crear