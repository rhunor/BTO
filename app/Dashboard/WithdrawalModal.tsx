"use client";

import React, { useState, Fragment } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BiBitcoin } from 'react-icons/bi';
import { BsBank, BsArrowRight, BsCheckCircleFill } from 'react-icons/bs';

interface WithdrawalFormData {
  amount: string;
  method: 'bitcoin' | 'ach' | 'wire';
  bitcoinAddress?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftCode?: string;
}

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export default function WithdrawalModal({ isOpen, onClose, availableBalance }: WithdrawalModalProps) {
  const [step, setStep] = useState(1); // 1=form, 2=processing, 3=confirmation
  const [selectedMethod, setSelectedMethod] = useState<'bitcoin' | 'ach' | 'wire'>('bitcoin');
  const [formData, setFormData] = useState<WithdrawalFormData>({
    amount: '',
    method: 'bitcoin',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens
  const handleOpen = () => {
    setStep(1);
    setFormData({
      amount: '',
      method: 'bitcoin',
    });
    setErrors({});
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate amount
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (Number(formData.amount) > availableBalance) {
      newErrors.amount = 'Amount exceeds your available balance';
    }

    // Validate based on selected method
    if (formData.method === 'bitcoin') {
      if (!formData.bitcoinAddress?.trim()) {
        newErrors.bitcoinAddress = 'Bitcoin address is required';
      } else if (formData.bitcoinAddress.length < 26 || formData.bitcoinAddress.length > 35) {
        newErrors.bitcoinAddress = 'Please enter a valid Bitcoin address';
      }
    } else if (formData.method === 'ach' || formData.method === 'wire') {
      if (!formData.bankName?.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
      if (!formData.accountName?.trim()) {
        newErrors.accountName = 'Account name is required';
      }
      if (!formData.accountNumber?.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
      if (!formData.routingNumber?.trim()) {
        newErrors.routingNumber = 'Routing number is required';
      }
      if (formData.method === 'wire' && !formData.swiftCode?.trim()) {
        newErrors.swiftCode = 'SWIFT code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update form data with selected method
    formData.method = selectedMethod;
    
    if (validateForm()) {
      // Move to processing step
      setStep(2);
      
      // Simulate processing delay (10 seconds)
      setTimeout(() => {
        setStep(3);
      }, 10000);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment} afterEnter={handleOpen}>
      <Dialog as="div" className="relative z-50" onClose={() => {
        if (step !== 2) onClose(); // Prevent closing during processing
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex justify-between items-center"
                >
                  {step === 1 && "Withdraw Funds"}
                  {step === 2 && "Processing Withdrawal"}
                  {step === 3 && "Withdrawal Requested"}
                  
                  {step !== 2 && (
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </Dialog.Title>
                
                {/* Step 1: Withdrawal Form */}
                {step === 1 && (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Choose your withdrawal method and enter the amount you want to withdraw.
                      </p>
                      <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                          Available Balance: ${availableBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                      {/* Amount Field */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Withdrawal Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400">$</span>
                          </div>
                          <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`block w-full pl-7 pr-12 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                            placeholder="0.00"
                            aria-describedby="amount-error"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              className="text-xs text-primary hover:text-primary-dark"
                              onClick={() => setFormData(prev => ({ ...prev, amount: availableBalance.toString() }))}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                        {errors.amount && (
                          <p className="mt-1 text-sm text-red-500" id="amount-error">
                            {errors.amount}
                          </p>
                        )}
                      </div>

                      {/* Withdrawal Method Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Withdrawal Method
                        </label>
                        <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
                          <div className="grid grid-cols-3 gap-3">
                            <RadioGroup.Option
                              value="bitcoin"
                              className={({ checked }) =>
                                `relative flex cursor-pointer rounded-lg ${
                                  checked
                                    ? 'bg-primary-50 border-primary dark:bg-primary-900/20 dark:border-primary-500'
                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                } border p-2 focus:outline-none`
                              }
                            >
                              {({ checked }) => (
                                <div className="flex w-full items-center justify-center">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="span"
                                        className={`font-medium ${
                                          checked ? 'text-primary-900 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                                        }`}
                                      >
                                        <span className="flex flex-col items-center">
                                          <BiBitcoin className="h-6 w-6 mb-1" />
                                          <span>Bitcoin</span>
                                        </span>
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </RadioGroup.Option>
                            <RadioGroup.Option
                              value="ach"
                              className={({ checked }) =>
                                `relative flex cursor-pointer rounded-lg ${
                                  checked
                                    ? 'bg-primary-50 border-primary dark:bg-primary-900/20 dark:border-primary-500'
                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                } border p-2 focus:outline-none`
                              }
                            >
                              {({ checked }) => (
                                <div className="flex w-full items-center justify-center">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="span"
                                        className={`font-medium ${
                                          checked ? 'text-primary-900 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                                        }`}
                                      >
                                        <span className="flex flex-col items-center">
                                          <BsBank className="h-5 w-5 mb-1" />
                                          <span>ACH</span>
                                        </span>
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </RadioGroup.Option>
                            <RadioGroup.Option
                              value="wire"
                              className={({ checked }) =>
                                `relative flex cursor-pointer rounded-lg ${
                                  checked
                                    ? 'bg-primary-50 border-primary dark:bg-primary-900/20 dark:border-primary-500'
                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                } border p-2 focus:outline-none`
                              }
                            >
                              {({ checked }) => (
                                <div className="flex w-full items-center justify-center">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="span"
                                        className={`font-medium ${
                                          checked ? 'text-primary-900 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                                        }`}
                                      >
                                        <span className="flex flex-col items-center">
                                          <BsArrowRight className="h-5 w-5 mb-1" />
                                          <span>Wire</span>
                                        </span>
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </RadioGroup.Option>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Bitcoin Address Field (if Bitcoin selected) */}
                      {selectedMethod === 'bitcoin' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bitcoin Address
                          </label>
                          <input
                            type="text"
                            name="bitcoinAddress"
                            value={formData.bitcoinAddress || ''}
                            onChange={handleChange}
                            className={`block w-full py-2 px-3 border ${errors.bitcoinAddress ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                            placeholder="Enter your Bitcoin address"
                            aria-describedby="bitcoin-address-error"
                          />
                          {errors.bitcoinAddress && (
                            <p className="mt-1 text-sm text-red-500" id="bitcoin-address-error">
                              {errors.bitcoinAddress}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Bank Fields (if ACH or Wire selected) */}
                      {(selectedMethod === 'ach' || selectedMethod === 'wire') && (
                        <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              name="bankName"
                              value={formData.bankName || ''}
                              onChange={handleChange}
                              className={`block w-full py-2 px-3 border ${errors.bankName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                              placeholder="Enter bank name"
                              aria-describedby="bank-name-error"
                            />
                            {errors.bankName && (
                              <p className="mt-1 text-sm text-red-500" id="bank-name-error">
                                {errors.bankName}
                              </p>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Account Name
                            </label>
                            <input
                              type="text"
                              name="accountName"
                              value={formData.accountName || ''}
                              onChange={handleChange}
                              className={`block w-full py-2 px-3 border ${errors.accountName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                              placeholder="Enter account name"
                              aria-describedby="account-name-error"
                            />
                            {errors.accountName && (
                              <p className="mt-1 text-sm text-red-500" id="account-name-error">
                                {errors.accountName}
                              </p>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Account Number
                            </label>
                            <input
                              type="text"
                              name="accountNumber"
                              value={formData.accountNumber || ''}
                              onChange={handleChange}
                              className={`block w-full py-2 px-3 border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                              placeholder="Enter account number"
                              aria-describedby="account-number-error"
                            />
                            {errors.accountNumber && (
                              <p className="mt-1 text-sm text-red-500" id="account-number-error">
                                {errors.accountNumber}
                              </p>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Routing Number
                            </label>
                            <input
                              type="text"
                              name="routingNumber"
                              value={formData.routingNumber || ''}
                              onChange={handleChange}
                              className={`block w-full py-2 px-3 border ${errors.routingNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                              placeholder="Enter routing number"
                              aria-describedby="routing-number-error"
                            />
                            {errors.routingNumber && (
                              <p className="mt-1 text-sm text-red-500" id="routing-number-error">
                                {errors.routingNumber}
                              </p>
                            )}
                          </div>

                          {/* SWIFT Code (Wire only) */}
                          {selectedMethod === 'wire' && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                SWIFT Code
                              </label>
                              <input
                                type="text"
                                name="swiftCode"
                                value={formData.swiftCode || ''}
                                onChange={handleChange}
                                className={`block w-full py-2 px-3 border ${errors.swiftCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary`}
                                placeholder="Enter SWIFT code"
                                aria-describedby="swift-code-error"
                              />
                              {errors.swiftCode && (
                                <p className="mt-1 text-sm text-red-500" id="swift-code-error">
                                  {errors.swiftCode}
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}

                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Request Withdrawal
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {/* Step 2: Processing Animation */}
                {step === 2 && (
                  <div className="mt-6 flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Processing your withdrawal request...
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      Please do not close this window.
                    </p>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <div className="mt-6 flex flex-col items-center justify-center py-6">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                      <BsCheckCircleFill className="h-8 w-8 text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Your information has been received
                    </p>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Your withdrawal request for ${formData.amount} via {selectedMethod === 'bitcoin' ? 'Bitcoin' : selectedMethod === 'ach' ? 'ACH Transfer' : 'Wire Transfer'} is being processed. You'll receive a confirmation when the funds have been sent.
                    </p>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}