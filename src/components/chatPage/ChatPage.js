// components/chat/ChatPage.jsx
import { useState } from "react";
import NewChat from "../newChat/NewChat";
import SendMessage from '../sendMessage/SendMessage'
import GetMessage from "../getMessage/GetMessage";
import './ChatPage.scss'

const ChatPage = () => {
	const [activeChat, setActiveChat] = useState(null);

	return (
		<div className='chat-container'>
			{!activeChat ? (
				<NewChat onChatCreated={setActiveChat} />
			) : (
				<>
					<div className='chat-header'>
						<h3>Чат с {activeChat}</h3>
						<button onClick={() => setActiveChat(null)}>Закрыть чат</button>
					</div>

					<div className='chat-messages'>
						<GetMessage activeChat={activeChat} />
					</div>

					<div className='chat-input'>
						<SendMessage activeChat={activeChat} />
					</div>
				</>
			)}
		</div>
	);
};

export default ChatPage;
