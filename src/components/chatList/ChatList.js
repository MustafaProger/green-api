import { useState } from "react";
import NewChat from "../newChat/NewChat";
import "./ChatList.scss";

const ChatList = () => {
	const [activeChat, setActiveChat] = useState(null);

	return (
		<div className='chat-container'>
			<h2>Чаты</h2>

			<div className='chat-header'>
				<h3>Чат с {activeChat}</h3>
				<button onClick={() => setActiveChat(null)}>Закрыть чат</button>
			</div>
			
			<NewChat onChatCreated={setActiveChat} />
		</div>
	);
};

export default ChatList;
