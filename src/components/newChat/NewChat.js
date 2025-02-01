import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import "./NewChat.scss";

const NewChat = ({ setChats }) => {
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const { request } = useHttp();

	const handleCreateChat = async () => {
		try {
			if (!/^\d{11,12}$/.test(phone)) {
				throw new Error("Неверный формат номера");
			}

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

			setChats((prev) => {
				let phoneExists = false;
				const updatedChats = prev.map((item) => {
					if (item.phone === phone) {
						phoneExists = true;
						alert("Данный номер уже есть в списке!");
						return item;
					} else {
						return item;
					}
				});

				if (!phoneExists) {
					return [...updatedChats, { phone, messages: [] }];
				}

				return updatedChats;
			});

			setPhone("");
			setError("");
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<div className='new-chat'>
			<input
				type='tel'
				placeholder='Введите номер (79123456789)'
				value={phone}
				onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
			/>
			<button onClick={handleCreateChat}>+ Создать чат</button>

			{error && <div className='error-message'>{error}</div>}
		</div>
	);
};

export default NewChat;
