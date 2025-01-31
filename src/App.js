import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm/LoginForm";
import ChatList from "./components/chatList/ChatList";
import SidePanel from "./components/sidePanel/SidePanel";
import ChatPerson from "./components/chatPerson/ChatPerson";

import "./App.scss";

function App() {
	const [isAuth, setIsAuth] = useState(false);

	const [chats, setChats] = useState([
		{
			phone: "79060972399",
			messages: [
				{ text: "Привет", from: "me", timestamp: "22:08:34" },
				{ text: "Как дела?", from: "79060972399", timestamp: "22:08:39" },
			],
		},
	]);

	useEffect(() => {
		const credentials = localStorage.getItem("credentials");
		setIsAuth(!!credentials);
	}, []);

	return (
		<BrowserRouter>
			<SidePanel />

			<Routes>
				<Route
					path='/'
					element={
						isAuth ? (
							<Navigate
								to='/chat'
								replace
							/>
						) : (
							<LoginForm onLogin={() => setIsAuth(true)} />
						)
					}
				/>
				<Route
					path='/chat'
					element={
						isAuth ? (
							<>
								<ChatList
									chats={chats}
									setChats={setChats}
								/>
								<ChatPerson
									chats={chats}
									setChats={setChats}
								/>
							</>
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
