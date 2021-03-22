import "./App.css";
import { pushUser } from "./firebase.js";

function App() {
	return <button onClick={() => pushUser("test")}>名前を保存する</button>;
}

export default App;
