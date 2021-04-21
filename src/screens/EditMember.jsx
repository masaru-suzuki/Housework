import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import EditItemList from './EditItemList'

const useStyles = makeStyles(() => ({
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

const EditMember = ({
  editMemberIndex,
  membersInfo,
  updateFirestoreMember,
  handleBackEditFamily,
  getMemberId,
  items,
  addFirestoreItems,
  deleteFirestoreItem,
  updateFirestoreItem,
}) => {
  const classes = useStyles()
  const member = membersInfo[editMemberIndex]
  const [memberData, setMemberData] = useState(member)
  const [flag, setFlag] = useState('editMember')

  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    if (identificationName === 'name') {
      setMemberData((prevState) => ({ ...prevState, name: String(value) }))
    } else if (identificationName === 'birth') {
      setMemberData((prevState) => ({ ...prevState, birth: value }))
    }
  }
  //submitBtnで使うfunction
  const onSubmitEvent = () => {
    updateFirestoreMember(memberData)
    handleBackEditFamily()
  }
  const handelEditItems = () => {
    setFlag('editItems')
  }
  useEffect(() => {
    getMemberId(member.id)
  }, [])
  if (flag === 'editMember') {
    return (
      <Container>
        <BackBtn handleBack={handleBackEditFamily} className={classes.btn_back} />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader disableSticky component="div">
              家族編集
            </ListSubheader>
          }
          className={classes.root}
        >
          <InputField
            className={classes.input_field}
            required={true}
            identificationName="name"
            label="名前"
            value={memberData.name}
            handleChange={handleChange}
          />
          <InputField
            type="number"
            className={classes.input_field}
            required={true}
            identificationName="birth"
            label="生年月日"
            value={memberData.birth}
            handleChange={handleChange}
          />
        </List>
        <SubmitBtn className={classes.submit_btn} text="変更する" onSubmitEvent={onSubmitEvent} />
        <SubmitBtn text="アイテムの登録・編集" onSubmitEvent={handelEditItems} />
      </Container>
    )
  } else if (flag === 'editItems') {
    return (
      <EditItemList
        member={member}
        items={items}
        addFirestoreItems={addFirestoreItems}
        deleteFirestoreItem={deleteFirestoreItem}
        updateFirestoreItem={updateFirestoreItem}
      />
    )
  }
}

export default EditMember
