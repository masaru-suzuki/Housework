export const initMember = () => {
  return {
    name: '',
    birth: '',
    level: 1,
    experiencePoint: 0,
    requiredExpreriencePoint: 20,
    point: 0,
    doneDate: [],
    runningDay: 0,
    items: [],
  }
}

export const initHousework = () => {
  return {
    name: '',
    earnedPoint: '',
    earnedSkillPoint: '',
    description: '',
    isDone: false,
    doneMemberId: '',
    finishedDate: '',
  }
}
