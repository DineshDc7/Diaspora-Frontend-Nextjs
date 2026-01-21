"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import StepTwo from "./components/StepTwo";
// import StepThree from "./components/StepThree";
// import StepFour from "./components/StepFour";

export default function InvestorSignup() {
  const [step] = useState(1);
  const searchParams = useSearchParams();

  const selectedRole = useMemo(() => {
    const r = searchParams?.get("role");
    // default to INVESTOR if not provided
    return r ? String(r).toUpperCase() : "INVESTOR";
  }, [searchParams]);

  return (
    <>
      <Header />

      {step === 1 && (
        <StepTwo
          onBack={() => window.history.back()}
          selectedRole={selectedRole}
        />
      )}

      {/* StepThree/StepFour removed for now */}
      {/*
      {step === 2 && (
        <StepThree onBack={() => setStep(1)} onContinue={() => setStep(3)} />
      )}
      {step === 3 && <StepFour onBack={() => setStep(2)} />}
      */}
    </>
  );
}
