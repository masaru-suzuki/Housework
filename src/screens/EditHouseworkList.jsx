import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { ListSubheader, List, Container, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditHousework from './EditHousework'
import AddHousework from './AddHousework'
import BackBtn from '../uikit/BackBtn'
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
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
  btn: {
    margin: 24,
  },
}))

const EditHouseworkList = ({
  addFiestoreHousework,
  houseworkListInfo,
  updateFirestoreHousework,
  deleteFirestoreHousework,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editHouseworkIndex, setEditHouseworkIndex] = useState('')
  console.log({ houseworkListInfo })
  const classes = useStyles()
  const history = useHistory()

  const handleBackHome = () => {
    console.log({ history })
    history.push({ pathname: '/' })
  }

  //isAddを変更する
  const handleIsAdd = () => {
    setIsAdd(false)
    console.log({ isAdd })
  }

  //EditHousework.jsxへ
  const handleEditHousework = (i) => {
    setEditHouseworkIndex(i)
    setIsEdit(true)
  }

  //flagをfalseにしてEditHousework画面に戻る
  const handleBackEditHouseworkList = () => {
    setIsEdit(false)
    setIsAdd(false)
  }

  //card内で表示する要素
  const displayElmNameSp = ['name', 'earnedPoint']
  const displayElmName = ['name', 'earnedPoint', 'description']

  //メンバー編集画面、メンバー追加画面はflagを使って対応させる
  if (isAdd && !isEdit) {
    return (
      <AddHousework
        addFiestoreHousework={addFiestoreHousework}
        flag="isAdd"
        handleIsAdd={handleIsAdd}
        handleBackEditHouseworkList={handleBackEditHouseworkList}
      />
    )
  } else if (!isAdd && isEdit) {
    return (
      <EditHousework
        houseworkListInfo={houseworkListInfo}
        editHouseworkIndex={editHouseworkIndex}
        updateFirestoreHousework={updateFirestoreHousework}
        handleBackEditHouseworkList={handleBackEditHouseworkList}
      />
    )
  } else if (!isAdd && !isEdit) {
    return (
      <Container className={classes.container} maxWidth="sm">
        <BackBtn handleBack={handleBackHome} className={classes.btn_back} />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader disableSticky component="div" id="nested-list-subheader">
              家事編集
            </ListSubheader>
          }
          className={classes.root}
        >
          {houseworkListInfo.map((houseworkInfo, i) => {
            return (
              <EditScreensCardInner
                key={houseworkInfo.id}
                data={houseworkInfo}
                displayElmNameSp={displayElmNameSp}
                displayElmName={displayElmName}
                i={i}
                handleEdit={handleEditHousework}
                handleDelete={deleteFirestoreHousework}
              />
            )
          })}
        </List>
        <Button
          variant="contained"
          onClick={() => setIsAdd(true)}
          color="primary"
          className={classes.btn}
          startIcon={<AddIcon />}
        >
          家事を追加する
        </Button>
      </Container>
    )
  }
}

export default EditHouseworkList
