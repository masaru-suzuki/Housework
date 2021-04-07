import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { ListSubheader, List, Container, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { ThemeProvider } from '@material-ui/styles'

import EditMember from './EditMember'
import AddMember from './AddMember'
import EditScreensCardInner from '../components/EditScreensCardInner'

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
    maxWidth: 600,
    backgroundColor: '#efefef',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '0 5%',
  },
  btn_icon: {
    margin: 0,
  },
  btn: {
    margin: 24,
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
}))
//theme color change
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6587ae',
    },
  },
})

const EditFamily = ({ membersInfo, updateFirestoreMember, addFiestoreMember, deleteFirestoreMember }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editMemberIndex, setEditMemberIndex] = useState('')
  console.log({ membersInfo })
  const classes = useStyles()
  const history = useHistory()

  const handleBackHome = () => {
    console.log({ history })
    history.push({ pathname: '/' })
  }

  //isSetを変更する
  const handleIsEdit = () => {
    setIsEdit(false)
  }
  //isAddを変更する
  const handleIsAdd = () => {
    setIsAdd(false)
  }

  //EditMember.jsxへ
  const handleEditMember = (i) => {
    setEditMemberIndex(i)
    setIsEdit(true)
  }

  //flagをfalseにしてEditFamily画面に戻る
  const handleBackEditFamily = () => {
    setIsEdit(false)
    setIsAdd(false)
  }

  //card内で表示する要素
  const displayElmNameSp = ['name', 'point']
  const displayElmName = ['name', 'point']

  //メンバー編集画面、メンバー追加画面はflagを使って対応させる
  if (isAdd && !isEdit) {
    return (
      <AddMember
        addFiestoreMember={addFiestoreMember}
        flag="isAdd"
        handleIsAdd={handleIsAdd}
        membersInfo={membersInfo}
        handleBackEditFamily={handleBackEditFamily}
      />
    )
  } else if (!isAdd && isEdit) {
    return (
      <EditMember
        membersInfo={membersInfo}
        editMemberIndex={editMemberIndex}
        updateFirestoreMember={updateFirestoreMember}
        flag="isEdit"
        handleEditMember={handleEditMember}
        handleIsEdit={handleIsEdit}
        handleBackEditFamily={handleBackEditFamily}
      />
    )
  } else if (!isAdd && !isEdit) {
    return (
      <Container className={classes.container} maxWidth="sm">
        <Button
          variant="text"
          color="inherit"
          size="small"
          className={classes.btn_back}
          onClick={() => handleBackHome()}
          startIcon={<ArrowBackIosIcon className={classes.btn_icon} />}
        >
          back
        </Button>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader disableSticky component="div" id="nested-list-subheader">
              家族編集
            </ListSubheader>
          }
        >
          {membersInfo.map((memberInfo, i) => {
            return (
              <EditScreensCardInner
                data={memberInfo}
                displayElmNameSp={displayElmNameSp}
                displayElmName={displayElmName}
                i={i}
                handleEdit={handleEditMember}
                handleDelete={deleteFirestoreMember}
              />
            )
          })}
        </List>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={() => setIsAdd(true)}
            color="primary"
            className={classes.btn}
            startIcon={<AddIcon />}
          >
            家族を追加する
          </Button>
        </ThemeProvider>
      </Container>
    )
  }
}

export default EditFamily
