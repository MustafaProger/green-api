import GetMessage from "../getMessage/GetMessage";
import DownloadWhatsApp from "../downloadWhatsApp/DownloadWhatsApp";
import SendMessage from "../sendMessage/SendMessage";
import "./СhatActive.scss";

const ChatActive = ({ chats, activeChat, setChats }) => {
	const handleSendMessage = (phone, message) => {
		setChats((prev) =>
			prev.map((chat) =>
				chat.phone === phone
					? {
							...chat,
							messages: [
								...chat.messages,
								{
									text: message,
									from: "me",
									timestamp: new Date().toLocaleTimeString(),
								},
							],
					  }
					: chat
			)
		);
	};

	const handleReceiveMessage = (phone, message) => {
		setChats((prev) =>
			prev.map((chat) =>
				chat.phone === phone
					? {
							...chat,
							messages: [
								...chat.messages,
								{
									text: message.text,
									from: message.from,
									timestamp: message.timestamp,
								},
							],
					  }
					: chat
			)
		);
	};

	// Находим активный чат
	const activeChatData = chats.find((chat) => chat.phone === activeChat?.phone);

	return (
		<div className='chat-active'>
			{activeChatData ? (
				<div className='chat-active__wrapper'>
					<h3 className='title'>{activeChatData.phone}</h3>
					<div className='messages'>
						{activeChatData.messages.map((msg, i) => (
							<div
								key={i}
								className={`message ${msg.from === "me" ? "my" : ""}`}>
								<div className='text'>{msg.text}</div>
								<div className='time'>{msg.timestamp.slice(0, 5)}</div>
							</div>
						))}
					</div>
					<SendMessage
						activeChat={activeChatData.phone}
						onSend={handleSendMessage}
					/>
				</div>
			) : (
				<DownloadWhatsApp />
			)}

			{/* GetMessage теперь только обрабатывает входящие сообщения */}
			<GetMessage
				chats={chats}
				onReceiveMessage={handleReceiveMessage}
			/>
		</div>
	);
};

export default ChatActive;
