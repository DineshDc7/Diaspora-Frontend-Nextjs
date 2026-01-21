"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import StepTwo from "./components/StepTwo";

const SignupContent = () => {
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

const Page = () => {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
};

export default Page;
