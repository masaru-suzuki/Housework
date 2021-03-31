import React, {useState, useEffect} from 'react'
import firebase from './firebase'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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

// firebaseからdetaを取得
// const memberRef = familyRef.doc(familyID).ref('member')
function App() {
  const [membersInfo, setMembersInfo] = useState([])
  const [testName, setTestName] = useState('')

  const sleep = (ms) => () => new Promise((r) => setTimeout(r, ms))
  const sleep1Sec = sleep(1000)

  //TODO: このfunctionはApp.jsからもってくる
  const updateFirestoreMock = async (member) => {
    console.log('updating store...', {member})
    await sleep1Sec()
    console.log('store updated')
  }

  // const updateState = () => {
  //   setMembersInfo(...membersInfo, ...memberListMock)
  // }

  //firebaseの情報をasyc awaitで取得
  const getFirestoreMock = async () => {
    console.log('getting data ...')
    const querySnapshot = await familyRef.get()

    const members = []
    querySnapshot.forEach((res) => {
      const data = res.data()
      //TODO: 一時的な処理。データを修正する必要がある。
      if (typeof data.name !== 'string') return
      members.push({id: res.id, ...data})
    })

    setMembersInfo(members)
  }

  //TODO: このfunctionはApp.jsからもってくる
  const handeChange = (event) => {
    // setIsEdit(true)
    // console.log({event}, {isEdit})
    console.log('handle changed')
    setTestName(event.target.value)
    // console.log({testName})
  }

  useEffect(() => {
    console.log('render')
    getFirestoreMock()
    // console.log({membersInfo})
  }, [])

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
              path="/editFamily"
              render={() => (
                <EditFamily
                  membersInfo={membersInfo}
                  handeChange={handeChange}
                  updateFirestoreMock={updateFirestoreMock}
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
