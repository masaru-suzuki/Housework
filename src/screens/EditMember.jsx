import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {ListSubheader, List, Container} from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'

const useStyles = makeStyles(() => ({
  text_field: {
    marginBottom: 16,
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
}))

const EditMember = ({editMemberIndex, membersInfo, handeChange, updateFirestoreMock}) => {
  const classes = useStyles()
  // console.log(updateFirestoreMock)
  const member = membersInfo[editMemberIndex]
  const [name, setName] = useState('')
  // const [birth, setBirth] = useState('')
  //InputFeildに渡すnameとbirth をstateで管理して、<SubmitBtn>に渡す
  //その際にfamiliIdとmemberIdを渡す
  //その情報をApp.jsxに持っていって、firebaseを更新する
  const hanleNameChange = (event) => {
    setName(event.target.value)
    console.log(name)
  }
  useEffect(() => {
    setName(member.name)
  }, [])
  return (
    <Container>
      <BackBtn />
      <input type="text" onChange={handeChange} />
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
        <InputField required={true} label="名前" value={name} hanleNameChange={hanleNameChange} />
        <InputField required={true} label="生年月日" value={member.birth} />
        <SubmitBtn
          value="変更する"
          member={member}
          updateFirestoreMock={updateFirestoreMock}
          name={name}
          editMemberIndex={editMemberIndex}
        />
      </List>
    </Container>
  )
}

export default EditMember
