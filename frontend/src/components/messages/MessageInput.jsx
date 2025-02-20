import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { BsEmojiSmile } from "react-icons/bs";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojis, setShowEmojis] = useState(false);
	const { loading, sendMessage } = useSendMessage();
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  if (!message.trim()) return;
	  await sendMessage(message);
	  setMessage("");
	};
  
	const addEmoji = (emoji) => {
	  setMessage((prev) => prev + emoji);
	  setShowEmojis(false);
	};
  
	const emojis = ["😀", "😂", "😍", "😎", "👍", "🙏", "🎉"];
  
	return (
	  <form className="relative px-4 my-3" onSubmit={handleSubmit}>
		<div className="w-full relative">
		  {/* Emoji Toggle Button */}
		  <button
			type="button"
			className="absolute inset-y-0 left-0 flex items-center pl-3 z-10"
			onClick={() => setShowEmojis((prev) => !prev)}
		  >
			<BsEmojiSmile className="text-xl text-gray-400" />
		  </button>
  
		  <input
			type="text"
			className="border rounded-lg block w-full p-2.5 pl-10 pr-12 bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500 transition-all"
			placeholder="Send a message"
			value={message}
			onChange={(e) => setMessage(e.target.value)}
		  />
  
		  {/* Send Button */}
		  <button
			type="submit"
			className="absolute inset-y-0 right-0 flex items-center pr-3"
		  >
			{loading ? (
			  <div className="loading loading-spinner"></div>
			) : (
			  <BsSend className="text-xl text-gray-400" />
			)}
		  </button>
		</div>
  
		{/* Emoji Picker Popover */}
		{showEmojis && (
		  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded p-2 flex gap-2">
			{emojis.map((emoji, index) => (
			  <span
				key={index}
				className="cursor-pointer text-xl hover:scale-110 transition-transform"
				onClick={() => addEmoji(emoji)}
			  >
				{emoji}
			  </span>
			))}
		  </div>
		)}
	  </form>
	);
  };
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;