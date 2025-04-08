import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);
  
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#2a2f3a] flex flex-col transition-all duration-200 bg-[#1e2129]">
      {/* Header */}
      <div className="border-b border-[#2a2f3a] w-full p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 rounded-full bg-[#2a2f3a] flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-medium text-gray-200 hidden lg:block">Contacts</span>
        </div>
      </div>
      
      {/* Search bar skeleton */}
      <div className="px-4 py-3 border-b border-[#2a2f3a]">
        <div className="skeleton h-9 w-full rounded-full bg-[#2a2f3a] opacity-30"></div>
      </div>
      
      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-2 scrollbar-thin scrollbar-thumb-[#2a2f3a] scrollbar-track-transparent">
        {skeletonContacts.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-full p-3 flex items-center gap-3 ${idx % 3 === 0 ? 'opacity-70' : 'opacity-40'}`}
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full bg-[#2a2f3a]" />
            </div>
            
            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="skeleton h-4 w-32 rounded-md bg-[#2a2f3a]" />
              <div className="skeleton h-3 w-16 rounded-md bg-[#2a2f3a]" />
            </div>
            
            {/* Status indicator skeleton */}
            <div className="hidden lg:block">
              <div className="skeleton h-2 w-2 rounded-full bg-[#2a2f3a]" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;