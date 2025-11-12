'use client'
import React, { useState } from 'react';
import PopupForm from './Popupform';

const ButtonWithPopup: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (walletAddress: string, amount: number) => {
    // Handle form submission logic here
    console.log('Wallet Address:', walletAddress);
    console.log('Amount:', amount);
  };

  return (
    <div
  className="rounded-sm bg-accent mb-4 px-8 py-4 text-base font-semibold text-primary duration-300 ease-in-out hover:bg-accent/80 max-w-[200px]"
>
  <button style={{ maxWidth: isPopupOpen ? '700px' : '200px' }} onClick={handleOpenPopup}>WithDraw Funds</button>
  {isPopupOpen && <PopupForm onSubmit={handleSubmit} onClose={handleClosePopup} />}
</div>

  );
};

export default ButtonWithPopup;
