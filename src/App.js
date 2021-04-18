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
    const Ref = getRef(await refName)
    const data = makeListFromCollection(await Ref.get())
    stateSetter(data.filter((v) => typeof v.name === 'string'))
    //firebaseが更新された時に、再レンダリングするように、isEditをセット
    setIsEdit(false)
  }

  const getFirestoreHousework = (id) => {
    const list = []
    const Ref = getRef('housework')
      .doc(id)
      .get()
      .then((doc) => {
        list.push(doc.data())
      })
    // let dataArr = []
    // Ref.get().then((doc) => {
    //   dataArr.push(doc.data())
    // })
    return list
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

  const finishBtnEvent = (memberInfo, housework) => {
    let { id, level, experiencePoint, point, requiredExpreriencePoint, doneDate, runningDay } = memberInfo //updateFirestoreMemberでidも必要なため、idも定義
    let { earnedPoint, isDone, doneMemberId, finishedDate } = housework
    const date = new Date()
    //家事取り消し時
    if (isDone) {
      // console.log('level down')
      point -= earnedPoint
      doneMemberId = ''
      if (experiencePoint < earnedPoint) {
        let requiredLevelDownPoint = experiencePoint
        while (earnedPoint > requiredLevelDownPoint) {
          earnedPoint -= requiredLevelDownPoint
          requiredExpreriencePoint -= level * level
          requiredLevelDownPoint = requiredExpreriencePoint
          level -= 1
        }
        experiencePoint = requiredLevelDownPoint - earnedPoint
      } else {
        experiencePoint -= earnedPoint
      }
    } else {
      //家事完了時
      experiencePoint += earnedPoint
      point += earnedPoint
      doneMemberId = id
      //日付
      // doneDate = getNewDaneDateArray(doneDate)
      doneDate.unshift(date)
      finishedDate = date
      runningDay = getRunningDay(doneDate)
      console.log({ runningDay })
      console.log({ finishedDate })
      runningDay = getRunningDay(doneDate)
      // console.log(doneDate)
      // doneDate.unshift()

      if (requiredExpreriencePoint <= experiencePoint) {
        while (requiredExpreriencePoint <= experiencePoint) {
          experiencePoint -= requiredExpreriencePoint
          level += 1
          requiredExpreriencePoint += level * level
        }
      }
    }
    // console.log(`[result: level => ${level} , Exp: ${experiencePoint}, reqExp : ${requiredExpreriencePoint}]`)
    isDone = !isDone
    // 更新するデータ
    const memberData = { id, experiencePoint, point, level, requiredExpreriencePoint, doneDate, runningDay }
    const houseworkData = { id: housework.id, doneMemberId, isDone, finishedDate }
    // console.log({ memberData })
    // console.log({ houseworkData })

    //login状況の更新
    loginBonus(housework.id)
    //更新を実行
    updateFirestoreMember(memberData)
    updateFirestoreHousework(houseworkData)
  }

  //Pointを金額に変更するfunction
  const exchangeCash = (id, point) => {
    console.log(`${id}の${point}を換金します`)
    const updateMemberData = { id, point }
    updateFirestoreMember(updateMemberData)
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

  //連続家事配列の生成
  const getNewDaneDateArray = (date) => {
    // console.log(date)
    const todayDate = new Date()
    //家事の記録がない場合
    if (date.length < 1) {
      date.unshift(todayDate)
      return date
    }
    //家事の記録がある場合
    const today = todayDate.getDate()
    const month = todayDate.getMonth()
    const year = todayDate.getFullYear()
    const latestDate = date[0].toDate()
    const latestDay = latestDate.getDate()
    const latestDateMonth = latestDate.getMonth()
    const latestDateYear = latestDate.getFullYear()
    if (today === latestDay && month === latestDateMonth && year === latestDateYear) {
      // console.log('today = yestardy')
    } else {
      // console.log('difference day ')
      date.unshift(todayDate)
    }

    // console.log(date)
    return date
  }

  //連続家事日数の取得
  const getRunningDay = (date) => {
    console.log(date)
    //今日ぶんの家事が登録されていなかったら、登録する
    if (date.length < 1) {
      return 0
    } else {
      let runningDay = 0
      for (let i = 0; i < date.length - 1; i++) {
        // console.log(date[0])
        //新しく追加したdoneDateはfirebaseに登録されることでfirebaseのタイムスタンプ型になるけど、この時点ではなっていないので、
        //toDate()が使えない
        //新しくdoneDateを追加した場合はdoneDate[0].getDate()でいけるけど、そうじゃない場合doneDate[0].toDate()にする必要がある
        //新しく追加した場合はこれでおkだけど、同じにひやっていて、doneDateに追加しない場合は、成功しない=>try catchでやってみる
        let newDate = ''

        try {
          newDate = date[i].toDate()
        } catch (error) {
          newDate = date[0]
        }
        const prevDate = date[i + 1].toDate()
        const newDay = newDate.getDate()
        const prevDay = prevDate.getDate()

        console.log({ newDate })
        console.log({ prevDate })

        if (newDay === 1) {
          // 月を跨いだときはどうする?
          console.log('月初')
          const lastMonthLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate()
          //前月の最終日と同じなら連続していることとする
          if (lastMonthLastDay === prevDay) {
            console.log('constant done work')
            runningDay += 1
          }
        }
        if (newDay - prevDay === 1) {
          runningDay += 1
          console.log('連続でやったよ')
        } else if (newDay === prevDay) {
          console.log('in a day')
        } else {
          break
        }
        console.log(runningDay)
      }
      return runningDay
    }

    // console.log(prevDate)
    // const diffTime = todayDate - prevDate
    // const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    // const diffDay = today - yestaday
    // console.log(diffDay)
    //昨日から1日以上経っていた場合は中止
    // if (diffDay === 0) {
    //   console.log('その日に何個も家事をやった')
    //   //その日に何個か家事をやったパターン
    // } else if (diffDay === 1) {
    //   //翌日に家事をやったパターン
    //   console.log('翌日に家事をやったパターン')
    //   runningDay += 1
    // } else {
    //   //家事を2日以上やらなかったパターン
    //   console.log('家事を2日以上やらなかったパターン')
    //   runningDay = 0
    // }
    console.log(date)
    return date
  }
  //連続ログイン日の計算
  const loginBonus = (id) => {
    //ユーザーごとの連続ログイン日を算定
    //ユーザーが家事を完了したらユーザーに家事をやった日付を登録する
    // 配列でmemberInfoにisDoneの日付を入れて先頭に入れる
    //whileで回す
    //過去の日付と比較して、差が1の時
    // console.log(id)
    // const data = getFirestoreHousework(id)
    // console.log(data)
    // return
    // const getFirestoreTimestamp = () => {
    //   setIsEdit(true)
    //   return firebase.firestore.FieldValue.serverTimestamp()
    // }
    // const getTimestamp = async () => {
    //   const date = await getFirestoreTimestamp()
    // const time = date
    // const date = await timestamp.toDate()
    // await console.log(timestamp)
    // console.log(date)
    // return date
    // }
    // console.log(new Date())
    // getTimestamp()
    // setIsEdit(false)
  }

  useEffect(() => {
    if (!userId) return
    // loginBonus()
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
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  )
}

export default App
