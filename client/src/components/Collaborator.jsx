import React from "react";

export const Collaborator = () => {
    return(
        <div  className="flex justify-between bg-purple-200 p-5 mb-3 bg-opacity-80 mt-5 rounded-md">
    <p className="font-bold uppercase">
      Nombre del colaborador
      <span className="text-gray-600 lowercase">
        | EMAIL
      </span>{" "}
    </p>
    <div>
  
          <button 
          className='bg-red-400 p-2 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-600 transition-colors'
       
          >
              Eliminar
          </button>
     
   
    </div>
  </div>
    );
};