import { ChevronRight } from "lucide-react";

type StepIndicatorProps = {
  currentStep: number;
  onStepClick?: (step: number) => void;
};

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const steps = ['Company Details', 'Shareholders', 'Review & Submit'];
  
  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;
        
        return (
          <div 
            key={label} 
            className="flex flex-col items-center flex-1 cursor-pointer"
            onClick={() => onStepClick && onStepClick(stepNumber)}
          >
            <div className="flex items-center w-full">
              {index !== 0 && (
                <div className={`flex-1 h-1 mx-2 ${isCompleted || isCurrent ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                  ${isCompleted ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-blue-600 text-white' : 
                    'bg-gray-200 text-gray-600'}`}
              >
                {stepNumber}
              </div>
            </div>
            <span className={`mt-2 text-sm text-center ${isCurrent ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}