import React, { useEffect } from 'react'
import { ProjectPreview } from '../components/ProjectPreview'
import { useProjects } from '../hooks/useProjects'

export const Projects = () => {
 
  const {loading, alert, projects, getProjects} = useProjects();

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <>
    <div className='bg-purple-100 rounded-md bg-opacity-40 p-3 bshadw'>
    <h1
     className='text-4xl font-bold text-purple-900'
    >
      Proyectos
    </h1>
    <div
     className='bg-purple-200 p-5   bg-opacity-80 mt-10 rounded-md'
    >
      {
        loading
        ?
        <p>Cargando...</p>
        :
        projects.length
        ?
        projects.map(project => <ProjectPreview key={project._id}{...project}/>)
        :
        <p>No hay proyectos agregados</p>
      
      }
    </div>
    </div>
    </>
    
  )
}
