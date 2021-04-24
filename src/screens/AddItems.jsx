import React, { useEffect, useState } from 'react'
import { ListSubheader, List, Container, makeStyles } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import { initItem } from '../initialData'
const useStyles = makeStyles({
  input_field: {
    marginBottom: 16,
  },
})
const AddItems = ({ memberId, addFirestoreItems, handleBackEditItemList }) => {
  const classes = useStyles()
  const [itemData, setItemData] = useState({})

  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value.replace(/^0+/, '')
    if (identificationName === 'name') {
      setItemData((prevState) => ({ ...prevState, name: String(value) }))
    } else if (identificationName === 'requiredPoint') {
      //型指定をすると,先頭に0がついてしまうから、MaterialUiのTextFieldにtype='number
      setItemData((prevState) => ({ ...prevState, requiredPoint: parseInt(value, 10) }))
    }
  }
  //SubmitBtn
  const onSubmitEvent = () => {
    addFirestoreItems(itemData, memberId)
    handleBackEditItemList()
  }
  useEffect(() => {
    setItemData(initItem())
  }, [])
  console.log({ itemData })

  return (
    <Container>
      <BackBtn handleBack={handleBackEditItemList} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            アイテム追加
          </ListSubheader>
        }
      >
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="name"
          label="名前"
          value={itemData.name}
          handleChange={handleChange}
        />
        <InputField
          type="number"
          className={classes.input_field}
          required={true}
          identificationName="requiredPoint"
          label="必要ポイント"
          value={itemData.requiredPoint}
          handleChange={handleChange}
        />
        <SubmitBtn text="登録する" onSubmitEvent={onSubmitEvent} />
      </List>
    </Container>
  )
}

export default AddItems
