import GetMessage from "../getMessage/GetMessage";
import SendMessage from "../sendMessage/SendMessage";
import "./ChatPerson.scss";

const ChatPerson = ({ chats, setChats }) => {
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

	return (
		<div className='chat-person'>
			{chats.map((item, indexItem) => (
				<div
					key={indexItem}
					className='chat-person__wrapper'>
					<h3 className='title'>{item.phone}</h3>
					<div className='messages'>
						<GetMessage
							activeChat={item.phone}
							chats={chats}
							onReceiveMessage={handleReceiveMessage}
						/>
					</div>
					<SendMessage
						activeChat={item.phone}
						onSend={handleSendMessage}
					/>
				</div>
			))}
		</div>
	);
};

export default ChatPerson;
