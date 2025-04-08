const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages with varying sizes
    const skeletonMessages = [
      { lines: 2, width: "w-[150px]" },
      { lines: 1, width: "w-[220px]" },
      { lines: 3, width: "w-[180px]" },
      { lines: 1, width: "w-[120px]" },
      { lines: 2, width: "w-[200px]" },
      { lines: 1, width: "w-[170px]" }
    ];
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {skeletonMessages.map((message, idx) => (
          <div 
            key={idx} 
            className={`chat ${idx % 2 === 0 ? "chat-start opacity-70" : "chat-end opacity-60"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border border-base-300">
                <div className="skeleton w-full h-full rounded-full bg-base-300" />
              </div>
            </div>
            
            <div className="chat-header opacity-80 mb-1 flex items-center gap-2">
              <div className="skeleton h-3 w-16 rounded-md bg-base-300" />
              <div className="skeleton h-2 w-8 rounded-md bg-base-300" />
            </div>
            
            <div className={`chat-bubble bg-transparent p-0 ${idx % 2 === 0 ? "bg-base-300/10" : "bg-primary/5"}`}>
              <div className="flex flex-col gap-1.5 p-1">
                {Array(message.lines).fill(null).map((_, lineIdx) => (
                  <div 
                    key={lineIdx}
                    className={`skeleton h-4 ${message.width} ${lineIdx === message.lines - 1 ? "w-24" : ""} rounded-md bg-base-300`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="chat-footer opacity-70 mt-1">
              <div className="skeleton h-2 w-12 rounded-md bg-base-300" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton;