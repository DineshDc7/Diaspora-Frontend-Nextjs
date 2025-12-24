"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

export default function InvestorSignup() {
  const [step, setStep] = useState(1);

  return (
    <>
      <Header />

      {step === 1 && (
        <StepTwo 
        onBack={() => window.history.back()}
        onContinue={() => setStep(2)}
         />
        
      )}
      {step === 2 && (
        <StepThree 
        onBack={() => setStep(1)}
        onContinue={() => setStep(3)}
         />
      )}
      {step === 3 && (
        <StepFour
        onBack={() => setStep(2)}
         />
      )}

      {/* Step 3 can be added here */}
    </>
  );
}
