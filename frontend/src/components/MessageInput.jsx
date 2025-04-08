import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile, Paperclip, Mic } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 border-t border-base-300 bg-base-100">
      {imagePreview && (
        <div className="mb-3">
          <div className="relative inline-block group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-base-300 shadow-md"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center">
              <button
                onClick={removeImage}
                className="btn btn-circle btn-sm btn-error btn-ghost"
                type="button"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-100 shadow-md border border-base-300
              flex items-center justify-center hover:bg-error hover:text-white transition-colors"
              type="button"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Additional action buttons - hidden on small screens */}
        <div className="hidden sm:flex">
          <button 
            type="button" 
            className="btn btn-circle btn-ghost btn-sm text-base-content/70 hover:text-primary"
          >
            <Paperclip size={18} />
          </button>
        </div>
        
        <div className="flex-1 flex items-center gap-2 bg-base-200/60 rounded-full px-4 py-2">
          {/* Emoji button */}
          <button 
            type="button" 
            className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-primary"
          >
            <Smile size={18} />
          </button>
          
          {/* Input field */}
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:outline-none placeholder:text-base-content/50 py-1"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          {/* Image upload button */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-ghost btn-circle btn-sm ${imagePreview ? "text-success" : "text-base-content/70 hover:text-primary"}`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
          >
            <Image size={18} />
          </button>
          
          {/* Voice message button - hidden on small screens
          <button 
            type="button" 
            className="hidden sm:flex btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-primary"
          >
            <Mic size={18} />
          </button> */}
        </div>
        
        {/* Send button */}
        <button
          type="submit"
          className={`btn btn-circle ${!text.trim() && !imagePreview ? 'btn-disabled' : 'btn-primary'} shadow-md`}
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={18} className={!text.trim() && !imagePreview ? "opacity-50" : ""} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;