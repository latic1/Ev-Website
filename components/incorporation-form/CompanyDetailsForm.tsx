import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IncorporationFormValues } from "./types";

export function CompanyDetailsForm() {
  const { register, formState: { errors } } = useFormContext<IncorporationFormValues>();

  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-2xl font-bold text-gray-800">
        Company Incorporation Details
      </h2>

      <Input
        label="Proposed Company Name"
        {...register("company.companyName")}
        error={errors.company?.companyName?.message}
      />

      <Textarea
        label="Objects of Company"
        rows={4}
        {...register("company.companyObjects")}
        error={errors.company?.companyObjects?.message}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Number of Authorized Shares"
          type="number"
          {...register("company.authorizedShares", {
            valueAsNumber: true,
          })}
          error={errors.company?.authorizedShares?.message}
        />

        <Input
          label="Stated Capital"
          type="number"
          {...register("company.statedCapital", { valueAsNumber: true })}
          error={errors.company?.statedCapital?.message}
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Company Address
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Street Address"
            {...register("company.companyAddress.street")}
            error={errors.company?.companyAddress?.street?.message}
          />
          <Input
            label="City"
            {...register("company.companyAddress.city")}
            error={errors.company?.companyAddress?.city?.message}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Region"
            {...register("company.companyAddress.region")}
            error={errors.company?.companyAddress?.region?.message}
          />
          <Input
            label="Digital Address"
            {...register("company.companyAddress.digitalAddress")}
            error={
              errors.company?.companyAddress?.digitalAddress?.message
            }
          />
        </div>
        <Input
          label="Postal Address"
          {...register("company.companyAddress.postalAddress")}
          error={errors.company?.companyAddress?.postalAddress?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Email Address"
          type="email"
          {...register("company.companyEmail")}
          error={errors.company?.companyEmail?.message}
        />
        <Input
          label="Phone Number"
          type="tel"
          {...register("company.companyPhone")}
          error={errors.company?.companyPhone?.message}
        />
      </div>
    </div>
  );
}