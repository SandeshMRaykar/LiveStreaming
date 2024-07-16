// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMessages, newMessage } from '../redux/actions/chatActions';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// const Chat = () => {
//     const dispatch = useDispatch();
//     const messages = useSelector(state => state.chat.messages);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         dispatch(getMessages());
//     }, [dispatch]);

//     useEffect(() => {
//         socket.on('message', msg => {
//             dispatch(newMessage(msg));
//         });
//     }, [dispatch]);

//     const sendMessage = () => {
//         socket.emit('sendMessage', message);
//         setMessage('');
//     };

//     return (
//         <div>
//             <h1>Chat Page</h1>
//             <div>
//                 {messages.map((msg, index) => (
//                     <p key={index}>{msg.message}</p>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={e => setMessage(e.target.value)}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default Chat;
