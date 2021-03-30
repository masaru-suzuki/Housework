import React, {useState, useEffect} from 'react'
import {db, firebaseAuth} from '../firebase'
import DrawerNav from '../components/DrawerNav'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Grid} from '@material-ui/core'
import MemberCard from '../components/MemberCard'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#efefef',
  },
}))

const Home = () => {
  const [familyId, setFamilyId] = useState('')
  const [membersInfo, setMembersInfo] = useState()
  const classes = useStyles()
  const membersInfoArr = []

  //firebaseからfamily 情報を取得 一度だけ
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        // Sign in 状態
        const uid = user.uid
        // console.log(uid);
        setFamilyId(uid)
        const familyRef = db.collection('family').doc(uid).collection('member')
        familyRef
          .get()
          .then((querySnapshot) => {
            // 一旦membersInfoArrに代入しているけどスマートな方法はないのか？membersInfoArrに格納しなくてもいい方法を検討
            querySnapshot.forEach((doc) => {
              const id = {memberId: doc.id}
              const info = doc.data()
              const memberInfo = {...id, ...info}
              membersInfoArr.push(memberInfo)
              // console.log({ membersInfoArr });
            })
            setMembersInfo(membersInfoArr)
            // console.log({membersInfo})
          })
          .catch((error) => {
            console.log('Error getting documents: ', error)
          })
      } else {
        // No user is signed in.
        console.log('user is undefined...')
      }
    })
    // console.log({ membersInfoArr });
    // setMembersInfo(membersInfoArr);
  }, [])
  // console.log({ membersInfo });

  return (
    <Container className={classes.root} maxWidth="sm">
      <DrawerNav membersInfo={membersInfo} />
      <p>Home</p>

      <Grid container spacing={3}>
        {/* {membersInfo.map((memberInfo) => {
					console.log(memberInfo);
					return (
						<Grid item xs={12} sm={6} key={memberInfo.memberId}>
							<MemberCard memberInfo={memberInfo} />
						</Grid>
					);
				})} */}
        <Grid item xs={12} sm={6}>
          <MemberCard uid={familyId} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home

// membersInfo.map((data) => {
// 	console.log(data);
// });
//firebase のmember にデータを追加するテスト
// const data = {
// 	name: "nozomi",
// 	birth: "20200618",
// 	level: "12",
// 	experiencePoint: "49",
// 	requiredExpreriencePoint: "10",
// 	point: "4600000000",
// };
// const addMemberInfo = () =>
// 	firebase
// 		.firestore()
// 		.collection("family")
// 		.doc(familyId)
// 		.collection("member")
// 		.add(data);

//firebase のmember にデータを更新するテスト
// const updateMemberInfo = () => {
// 	firebase
// 		.firestore()
// 		.collection("family")
// 		.doc(familyId)
// 		.collection("member")
// 		.doc("JVc1oKtURY7cSOixOnpP")
// 		.update({})
// 		.then(() => {
// 			console.log("updated!");
// 		})
// 		.catch((error) => {
// 			console.error("Error updating document: ", error);
// 		});
// };
