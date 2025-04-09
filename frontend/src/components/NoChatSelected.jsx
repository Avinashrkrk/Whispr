import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#1a1d24]">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Display with glow effect */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-40"></div>
          <div className="relative w-24 h-24 rounded-full bg-[#212630] flex items-center justify-center">
            <img 
              src="/whispr-logo.svg" 
              alt="Whispr Logo" 
              className="w-30 h-30 text-indigo-400"
            />
          </div>
        </div>
        
        {/* Welcome Text */}
        <h2 className="text-3xl font-semibold text-indigo-400">Welcome to Whispr!</h2>
        
        <p className="text-gray-300 text-lg">
          Select a conversation from the sidebar to start chatting
        </p>
        
        {/* Encryption note */}
        <p className="text-sm text-gray-500 pt-6">
          Your messages are end-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;