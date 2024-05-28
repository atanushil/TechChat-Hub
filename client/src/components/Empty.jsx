import React from "react";

function Empty() {
  return (
    <div className="border-conversation-border border-l w-full  flex flex-col h-[100vh] animated-bg border-b-4 border-b-icon-green items-center justify-center">
      <img src="/no-chat.gif" alt="whatsapp-gif" height={300} width={300} className="mix-blend-multiply caret-transparent" />
      <p className="text-4xl animated-text uppercase font-sans">No Chat Selected.</p>
      <p className="text-xl text-yellow-50">Selected one from the add icon and start Chatting</p>
    </div>
  );
}

export default Empty;
