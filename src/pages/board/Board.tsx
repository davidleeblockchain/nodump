import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";

export const Board = (): JSX.Element => {
  // Data for coin cards to enable mapping
  const coinCards = Array(12).fill({
    name: "Coin Name",
    image: "public/images-12.png",
  });

  return (
    <div className="bg-[#100425] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#100425] w-full max-w-full h-min-screen relative overflow-hidden">
        {/* Background elements */}
        <img
          className="w-full h-full absolute top-0 left-0"
          alt="Background"
          src="public/rectangle-1.svg"
        />

        <div className="absolute w-full md:w-[650px] h-[650px] top-[346px] left-0 md:left-[-54px] rounded-[324.87px] rotate-[-6.23deg] blur-[350px] [background:linear-gradient(180deg,rgb(220,0,211)_54.43%,rgb(12,250,245)_100%)]" />

        {/* Header with logo and wallet button */}
        <header className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-[58px] pt-4 md:pt-7 gap-4">
          <img
            className="h-auto md:h-[114px] w-[200px] md:w-[273px] object-contain"
            alt="Logo"
            src="public/group-10-1.png"
          />
          <Button
            variant="ghost"
            className="text-[#fcfbfb] text-lg md:text-xl font-medium"
          >
            [ Connect Wallet ]
          </Button>
        </header>

        {/* SearchIcon and Create New Coin section */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-[50px] mt-6 md:mt-[61px] gap-4">
          <div className="relative w-full md:w-[498px]">
            <Input
              className="h-[45px] pl-6 pr-12 rounded-[19px] text-lg md:text-xl text-[#787878] shadow-[-1px_-1px_4px_#00000040] border-none bg-transparent w-full"
              placeholder="Search"
            />
            <SearchIcon className="absolute w-[18px] h-[18px] top-3.5 right-4 text-[#787878]" />
          </div>

          <a href="/create">
            <Button className="h-[45px] w-full md:w-[219px] rounded-[19px] [background:linear-gradient(180deg,rgb(220,0,211)_36.87%,rgb(12,250,245)_100%)] [font-family:'Inter',Helvetica] font-medium text-[#fcfbfb] text-lg md:text-xl shadow-[-1px_-1px_4px_#00000040]">
              Create New Coin
            </Button>
          </a>
        </div>

        {/* Coin cards grid */}
        <ScrollArea className="relative z-10 h-auto mx-4 md:mx-[50px] mt-6 md:mt-[40px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-[66px] md:gap-y-[22px] pb-4">
            {coinCards.map((coin, index) => (
              <Card
                key={index}
                className="w-full h-44 bg-[#262634] rounded-[19px] shadow-[-1px_-1px_4px_#00000040] opacity-60 overflow-hidden border-none relative"
              >
                <CardContent className="p-0 h-full">
                  <img
                    className="absolute w-[120px] md:w-[149px] h-[140px] md:h-[171px] top-0.5 left-0 object-cover"
                    alt="Coin"
                    src={coin.image}
                  />
                  <div className="absolute top-[13px] left-[130px] md:left-[157px] [font-family:'!_PEPSI_!-Regular',Helvetica] font-normal text-white text-lg md:text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    {coin.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};