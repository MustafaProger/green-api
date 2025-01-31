import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";

const NewChat = ({ onChatCreated }) => {
	const [phone, setPhone] = useState("79060972399");
	const [error, setError] = useState("");
	const { request } = useHttp();

	const handleCreateChat = async () => {
		try {
			// Проверка формата номера
			if (!/^\d{11,12}$/.test(phone)) {
				throw new Error("Неверный формат номера");
			}

			// Проверка регистрации в WhatsApp
			const { idInstance, apiTokenInstance } = JSON.parse(
				localStorage.getItem("credentials")
			);

			const checkResponse = await request(
				`https://1103.api.green-api.com/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
				"POST",
				JSON.stringify({ phoneNumber: phone })
			);

			if (!checkResponse.existsWhatsapp) {
				throw new Error("Номер не зарегистрирован в WhatsApp");
			}

			// Сохраняем активный чат
			onChatCreated(phone);
			setError("");
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<div className='new-chat'>
			<input
				type='tel'
				placeholder='Введите номер получателя (79123456789)'
				value={phone}
				onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
			/>
			<button onClick={handleCreateChat}>Создать чат</button>

			{error && <div className='error-message'>{error}</div>}
		</div>
	);
};

export default NewChat;
