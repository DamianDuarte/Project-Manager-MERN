import React, { useEffect, useRef } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useForm } from '../hooks/useForm';
import { Alert } from './Alert';
import { useParams } from 'react-router-dom';

export const FormProject = () => {
    
    
    const { alert, showAlert, storeProject, project } = useProjects();

    const {id} = useParams();
    
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputdateExpire = useRef(null);
    const inputClient = useRef(null);
    
    
    const { loading, formValues, handleInputChange, reset, setFormValues} = useForm({
      name: '',
      description: '',
      dateExpire: '',
      client: '',
    })
    
    
    let { name, description, dateExpire, client } = formValues;
            
        useEffect(() =>{
          
          if(id){
            inputName.current.value = project.name;
            inputDescription.current.value = project.description;
            inputdateExpire.current.value = dateExpire.split('T')[0];
            inputClient.current.value = project.client;
            
            setFormValues({
              name : project.name,
              description : project.description,
              dateExpire : project.dateExpire.split('T')[0],
              client : project.client
            })

          }
        }, [id]);


      const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if([name, description, dateExpire, client].includes('')) 
        {
            showAlert('Todos los campos son obligatorios');
            return null;
        }

        storeProject({ 
          id: id ? id: null,
          name, 
          description,
          dateExpire,
          client,
         })
       
    }

    return (
        <form
          className="bg-purple-100 p-5   bg-opacity-40 mt-10  bshadw py-5 px-5 md:w-4/4 lg:w-3/4 rounded-md border-2 border-purple-900"
          onSubmit={handleSubmit} 
        >
            {
                alert.msg && <Alert {...alert}/>
            }
         
          <div className="mb-5">
            <label
              htmlFor="name"
              className="text-purple-900 uppercase font-bold text-sm"
            >
              Nombre Proyecto
            </label>
            <input
              id="name"
              type="text"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"            
              placeholder="Nombre del proyecto"
                name="name"
                value={name}
                onChange={handleInputChange}
                ref={inputName}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="text-purple-900 uppercase font-bold text-sm"
            >
              Descripción
            </label>
            <textarea
              id="description"
              type="text"
              style={{ resize: "none" }}
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
             
              placeholder="Descripción del proyecto"
                name="description"
                value={description}
                onChange={handleInputChange}
                ref={inputDescription}

            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="date-expire"
              className="text-purple-900 uppercase font-bold text-sm"
            >
              Fecha de entrega
            </label>
            <input
              id="date-expire"
              type="date"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
              name='dateExpire'
                value={dateExpire}
                onChange={handleInputChange}
                ref={inputdateExpire}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="client"
              className="text-purple-900 uppercase font-bold text-sm"
            >
              Nombre Cliente
            </label>
            <input
              id="client"
              type="text"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 bg-purple-100"
    
              placeholder="Nombre del cliente"
                name="client"
                value={client}
                onChange={handleInputChange}
                ref={inputClient}
            />
          </div>
          <button className={`${false ? "bg-purple-500" : "bg-purple-800"} w-full p-3 uppercase font-bold text-white rounded-lg ${false ? "hover:bg-purple-600" : "hover:bg-purple-900"}  transition-colors`}>
            {false ? "actualizar cambios" : "guardar proyecto"}
          </button>
        </form>
      );

}