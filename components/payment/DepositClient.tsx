"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { 
  BiLogoApple, 
  BiLogoAndroid, 
  BiCopy, 
  BiCheckCircle, 
  BiHelpCircle, 
  BiChevronDown, 
  BiChevronUp,
  BiBitcoin
} from 'react-icons/bi';
import { BsBank, BsArrowRight } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';

// Interface for the account details
interface AccountDetails {
  bitcoin: {
    address: string;
  };
  ach: {
    bankName: string;
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
  };
  wire: {
    bankName: string;
    recepientName: string;
    routingNumber: string;
    accountNumber: string;
    swiftCode: string;
    bankAddress: string;
    bankCountry: string;
    recepientAddress: string;
  };
}

interface DepositClientProps {
  accountDetails: AccountDetails;
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Collapsible instructions component
const InstructionsDropdown = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-4 border rounded-lg border-gray-200 dark:border-gray-700">
      <button 
        className="flex items-center justify-between w-full p-4 text-left font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <BiHelpCircle className="mr-2 h-5 w-5 text-primary" />
          <span>{title}</span>
        </div>
        {isOpen ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

// Copy to clipboard component
const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };
  
  return (
    <div className="flex items-center">
      <div className="relative flex-1 mr-2">
        <input
          type="text"
          value={text}
          readOnly
          className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
        />
        <div 
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={copyToClipboard}
        >
          {copied ? (
            <BiCheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <BiCopy className="h-5 w-5 text-gray-500 hover:text-primary transition-colors" />
          )}
        </div>
      </div>
      <button
        onClick={copyToClipboard}
        className="min-w-[100px] py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

// Account detail row component
const AccountDetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="py-3 flex justify-between border-b border-gray-200 dark:border-gray-700 last:border-0">
    <span className="font-medium text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-gray-900 dark:text-white font-medium">{value}</span>
  </div>
);

const DepositClient = ({ accountDetails }: DepositClientProps) => {
  // State for tab selection
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section
      id="deposit"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[800px] text-center"
              data-wow-delay=".2s"
            >
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Deposit Funds
              </h1>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Choose your preferred deposit method to add funds to your account
              </p>

              <div className="mx-auto max-w-3xl">
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-8">
                    {['Bitcoin', 'ACH Transfer', 'Wire Transfer'].map((category, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          `w-full rounded-lg py-3 px-4 text-sm font-medium leading-5 text-gray-700 dark:text-gray-300
                           ${
                             selected
                               ? "bg-white dark:bg-gray-700 shadow text-primary dark:text-white"
                               : "hover:bg-white/[0.12] hover:text-primary dark:hover:text-white"
                           }
                           transition-all duration-200 focus:outline-none`
                        }
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {index === 0 && <BiBitcoin className="h-5 w-5" />}
                          {index === 1 && <BsBank className="h-5 w-5" />}
                          {index === 2 && <HiOutlineDocumentText className="h-5 w-5" />}
                          <span>{category}</span>
                        </div>
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {/* Bitcoin Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="space-y-6">
                        <div className="flex flex-col items-center">
                          <div className="relative h-64 w-64 mb-6">
                            <Image
                              className="rounded-lg shadow-md"
                              src="/images/images/BTCbarcode.jpg"
                              alt="Bitcoin QR Code"
                              fill
                            />
                          </div>
                          <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Scan the QR code or copy the address below
                            </h3>
                            <p className="text-sm text-red-500 dark:text-red-400">
                              Send only Bitcoin (BTC) to this address. Sending other cryptocurrencies may result in permanent loss of funds.
                            </p>
                          </div>
                          <div className="w-full mb-6">
                            <CopyToClipboard text={accountDetails.bitcoin.address} />
                          </div>
                          
                          <InstructionsDropdown title="How to Deposit Bitcoin">
                            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                              <li>Open your Bitcoin wallet app on your mobile device or computer.</li>
                              <li>Choose the "Send" or "Pay" option in your wallet.</li>
                              <li>Scan the QR code above or paste the Bitcoin address.</li>
                              <li>Enter the amount of Bitcoin you want to send.</li>
                              <li>Review the transaction details, including the network fee.</li>
                              <li>Confirm the transaction and wait for it to be processed on the blockchain.</li>
                              <li>Funds typically appear in your account within 30 minutes to 1 hour, depending on network congestion.</li>
                            </ol>
                            
                            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Popular Bitcoin Wallets</h4>
                              <div className="flex flex-wrap gap-3">
                                <a href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer" className="flex items-center py-1 px-3 bg-white dark:bg-gray-700 rounded-full text-xs shadow-sm hover:shadow transition-shadow">
                                  <BiLogoApple className="mr-1" /> Coinbase
                                </a>
                                <a href="https://trustwallet.com/" target="_blank" rel="noopener noreferrer" className="flex items-center py-1 px-3 bg-white dark:bg-gray-700 rounded-full text-xs shadow-sm hover:shadow transition-shadow">
                                  <BiLogoAndroid className="mr-1" /> Trust Wallet
                                </a>
                                <a href="https://blockchain.com/wallet" target="_blank" rel="noopener noreferrer" className="flex items-center py-1 px-3 bg-white dark:bg-gray-700 rounded-full text-xs shadow-sm hover:shadow transition-shadow">
                                  <BiLogoApple className="mr-1" /> Blockchain.com
                                </a>
                              </div>
                            </div>
                          </InstructionsDropdown>
                        </div>
                      </div>
                    </Tab.Panel>

                    {/* ACH Transfer Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <p className="text-blue-700 dark:text-blue-300">
                            We only accept ACH transfers from U.S. banks. Please ensure your bank account is eligible for ACH transfers.
                          </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <BsBank className="mr-2 h-5 w-5 text-primary" />
                            Account Details
                          </h3>
                          <div className="space-y-0">
                            <AccountDetailRow label="Bank Name" value={accountDetails.ach.bankName} />
                            <AccountDetailRow label="Account Name" value={accountDetails.ach.accountName} />
                            <AccountDetailRow label="Routing Number" value={accountDetails.ach.routingNumber} />
                            <AccountDetailRow label="Account Number" value={accountDetails.ach.accountNumber} />
                            <AccountDetailRow label="Account Type" value={accountDetails.ach.accountType} />
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                            Please allow 1-3 business days for the funds to reflect in your account.
                          </p>
                        </div>
                        
                        <InstructionsDropdown title="How to Deposit via ACH Transfer">
                          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                            <li>Log into your bank's website or mobile app.</li>
                            <li>Navigate to the funds transfer, bill pay, or payments section.</li>
                            <li>Select the option to add a new recipient or account.</li>
                            <li>Enter the account details provided above.</li>
                            <li>Some banks may require you to verify small deposits to confirm the account. If this is the case, please contact our support team.</li>
                            <li>Once the account is set up, initiate a transfer from your account to ours.</li>
                            <li>Enter the amount you wish to transfer and confirm the transaction.</li>
                            <li>Funds typically appear in your account within 1-3 business days.</li>
                          </ol>
                        </InstructionsDropdown>
                      </div>
                    </Tab.Panel>

                    {/* Wire Transfer Panel */}
                    <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <p className="text-blue-700 dark:text-blue-300">
                            We only accept wire transfers from U.S. banks. Please ensure your bank account is eligible for wire transfers.
                          </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineDocumentText className="mr-2 h-5 w-5 text-primary" />
                            Bank Details
                          </h3>
                          <div className="space-y-0">
                            <AccountDetailRow label="Bank Name" value={accountDetails.wire.bankName} />
                            <AccountDetailRow label="Recipient Name" value={accountDetails.wire.recepientName} />
                            <AccountDetailRow label="Routing Number" value={accountDetails.wire.routingNumber} />
                            <AccountDetailRow label="Account Number" value={accountDetails.wire.accountNumber} />
                            <AccountDetailRow label="SWIFT Code" value={accountDetails.wire.swiftCode} />
                            <AccountDetailRow label="Bank Address" value={accountDetails.wire.bankAddress} />
                            <AccountDetailRow label="Bank Country" value={accountDetails.wire.bankCountry} />
                            <AccountDetailRow label="Recipient Address" value={accountDetails.wire.recepientAddress} />
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                            Please allow 1-3 business days for the funds to reflect in your account. Contact your bank for wire transfer fees.
                          </p>
                        </div>
                        
                        <InstructionsDropdown title="How to Deposit via Wire Transfer">
                          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                            <li>Contact your bank or visit your local branch to initiate a wire transfer.</li>
                            <li>Provide the bank representative with the wire transfer details above.</li>
                            <li>Specify the amount you wish to transfer.</li>
                            <li>Complete any forms required by your bank for the wire transfer.</li>
                            <li>Pay the wire transfer fee as determined by your bank.</li>
                            <li>Keep your wire transfer receipt for reference.</li>
                            <li>Funds typically appear in your account within 1-3 business days.</li>
                          </ol>
                          
                          <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Important Notes</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                              <li>Wire transfers usually involve a fee from your bank, typically between $15-$50.</li>
                              <li>International wire transfers may take longer and involve additional fees.</li>
                              <li>Always include your account name as the reference to help us identify your payment.</li>
                            </ul>
                          </div>
                        </InstructionsDropdown>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                
                {/* Help and Support Section */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <a href="/faq" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                    <BiHelpCircle className="h-5 w-5" />
                    <span>View Deposit FAQs</span>
                  </a>
                  <a href="/support" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                    <BsArrowRight className="h-5 w-5" />
                    <span>Contact Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background SVGs (unchanged from original) */}
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="277"
            cy="63"
            r="225"
            fill="url(#paint0_linear_25:217)"
          />
          <circle
            cx="17.9997"
            cy="182"
            r="18"
            fill="url(#paint1_radial_25:217)"
          />
          <circle
            cx="76.9997"
            cy="288"
            r="34"
            fill="url(#paint2_radial_25:217)"
          />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            fill="url(#paint3_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="184.521"
            cy="315.521"
            r="132.862"
            transform="rotate(114.874 184.521 315.521)"
            stroke="url(#paint4_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="356"
            cy="290"
            r="179.5"
            transform="rotate(-30 356 290)"
            stroke="url(#paint5_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="191.659"
            cy="302.659"
            r="133.362"
            transform="rotate(133.319 191.659 302.659)"
            fill="url(#paint6_linear_25:217)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_25:217"
              x1="-54.5003"
              y1="-178"
              x2="222"
              y2="288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
            >
              <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
            >
              <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
            </radialGradient>
            <linearGradient
              id="paint3_linear_25:217"
              x1="226.775"
              y1="-66.1548"
              x2="292.157"
              y2="351.421"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:217"
              x1="184.521"
              y1="182.159"
              x2="184.521"
              y2="448.882"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_25:217"
              x1="356"
              y1="110"
              x2="356"
              y2="470"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_25:217"
              x1="118.524"
              y1="29.2497"
              x2="166.965"
              y2="338.63"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_25:218)"
          />
          <path
            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
            stroke="url(#paint1_linear_25:218)"
          />
          <path
            d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
            stroke="url(#paint2_linear_25:218)"
          />
          <path
            d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
            stroke="url(#paint3_linear_25:218)"
          />
          <circle
            opacity="0.8"
            cx="214.505"
            cy="60.5054"
            r="49.7205"
            transform="rotate(-13.421 214.505 60.5054)"
            stroke="url(#paint4_linear_25:218)"
          />
          <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
          <defs>
            <linearGradient
              id="paint0_linear_25:218"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_25:218"
              x1="156.389"
              y1="69.2405"
              x2="156.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_25:218"
              x1="125.389"
              y1="69.2405"
              x2="125.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_25:218"
              x1="93.8507"
              y1="67.2674"
              x2="89.9278"
              y2="210.214"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:218"
              x1="214.505"
              y1="10.2849"
              x2="212.684"
              y2="99.5816"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint5_radial_25:218"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(220 63) rotate(90) scale(43)"
            >
              <stop offset="0.145833" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.08" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default DepositClient;