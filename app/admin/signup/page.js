"use client";
import { useState } from "react";
import React from "react";
import Header from "../components/Header";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
const Page = () => {
const [step, setStep] = useState(1);

  return (
    <>
      <Header />
      {step === 1 && <StepOne onContinue={() => setStep(2)} />}
      {step === 2 && <StepTwo onBack={() => setStep(1)} />}
    </>
  );
};

export default Page;
