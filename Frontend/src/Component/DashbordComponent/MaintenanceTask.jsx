import React from 'react'
import MaintenanceTaskInputForm from './MaintenanceTaskInputForm'
import MaintenanceTaskOutputForm from './MaintenanceTaskOutputForm'
const MaintenanceTask = ({AddMaintenaceData , AddMaintenace , ContTask , deleteTask}) => {
  return (
    <div>
        <MaintenanceTaskInputForm AddMaintenaceData={AddMaintenaceData} />
        <MaintenanceTaskOutputForm AddMaintenace={AddMaintenace} ContTask={ContTask} deleteTask={deleteTask}/>
    </div>
  )
}

export default MaintenanceTask