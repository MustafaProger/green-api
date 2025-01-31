import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";

const GetMessage = ({ activeChat }) => {
	const { request } = useHttp();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { idInstance, apiTokenInstance } = JSON.parse(
					localStorage.getItem("credentials")
				);

				const response = await request(
					`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
				);

				console.log(response);

				if (response?.body) {
					const { typeWebhook, messageData, senderData } = response.body;

					if (
						typeWebhook === "incomingMessageReceived" ||
						typeWebhook === "incomingAPIReceived" ||
						typeWebhook === "outgoingMessageReceived" ||
						typeWebhook === "outgoingAPIMessageReceived"
					) {
						let text = "";

						if (messageData?.textMessageData?.textMessage) {
							text = messageData.textMessageData.textMessage;
						} else if (messageData?.extendedTextMessageData?.text) {
							text = messageData.extendedTextMessageData.text;
						}

						if (text) {
							const newMessage = {
								text: text,
								from: senderData.chatId.replace("@c.us", ""),
								timestamp: new Date().toLocaleTimeString(),
							};

							setMessages((prev) => [...prev, newMessage]);
						}
						// Удаляем уведомление после обработки
						await request(
							`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.receiptId}`,
							"DELETE"
						);
					} else {
						await request(
							`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.receiptId}`,
							"DELETE"
						);
					}
				}
			} catch (e) {
				console.error("Ошибка получения сообщений:", e);
			}
		};

		const interval = setInterval(fetchMessages, 5000);
		return () => clearInterval(interval);
	}, [activeChat]);

	return (
		<div className='messages'>
			{messages
				.filter((msg) => msg.from === activeChat)
				.map((msg, i) => (
					<div
						key={i}
						className='message'>
						<span className='time'>{msg.timestamp}</span>
						<div className='text'>{msg.text}</div>
					</div>
				))}
		</div>
	);
};

export default GetMessage;
