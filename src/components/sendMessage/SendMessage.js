import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";

const SendMessage = ({ activeChat, onSend }) => {
	const { request } = useHttp();
	const [message, setMessage] = useState("");

	const handleSend = async () => {
		try {
			const { idInstance, apiTokenInstance } = JSON.parse(
				localStorage.getItem("credentials")
			);

			await request(
				`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
				"POST",
				JSON.stringify({
					chatId: `${activeChat}@c.us`,
					message,
				})
			);

			setMessage("");
		} catch (e) {
			console.error("Ошибка отправки:", e);
		}
	};

	return (
		<div className='send-message'>
			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Введите сообщение'
				disabled={!activeChat}
			/>
			<button
				onClick={handleSend}
				disabled={!message || !activeChat}>
				Отправить
			</button>
		</div>
	);
};

export default SendMessage;
