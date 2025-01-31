import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import "./LoginForm.scss";

export default function LoginForm({ onLogin }) {
	const [idInstance, setIdInstance] = useState("");
	const [apiTokenInstance, setApiTokenInstance] = useState("");
	const [formError, setFormError] = useState(false);
	const [authError, setAuthError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const checkCredentials = async (id, token) => {
		try {
			const response = await fetch(
				`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`
			);

			if (!response.ok) throw new Error("Ошибка авторизации");

			const data = await response.json();
			return data.stateInstance === "authorized";
		} catch (error) {
			return false;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setAuthError("");

		if (!idInstance || !apiTokenInstance) {
			setFormError(true);
			return;
		}

		setIsLoading(true);

		try {
			const isValid = await checkCredentials(idInstance, apiTokenInstance);

			if (isValid) {
				localStorage.setItem(
					"credentials",
					JSON.stringify({
						idInstance,
						apiTokenInstance,
					})
				);

				onLogin();
				navigate("/chat");
			} else {
				setShowModal(true);
				setAuthError("Неверные учетные данные");
			}
		} catch (error) {
			setShowModal(true);
			setAuthError("Ошибка соединения");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container'>
			<div className='login-box'>
				<h2 className='title'>Log in</h2>
				<form
					onSubmit={handleSubmit}
					className='form'>
					<div className='input-container'>
						<input
							type='text'
							id='idInstance'
							value={idInstance}
							onChange={(e) => setIdInstance(e.target.value)}
							className={`input ${formError && !idInstance ? "error" : ""}`}
							required
						/>
						<label
							htmlFor='idInstance'
							className={`label ${idInstance ? "active" : ""}`}>
							idInstance
						</label>
						<div
							className={`underline ${
								formError && !idInstance ? "error-underline" : ""
							}`}></div>
					</div>
					<div className='input-container'>
						<input
							type='text'
							id='apiTokenInstance'
							value={apiTokenInstance}
							onChange={(e) => setApiTokenInstance(e.target.value)}
							className={`input ${
								formError && !apiTokenInstance ? "error" : ""
							}`}
							required
						/>
						<label
							htmlFor='apiTokenInstance'
							className={`label ${apiTokenInstance ? "active" : ""}`}>
							apiTokenInstance
						</label>
						<div
							className={`underline ${
								formError && !apiTokenInstance ? "error-underline" : ""
							}`}></div>
					</div>
					{formError && (
						<p className='error-message'>Все поля должны быть заполнены</p>
					)}
					<button
						type='submit'
						className='submit-button'
						disabled={isLoading}>
						{isLoading ? "Проверка..." : "Войти"}
					</button>
				</form>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<h3>Ошибка авторизации</h3>
					<p>Учетная запись не найдена. Пожалуйста:</p>
					<ul>
						<li>Проверьте правильность idInstance и apiTokenInstance</li>
						<li>
							Или зарегистрируйтесь по{" "}
							<a
								href='https://green-api.com/docs/before-start/'
								target='_blank'
								rel='noopener noreferrer'>
								этой ссылке
							</a>
						</li>
					</ul>
				</Modal>
			)}
		</div>
	);
}
