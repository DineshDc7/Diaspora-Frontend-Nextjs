"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/RoleHeader";
import StepOne from "../components/StepOne";
import StepTwo from "./components/StepTwo";

const OwnerSignupContent = () => {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();

  const selectedRole = useMemo(() => {
    const r = searchParams?.get("role");
    // default to BUSINESS_OWNER if not provided
    return r ? String(r).toUpperCase() : "BUSINESS_OWNER";
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
      <OwnerSignupContent />
    </Suspense>
  );
};

export default Page;
