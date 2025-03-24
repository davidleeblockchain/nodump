import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/Header";

export const Token = (): JSX.Element => {
  // Chart y-axis labels data
  const yAxisLabels = [
    { value: "90k", top: 0 },
    { value: "80k", top: 45 },
    { value: "70k", top: 90 },
    { value: "60k", top: 135 },
    { value: "50k", top: 180 },
    { value: "40k", top: 225 },
    { value: "30k", top: 270 },
    { value: "20k", top: 315 },
    { value: "10k", top: 360 },
    { value: "0k", top: 405 },
  ];

  // Chart horizontal grid lines
  const gridLines = [
    { top: 242 },
    { top: 288 },
    { top: 332 },
    { top: 378 },
    { top: 422 },
    { top: 468 },
    { top: 512 },
    { top: 558 },
    { top: 602 },
    { top: 648 },
  ];

  // Chart bars data (blue for increase, red for decrease)
  const chartBars = [
    { left: "20%", top: 558, height: 91, color: "#32ccee", width: 18 },
    {
      left: "25%",
      top: 496,
      height: 91,
      color: "#32ccee",
      width: 18,
      isImage: true,
    },
    { left: "30%", top: 474, height: 91, color: "#32ccee", width: 18 },
    { left: "35%", top: 467, height: 91, color: "#32ccee", width: 18 },
    { left: "40%", top: 371, height: 46, color: "#32ccee", width: 18 },
    { left: "45%", top: 344, height: 46, color: "#32ccee", width: 18 },
    { left: "50%", top: 496, height: 46, color: "#32ccee", width: 18 },
    { left: "55%", top: 214, height: 139, color: "#32ccee", width: 18 },
    { left: "60%", top: 382, height: 148, color: "#32ccee", width: 18 },
    { left: "65%", top: 261, height: 148, color: "#32ccee", width: 18 },
    { left: "70%", top: 542, height: 46, color: "#ee2424", width: 18 },
    { left: "75%", top: 478, height: 46, color: "#ee2424", width: 18 },
    { left: "80%", top: 484, height: 46, color: "#ee2424", width: 18 },
    {
      left: "85%",
      top: 300,
      height: 105,
      color: "#32ccee",
      width: 18,
      isImage: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#100425] flex flex-col justify-center w-full">
      <div className="w-full mx-auto relative min-h-screen">
        {/* Header with Logo and Connect Wallet */}
        <Header />
        <div className="relative w-full min-h-screen p-4 sm:p-6 md:p-8">
          {/* Background gradient */}
          <div className="fixed w-[650px] h-[650px] top-[476px] right-0 md:right-[50px] rounded-[324.87px] rotate-[-6.23deg] blur-[350px] [background:linear-gradient(133deg,rgba(220,0,211,1)_54%,rgba(12,250,245,1)_100%)] opacity-50 md:opacity-100" />

          {/* <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="w-full max-w-[200px] sm:max-w-[273px] h-auto sm:h-[114px]">
              <img
                className="w-full h-full object-contain"
                alt="Group"
                src="/logo.svg"
              />
            </div>
            <button className="text-[#fcfbfb] text-lg sm:text-xl font-medium whitespace-nowrap">
              [ Connect Wallet ]
            </button>
          </div> */}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
            {/* Chart Card */}
            <Card className="flex-grow basis-full lg:basis-2/3 min-h-[20rem] sm:min-h-[30rem] rounded-[25px] shadow-[-6px_4px_10px_#00000040] backdrop-blur-[70px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(70px)_brightness(100%)] border-0">
              <CardContent className="p-0 h-full relative">
                {/* Y-axis labels */}
                <div className="absolute w-8 sm:w-11 h-[420px] top-[31px] left-[12px] sm:left-[21px]">
                  {yAxisLabels.map((label, index) => (
                    <div
                      key={index}
                      className="absolute [font-family:'Inter',Helvetica] font-bold text-[#868b93] text-[10px] sm:text-xs tracking-[0] leading-[normal]"
                      style={{
                        top: `${label.top}px`,
                        left: index === 9 ? "4px" : index === 8 ? "2px" : "0",
                      }}
                    >
                      {label.value}
                    </div>
                  ))}
                </div>

                {/* Grid lines */}
                <div className="absolute left-[3rem] sm:left-[4.5rem] right-2 sm:right-4 top-[31px] bottom-4">
                  {gridLines.map((line, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-px bg-[#868b9359]"
                      style={{ top: `${line.top - 242}px` }}
                    />
                  ))}

                  {/* Chart bars */}
                  {chartBars.map((bar, index) =>
                    bar.isImage ? (
                      <img
                        key={index}
                        className="absolute"
                        alt="Rectangle"
                        src="/rectangle-29.svg"
                        style={{
                          width: `${bar.width}px`,
                          height: `${bar.height}px`,
                          top: `${bar.top - 242}px`,
                          left: bar.left,
                        }}
                      />
                    ) : (
                      <div
                        key={index}
                        className="absolute"
                        style={{
                          width: `${bar.width}px`,
                          height: `${bar.height}px`,
                          top: `${bar.top - 242}px`,
                          left: bar.left,
                          backgroundColor: bar.color,
                        }}
                      />
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trading Card */}
            <Card className="flex-grow basis-full lg:basis-1/3 min-h-[20rem] sm:min-h-[30rem] rounded-[25px] shadow-[-6px_4px_10px_#00000040] backdrop-blur-[70px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(70px)_brightness(100%)] border-0">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center h-full">
                <div className="text-center [font-family:'Inter',Helvetica] font-bold text-[#32ccee] text-base sm:text-[19px] tracking-[0] leading-[normal] mb-8 sm:mb-12">
                  Token Name
                </div>

                <div className="w-full mb-4">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-white text-base sm:text-[19px] tracking-[0] leading-[normal] mb-2">
                    Amount (SOL)
                  </div>
                  <div className="relative">
                    <Input
                      className="w-full h-[46px] bg-[#868b9359] rounded-[10px] border border-solid border-[#7f678d] [font-family:'Inter',Helvetica] font-bold text-white text-base sm:text-[19px] px-3"
                      defaultValue="3"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="[font-family:'Inter',Helvetica] font-bold text-white text-base sm:text-[19px]">
                        SOL
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[url(/group-1.png)] bg-[100%_100%]">
                        <img
                          className="w-[16px] sm:w-[19px] h-3 sm:h-4 mt-1.5 ml-1"
                          alt="Group"
                          src="/group.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full mb-6 sm:mb-8 relative">
                  <Input
                    className="w-full h-[46px] bg-[#868b9359] rounded-[10px] border border-solid border-[#7f678d] [font-family:'Inter',Helvetica] font-bold text-[#ffffff80] text-base sm:text-[19px] px-3"
                    defaultValue="95031332"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 [font-family:'Inter',Helvetica] font-bold text-white text-base sm:text-[19px] tracking-[0] leading-[normal]">
                    Tokens
                  </div>
                </div>

                <Button className="w-full sm:w-[186px] h-[41px] bg-[#32ee80] rounded-xl [font-family:'Inter',Helvetica] font-bold text-white text-base sm:text-[19px] hover:bg-[#2bd972]">
                  Place Trade
                </Button>

                <div className="mt-auto pt-6">
                  <div className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff80] text-[10px] tracking-[0] leading-[normal] whitespace-nowrap text-center mb-1">
                    Observation &amp; Disclaimer:
                  </div>
                  <div className="w-full [font-family:'Inter',Helvetica] font-normal text-[#ffffff80] text-[10px] text-center tracking-[0] leading-4">
                    Nodump ensures that users cannot sell their coins during the
                    pre-launch phase. This safeguards againstrug pulls, protecting
                    investors and fostering trust. By preventing premature sales,
                    Nodump accelerates the process of launching coins securely and
                    efficiently.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};