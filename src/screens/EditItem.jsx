import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  input_field: {
    marginBottom: 12,
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
  submit_btn: {
    marginBottom: 12,
  },
}))

const EditItem = ({ memberId, items, editItemIndex, updateFirestoreItem, handleBackEditItemList }) => {
  const classes = useStyles()
  const targetItem = items[editItemIndex]
  const [item, setItem] = useState(targetItem)

  //テキストの編集
  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value.replace(/^0+/, '')
    if (identificationName === 'name') {
      setItem((prevState) => ({ ...prevState, name: String(value) }))
    } else if (identificationName === 'requiredPoint') {
      //型指定をすると,先頭に0がついてしまうから、MaterialUi
      setItem((prevState) => ({ ...prevState, requiredPoint: value }))
    }
  }
  console.log(item)
  // //submitBtnで使うfunction
  const onSubmitEvent = () => {
    updateFirestoreItem(item, memberId)
    handleBackEditItemList()
  }

  return (
    <Container>
      <BackBtn handleBack={handleBackEditItemList} className={classes.btn_back} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            アイテム編集
          </ListSubheader>
        }
        className={classes.root}
      >
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="name"
          label="名前"
          value={item.name}
          handleChange={handleChange}
        />
        <InputField
          type="number"
          className={classes.input_field}
          required={true}
          identificationName="requiredPoint"
          label="必要ポイント"
          value={item.requiredPoint}
          handleChange={handleChange}
        />
      </List>
      <SubmitBtn className={classes.submit_btn} text="変更する" onSubmitEvent={onSubmitEvent} />
    </Container>
  )
}

export default EditItem
