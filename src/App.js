import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm/LoginForm";
import ChatList from "./components/chatList/ChatList";
import SidePanel from "./components/sidePanel/SidePanel";
import ChatPerson from "./components/chatPerson/ChatPerson";

import "./App.scss";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [activeChat, setActiveChat] = useState([])

	const [chats, setChats] = useState([
		{
			phone: "79123456789",
			messages: [
				{ text: "Привет, как ты?", from: "me", timestamp: "10:15:22" },
				{
					text: "Привет, всё отлично!",
					from: "79123456789",
					timestamp: "10:15:45",
				},
			],
		},
		{
			phone: "79234567890",
			messages: [
				{ text: "Здравствуй!", from: "me", timestamp: "14:30:01" },
				{
					text: "Чем занимаешься?",
					from: "79234567890",
					timestamp: "14:32:10",
				},
				{ text: "Работаю, а ты?", from: "me", timestamp: "14:33:15" },
			],
		},
		{
			phone: "79345678901",
			messages: [
				{ text: "Добрый вечер", from: "me", timestamp: "18:45:59" },
				{ text: "Добрый вечер!", from: "79345678901", timestamp: "18:46:30" },
				{
					text: "Как проходит день?",
					from: "79345678901",
					timestamp: "18:47:40",
				},
			],
		},
		{
			phone: "79456789012",
			messages: [
				{ text: "Приветствую!", from: "me", timestamp: "09:00:00" },
				{
					text: "И тебе привет!",
					from: "79456789012",
					timestamp: "09:01:15",
				},
				{ text: "Что нового?", from: "79456789012", timestamp: "09:02:20" },
				{ text: "Да ничего", from: "me", timestamp: "09:03:00" },
			],
		},
		{
			phone: "79567890123",
			messages: [
				{ text: "Как настроение?", from: "me", timestamp: "20:10:00" },
				{ text: "Отличное!", from: "79567890123", timestamp: "20:11:10" },
				{ text: "Супер", from: "me", timestamp: "20:11:59" },
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
