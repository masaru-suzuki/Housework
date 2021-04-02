import React, { useState } from 'react'
import { handleLogout } from '../firebase'
import SettingBtn from './SettingBtn'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import GroupIcon from '@material-ui/icons/Group'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'

const useStyles = makeStyles({
  btn: {
    position: 'fixed',
    top: '16px',
    right: '16px',
    zIndex: '3',
  },
  drawerBtn: {
    margin: 'auto 16px auto auto',
    display: 'flex',
  },
})

//onClick のルーティング

const DrawerNav = () => {
  // console.log({ membersInfo });
  const classes = useStyles()
  const history = useHistory()
  const [state, setState] = useState({
    right: false,
  })

  //onClickのrouter
  const handleEditFamily = () => {
    history.push({
      pathname: '/editFamily',
      // state: {membersInfo},
    })
  }
  const handleEditHousework = () => history.push('/EditHouseworkList')
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ right: open })
  }

  //ドロワーナビのリスト //リンク先も登録
  const menuList = [
    {
      text: 'ログアウト',
      icon: <ExitToAppIcon />,
      onClick: handleLogout,
    },
    {
      text: '家族編集',
      icon: <GroupIcon />,
      onClick: handleEditFamily,
    },
    {
      text: '家事編集',
      icon: <PlaylistAddIcon />,
      onClick: handleEditHousework,
    },
  ]

  const list = () => (
    <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <SettingBtn style={classes.drawerBtn} onClick={toggleDrawer(true)} />
        {menuList.map((item) => (
          <ListItem button={true} key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <SettingBtn style={classes.btn} onClick={toggleDrawer(true)} />
      <Drawer anchor="right" open={state['right']} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default DrawerNav
