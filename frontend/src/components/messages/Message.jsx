import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  // Blue for your messages; light gray for others
  const bubbleBgColor = fromMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-900";
  const shakeClass = message.shouldShake ? "animate-shake" : "";

  return (
    <div className={`chat ${chatClassName} my-2`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="user avatar" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble ${bubbleBgColor} ${shakeClass} max-w-md px-4 py-2 rounded-lg`}
      >
        <p>{message.message}</p>
        <div className="text-right text-xs text-opacity-75 mt-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
