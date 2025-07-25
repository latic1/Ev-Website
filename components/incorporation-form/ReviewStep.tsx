import { useFormContext } from "react-hook-form";
import { IncorporationFormValues } from "./types";

export function ReviewStep() {
  const { getValues } = useFormContext<IncorporationFormValues>();
  const values = getValues();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Your Application</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Company Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Company Name</p>
            <p className="font-medium">{values.company.companyName}</p>
          </div>
          {/* Rest of the review fields... */}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Shareholders</h3>
        {values.shareholders.map((shareholder, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <h4 className="font-medium">Shareholder {idx + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{shareholder.fullName}</p>
              </div>
              {/* Rest of shareholder review fields... */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}