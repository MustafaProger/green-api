import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";

const SendMessage = ({ activeChat, onSend }) => {
	const { request } = useHttp();
	const [message, setMessage] = useState("");

	const handleSend = async () => {
		if (!message.trim()) return;

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

			onSend(activeChat, message);

			setMessage("");
		} catch (e) {
			console.error("Ошибка отправки:", e);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSend();
		}
	};

	return (
		<div className='send-message'>
			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
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
