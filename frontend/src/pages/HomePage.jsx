import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useEffect } from "react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  // Add title effect to match other pages
  useEffect(() => {
    document.title = "Whispr | Home";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200">
      <div className="container mx-auto flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-xl shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-base-300">
          {/* Header section */}
          <div className="px-6 py-3 border-b border-base-300 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">Whispr Messages</h2>
            <div className="badge badge-accent badge-outline">Online</div>
          </div>
          
          {/* Chat interface */}
          <div className="flex h-[calc(100%-56px)] rounded-b-xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
