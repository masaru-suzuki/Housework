import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24,
  },
}))

/**
 *handleBackEditFamily is handel that chage flag in EditFamily.jsx
 *AddHouseworkとEditHouseworkとAddMemberとEditMemberで共有
/**
 *  value=button name
 *  data = updata or add data (member or housework)
 *  handleBackPage = back to (EditFamily or EditHousework)
 *  firestoreTask = firestore update or add (member information or housework infomation)
 */
const SubmitBtn = ({
  value,
  data,
  // member,
  // name,
  // birth,
  // id,
  // updateFirestoreOfMemberInfo,
  firestoreTask,
  handleBackPage,
}) => {
  const classes = useStyles()
  console.log({ data })
  // console.log({ flag })
  // console.log({ firestoreTask })
  // console.log({ handleBackPage })

  // let onSubmitEvent = ''
  // if (flag === 'isAdd') {
  const onSubmitEvent = () => {
    firestoreTask(data) //data
    handleBackPage()
  }
  // } else if (flag === 'isEdit') {
  //   onSubmitEvent = () => {
  //     firestoreTask(data)
  //     handleBackPage()
  //   }
  // } else {
  //   console.log('no flag')
  // }

  return (
    <Button fullWidth variant="contained" color="primary" className={classes.btn} onClick={() => onSubmitEvent()}>
      {value}
    </Button>
  )
}

export default SubmitBtn
