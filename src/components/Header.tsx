import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 md:mb-12 px-4 md:px-[58px] pt-4 md:pt-7 gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          className="h-[80px] sm:h-[100px] md:h-[114px] object-contain cursor-pointer"
          alt="Nodump Logo"
          src="/logo.svg"
          onClick={() => navigate("/")}
        />
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center">
            <Link
              to="/profile"
              className="text-white text-lg hover:underline hover:font-bold sm:text-xl px-4 py-2 rounded-md transition-colors"
            >
              [Profile]
            </Link>
            <Link
              to="/create"
              className="text-white text-lg sm:text-xl  hover:underline hover:font-bold px-4 py-2 rounded-md transition-colors"
            >
              [Create]
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/token"
              className="text-white text-lg sm:text-xl  hover:underline hover:font-bold px-4 py-2 rounded-md transition-colors"
            >
              [Token]
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
              >
                <img
                  width={20}
                  height={20}
                  alt="telegram"
                  src="/telegram-logo.webp"
                />
              </a>
              <a
                href="https://"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
              >
                <img
                  width={20}
                  height={20}
                  alt="x"
                  src="/x-logo.webp"
                />
              </a>
              <a
                href="https://"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
              >
                <img
                  width={20}
                  height={20}
                  alt="instagram"
                  src="/instagram-logo.webp"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-lg sm:text-xl font-medium">
        {/* [Connect Wallet] */}
        <WalletMultiButton style={{backgroundColor: 'transparent'}} />
      </div>
    </div>
  );
};