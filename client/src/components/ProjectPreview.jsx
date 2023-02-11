import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({name, _id, client}) => {
  return (
    <div className='border-b border-purple-800 p-3 flex justify-between'>
        <p>
           {name}
           <span
           className='text-sm text-gray-500 uppercase'
           >
            {` | ${client}` }
           </span>
        </p>
        <Link
            to={`/projects/${_id}`}
            className="uppercase text-sm text-purple-800 hover:text-purple-900 font-bold"
        >
            Ver proyecto
        </Link>
        
    </div>
  );
};
