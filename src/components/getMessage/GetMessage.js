import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import "./GetMessage.scss";

const GetMessage = ({ chats, onReceiveMessage }) => {
	const { request } = useHttp();

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
						typeWebhook === "incomingAPIReceived"
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

							onReceiveMessage(
								senderData.chatId.replace("@c.us", ""),
								newMessage
							);
						}
					}

					await request(
						`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.receiptId}`,
						"DELETE"
					);
				}
			} catch (e) {
				console.error("Ошибка получения сообщений:", e);
			}
		};

		const interval = setInterval(fetchMessages, 5000);
		return () => clearInterval(interval);
	}, [onReceiveMessage, request]);

	return null;
};

export default GetMessage;
