import React, { useState } from 'react'
import { Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import BackBtn from '../uikit/BackBtn'
import MemberHomeMemberInfoAria from '../components/MemberHomeMemberInfoAria'
import MemberHomeHouseworkAria from '../components/MemberHomeHouseworkAria'
import Cash from './Cash'
import Exchange from './Exchange'

const useStyles = makeStyles({})
const ContentsArea = ({ memberInfo, houseworkListInfo, handleFlag, handleFinishBtn, isPage, flag }) => {
  const classes = useStyles()
  const [clickedHousework, setClikedHousework] = useState({})

  const toggleBudge = (housework) => {
    const { isDone, earnedPoint } = housework

    handleFinishBtn(housework) //housework状態を登録
    setClikedHousework(housework)
  }

  if (isPage === 'isHome') {
    return (
      <>
        <MemberHomeMemberInfoAria memberInfo={memberInfo} clickedHousework={clickedHousework} />
        <Divider className={classes.divider} />
        <MemberHomeHouseworkAria
          houseworkListInfo={houseworkListInfo}
          memberInfo={memberInfo}
          handleFinishBtn={handleFinishBtn}
          toggleBudge={toggleBudge}
        />
      </>
    )
  } else if (isPage === 'isExchange') {
    return <Exchange isPage={isPage} flag={flag} handleFlag={handleFlag} />
  } else if (isPage === 'isCash') {
    return <Cash isPage={isPage} flag={flag} handleFlag={handleFlag} />
  } else {
    return 'nothing page'
  }
}

export default ContentsArea
