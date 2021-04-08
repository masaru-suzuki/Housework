import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { withStyles } from '@material-ui/core'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Container from '@material-ui/core/Container'

import MoneyIcon from '@material-ui/icons/Money'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
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
  // selected: {
  //   color: '#fff',
  // },
  bottom_nav: {
    backgroundColor: '#525edc',
    padding: 'unset',
  },
})
//theme color change
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    disabled: {
      main: '#000',
    },
  },
})
//TODO selected => color #fff
const BottomNav = ({ flag, handleFlag }) => {
  const [value, setValue] = useState(1) //current selected
  const classes = useStyles()
  console.log(flag.isHome)

  return (
    <ThemeProvider theme={theme}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          // className={classes.nav_action}
          label="exchange"
          onClick={() => handleFlag('isExchange')}
          icon={<InsertEmoticonIcon color={flag.isExchange ? 'primary' : 'disabled'} />}
        />
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          // className={classes.nav_action}
          label="Home"
          onClick={() => handleFlag('isHome')}
          icon={<HomeIcon color={flag.isHome ? 'primary' : 'disabled'} />}
        />
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          label="use point"
          onClick={() => handleFlag('isUsePoint')}
          icon={<AutorenewIcon color={flag.isUsePoint ? 'primary' : 'disabled'} />}
        />
      </BottomNavigation>
    </ThemeProvider>
  )
}

export default withStyles(styles)(BottomNav)
