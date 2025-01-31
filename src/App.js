import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.scss";
import LoginForm from "./components/loginForm/LoginForm";
import ChatPage from "./components/chatPage/ChatPage";

function App() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const credentials = localStorage.getItem("credentials");
		setIsAuth(!!credentials);
	}, []);

	return (
		<BrowserRouter>
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
							<ChatPage />
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
