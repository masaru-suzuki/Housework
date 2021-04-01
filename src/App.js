import React, {useState, useEffect} from 'react'
import firebase from './firebase'
import './App.css'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
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

function App() {
  const [membersInfo, setMembersInfo] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const initMemberListMock = []
  const history = useHistory()
  let memberListMock = []
  const sleep = (ms) => () => new Promise((r) => setTimeout(r, ms))
  const sleep1Sec = sleep(1000)
  //TODO: このfunctionはApp.jsからもってくる
  //submitボタンが押された時に発火
  //isEditをtrueにして、更新が終わったら、false にする
  const updateFirestoreOfMemberInfo = async (memberId, memberName, memberBirth) => {
    // console.log('updating store...', {memberId}, {memberName}, {memberBirth})
    familyRef.doc(memberId).set(
      {
        name: memberName,
        birth: memberBirth,
      },
      {merge: true},
    )
    // await sleep1Sec()
    // console.log('store updated')
    setIsEdit(true)
    console.log(isEdit) //この時点でisEditがfalseになるのはなぜ？
  }

  //firebaseのデータを更新する

  //firebaseの情報をasyc awaitで取得
  const getFirestoreMock = async () => {
    // console.log('getting data ...')
    familyRef
      .get()
      .then((querySnapshot) => {
        // console.log('fetch data')
        querySnapshot.forEach((doc) => {
          const arr = {memberId: doc.id}
          const data = doc.data()
          const newarr = {...arr, ...data}
          // console.log(newarr)
          memberListMock.push(newarr)
          // console.log('push data')
        })
      })
      .then(() => {
        // console.log({memberListMock})
        setMembersInfo(memberListMock)
        // console.log('set member')
        // console.log({membersInfo})
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
    // console.log('ok')
    await sleep1Sec()
    // console.log({membersInfo})
    // console.log('got data!')
  }

  useEffect(() => {
    //submitがclickされるたびにfirestoreのデータを引っ張ってきて更新する
    // console.log(isEdit)
    memberListMock = initMemberListMock
    getFirestoreMock()
    setIsEdit(false)
  }, [isEdit])

  //画面遷移
  const handleHome = () => {
    console.log('move to Home')
    history.push({pathname: '/'})
  }
  const handleEditFamily = () => {
    console.log('move to EditFamily')
    history.push({pathname: '/EditFamily'})
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
                />
              )}
            />
            <Route exact path="/EditHousework" component={EditHousework} />
            <Route exact path="/Member" component={Member} />
            <Route exact path="/EditMember" render={() => <EditMember membersInfo={membersInfo} />} />
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  )
}

export default App
