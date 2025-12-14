import React, { useState } from 'react'
import CoachInputForm from './CoachInputForm'
import CoachOutputForm from './CoachOutputForm'
const CoachProfile = ({CountCoachData , AddCoachData , AddCoach}) => {

  return (
    <div>
        <CoachInputForm AddCoachData={AddCoachData}/>
        <CoachOutputForm AddCoach={AddCoach} CountCoachData={CountCoachData}/>
    </div>
  )
}

export default CoachProfile