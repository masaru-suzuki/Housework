import React, { useEffect, useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { withStyles } from '@material-ui/core'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
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
const BottomNav = ({ isPage, flag, handleFlag, resetFirestoreHousework }) => {
  const [value, setValue] = useState() //初期値はisPageでisPageの初期値はisHome
  const classes = useStyles()

  useEffect(() => {
    setValue(isPage)
  }, [isPage])
  return (
    <ThemeProvider theme={theme}>
      <BottomNavigation value={value} showLabels className={classes.root}>
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          label="Cash"
          value="isCash"
          onClick={() => handleFlag('isCash')}
          icon={<InsertEmoticonIcon color={flag.isCash ? 'primary' : 'disabled'} />}
        />
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          label="Home"
          value="isHome"
          onClick={() => handleFlag('isHome')}
          icon={<HomeIcon color={flag.isHome ? 'primary' : 'disabled'} />}
        />
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          label="Exchange"
          value="isExchange"
          onClick={() => handleFlag('isExchange')}
          icon={<AutorenewIcon color={flag.isExchange ? 'primary' : 'disabled'} />}
        />
        <BottomNavigationAction
          classes={{ selected: classes.selected }}
          label="reset"
          value="reset"
          onClick={() => resetFirestoreHousework()}
        />
      </BottomNavigation>
    </ThemeProvider>
  )
}

export default withStyles(styles)(BottomNav)
