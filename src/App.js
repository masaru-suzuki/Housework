import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth, { useAuth } from './auth/Auth'
//screens
import Home from './screens/Home'
import EditFamily from './screens/EditFamily'
import EditHouseworkList from './screens/EditHouseworkList'
import Profile from './screens/MemberHome'
import SignInOrUp from './screens/SignInOrUp'
import SignUp from './screens/SignUp'
import Member from './screens/MemberHome'
import EditMember from './screens/EditMember'
import MemberHome from './screens/MemberHome'

const db = firebase.firestore()

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
  const { userId } = useAuth()
  const [membersInfo, setMembersInfo] = useState([])
  const [houseworkListInfo, setHouseworkListInfo] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //どういうふうに非同期処理にしたらいいのか分からない・・・！
  const getRef = (refName) => {
    return db.collection('family').doc(userId).collection(refName)
  }
  const getFirestoreMock = async (refName, stateSetter) => {
    const Ref = await getRef(refName)
    const data = makeListFromCollection(await Ref.get())
    stateSetter(data.filter((v) => typeof v.name === 'string'))
    //firebaseが更新された時に、再レンダリングするように、isEditをセット
    setIsEdit(false)
  }

  //update firestore
  const updateFirestore = (data, refName) => {
    const firestoreRef = getRef(refName)
    const targetId = data.id
    firestoreRef.doc(targetId).set(data, { merge: true })
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }
  const updateFirestoreMember = (data) => {
    updateFirestore(data, 'member')
  }
  const updateFirestoreHousework = (data) => {
    updateFirestore(data, 'housework')
  }

  //add data to firestore
  const addFirestore = (data, refName) => {
    const firestoreRef = getRef(refName)
    firestoreRef.add(data)
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }
  const addFiestoreMember = (data) => {
    addFirestore(data, 'member')
  }
  const addFiestoreHousework = (data) => {
    addFirestore(data, 'housework')
  }

  //firestoreのメンバーの削除
  const deleteFirestore = (refName, id) => {
    const firestoreRef = getRef(refName)
    firestoreRef
      .doc(id)
      .delete()
      .then(() => {
        setIsEdit(true) //isEditで再レンダリングを発火させる
      })
      .catch((error) => {
        console.error('Error removeing document: ', error)
      })
  }
  const deleteFirestoreMember = (id) => {
    deleteFirestore('member', id)
  }
  const deleteFirestoreHousework = (id) => {
    deleteFirestore('housework', id)
  }

  const finishHousework = (memberInfo) => {
    // console.log({memberId}, {earnedPoint});
    const memberId = memberInfo.id
    const earnedPoint = 3
    // console.log(`${memberId}が家事を完了しました`)
  }
  /**
   *Task
   *add earned point to member in firestore
   *add experience point to member in firestore
   *set'isDone' of housework in firestore
   */
  // const getUpdateData = (data) => ({ id: data.id, isDone: !data.isDone, doneMemberId: memberId })
  const finishBtnEvent = (memberInfo, housework) => {
    //TODO isDoneで場合分け addPoint,removePoint
    //TODO set doneMemberId
    //TODO function make common (addPoint, removePoint)
    let { id, experiencePoint, point } = memberInfo //updateFirestoreMemberでidも必要なため、idも定義
    let { earnedPoint, isDone, doneMemberId } = housework
    console.log({ isDone })
    if (isDone) {
      // console.log('remove point')
      experiencePoint -= earnedPoint
      point -= earnedPoint
      doneMemberId = ''
    } else {
      // console.log('add point')
      // console.log({ point })
      experiencePoint += earnedPoint
      point += earnedPoint
      doneMemberId = id
    }
    isDone = !isDone
    // console.log({ isDone })
    const memberData = { id, experiencePoint, point }
    const houseworkData = { id: housework.id, doneMemberId, isDone }
    // console.log(memberData)
    console.log({ houseworkData })
    updateFirestoreMember(memberData)
    updateFirestoreHousework(houseworkData)
  }

  const resetFirestoreHousework = () => {
    houseworkListInfo.forEach((housework) => {
      const resetHouseworkData = {
        id: housework.id,
        doneMemberId: '',
        isDone: false,
      }
      updateFirestoreHousework(resetHouseworkData)
    })
  }

  // const removePoint = (memberInfo, housework) => {
  //   // console.log('remove')
  //   let { id, experiencePoint, point } = memberInfo //updateFirestoreMemberでidも必要なため、idも定義
  //   let { earnedPoint } = housework
  //   experiencePoint -= earnedPoint
  //   point -= earnedPoint
  //   const memberData = { id, experiencePoint, point }
  //   updateFirestoreMember(memberData)
  //   updateFirestoreHousework(toggleIsDone(housework))
  // }

  useEffect(() => {
    if (!userId) return

    //submitがclickされるたびにfirestoreのデータを引っ張ってきて更新する
    getFirestoreMock('member', setMembersInfo)
    getFirestoreMock('housework', setHouseworkListInfo)
    //userIdが変わった時も情報を撮り直す
  }, [isEdit, userId])

  //今度はrecomposeのlibraryを使ってpropsを渡すのに挑戦してみる
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignInOrUp} />
        <Route exact path="/signup" component={SignUp} />
        {/* 以下認証のみ */}
        <Auth>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  membersInfo={membersInfo}
                  houseworkListInfo={houseworkListInfo}
                  finishBtnEvent={finishBtnEvent}
                  resetFirestoreHousework={resetFirestoreHousework}

                  // addPoint={addPoint}
                  // removePoint={removePoint}
                />
              )}
            />
            <Route exact path="/MemberHome" component={MemberHome} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/EditFamily"
              render={() => (
                <EditFamily
                  membersInfo={membersInfo}
                  updateFirestoreMember={updateFirestoreMember}
                  addFiestoreMember={addFiestoreMember}
                  deleteFirestoreMember={deleteFirestoreMember}
                />
              )}
            />
            <Route
              exact
              path="/EditHouseworkList"
              render={() => (
                <EditHouseworkList
                  houseworkListInfo={houseworkListInfo}
                  addFiestoreHousework={addFiestoreHousework}
                  updateFirestoreHousework={updateFirestoreHousework}
                  deleteFirestoreHousework={deleteFirestoreHousework}
                />
              )}
            />
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
