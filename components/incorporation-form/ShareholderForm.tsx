import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { IncorporationFormValues } from "./types";

export function ShareholderForm() {
  const { 
    register, 
    control, 
    watch, 
    setValue,
    formState: { errors } 
  } = useFormContext<IncorporationFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shareholders",
  });

  const addShareholder = () => {
    append({
      fullName: "",
      type: "individual",
      address: {
        street: "",
        city: "",
        region: "",
        digitalAddress: "",
        postalAddress: "",
      },
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      occupation: "",
      email: "",
      taxInfo: {
        hasTin: false,
        tinNumber: "",
        name: "",
        maritalStatus: "",
        birthTown: "",
        mothersName: "",
      },
      identityNumber: "",
      shares: {
        number: 0,
        class: "",
        amountPaidCash: 0,
        amountPaidOther: 0,
        amountRemaining: 0,
      },
      isDirector: false,
      isBeneficialOwner: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shareholder Details</h2>

      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="space-y-4 rounded-lg border bg-gray-50 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Shareholder {idx + 1}</h3>
            {fields.length > 1 && (
              <button 
                type="button" 
                onClick={() => remove(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Shareholder form fields */}
          <Input
            label="Full Name"
            {...register(`shareholders.${idx}.fullName`)}
            error={errors.shareholders?.[idx]?.fullName?.message}
          />
          
          {/* Rest of the shareholder fields... */}
          
        </div>
      ))}

      <button 
        type="button" 
        onClick={addShareholder}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
      >
        <Plus className="h-4 w-4" /> Add Another Shareholder
      </button>
    </div>
  );
}