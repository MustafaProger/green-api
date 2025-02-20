import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm/LoginForm";
import ChatList from "./components/chatList/ChatList";
import SidePanel from "./components/sidePanel/SidePanel";
import СhatActive from "./components/chatActive/СhatActive";

import "./App.scss";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [activeChat, setActiveChat] = useState(null);
	const [chats, setChats] = useState(() => {
		const savedChats = localStorage.getItem("chats");
		return savedChats ? JSON.parse(savedChats) : [];
	});

	useEffect(() => {
		localStorage.setItem("chats", JSON.stringify(chats));
	}, [chats]);

	useEffect(() => {
		const credentials = localStorage.getItem("credentials");
		setIsAuth(!!credentials);
	}, []);

	return (
		<BrowserRouter basename='green-api'>
			<div className='app'>
				{isAuth ? <SidePanel /> : null}

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
										setActiveChat={setActiveChat}
									/>
									<СhatActive
										chats={chats}
										activeChat={activeChat}
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
			</div>
		</BrowserRouter>
	);
}

export default App;
