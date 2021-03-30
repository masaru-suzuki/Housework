import React, {useEffect} from 'react'
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
  console.log(updateFirestoreMock)
  // console.log(editMemberIndex)
  // console.log(membersInfo[editMemberIndex].name)
  const member = membersInfo[editMemberIndex]
  // console.log(memberInfo)
  // console.log(handleSubmitMember)
  // console.log(location.state.index)
  // const history = useHistory();
  // const memberInfo = props.location.state.memberInfo;
  // const updateFireStore = props.location.state.updateFireStore;
  // const name = props.location.state.name;
  // const birth = props.location.state.birth;
  // const [member, setMember] = useState([]);
  // console.log(updateFireStore);
  // console.log(props.location.state);
  // console.log(props.location.state.name);
  // console.log(props.location.state.memberInfo);
  // console.log(updateFireStore);
  useEffect(() => {
    console.log('render')
    // setMember(memberInfo.name);
  }, [])
  // console.log(memberInfo);
  // console.log(member.name);
  //onChangeの設定
  // //
  // const name = location.state.name
  // const birth = location.state.birth
  // console.log(name)
  // const val = {name: 'suxuki'}
  return (
    <Container>
      <BackBtn />
      <input type="text" onChange={handeChange} />
      <button type="submit" onClick={() => updateFirestoreMock('test')}>
        submit
      </button>
      {/* <button onClick={() => handleSubmitMember(val)}>更新する</button> */}
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
        <InputField required={true} label="名前" value={member.name} />
        <InputField required={true} label="生年月日" value={member.birth} />
        <SubmitBtn value="変更する" member={member} updateFirestoreMock={updateFirestoreMock} />
      </List>
    </Container>
  )
}

export default EditMember
