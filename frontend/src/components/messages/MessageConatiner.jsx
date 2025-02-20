import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // Only calculate online status if selectedConversation exists
  const isOnline = selectedConversation
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  useEffect(() => {
    // Cleanup on unmount: deselect conversation
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col h-full bg-transparent">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-transparent border-b border-gray-200 px-4 py-3 flex items-center shadow-sm">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={selectedConversation.profilePic}
                alt={selectedConversation.fullName}
              />
              <div>
                <p className="font-bold text-gray-900">
                  {selectedConversation.fullName}
                </p>
                <div className="text-xs">
                  {isOnline ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <span className="text-gray-500">Last seen: a while ago</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-transparent">
            <Messages />
          </div>

          {/* Input Area */}
          <div className="px-4 py-2 border-t border-gray-200 bg-transparent">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent">
      <div className="text-center p-4">
        <p className="text-2xl text-gray-800">
          Welcome, {authUser.fullName}! 👋
        </p>
        <p className="text-xl text-gray-600 mt-2">
          Select a chat to start messaging 💬😊
        </p>
        <div className="flex justify-center">
          <TiMessages className="mt-4 text-7xl text-gray-400" />
        </div>
      </div>
    </div>
  );
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
