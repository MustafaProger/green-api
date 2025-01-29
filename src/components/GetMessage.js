import { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";

const apiUrl = "https://1103.api.green-api.com";
const idInstance = "1103182867";
const apiTokenInstance = "765c269474db4ad19f119c9087db6e842c9bc982c0f24b85aa";

const url = `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`;

function GetMessage() {
	const { loading, request, error, clearError } = useHttp();

	const [dataMessage, setDataMessage] = useState(null);

	async function getMessage() {
		const res = await request(url);
		return res;
	}

	useEffect(() => {
		const fetchData = async () => {
			const message = await getMessage();
			if (
				message !== null &&
				message.body.typeWebhook === "incomingMessageReceived"
			) {
				setDataMessage(message);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <h1 style={{ textAlign: "center" }}>loading...</h1>;
	}

	return (
		<div className='get-message'>
			{dataMessage ? (
				<p>{dataMessage.body.messageData.textMessageData.textMessage}</p>
			) : null}
		</div>
	);
}

export default GetMessage;
