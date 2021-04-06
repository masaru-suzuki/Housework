import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24, //FIXME: 共通コンポーネントにmarginとかpaddingとかを入れると、めっちゃ使いづらくなるからやめたほうがいい
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
  text,
  // data,
  onSubmit,
  // onClick,
  // firestoreTask, //TODO: 名前がおかしい。これだとfirestoreと一緒にしか使えない感じに見える。
  // targetRef,
  // handleBackPage, //TODO: handleBackPageはfireSstoreTaskの中に含まれてた方がいい。
}) => {
  const classes = useStyles()
  // console.log({ data })
  // console.log({ flag })
  // console.log({ firestoreTask })
  // console.log({ handleBackPage })

  // let onSubmitEvent = ''
  // if (flag === 'isAdd') {
  const onSubmitEvent = () => {
    //TODO: 他のコンポーネントがbreakしないようにifを使用。後でonClickのみにする
    if (onClick) {
      return onClick()
    }
    firestoreTask(data, targetRef) //data
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
    <Button fullWidth variant="contained" color="primary" className={classes.btn} onClick={() => onSubmit()}>
      {text}
    </Button>
  )
}

export default SubmitBtn
