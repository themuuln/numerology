"use client";
import { useState } from "react";
import { expressionLetters, soulUrgeLetters } from "./api/data";

type Props = {};

export default function Home(_props: Props): any {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [lifePathNumber, setLifePathNumber] = useState<number>(0);
  const [expressionNumber, setExpressionNumber] = useState<number>(0);
  const [soulUrgeNumber, setSoulUrgeNumber] = useState<number>(0);

  const calculateLifePathNumber = (): void => {
    const cleanedDateOfBirth = dateOfBirth.replace(/\D/g, "");

    let sum = 0;
    for (let i = 0; i < cleanedDateOfBirth.length; i++) {
      sum += parseInt(cleanedDateOfBirth[i]);
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }

    setLifePathNumber(sum);

    calculateExpressionNumber(fullName);
    calculateSoulUrgeNumber(fullName);
  };

  const calculateExpressionNumber = (name: string): void => {
    let expressionNumber = 0;
    const nameWithoutSpaces = name.replace(/\s/g, "");

    for (const char of nameWithoutSpaces) {
      const uppercaseChar = char.toUpperCase();

      if (expressionLetters.hasOwnProperty(uppercaseChar)) {
        expressionNumber += expressionLetters[uppercaseChar];
      }

      while (
        expressionNumber > 9 &&
        expressionNumber !== 11 &&
        expressionNumber !== 22 &&
        expressionNumber !== 33
      ) {
        expressionNumber =
          Math.floor(expressionNumber / 10) + (expressionNumber % 10);
      }
    }

    setExpressionNumber(expressionNumber);
  };

  const calculateSoulUrgeNumber = (name: string): void => {
    let soulUrgeNumber = 0;
    const nameWithoutSpaces = name.replace(/\s/g, "");

    for (const char of nameWithoutSpaces) {
      const uppercaseChar = char.toUpperCase();

      if (soulUrgeLetters.hasOwnProperty(uppercaseChar)) {
        soulUrgeNumber += soulUrgeLetters[uppercaseChar];
      }

      while (
        soulUrgeNumber > 9 &&
        soulUrgeNumber !== 11 &&
        soulUrgeNumber !== 22 &&
        soulUrgeNumber !== 33
      ) {
        soulUrgeNumber =
          Math.floor(soulUrgeNumber / 10) + (soulUrgeNumber % 10);
      }
    }

    setSoulUrgeNumber(soulUrgeNumber);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-4'>
        Numerology Life Path Number Calculator
      </h1>
      <label className='text-lg'>Date of Birth:</label>
      <input
        type='text'
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        className='border border-gray-300 px-4 py-2 rounded-md w-64 mb-4'
      />
      <label className='text-lg'>Full Name:</label>
      <input
        type='text'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className='border border-gray-300 px-4 py-2 rounded-md w-64 mb-4'
      />
      <button
        onClick={calculateLifePathNumber}
        className='bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded'
      >
        Calculate
      </button>
      {lifePathNumber !== 0 && (
        <p className='text-lg mt-4'>
          Your Life Path Number is: {lifePathNumber}
        </p>
      )}
      {expressionNumber !== 0 && (
        <p className='text-lg mt-2'>
          Your Expression Number is: {expressionNumber}
        </p>
      )}
      {soulUrgeNumber !== 0 && (
        <p className='text-lg mt-2'>
          Your Soul Urge Number is: {soulUrgeNumber}
        </p>
      )}
    </div>
  );
}
