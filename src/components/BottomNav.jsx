import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { withStyles } from '@material-ui/core'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Container from '@material-ui/core/Container'

import MoneyIcon from '@material-ui/icons/Money'
import { makeStyles } from '@material-ui/core/styles'
import BackBtn from '../uikit/BackBtn'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import HomeIcon from '@material-ui/icons/Home'

const styles = () => {
  btnSelected: {
    color: '#000'
  }
}
const useStyles = makeStyles({
  root: {
    backgroundColor: '#525edc',
  },
  selected: {
    color: '#ccc',
  },
  bottom_nav: {
    backgroundColor: '#525edc',
    padding: 'unset',
  },
})
//TODO selected => color #fff
const BottomNav = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        // console.log(event)
        // console.log(newValue)
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        classes={{ selected: classes.selected }}
        // className={classes.nav_action}
        label="exchange"
        icon={<InsertEmoticonIcon />}
      />
      <BottomNavigationAction
        classes={{ selected: classes.selected }}
        // className={classes.nav_action}
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction classes={{ selected: classes.selected }} label="use point" icon={<AutorenewIcon />} />
    </BottomNavigation>
  )
}

export default withStyles(styles)(BottomNav)
