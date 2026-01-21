"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import StepTwo from "./components/StepTwo";
const Page = () => {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();

  const selectedRole = useMemo(() => {
    const r = searchParams?.get("role");
    return r ? String(r).toUpperCase() : "ADMIN";
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
    </>
  );
};

export default Page;
