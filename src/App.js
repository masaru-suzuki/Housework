import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import './App.css'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Auth from './auth/Auth'
//screens
import Home from './screens/Home'
import EditFamily from './screens/EditFamily'
import EditHousework from './screens/EditHousework'
import Profile from './screens/Member'
import SignInOrUp from './screens/SignInOrUp'
import SignUp from './screens/SignUp'
import Member from './screens/Member'
import EditMember from './screens/EditMember'

//comberListMocにisEditを入れて、このidEditを変更したら、firebaseに登録して、isEditをfalseにすればいいのかな？
const db = firebase.firestore()
const familyRef = db.collection('family').doc('u9EnmX300LQsunRawSUwwrhEVhS2').collection('member')

const makeListFromCollection = (querySnapshot) => {
  const list = []
  querySnapshot.forEach((res) => {
    const data = res.data()
    list.push({ id: res.id, ...data })
  })
  return list
}
// firebaseからdetaを取得
const App = () => {
  const [membersInfo, setMembersInfo] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const history = useHistory()

  //firebaseの情報を取得
  const getFirestoreMock = async () => {
    console.log('getting data ...')
    const members = makeListFromCollection(await familyRef.get())
    setMembersInfo(members.filter((v) => typeof v.name === 'string'))
    //firebaseが更新された時に、再レンダリングするように、isEditをセット
    setIsEdit(false)
  }

  //firebaseのデータを更新する
  //submitボタンが押された時に発火
  //isEditをtrueにして、更新が終わったら、false にする
  const updateFirestoreOfMemberInfo = async (memberId, memberName, memberBirth) => {
    console.log('updating store...', { memberId }, { memberName }, { memberBirth })
    familyRef.doc(memberId).set(
      {
        name: memberName,
        birth: memberBirth,
      },
      { merge: true },
    )
    // await sleep1Sec()
    // console.log('store updated')
    setIsEdit(true) //isEditで再レンダリングを発火させる
    // console.log(isEdit) //この時点でisEditがfalseになるのはなぜ？
  }

  //firestoreに新しいメンバー情報を登録する
  const addMemberToFirestore = (member) => {
    familyRef.add(member)
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }

  //firestoreのメンバーの削除
  const deleteFirestoreMember = (id) => {
    console.log('delete member', { id })
    familyRef
      .doc(id)
      .delete()
      .then(() => {
        console.log(`id=#{id}を削除しました。`)
        setIsEdit(true) //isEditで再レンダリングを発火させる
      })
      .catch((error) => {
        console.error('Error removeing document: ', error)
      })
  }

  useEffect(() => {
    //submitがclickされるたびにfirestoreのデータを引っ張ってきて更新する
    getFirestoreMock()
  }, [isEdit])

  //画面遷移
  const handleHome = () => {
    console.log('move to Home')
    history.push({ pathname: '/' })
  }
  const handleEditFamily = () => {
    console.log('move to EditFamily')
    history.push({ pathname: '/EditFamily' })
  }
  //今度はrecomposeのlibraryを使ってpropsを渡すのに挑戦してみる
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignInOrUp} />
        <Route exact path="/signup" component={SignUp} />
        {/* 以下認証のみ */}
        <Auth>
          <Switch>
            <Route exact path="/" render={() => <Home membersInfo={membersInfo} />} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/EditFamily"
              render={() => (
                <EditFamily
                  membersInfo={membersInfo}
                  handleEditFamily={handleEditFamily}
                  handleHome={handleHome}
                  updateFirestoreOfMemberInfo={updateFirestoreOfMemberInfo}
                  addMemberToFirestore={addMemberToFirestore}
                  deleteFirestoreMember={deleteFirestoreMember}
                />
              )}
            />
            <Route exact path="/EditHousework" component={EditHousework} />
            <Route exact path="/Member" component={Member} />
            <Route exact path="/EditMember" render={() => <EditMember membersInfo={membersInfo} />} />
            {/* AddMemberは必要？ */}
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  )
}

export default App
