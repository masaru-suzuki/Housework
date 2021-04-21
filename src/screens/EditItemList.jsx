import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import BackBtn from '../uikit/BackBtn'
import AddItems from './AddItems'
import EditItem from './EditItem'
import EditItemListCardInner from '../components/EditItemListCardInner'

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

const EditItemList = ({ member, items, addFirestoreItems, deleteFirestoreItem, updateFirestoreItem }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editItemIndex, setEditItemIndex] = useState('')
  const { id } = member
  const classes = useStyles()
  const history = useHistory()

  const handleBackHome = () => {
    // console.log({ history })
    history.push({ pathname: '/' })
  }

  //isAddを変更する
  const handleIsAdd = () => {
    setIsAdd(false)
    console.log({ isAdd })
  }

  //EditHousework.jsxへ
  const handleEditHousework = (i) => {
    setEditItemIndex(i)
    setIsEdit(true)
  }

  //flagをfalseにしてEditHousework画面に戻る
  const handleBackEditItemList = () => {
    setIsEdit(false)
    setIsAdd(false)
  }

  //メンバー編集画面、メンバー追加画面はflagを使って対応させる
  if (isAdd && !isEdit) {
    return (
      <AddItems
        memberId={id}
        addFirestoreItems={addFirestoreItems}
        items={items}
        flag="isAdd"
        handleIsAdd={handleIsAdd}
        handleBackEditItemList={handleBackEditItemList}
      />
    )
  } else if (!isAdd && isEdit) {
    return (
      <EditItem
        memberId={id}
        items={items}
        editItemIndex={editItemIndex}
        updateFirestoreItem={updateFirestoreItem}
        handleBackEditItemList={handleBackEditItemList}
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
              アイテム編集
            </ListSubheader>
          }
          className={classes.root}
        >
          {items.map((item, i) => {
            return (
              <EditItemListCardInner
                key={item.id}
                data={item}
                memberId={id}
                i={i}
                handleEdit={handleEditHousework}
                handleDelete={deleteFirestoreItem}
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
          アイテムを追加する
        </Button>
      </Container>
    )
  }
}

export default EditItemList
