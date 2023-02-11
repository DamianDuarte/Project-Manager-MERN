import React from "react";

export const Task = () =>{

    return(
        <div className="flex justify-between bg-purple-200 p-5 mb-3 bg-opacity-80 mt-5 rounded-md">
        <div>
          <p className="mb-1 text-xl">Tarea</p>
          <p className="mb-1 text-sm text-purple-900 uppercase">Descripción</p>
          <p className="mb-1 text-xl">Fecha de entrega</p>
          <p className="mb-1 text-purple-900">Prioridad</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-start gap-2">
          <button className="bg-purple-800  p-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-purple-900 transition-colors">
            Editar
          </button>
  
          {false ? (
            <button className="bg-green-600 p-2 text-white uppercase font-bold text-sm rounded-lg">
              Completa
            </button>
          ) : (
            <button className="bg-red-300 p-2 text-white uppercase font-bold text-sm rounded-lg">
              Incompleta
            </button>
          )}
  
          <button className="bg-red-400 p-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-600 transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    )

}