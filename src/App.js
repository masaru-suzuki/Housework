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

  const levelUp = (experiencePoint, requiredExpreriencePoint, level) => {
    console.log({ experiencePoint })
    console.log({ requiredExpreriencePoint })
    const overExperiencePoint = experiencePoint - requiredExpreriencePoint
    console.log({ overExperiencePoint })
    if (requiredExpreriencePoint <= experiencePoint) {
      level += 1
      console.log(`level up ${level - 1} => ${level}`)
      return level
    } else {
      console.log('not level up')
      return level
    }
  }
  const finishBtnEvent = (memberInfo, housework) => {
    let { id, level, experiencePoint, point, requiredExpreriencePoint } = memberInfo //updateFirestoreMemberでidも必要なため、idも定義
    let { earnedPoint, isDone, doneMemberId } = housework
    //家事の状態が isDoneかによって場合分け
    if (isDone) {
      //experiencePoint がマイナスになったらlevelを下げる
      if (experiencePoint <= earnedPoint) {
        console.log(
          `EXP = earnedPoint - EXP + requiredEXP [${earnedPoint}-${experiencePoint} + ${requiredExpreriencePoint}]`,
        )
        experiencePoint = earnedPoint - experiencePoint + requiredExpreriencePoint
        console.log(`計算後EXP : ${experiencePoint}`)

        while (experiencePoint >= requiredExpreriencePoint) {
          console.log('loop start')
          console.log(`exp-requiredPoint [${experiencePoint} - ${requiredExpreriencePoint}]`)
          experiencePoint -= requiredExpreriencePoint
          console.log(`EXP: [${experiencePoint}]`)
          if (experiencePoint <= 0) {
            //多分ここがおかしい
            console.log(`EXPが0以下になったのでループを終了`)
            break
          }

          //requiredPointの計算
          console.log(`requiredEXP : [${requiredExpreriencePoint} - ${level} * ${level}]`)
          requiredExpreriencePoint -= level * level
          console.log(`requiredEXP: ${requiredExpreriencePoint}`)

          // levelを下げる
          console.log(`level down : level${level} => level ${level - 1}`)
          level -= 1
          console.log(`level: ${level}`)
        }
        console.log(
          `EXP ${experiencePoint}と必要経験値${requiredExpreriencePoint}を比較してEXPの方が大きかったら、ループを回す`,
        )
      } else {
        console.log('point down')
        experiencePoint -= earnedPoint
      }
      point -= earnedPoint
      doneMemberId = ''
    } else {
      experiencePoint += earnedPoint
      point += earnedPoint
      doneMemberId = id

      //level判定
      if (requiredExpreriencePoint <= experiencePoint) {
        while (requiredExpreriencePoint <= experiencePoint) {
          console.log('loop start')

          experiencePoint -= requiredExpreriencePoint
          console.log({ experiencePoint })
          //level up
          level += 1
          console.log(`level up ${level - 1} => ${level}`)
          //require experience pointの計算
          requiredExpreriencePoint += level * level
          console.log({ requiredExpreriencePoint })
        }
      }
    }
    console.log(`resule: level => ${level} , Exp: ${experiencePoint}, reqExp : ${requiredExpreriencePoint}`)

    //levelup判定
    // level = levelUp(experiencePoint, requiredExpreriencePoint, level)
    isDone = !isDone
    // 更新するデータ
    const memberData = { id, experiencePoint, point, level, requiredExpreriencePoint }
    const houseworkData = { id: housework.id, doneMemberId, isDone }
    // console.log({ memberData })
    // console.log({ houseworkData })

    //更新を実行
    updateFirestoreMember(memberData)
    updateFirestoreHousework(houseworkData)
  }

  //Pointを金額に変更するfunction
  const exchangeCash = (point) => {
    console.log(`${point}を換金します`)
  }

  //TODO 日付が変わった時に家事のデータをresetする
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
                  exchangeCash={exchangeCash}

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
