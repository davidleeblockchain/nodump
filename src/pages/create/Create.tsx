import { UploadIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

export const Create = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#100425] flex justify-center">
      <div className="relative w-full min-h-screen">
        {/* Gradient background effect */}
        <div className="fixed w-[250px] sm:w-[450px] md:w-[650px] h-[250px] sm:h-[450px] md:h-[650px] bottom-0 right-0 rounded-[324.87px] blur-[150px] sm:blur-[250px] md:blur-[350px] [background:linear-gradient(133deg,rgba(220,0,211,0.4)_54%,rgba(12,250,245,0.4)_100%)] md:[background:linear-gradient(133deg,rgba(220,0,211,1)_54%,rgba(12,250,245,1)_100%)]" />

        {/* Header Section */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-[58px] pt-4 md:pt-7 gap-4">
          <img
            className="w-[200px] md:w-[273px] h-auto md:h-[114px] object-cover mb-4 md:mb-0"
            alt="Nodump Logo"
            src="public/group-10-1.png"
          />
          <Button
            variant="ghost"
            className="text-[#fcfbfb] text-lg md:text-xl font-medium"
          >
            [ Connect Wallet ]
          </Button>
        </div>

        {/* relative z-10 h-auto mx-4 md:mx-[50px] mt-6 md:mt-[40px] w-full rounded-[inherit] */}
        {/* Form Container */}
        <div className="relative flex flex-col gap-6 sm:gap-8 md:gap-12 mb-[50px] mx-[20px] md:mx-[50px] mt-6 md:mt-[61px]">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
            <div className="w-full">
              <Label
                htmlFor="coinName"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Coin Name
              </Label>
              <Input
                id="coinName"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="coinTag"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Coin Tag
              </Label>
              <Input
                id="coinTag"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
              />
            </div>

            <div className="w-full">
              <Label className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]">Type</Label>
              <RadioGroup defaultValue="utility" className="flex gap-4 sm:gap-8 md:gap-16 mt-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="utility"
                    id="utility"
                    className="bg-[#5c3f77]"
                  />
                  <Label
                    htmlFor="utility"
                    className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
                  >
                    Utility
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="meme"
                    id="meme"
                    className="bg-[#5c3f77]"
                  />
                  <Label
                    htmlFor="meme"
                    className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
                  >
                    Meme
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
            <div className="w-full">
              <Label
                htmlFor="coinImage"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Coin Image
              </Label>
              <Button
                variant="ghost"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center justify-center gap-2"
              >
                <UploadIcon className="w-[16px] sm:w-[19px] h-[16px] sm:h-[18px]" />
                <span className="font-bold text-[#dddbdb] text-[13px] sm:text-[15px]">
                  UploadIcon Coin Image
                </span>
              </Button>
            </div>

            <div className="w-full">
              <Label
                htmlFor="whitePaper"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                White Paper
              </Label>
              <Button
                variant="ghost"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center justify-center gap-2"
              >
                <UploadIcon className="w-[16px] sm:w-[19px] h-[16px] sm:h-[18px]" />
                <span className="font-bold text-[#dddbdb] text-[13px] sm:text-[15px]">
                  UploadIcon White Paper
                </span>
              </Button>
            </div>

            <div className="w-full">
              <Label
                htmlFor="numberOfCoins"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Number Of Coins
              </Label>
              <Select>
                <SelectTrigger className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white">
                  <SelectValue placeholder="Select number of coins" />
                </SelectTrigger>
                <SelectContent className="bg-[#2D1854] border-none text-white">
                  <SelectItem value="1m" className="text-white hover:bg-[#3D2466] focus:bg-[#3D2466]">1,000,000 (1M)</SelectItem>
                  <SelectItem value="10m" className="text-white hover:bg-[#3D2466] focus:bg-[#3D2466]">10,000,000 (10M)</SelectItem>
                  <SelectItem value="100m" className="text-white hover:bg-[#3D2466] focus:bg-[#3D2466]">100,000,000 (100M)</SelectItem>
                  <SelectItem value="1b" className="text-white hover:bg-[#3D2466] focus:bg-[#3D2466]">1,000,000,000 (1B)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
            <div className="w-full">
              <Label
                htmlFor="websiteLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Website Link
              </Label>
              <Input
                id="websiteLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="twitterLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Twitter / X Link
              </Label>
              <Input
                id="twitterLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="telegramLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Telegram Link
              </Label>
              <Input
                id="telegramLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
              />
            </div>
          </div>

          {/* Description and ID Submit Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-24">
            <div className="lg:col-span-2">
              <Label
                htmlFor="description"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Description
              </Label>
              <Textarea
                id="description"
                className="w-full h-[120px] sm:h-[162px] mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb] resize-none"
              />
            </div>

            <div className="space-y-6 w-full flex flex-col justify-between">
              <div>
                <Label
                  htmlFor="idSubmit"
                  className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px] mb-2"
                >
                  ID Submit
                </Label>
                <Button
                  variant="ghost"
                  className="w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center justify-center gap-2"
                >
                  <UploadIcon className="w-[16px] sm:w-[19px] h-[16px] sm:h-[18px]" />
                  <span className="font-bold text-[#dddbdb] text-[13px] sm:text-[15px]">
                    UploadIcon ID
                  </span>
                </Button>
              </div>
              <Button className="w-full h-[40px] sm:h-[45px] rounded-[10px] bg-gradient-to-r from-[#ff00f5] to-[#00f0ff] shadow-[-1px_-1px_4px_#00000040] text-white font-medium text-lg sm:text-xl">
                Apply Coin
              </Button>
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
              <div>
                <Label
                  htmlFor="idSubmit"
                  className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
                >
                  ID Submit
                </Label>
                <Button
                  variant="ghost"
                  className="w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center justify-center gap-2"
                >
                  <UploadIcon className="w-[16px] sm:w-[19px] h-[16px] sm:h-[18px]" />
                  <span className="font-bold text-[#dddbdb] text-[13px] sm:text-[15px]">
                    UploadIcon ID
                  </span>
                </Button>
              </div>
              <Button className="w-full h-[40px] sm:h-[45px] rounded-[10px] bg-gradient-to-r from-[#ff00f5] to-[#00f0ff] shadow-[-1px_-1px_4px_#00000040] text-white font-medium text-lg sm:text-xl">
                Apply Coin
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};