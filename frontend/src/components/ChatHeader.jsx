import { X, Phone, Video, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const isOnline = onlineUsers.includes(selectedUser._id);
  
  return (
    <div className="p-4 border-b border-base-300 bg-base-100/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online indicator */}
          <div className="avatar relative">
            <div className="w-12 h-12 rounded-full ring ring-base-200 ring-offset-base-100 ring-offset-2">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="object-cover"
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-base-100"></span>
            )}
          </div>
          
          {/* User info */}
          <div>
            <h3 className="font-semibold text-lg">{selectedUser.fullName}</h3>
            <p className="text-sm flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className="text-base-content/70">
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary">
            <Phone size={18} />
          </button>
          <button className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary">
            <Video size={18} />
          </button>
          <button className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary">
            <MoreVertical size={18} />
          </button>
          <button 
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm btn-circle hover:bg-red-100 hover:text-red-500 ml-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;