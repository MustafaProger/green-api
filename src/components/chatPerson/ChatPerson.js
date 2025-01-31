import SendMessage from "../sendMessage/SendMessage";
import "./ChatPerson.scss";

const ChatPerson = ({ chats, setChats }) => {
	return (
		<>
			<div className='chat-person'>
				{chats.map((item) => {
					return (
						<div className='chat-person__wrapper'>
							<h3 className='title'>{item.phone}</h3>
							<div class='messages'>
								{item.messages.map((message) => {
									return (
										<div
											className={`messages__item ${
												message.from === "me" ? "me" : "person"
											}`}>
											<div className='text'>{message.text}</div>
											<div className='time'>
												{message.timestamp.slice(0, 5)}
											</div>
										</div>
									);
								})}
							</div>
							<SendMessage
								activeChat={item.phone}
								setChats={setChats}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default ChatPerson;
