import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { useForm } from '../hooks/useForm';
import { Alert } from './Alert';

export const FormProject = () => {
    
    
    const { alert, showAlert, storeProject } = useProjects();

    const { formValues, handleInputChange, reset} = useForm({
        name: '',
        description: '',
        expireDate: '',
        client: ''
    })

    const { name, description, expireDate, client } = formValues;

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if([name, description, expireDate, client].includes('')) 
        {
            showAlert('Todos los campos son obligatorios');
            return null;
        }

        storeProject({ name, description, expireDate, client })
       
    }

    return (
        <form
          className="bg-white py-5 px-5 md:w-4/4 lg:w-3/4 rounded-md border-2"
          onSubmit={handleSubmit} 
        >
            {
                alert && <Alert {...alert}/>
            }
         
          <div className="mb-5">
            <label
              htmlFor="name"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Nombre Proyecto
            </label>
            <input
              id="name"
              type="text"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"            
              placeholder="Nombre del proyecto"
                name="name"
                value={name}
                onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Descripción
            </label>
            <textarea
              id="description"
              type="text"
              style={{ resize: "none" }}
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
             
              placeholder="Descripción del proyecto"
                name="description"
                value={description}
                onChange={handleInputChange}

            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="date-expire"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Fecha de entrega
            </label>
            <input
              id="date-expire"
              type="date"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              name='expireDate'
                value={expireDate}
                onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="client"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Nombre Cliente
            </label>
            <input
              id="client"
              type="text"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    
              placeholder="Nombre del cliente"
                name="client"
                value={client}
                onChange={handleInputChange}
            />
          </div>
          <button className={`${false ? "bg-green-600" : "bg-sky-600"} w-full p-3 uppercase font-bold text-white rounded-lg ${false ? "hover:bg-green-500" : "hover:bg-sky-500"}  transition-colors`}>
            {false ? "actualizar cambios" : "guardar proyecto"}
          </button>
        </form>
      );

}