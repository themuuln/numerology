"use client";
import { useState } from "react";

type Props = {};

type State = {
  dateOfBirth: string;
  fullName: string;
  lifePathNumber: number | null;
  destinyNumber: number | null;
};

export default function Home(_props: Props): JSX.Element {
  const [state, setState] = useState<State>({
    dateOfBirth: "",
    fullName: "",
    lifePathNumber: null,
    destinyNumber: null,
  });

  const calculateLifePathNumber = (): void => {
    const { dateOfBirth, fullName } = state;

    const cleanedDateOfBirth = dateOfBirth.replace(/\D/g, "");

    let sum = 0;
    for (let i = 0; i < cleanedDateOfBirth.length; i++) {
      sum += parseInt(cleanedDateOfBirth[i]);
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }

    setState((prevState) => ({
      ...prevState,
      lifePathNumber: sum,
    }));

    calculateDestinyNumber(fullName);
  };

  const calculateDestinyNumber = (fullName: string): void => {
    const cleanedFullName = fullName.replace(/\s/g, "").toUpperCase();

    let sum = 0;
    for (let i = 0; i < cleanedFullName.length; i++) {
      const charCode = cleanedFullName.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        sum += charCode - 64;
      }
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }

    setState((prevState) => ({
      ...prevState,
      destinyNumber: sum,
    }));
  };

  const { dateOfBirth, fullName, lifePathNumber, destinyNumber } = state;

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-4'>
        Numerology Life Path Number Calculator
      </h1>
      <label className='text-lg'>Date of Birth:</label>
      <input
        type='text'
        value={dateOfBirth}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            dateOfBirth: e.target.value,
          }))
        }
        className='border border-gray-300 px-4 py-2 rounded-md w-64 mb-4'
      />
      <label className='text-lg'>Full Name:</label>
      <input
        type='text'
        value={fullName}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            fullName: e.target.value,
          }))
        }
        className='border border-gray-300 px-4 py-2 rounded-md w-64 mb-4'
      />
      <button
        onClick={calculateLifePathNumber}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
      >
        Calculate
      </button>
      {lifePathNumber !== null && (
        <p className='text-lg mt-4'>
          Your Life Path Number is: {lifePathNumber}
        </p>
      )}
      {destinyNumber !== null && (
        <p className='text-lg mt-2'>Your Destiny Number is: {destinyNumber}</p>
      )}
    </div>
  );
}
