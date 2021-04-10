import React, { useState } from 'react'
import { Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import BackBtn from '../uikit/BackBtn'
import MemberHomeMemberInfoAria from './MemberHomeMemberInfoAria'
import MemberHomeHouseworkAria from './MemberHomeHouseworkAria'

const useStyles = makeStyles({
  root: {
    display: 'grid',
    height: '100%',
    gridTemplateRows: '40px 10px 150px 10px 1fr',
    overflow: 'hidden',
  },
  btn_back: {
    margin: '8px 16px',
    width: 30,
    fontSize: 16,
  },
})
const ContentsArea = ({ memberInfo, houseworkListInfo, handleBackHome, handleFinishBtn }) => {
  const classes = useStyles()
  const [earnedPoint, setEarnedPoint] = useState('')
  const [isActiveBudge, setIsActiveBudge] = useState(false)
  //TODO 他の要素をクリックしたときに、setEarndedPoinitを使えるようにする => isDoneでいいんじゃ？
  //TODO 同じポイントのものもあるから、budgeのtoggleを別なものにする？
  const toggleBudge = (point, isDone) => {
    // setEarnedPoint(point)
    if (isDone) {
      //家事完了取り消し時
      console.log('not isdone')
      setEarnedPoint(null)
      console.log({ earnedPoint })
      setIsActiveBudge(false)
      console.log({ isActiveBudge })
    } else {
      //完了時
      console.log('is done')
      setEarnedPoint(point)
      console.log({ earnedPoint })
      setIsActiveBudge(true)
      console.log({ isActiveBudge })
    }
  }

  return (
    <div className={classes.root}>
      <BackBtn className={classes.btn_back} handleBack={handleBackHome} />
      <Divider className={classes.divider} />
      <MemberHomeMemberInfoAria memberInfo={memberInfo} earnedPoint={earnedPoint} isActiveBudge={isActiveBudge} />
      <Divider className={classes.divider} />
      <MemberHomeHouseworkAria
        houseworkListInfo={houseworkListInfo}
        memberInfo={memberInfo}
        handleFinishBtn={handleFinishBtn}
        toggleBudge={toggleBudge}
      />
    </div>
  )
}

export default ContentsArea
