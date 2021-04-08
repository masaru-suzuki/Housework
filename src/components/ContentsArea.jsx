import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { Divider, withStyles } from '@material-ui/core'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Container from '@material-ui/core/Container'

import MoneyIcon from '@material-ui/icons/Money'
import { makeStyles } from '@material-ui/core/styles'
import BackBtn from '../uikit/BackBtn'
import BottomNav from '../components/BottomNav'
import MemberInfoArea from '../components/MemberInfoArea'
import HouseworkListArea from '../components/HouseworkListArea'

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
//TODO selected => color #fff
const ContentsArea = ({ memberInfo, houseworkListInfo, handleBackHome }) => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <BackBtn className={classes.btn_back} handleBack={handleBackHome} />
      <Divider className={classes.divider} />
      <MemberInfoArea memberInfo={memberInfo} />
      <Divider className={classes.divider} />
      <HouseworkListArea houseworkListInfo={houseworkListInfo} />
    </div>
  )
}

export default ContentsArea
