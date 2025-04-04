import { UploadIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify"
import { VersionedTransaction, 
    TransactionMessage, 
    PublicKey
} from '@solana/web3.js'
import { useContract } from "../../contexts/ContractContext";
import { NATIVE_MINT } from "@solana/spl-token";
import { Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { TOKEN_TOTAL_SUPPLY } from "../../engine/consts";
import { connection, addLookupTableInfo } from "../../engine/config";
import { createToken } from "../../engine/createToken";
import { updateToken } from "../../api/token";
import { prioritizeIxs, send, sleep } from "../../engine/utils";
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
import { Header } from "../../components/Header";

export const Create = (): JSX.Element => {
  const coinAmounts = [
    { value: 1000000, label: "1,000,000 (1M)" },
    { value: 10000000, label: "10,000,000 (10M)" },
    { value: 100000000, label: "100,000,000 (100M)" },
    { value: 1000000000, label: "1,000,000,000 (1B)" },
  ];

  const liveTimes = [
    { value:259200, label: "30 days" },
    { value:518400, label: "60 days" },
    { value:7776000, label: "90 days" },
    { value:31536000, label: "365 days" },
  ];

  const { connected } = useWallet();

  const coinName = useRef<HTMLInputElement | null>(null);
  const ticker = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);
  const twitterLink = useRef<HTMLInputElement | null>(null)
  const telegramLink = useRef<HTMLInputElement | null>(null)
  const websiteLink = useRef<HTMLInputElement | null>(null)
  const referral = useRef<HTMLInputElement | null>(null)
  const whitepaperLink = useRef<HTMLInputElement>(null);
  // const whitepaperRef = useRef<HTMLInputElement>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [coinImage, setCoinImage] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imgBuffer, setImageBuffer] = useState()
  const [coinType, setCoinType] = useState<string>("meme");
  const [isIDSubmitDialogOpen, setIsIDSubmitDialogOpen] = useState(false);
  // const [whitePaperFile, setWhitePaperFile] = useState<File | null>(null);
  const [selectedCoinAmount, setSelectedCoinAmount] = useState<string>("1,000,000,000 (1B)");
  const [selectedCoinAmountValue, setSelectedCoinAmountValue] = useState(1000000000);
  const [selectedLiveTime, setSelectedLiveTime] = useState<string>("30 days");
  const [selectedLiveTimeValue, setSelectedLiveTimeValue] = useState(259200);

  const handleCreateCoin = () => {
    if (coinName.current?.value === '') {
      toast.error('No name!')
      return
    }
    if (imageName === '') {
      toast.error('No image uploaded!')
      return
    }
    if (ticker.current?.value === '') {
      toast.error('No ticker!')
      return
    }
    if (!connected) {
      toast.error('No Wallet Connected!')
      return
    }
    if (referral.current?.value) {
      try {
        if (referral.current?.value) {
          const key = new PublicKey(referral.current.value);
        } else {
          throw new Error('Referral address is undefined');
        }
      } catch (err) {
        toast.error('Invalid referral address!')
        return
      }
    }

    setIsDialogOpen(true)
  };

  const handleFileRead = (event: any) => {
    const imageBuffer = event.target.result;
    // console.log('imageBuffer:', imageBuffer);
    setImageBuffer(imageBuffer);
  };

  const handleTypeChange = (value: string) => {
    setCoinType(value);
  };

  const handleIDSubmit = () => {
    // Handle ID submit logic here
    setIsIDSubmitDialogOpen(true);
  };

  const handleCoinAmountChange = (value: string) => {
    setSelectedCoinAmount(value);
    const selectedAmount = coinAmounts.find(amount => amount.label.toString() === value);
    if (selectedAmount) {
      setSelectedCoinAmountValue(selectedAmount.value);
    }
  };

  const handleLiveTimeChange = (value: string) => {
    setSelectedLiveTime(value);
    const selectedTime = liveTimes.find(time => time.label.toString() === value);
    if (selectedTime) {
      setSelectedLiveTimeValue(selectedTime.value);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#100425] flex justify-center">
      <div className="relative w-full min-h-screen">
        {/* Gradient background effect */}
        <div className="fixed w-[250px] sm:w-[450px] md:w-[650px] h-[250px] sm:h-[450px] md:h-[650px] bottom-0 right-0 rounded-[324.87px] blur-[150px] sm:blur-[250px] md:blur-[350px] [background:linear-gradient(133deg,rgba(220,0,211,0.4)_54%,rgba(12,250,245,0.4)_100%)] md:[background:linear-gradient(133deg,rgba(220,0,211,1)_54%,rgba(12,250,245,1)_100%)]" />

        {/* Header Section */}
        <Header />

        {/* relative z-10 h-auto mx-4 md:mx-[50px] mt-6 md:mt-[40px] w-full rounded-[inherit] */}
        {/* Form Container */}
        <div className="relative flex flex-col gap-12 mb-[50px] mx-[20px] md:mx-[50px] mt-6">
          {/* Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 md:gap-x-24">
            <div className="w-full md:col-start-2 lg:col-start-3">
              <Label className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]">Type</Label>
              <RadioGroup defaultValue="meme" onValueChange={handleTypeChange} className="flex gap-4 sm:gap-8 md:gap-16 mt-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="meme"
                    id="meme"
                    className="bg-[#e9c5e4]"
                  />
                  <Label
                    htmlFor="meme"
                    className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
                  >
                    Meme
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="utility"
                    id="utility"
                    className="bg-[#e9c5e4]"
                  />
                  <Label
                    htmlFor="utility"
                    className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
                  >
                    Utility
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 md:gap-x-24">
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
                ref={coinName}
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
                ref={ticker}
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="coinImage"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Coin Image
              </Label>
              {/* <Button
                variant="ghost"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center justify-center gap-2"
              >
                <UploadIcon className="w-[16px] sm:w-[19px] h-[16px] sm:h-[18px]" />
                <span className="font-bold text-[#dddbdb] text-[13px] sm:text-[15px]">
                  UploadIcon Coin Image
                </span>
              </Button> */}
              <div className='w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center gap-2 rounded-md border border-input'>
                <label htmlFor="coinImage" className="ml-2 gap-2">
                  {/* <div className="bg-white text-black rounded-sm text-md p-1 cursor-pointer">Choose File</div> */}
                  <input id='coinImage' type='file' accept='image/*' onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const src = URL.createObjectURL(e.target.files[0])
                      setCoinImage(src)
                      setImageName(e.target.files[0].name)
                      setImageFile(e.target.files[0])

                      let reader = new FileReader();
                      reader.onload = handleFileRead;
                      reader.readAsArrayBuffer(e.target.files[0]);
                    }
                    else {
                      setImageName('')
                      setImageFile(null)
                    }
                  }} />
                </label>
                {/* <input type="text" className="border-green-200 border-2 text-white p-2 w-full max-w-[400px] bg-transparent rounded placeholder-white" placeholder=''/> */}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 md:gap-x-24">
            <div className="w-full">
              <Label
                htmlFor="telegramLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Telegram Link (Optional)
              </Label>
              <Input
                id="telegramLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
                ref={telegramLink}
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="whitepaperLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                White Paper Link (Optional)
              </Label>
              <Input
                id="whitepaperLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
                ref={whitepaperLink}
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="numberOfCoins"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Number Of Coins
              </Label>
              <Select onValueChange={handleCoinAmountChange} value={selectedCoinAmount}>
                <SelectTrigger className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white">
                  <SelectValue placeholder="1,000,000,000 (1B)" />
                </SelectTrigger>
                <SelectContent className="bg-[#5c3f77] border-none text-white">
                  {coinAmounts.map((amount, index) => (
                    <SelectItem
                      key={index}
                      value={amount.label}
                      className="focus:bg-[#6b4a8a] focus:text-white"
                    >
                      {amount.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 md:gap-x-24">
            <div className="w-full">
              <Label
                htmlFor="websiteLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Website Link (Optional)
              </Label>
              <Input
                id="websiteLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
                ref={websiteLink}
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="twitterLink"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Twitter / X Link (Optional)
              </Label>
              <Input
                id="twitterLink"
                className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white placeholder:text-[#dddbdb]"
                ref={twitterLink}
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="numberOfLivetime"
                className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px]"
              >
                Live Time
              </Label>
              <Select onValueChange={handleLiveTimeChange} value={selectedLiveTime}>
                <SelectTrigger className="w-full h-9 mt-2 bg-[#5c3f77] border-none text-white">
                  <SelectValue placeholder="30 days" />
                </SelectTrigger>
                <SelectContent className="bg-[#5c3f77] border-none text-white">
                  {liveTimes.map((amount, index) => (
                    <SelectItem
                      key={index}
                      value={amount.label}
                      className="focus:bg-[#6b4a8a] focus:text-white"
                    >
                      {amount.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                ref={description}
              />
            </div>

            <div className="space-y-14 lg:space-y-6 w-full flex flex-col justify-between">
              <div className="md:h-[76px]">
                {coinType === "utility" && (
                  <>
                    <Label
                      htmlFor="idSubmit"
                      className="font-bold text-white text-[15px] sm:text-[16px] md:text-[19px] mb-2"
                    >
                      ID Submit
                    </Label>
                    <Button
                      variant="ghost"
                      className="w-full h-9 mt-2 bg-[#5c3f77] border-none flex items-center justify-center gap-2"
                      onClick={handleIDSubmit}
                    >
                      <UploadIcon className="w-[16px] sm:w-[19px] h-[16px] sm:h-[18px]" />
                      <span className="font-bold text-[#dddbdb] text-[13px] sm:text-[15px]">
                        Upload ID
                      </span>
                    </Button>
                    <CreateIDSubmitDialog
                      isOpen={isIDSubmitDialogOpen}
                      setIsIDSubmitDialogOpen={setIsIDSubmitDialogOpen}
                    />
                  </>
                )}
              </div>
              <div>
                <Button
                  className="w-full h-[40px] sm:h-[45px] rounded-[10px] bg-gradient-to-r from-[#ff00f5] to-[#00f0ff] shadow-[-1px_-1px_4px_#00000040] text-white font-medium text-lg sm:text-xl"
                  onClick={handleCreateCoin}>
                  Apply Coin
                </Button>
                <p className="text-sm text-white font-bold mt-2">Cost to deploy: ~0.02 SOL</p>
              </div>
              <CreateCoinDialog
                isOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                coinName={coinName.current?.value}
                ticker={ticker.current?.value}
                description={description.current?.value}
                coinImage={coinImage}
                imgFile={imageFile}
                imgBuffer={imgBuffer}
                twitterLink={twitterLink.current?.value}
                telegramLink={telegramLink.current?.value}
                websiteLink={websiteLink.current?.value}
                // referral={referral.current?.value}
                whitepaperLink={whitepaperLink.current?.value}
                totalSupply={selectedCoinAmountValue}
                liveTime={selectedLiveTimeValue}
              />
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

function CreateCoinDialog({isOpen, setIsDialogOpen, coinName, ticker, description, coinImage, imgFile, imgBuffer, twitterLink, telegramLink, websiteLink, whitepaperLink, totalSupply, liveTime }: { isOpen: boolean; setIsDialogOpen: (value: boolean) => void; coinName: string | undefined; ticker: string | undefined; description: string | undefined; coinImage: string | null; imgFile: File | null; imgBuffer: any; twitterLink: string | undefined; telegramLink: string | undefined; websiteLink: string | undefined; whitepaperLink: string | undefined; totalSupply: number; liveTime: number; }) {
  const walletCtx = useAnchorWallet();
  const contractContext = useContract();

  if (!('isContractInitialized' in contractContext)) {
    throw new Error("Invalid contract context");
  }

  const {
    isContractInitialized, 
    getCreatePoolTx, 
    getBuyTx 
  } = contractContext;

  const [mode, setMode] = useState('sol');
  const [amount, setAmount] = useState<string | ''>('');

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) return;
    setAmount(e.target.value);
  }

  const handleCreateCoin = async () => {
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }
    
    const id = toast.loading(`Creating '${coinName}' token...`);

    try {
      const isInitialized = await isContractInitialized();
      if (!isInitialized) {
        toast.error('Contract not initialized yet!');
        return;
      }

      let allIxs: any[] = [];
      if (!coinName || !ticker || !description || !coinImage || !imgBuffer || !imgFile) {
        toast.error("Please fill in all * fields!");
        return;
      }

      console.log("walletCtx = ", walletCtx, "\nname = ", coinName, "\nticker = ", ticker, "\ndescription = ", description, "\nimgBuffer = ", imgBuffer, "\nimgFile = ", imgFile, "\nwebsiteLink = ", websiteLink, "\ntwitterLink = ", twitterLink, "\ntelegramLink = ", telegramLink, "\nwhitepaperLink = ", whitepaperLink, "\ntotalSupply = ", totalSupply, "\nliveTime = ", liveTime); 
      const { mintKeypair, imageUrl, createIxs } = await createToken(walletCtx, coinName, ticker, description, imgBuffer, imgFile, websiteLink, twitterLink, telegramLink, whitepaperLink, totalSupply, liveTime);
      allIxs = [...allIxs, ...createIxs];

      console.log('mintKeypair:', mintKeypair.publicKey.toBase58(), ", TOKEN_TOTAL_SUPPLY:", TOKEN_TOTAL_SUPPLY, ", NATIVE_MINT:", NATIVE_MINT.toBase58());
      const createPoolIx = await getCreatePoolTx(mintKeypair.publicKey.toBase58(), totalSupply, NATIVE_MINT, 0, liveTime);
      allIxs.push(createPoolIx);

      if (Number(amount) > 0) {
        const buyIx = await getBuyTx(mintKeypair.publicKey.toBase58(), Number(amount));
        allIxs.push(buyIx);
      }

      // console.log('allIxs:', allIxs);
      console.log("import.meta.env.VITE_PUBLIC_IS_MAINNET === ", import.meta.env.VITE_PUBLIC_IS_MAINNET);
      
      const newIxs = import.meta.env.VITE_PUBLIC_IS_MAINNET === "true" ? await prioritizeIxs(connection, allIxs, walletCtx.publicKey) : allIxs;

      const blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
      const message = new TransactionMessage({
        payerKey: walletCtx.publicKey!, 
        instructions: newIxs, 
        recentBlockhash: blockhash, 
      }).compileToV0Message(Object.values({ ...(addLookupTableInfo ?? {}) }));
      const transaction = new VersionedTransaction(message);
      transaction.sign([mintKeypair]);

      console.log('simulate transaction:', connection.simulateTransaction(transaction));

      const txHash = await send(connection, walletCtx, transaction);
      console.log('txHash:', txHash);
      // console.log('whitePaperUri:', whitePaperUri);

      await sleep(1000);
      const result = await updateToken(coinName, ticker, description, imageUrl, twitterLink, telegramLink, websiteLink, whitepaperLink, mintKeypair.publicKey.toBase58(), totalSupply, liveTime);
      if (!result) {
        toast.dismiss(id);
        toast.error("Failed to update token info!");
        setIsDialogOpen(false);
        return;
      }

      toast.dismiss(id);
      toast.success(`Created a new bonding curve with token '${coinName}'`);

      setIsDialogOpen(false);
    } catch (err) {
      console.error('handleCreateCoin err:', err);
      toast.dismiss(id);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className={`relative z-30 focus:outline-none`} onClose={() => setIsDialogOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen font-sans overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-black/80">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="flex flex-col gap-10 p-10 w-full max-w-xl rounded-3xl bg-[#030303] border border-white backdrop-blur-2xl">
                <p className='text-[32px] font-bold text-white'>Choose how many [{ticker}] you want to buy (Optional)</p>
                <p className='text-xl text-white'>Tip: Its optional but buying a small amount of coins helps protect your coin from snipers</p>
                <div className='flex flex-col gap-2 items-end'>
                  <button type='button' className='text-xl text-white font-bold cursor-pointer' onClick={() => {
                    if (mode === 'sol')
                      setMode('coin')
                    else
                      setMode('sol')
                  }}>Switch to {ticker}</button>
                  <div className='relative w-full'>
                    {mode === 'sol' ? (
                      <div className='absolute right-6 inset-y-4 flex gap-1 items-center'>
                        <p className="text-xl text-white">SOL</p>
                        <img
                          src="/sol.png"
                          width={32}
                          height={32}
                          alt="sol"
                        />
                      </div>
                    ) : (
                      <div className='absolute right-6 inset-y-4 flex gap-1 items-center'>
                        <p className="text-xl text-white">{ticker}</p>
                        <img
                          className='rounded-full'
                          src={coinImage!}
                          width={32}
                          height={32}
                          alt="coin"
                        />
                      </div>
                    )}
                    <input value={amount} onChange={onChangeAmount} 
                      type="number" 
                      className="border-green-200 border-2 text-white p-2 w-full max-w-[500px] bg-transparent rounded placeholder-white" 
                      placeholder='0.0 (optional)' 
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-3 items-center'>
                  <button type='button' className='bg-blue-500 rounded-xl w-full h-[50px] text-xl font-bold text-black' onClick={handleCreateCoin}>Create Coin</button>
                  <p className="text-xl text-white">Cost to deploy: ~0.02 SOL</p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

type DocumentType = {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  frontImage?: string;
  backImage?: string;
};

function CreateIDSubmitDialog({isOpen, setIsIDSubmitDialogOpen}: { isOpen: boolean; setIsIDSubmitDialogOpen: (value: boolean) => void; }) {
  const [selectedDoc, setSelectedDoc] = useState<string>("passport");
  const [ppFile, setPPFile] = useState<File | null>(null);
  const [ppPreview, setPPPreview] = useState<string | null>(null);
  const [nifFile, setNIFFile] = useState<File | null>(null);
  const [nifPreview, setNIFPreview] = useState<string | null>(null);
  const [nibFile, setNIBFile] = useState<File | null>(null);
  const [nibPreview, setNIBPreview] = useState<string | null>(null);
  const [dlFile, setDLFile] = useState<File | null>(null);
  const [dlPreview, setDLPreview] = useState<string | null>(null);

  // Document type options data
  const documentTypes: DocumentType[] = [
    {
      id: "passport",
      name: "Passport",
      icon: "/passporticon.png",
      active: selectedDoc === "passport",
      frontImage: "/passport.png"
    },
    {
      id: "national-id",
      name: "National ID",
      icon: "/nationalidicon.png",
      active: selectedDoc === "national-id",
      frontImage: "/nationalid-front.png",
      backImage: "/nationalid-back.png"
    },
    {
      id: "driving-license",
      name: "Driving License",
      icon: "/drivinglicenseicon.png",
      active: selectedDoc === "driving-license",
      frontImage: "/drivinglicense.png",
    },
  ];

  const selectedDocument = documentTypes.find(doc => doc.id === selectedDoc);
  const handlePassportFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB");
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          alert("Please select an image file");
          return;
        }

        setPPFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPPPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleNationalIDFrontFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB");
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          alert("Please select an image file");
          return;
        }

        setNIFFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setNIFPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleNationalIDBackFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB");
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          alert("Please select an image file");
          return;
        }

        setNIBFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setNIBPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDrivingLicenseFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB");
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          alert("Please select an image file");
          return;
        }

        setDLFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setDLPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const renderDocumentUpload = () => {
    if (selectedDoc === "passport") {
      return (
        <div className="flex flex-col items-center gap-6">
          {ppPreview ? (
            <img
              className="w-[332px] h-[308px] object-contain"
              alt="Passport Preview"
              src={ppPreview}
            />
          ) : (
            <img
              className="w-[332px] h-[308px] object-contain"
              alt="Passport documents"
              src={selectedDocument?.frontImage}
            />
          )}

          <Button
            variant="ghost"
            className="w-[220px] h-8 bg-[#d9d9d91a] rounded-[5px] hover:bg-[#d9d9d930]"
            onClick={handlePassportFileSelect}
          >
            <UploadIcon className="w-[19px] h-[18px] mr-3 text-white" />
            <span className="font-['Inter',Helvetica] font-bold text-[#dddbdb] text-[15px]">
              {ppPreview ? "Change" : "Upload"} Passport
            </span>
          </Button>
        </div>
      );
    }

    if (selectedDoc === "driving-license") {
      return (
        <div className="flex flex-col gap-2 md:min-h-[380px] justify-center">
          <div className="flex flex-col items-center gap-4">
            {dlPreview ? (
              <img
                className="w-[332px] h-[208px] object-contain"
                alt="Driving License Preview"
                src={dlPreview}
              />
            ) : (
              <img
                className="w-[332px] h-[208px] object-contain"
                alt="Driving License Front"
                src={selectedDocument?.frontImage}
              />
            )}
            <Button
              variant="ghost"
              className="w-[220px] h-8 bg-[#d9d9d91a] rounded-[5px] hover:bg-[#d9d9d930]"
              onClick={handleDrivingLicenseFileSelect}
            >
              <UploadIcon className="w-[19px] h-[18px] mr-3 text-white" />
              <span className="font-['Inter',Helvetica] font-bold text-[#dddbdb] text-[15px]">
                {dlPreview ? "Change" : "Upload"} Dirver License
              </span>
            </Button>
          </div>
        </div>
      );
    }

    // National ID view
    return (
      <div className="md:flex md:flex-row flex-col items-start gap-8 space-y-5 md:space-y-0">
        <div className="flex flex-col items-center gap-4 md:min-h-[380px] justify-center">
            {nifPreview ? (
              <img
                className="w-[332px] h-[208px] object-contain"
                alt="National ID Front Preview"
                src={nifPreview}
              />
            ) : (
              <img
                className="w-[332px] h-[208px] object-contain"
                alt="National ID Front"
                src={selectedDocument?.frontImage}
              />
            )}
          <Button
            variant="ghost"
            className="w-[220px] h-8 bg-[#d9d9d91a] rounded-[5px] hover:bg-[#d9d9d930]"
            onClick={handleNationalIDFrontFileSelect}
          >
            <UploadIcon className="w-[19px] h-[18px] mr-3 text-white" />
            <span className="font-['Inter',Helvetica] font-bold text-[#dddbdb] text-[15px]">
              {nifPreview ? "Change" : "Upload"} Front Side
            </span>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 md:min-h-[380px] justify-center">
          {nibPreview ? (
            <img
              className="w-[332px] h-[208px] object-contain"
              alt="Driving License Preview"
              src={nibPreview}
            />
          ) : (
            <img
              className="w-[332px] h-[208px] object-contain"
              alt="National ID Back"
              src={selectedDocument?.backImage}
            />
          )}

          <Button
            variant="ghost"
            className="w-[220px] h-8 bg-[#d9d9d91a] rounded-[5px] hover:bg-[#d9d9d930]"
            onClick={handleNationalIDBackFileSelect}
          >
            <UploadIcon className="w-[19px] h-[18px] mr-3 text-white" />
            <span className="font-['Inter',Helvetica] font-bold text-[#dddbdb] text-[15px]">
              {nibPreview ? "Change" : "Upload"} Back Side
            </span>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className={`relative z-30 focus:outline-none`} onClose={() => setIsIDSubmitDialogOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen font-sans overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-black/80">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="bg-[#120426] flex flex-row justify-center gap-10 p-10 w-full max-w-[1150px] min-h-[648px] rounded-3xl border border-white backdrop-blur-2xl">
                <button
                  onClick={() => setIsIDSubmitDialogOpen(false)}
                  className="absolute right-2 top-2 sm:right-3 sm:top-3 md:right-4 md:top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close overlay"
                >
                  <X className="w-5 h-5 sm:w-5 sm:h-5 text-gray-300" />
                </button>
                <div className="bg-[#120426] rounded-[37px] overflow-hidden w-full relative border-none py-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Document type selection options */}
                    <div className="flex flex-col gap-[35px] w-full lg:w-auto">
                      {documentTypes.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoc(doc.id)}
                          className={`w-full lg:w-[335px] h-[50px] bg-[#d9d9d91a] rounded-[5px] flex items-center px-5 cursor-pointer hover:bg-[#d9d9d930] transition-opacity ${
                            !doc.active ? "opacity-50" : ""
                          }`}
                        >
                          <img
                            className={`h-auto ${
                              doc.id === "passport"
                                ? "w-7"
                                : doc.id === "national-id"
                                ? "w-11"
                                : "w-[43px]"
                            }`}
                            alt={doc.name}
                            src={doc.icon}
                          />
                          <div className="ml-[25px] font-['Inter',Helvetica] font-bold text-white text-[19px]">
                            {doc.name}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right side content */}
                    <div className="flex-1">
                      {renderDocumentUpload()}
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="mt-10 justify-self-center md:fixed md:bottom-[47px] md:right-[40px]">
                    <Button className="w-[200px] h-[45px] rounded-[10px] shadow-[-1px_-1px_4px_#00000040] bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400">
                      <span className="font-['Inter',Helvetica] font-medium text-[#fcfbfb] text-xl">
                        Submit
                      </span>
                    </Button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}