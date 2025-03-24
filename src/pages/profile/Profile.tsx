import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Header } from "../../components/Header";

export const Profile = (): JSX.Element => {
  // User profile data
  const userData = {
    username: "@Gabit4r",
    followers: 3,
    description:
      "Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description Your Description\nYour Description Your Description Your Description Your Description Your Description Your Description",
    walletAddress: "93uf93jbvue8933jf02ndpk29gfj3mc9iem0hp3hfuitk",
  };

  // Navigation tabs data
  const tabItems = [
    { id: "coins-held", label: "Coins Held" },
    { id: "replies", label: "Replies" },
    { id: "notification", label: "Notification" },
    { id: "coins-created", label: "Coins Created" },
    { id: "followers", label: "Followers" },
    { id: "following", label: "Following" },
  ];

  return (
    <div className="bg-dark-purple flex flex-row justify-center w-full min-h-screen">
      <div className="bg-dark-purple w-full min-h-screen relative">
        {/* Background gradient */}
        {/* <div className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/50 via-dark-purple to-dark-purple" /> */}

        {/* Gradient effect */}
        <div className="absolute w-[250px] md:w-[650px] h-[250px] md:h-[650px] bottom-0 left-[13px] md:left-[33px] rounded-[324.87px] blur-[350px] bg-gradient-primary" />

        <Header />

        {/* Profile section */}
        <div className="relative z-10 md:px-14 pb-14">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <Avatar className="w-[54px] h-[54px]">
              <AvatarImage src="/ellipse-4.png" alt="Profile" />
              <AvatarFallback>GA</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="font-medium text-text-white text-lg">
                {userData.username}
              </h2>
              <p className="font-normal text-text-white text-base">
                {userData.followers} Followers
              </p>
              <p className="font-medium text-text-white text-base leading-[25px] mt-4 max-w-full md:max-w-[600px] whitespace-pre-line">
                {userData.description}
              </p>
            </div>
          </div>

          {/* Wallet address input */}
          <div className="mt-8 md:mt-16 max-w-full">
            <Input
              className="w-full h-[45px] rounded-xl shadow-[-1px_-1px_4px_#00000040] bg-transparent text-text-white font-medium text-base px-4 overflow-x-auto"
              value={userData.walletAddress}
              readOnly
            />
          </div>

          {/* Navigation tabs */}
          <Tabs defaultValue="coins-held" className="mt-8 md:mt-16 justify-items-center">
            <TabsList className="bg-transparent border-none flex flex-wrap md:flex-nowrap gap-2 md:gap-8 justify-center md:justify-start">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="font-medium text-sm md:text-base data-[state=active]:bg-accent-blue data-[state=active]:text-text-white data-[state=active]:opacity-100 data-[state=inactive]:text-text-white data-[state=inactive]:opacity-50 data-[state=active]:rounded-[7px] data-[state=active]:px-3 data-[state=active]:py-1"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab content */}
            <TabsContent value="coins-held" className="mt-8">
              <Card className="w-full min-h-[365px] bg-light-purple rounded-[5px] border-none">
                <CardContent className="p-0">
                  {/* Content for Coins Held tab */}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tab contents */}
            {tabItems.slice(1).map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <Card className="min-w-[340px] md:w-[750px] min-h-[365px] bg-light-purple rounded-[5px] border-none">
                  <CardContent className="p-0">
                    {/* Content for other tabs */}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};