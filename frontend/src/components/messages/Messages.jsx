import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length > 0 ? (
        messages.map((message, idx) => {
          const isLast = idx === messages.length - 1;
          return (
            <div key={message._id} ref={isLast ? lastMessageRef : null}>
              <Message message={message} />
            </div>
          );
        })
      ) : (
        <p className="text-center text-black">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
