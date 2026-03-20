"use client";
import RegisterComp from "@/components/user/RegisterComp";
import React, { useCallback, useState } from "react";
import { Check } from "lucide-react"; // Optional: for checkmark icons
import PartnerPreferencePage from "@/components/user/PartnerPrefrence";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 4;

  // Define your steps with titles
  const steps = [
    { number: 1, title: "Login" },
    { number: 2, title: "Personal Details" },
    { number: 3, title: "Partner Preferences" },
    { number: 4, title: "Review" },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 2) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    // Allow clicking on previous or current steps only
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };
  const onSaveDraft = useCallback(() => {
    console.log("Saving draft...");
    // Draft save logic here
  }, []);

  const currentStepname = steps.find(
    (step) => step.number === currentStep,
  )?.title;
  return (
    <div className="min-h-screen bg-[#660b26] text-gray-900 font-sans relative selection:bg-[#d4af37] selection:text-white pb-20">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-black/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-60 left-20 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="text-[#d4af37] text-sm font-bold tracking-widest uppercase mb-3 drop-shadow-md">
            Begin Your Journey
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 drop-shadow-lg">
            Create Your Profile
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-[#d4af37] to-transparent mx-auto rounded-full mb-6"></div>
          <p className="text-white/80 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Please provide your details below. A complete profile significantly
            increases your chances of finding the perfect match.
          </p>
        </div>

        {/* Stepper UI */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* Step Circle */}
                <div className="flex flex-col items-center relative">
                  <button
                    onClick={() => handleStepClick(step.number)}
                    disabled={step.number > currentStep}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold
                      transition-all duration-300 mb-2
                      ${
                        step.number < currentStep
                          ? "bg-[#d4af37] text-[#660b26] shadow-lg shadow-[#d4af37]/40"
                          : step.number === currentStep
                            ? "bg-white text-[#660b26] ring-4 ring-[#d4af37]/50 shadow-lg"
                            : "bg-white/20 text-white/50 cursor-not-allowed"
                      }
                    `}
                  >
                    {step.number < currentStep ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </button>

                  {/* Step Title */}
                  <span
                    className={`
                      text-xs md:text-sm font-medium text-center whitespace-nowrap
                      ${
                        step.number <= currentStep
                          ? "text-[#d4af37]"
                          : "text-white/50"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-1 mx-4 rounded-full transition-all duration-500
                      ${
                        step.number < currentStep
                          ? "bg-[#d4af37]"
                          : "bg-white/20"
                      }
                    `}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="transition-all duration-300">
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              {/* Step 1 Content - You'll move sections here */}
              <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-[#d4af37]/30">
                <h2 className="text-2xl text-white font-serif mb-4">
                  Basic Information
                </h2>
                <p className="text-white/70">Content for step 1 goes here...</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <RegisterComp />
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <PartnerPreferencePage/>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-[#d4af37]/30">
                <h2 className="text-2xl text-white font-serif mb-4">
                  Review & Submit
                </h2>
                <p className="text-white/70">Content for step 4 goes here...</p>
              </div>
            </div>
          )}
        </div>
        {/* Premium Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-[#d4af37]/20 mt-6 gap-6 shadow-lg shadow-[#d4af37]/5">
          {/* <span className="text-sm text-white/70 font-medium">
            <span className="text-[#d4af37]">*</span> Required fields
          </span> */}
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`
              px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200
              ${
                currentStep === 1
                  ? "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"
                  : "bg-white/5 text-white border border-[#d4af37]/30 hover:bg-white/10 hover:border-[#d4af37]/50 hover:shadow-lg hover:shadow-[#d4af37]/10"
              }
            `}
          >
            ← Back
          </button>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onSaveDraft}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-[#d4af37]/30 hover:border-[#d4af37]/50 transition-all duration-200 w-full sm:w-auto text-center hover:shadow-lg hover:shadow-[#d4af37]/10"
            >
              Save Draft
            </button>
            <button
              type="submit"
              onClick={handleNext}
              disabled={currentStep === totalSteps}
              className={`
              px-10 py-3.5 rounded-full text-sm font-bold transition-all duration-200
              ${
                currentStep === totalSteps
                  ? "bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#3a0615] shadow-lg shadow-[#d4af37]/40 hover:scale-[1.03] hover:shadow-[#d4af37]/60"
                  : "bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#3a0615] shadow-lg shadow-[#d4af37]/40 hover:scale-[1.03] hover:shadow-[#d4af37]/60"
              }
            `}
            >
              {currentStepname === "Review" ? "Review & Submit" : currentStepname }{" "}
              {currentStep < 4 && "→"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
