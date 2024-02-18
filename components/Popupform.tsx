"use client"
import React, { useState } from 'react';

interface PopupFormProps {
  onSubmit: (walletAddress: string, amount: number) => void;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onSubmit, onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(walletAddress, parseFloat(amount));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8">
    {/* Add popup styles as needed */}
    <div className="mb-4">
      <label htmlFor="walletAddress" className="block text-gray-700 font-bold mb-2">
        Wallet Address:
      </label>
      <input
        type="text"
        id="walletAddress"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        className="appearance-none border rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
        Amount:
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="appearance-none border rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        type="submit"
        disabled={!walletAddress || !amount}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </form>
  );
};

export default PopupForm;
