import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
//.envファイルからfirebasrConfigを読み取る
const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_DATABASE_URL,
	REACT_APP_FIREBASE_PRIJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET,
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	REACT_APP_FIREBASE_APP_ID,
	REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
	projectId: REACT_APP_FIREBASE_PRIJECT_ID,
	storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: REACT_APP_FIREBASE_APP_ID,
	measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//データベースにアクセス
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth();

//保存名の指定
// export const userRef = db.ref("users");

//firebaseのデータベースを変更するfuncを設定する
// export const pushUser = (userName) => {
// 	userRef.push({
// 		name: userName,
// 	});
// };
export default firebase;
