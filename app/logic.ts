"use client";
import { useEffect, useState } from "react";
import { expressionLetters, soulUrgeLetters } from "./api/data";

const useLogic = () => {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [lifePathNumber, setLifePathNumber] = useState<number>(0);
  const [expressionNumber, setExpressionNumber] = useState<number>(0);
  const [soulUrgeNumber, setSoulUrgeNumber] = useState<number>(0);

  const calculate = () => {
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

          console.log(
            "😘 ~ file: page.tsx:42 ~ calculateExpressionNumber ~ expressionLetters[uppercaseChar]:",
            expressionLetters[uppercaseChar],
          );
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
  };

  useEffect(() => {
    // calculateLifePathNumber();
    // calculateExpressionNumber(fullName);
    // calculateSoulUrgeNumber(fullName);
    calculate();
    console.log("useeffect");
  }, []);

  return {
    dateOfBirth,
    setDateOfBirth,
    fullName,
    setFullName,
    lifePathNumber,
    setLifePathNumber,
    expressionNumber,
    setExpressionNumber,
    soulUrgeNumber,
    setSoulUrgeNumber,
    calculate,
  };
};

export default useLogic;
