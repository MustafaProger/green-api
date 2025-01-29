import { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";

const apiUrl = "https://1103.api.green-api.com";
const idInstance = "1103182867";
const apiTokenInstance = "765c269474db4ad19f119c9087db6e842c9bc982c0f24b85aa";

const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

function fetchInfo(
	bodyChatId = 79680603084,
	bodyMessage = "Проверка отправок сообещний через Fetch"
) {
	return {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "GREEN-API_POSTMAN/1.0",
		},
		body: JSON.stringify({
			chatId: `${bodyChatId}@c.us`,
			message: bodyMessage,
		}),
	};
}

function Test() {
	const { loading, request, error, clearError } = useHttp();

	const [contact, setContact] = useState("79680603084");
	const [textMessage, setTextMessage] = useState(
		"Проверка отправок сообещний через Fetch"
	);

	const { method, body, headers } = fetchInfo(contact, textMessage);

	async function sendMessage() {
		const res = await request(url, method, body, headers);
		return res;
	}

	if (loading) {
		return <h1 style={{ textAlign: "center" }}>loading...</h1>;
	}

	return (
		<>
			<div className='send-message'>
				<input
					type='phone'
					placeholder='Enter contact (only digits)'
					onChange={(e) => setContact(e.target.value)}
				/>

				<input
					type='text'
					placeholder='Enter message'
					onChange={(e) => setTextMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</>
	);
}

export default Test;
