import React from "react";
import { Card, CardContent } from "../../components/ui/card";

export const Profile = (): JSX.Element => {
  const profileData = {
    username: "@Gabit4r",
    followers: "3 Followers",
    description: "Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description",
    walletId: "93uf93jbvue8933jf02ndpk29gfj3mc9iem0hp3hfuitk",
  };

  const tabs = [
    { label: "Coins Held", isActive: true },
    { label: "Replies", isActive: false },
    { label: "Notification", isActive: false },
    { label: "Coins Created", isActive: false },
    { label: "Followers", isActive: false },
    { label: "Following", isActive: false },
  ];

  return (
    <div className="bg-[#100425] min-h-screen">
      <div className="max-w-[1366px] mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 relative">
        {/* Background gradient */}
        <div className="absolute w-full sm:w-[650px] h-[650px] top-[346px] left-0 sm:left-[33px] rounded-[324.87px] rotate-[-6.23deg] blur-[350px] [background:linear-gradient(133deg,rgba(220,0,211,1)_54%,rgba(12,250,245,1)_100%)]" />
        
        <Card className="bg-[#1A0B38]/60 backdrop-blur-sm border-[#E056D7] rounded-[20px]">
          <CardContent className="p-4 sm:p-6 md:p-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="w-20 sm:w-16 h-20 sm:h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                <img
                  src="/3d-astronaut-on-transparent-background-free-png-2.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl text-white font-medium mb-1">{profileData.username}</h1>
                <p className="text-white/80 text-sm mb-3">{profileData.followers}</p>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">{profileData.description}</p>
                <div className="bg-[#262634] rounded-[10px] p-3">
                  <p className="text-white/80 text-xs sm:text-sm font-medium break-all">{profileData.walletId}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mt-6 sm:mt-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                    ${tab.isActive 
                      ? 'bg-[#00D1FF] text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="mt-6 sm:mt-8 min-h-[300px] sm:min-h-[400px] bg-[#262634]/50 rounded-[20px]">
              {/* Empty state or future content */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};