"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useFieldArray,
  FieldArrayWithId,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { z } from "zod";
import { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/company-inc/input";
import { Textarea } from "@/components/company-inc/textarea";
import { Select } from "@/components/company-inc/select";
import { RadioGroup } from "@/components/company-inc/radio-group";
import { Checkbox } from "@/components/company-inc/checkbox";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { formSchema } from "@/lib/schemas";
import Head from "next/head";
import strings from "@/constants/strings";
import {Button} from "@/components/ui/button";

// Type definitions
type FormData = z.infer<typeof formSchema>;
type Shareholder = FormData["shareholders"][0];
type Director = FormData["directors"][0];
type BeneficialOwner = FormData["beneficialOwners"][0];


// Step indicator component
function StepIndicator({
  currentStep,
  onStepClick,
  steps,
}: {
  currentStep: number;
  onStepClick?: (step: number) => void;
  completedSteps: Set<number>;
  steps: { title: string; description: string }[];
}) {
  return (
    <div className="hidden lg:block w-64 shrink-0 pr-2 border-r border-gray-300">
      <div className="sticky top-4">
        <h2 className="text-xl font-bold mb-6">Application Progress</h2>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCurrent = currentStep === stepNumber;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => onStepClick && onStepClick(stepNumber)}
                className={`w-full text-left p-2 rounded-e-full transition-colors ${
                  isCurrent
                    ? "bg-slate-100 border-l-4 border-primary"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Collapsible section component
function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex-grow border rounded-lg overflow-hidden mb-6">
      <button
        type="button"
        className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{title}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

// Review field component
function ReviewField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">
        {value || <span className="text-gray-400">Not provided</span>}
      </p>
    </div>
  );
}

// Helper functions for default values
function getDefaultShareholder(): Shareholder {
  return {
    fullName: "",
    type: "individual",
    address: { streetAddress: "", postalAddress: "" },
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    occupation: "",
    phone: "",
    email: "",
    taxInfo: { hasTin: false },
    ghanaCardNumber: "",
    shares: {
      number: 0,
      class: "",
      amountPaidCash: 0,
      amountPaidOther: 0,
      amountRemaining: 0,
    },
    isDirector: false,
    isBeneficialOwner: false,
  };
}

function getDefaultDirector(): Director {
  return {
    fullName: "",
    address: { streetAddress: "", postalAddress: "" },
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    occupation: "",
    occupationAddress: "",
    email: "",
    mobile: "",
    taxInfo: { hasTin: false },
    otherDirectorships: "",
  };
}

function getDefaultBeneficialOwner(): BeneficialOwner {
  return {
    fullName: "",
    address: { streetAddress: "", postalAddress: "" },
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    occupation: "",
    placeOfWork: "",
    email: "",
    mobile: "",
    taxInfo: { hasTin: false },
  };
}

// Step components
function CompanyDetailsStep({
  register,
  errors,
  onNext,
}: {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onNext: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Company Details</h1>
        <p className="text-gray-600 mt-1">
          Please provide all required information about your company.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Input
          label="Proposed Company Name"
          {...register("company.companyName")}
          scrollRef={true}
          helpText="The name must be unique and not already registered."
          descriptionTooltip="Enter the proposed name of your company. It must comply with the Companies Act and not be identical or similar to an existing company name."
          error={errors.company?.companyName?.message}
          required
        />

        <Textarea
          label="Objects of Company"
          descriptionTooltip="Describe the main activities and purpose of your company. This should align with the Companies Act requirements."
          {...register("company.companyObjects")}
          rows={3}
          {...register("company.companyObjects")}
          error={errors.company?.companyObjects?.message}
        />
        <span>{errors.company?.companyObjects?.types?.value}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Number of Authorized Shares"
          type="number"
          scrollRef={true}
          {...register("company.authorizedShares", { valueAsNumber: true })}
          error={errors.company?.authorizedShares?.message}
          required
        />
        <Input
          label="Stated Capital"
          type="number"
          scrollRef={true}
          {...register("company.statedCapital", { valueAsNumber: true })}
          error={errors.company?.statedCapital?.message}
          required
        />
      </div>

      <div className="space-y-4">
        <Input
          label="Street Address (including Digital Address)"
          {...register("company.companyAddress.streetAddress")}
          error={errors.company?.companyAddress?.streetAddress?.message}
          required
        />
        <Input
          label="Postal Address"
          {...register("company.companyAddress.postalAddress")}
          error={errors.company?.companyAddress?.postalAddress?.message}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Email Address"
          type="email"
          {...register("company.companyEmail")}
          error={errors.company?.companyEmail?.message}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          {...register("company.companyPhone")}
          error={errors.company?.companyPhone?.message}
          required
        />
      </div>
    </div>
  );
}

function ShareholderDetailsStep({
  fields,
  register,
  errors,
  watch,
  setValue,
  remove,
  onAdd,
  onNext,
  onPrev,
  trigger = () => {}, // default to no-op
}: {
  fields: FieldArrayWithId<FormData, "shareholders", "id">[];
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  remove: (index: number) => void;
  onAdd: () => void;
  onNext: () => void;
  onPrev: () => void;
  trigger?: (() => void) | (() => Promise<boolean>);
}) {
  return (
    <div className="space-y-6">
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Shareholder Details
        </h1>
        <p className="text-gray-600 mt-1">
          Please provide information for all shareholders. At least one
          shareholder is required.
        </p>
      </div>

      {fields.map((field, idx) => (
        <CollapsibleSection
          key={field.id}
          title={`Shareholder ${idx + 1}`}
          defaultOpen={idx === fields.length - 1}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Shareholder {idx + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                  aria-label={`Remove shareholder ${idx + 1}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Full Name"
                {...register(`shareholders.${idx}.fullName`)}
                error={errors.shareholders?.[idx]?.fullName?.message}
                required
              />
              <Select
                label="Type"
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "corporate", label: "Corporate" },
                ]}
                {...register(`shareholders.${idx}.type`)}
                error={
                  typeof errors.shareholders?.[idx]?.type === "object" &&
                  errors.shareholders?.[idx]?.type !== null
                    ? (errors.shareholders?.[idx]?.type as { message?: string })
                        .message
                    : undefined
                }
                required
              />
            </div>

            <Input
              label="Street Address (including Digital Address)"
              {...register(`shareholders.${idx}.address.streetAddress`)}
              error={
                errors.shareholders?.[idx]?.address?.streetAddress?.message
              }
              required
            />
            <Input
              label="Postal Address"
              {...register(`shareholders.${idx}.address.postalAddress`)}
              error={
                errors.shareholders?.[idx]?.address?.postalAddress?.message
              }
              required
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Date of Birth"
                type="date"
                {...register(`shareholders.${idx}.dateOfBirth`)}
                error={errors.shareholders?.[idx]?.dateOfBirth?.message}
                required
              />
              <Input
                label="Place of Birth"
                {...register(`shareholders.${idx}.placeOfBirth`)}
                error={errors.shareholders?.[idx]?.placeOfBirth?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Nationality"
                {...register(`shareholders.${idx}.nationality`)}
                error={errors.shareholders?.[idx]?.nationality?.message}
                required
              />
              <Input
                label="Occupation"
                {...register(`shareholders.${idx}.occupation`)}
                error={errors.shareholders?.[idx]?.occupation?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Email Address"
                type="email"
                {...register(`shareholders.${idx}.email`)}
                error={errors.shareholders?.[idx]?.email?.message}
                required
              />
              <Input
                label="Ghana Card Number"
                {...register(`shareholders.${idx}.ghanaCardNumber`)}
                error={errors.shareholders?.[idx]?.ghanaCardNumber?.message}
                required
              />
            </div>

            <RadioGroup
              label="Do you have a Tax Identification Number (TIN)?"
              name={`shareholders.${idx}.taxInfo.hasTin`}
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              value={
                watch(`shareholders.${idx}.taxInfo.hasTin`) ? "true" : "false"
              }
              onChange={(v: string) =>
                setValue(`shareholders.${idx}.taxInfo.hasTin`, v === "true")
              }
            />

            {watch(`shareholders.${idx}.taxInfo.hasTin`) ? (
              <Input
                label="TIN Number"
                {...register(`shareholders.${idx}.taxInfo.tinNumber`)}
                error={errors.shareholders?.[idx]?.taxInfo?.tinNumber?.message}
                required
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Name"
                  {...register(`shareholders.${idx}.taxInfo.name`)}
                  error={errors.shareholders?.[idx]?.taxInfo?.name?.message}
                  required
                />
                <Select
                  label="Marital Status"
                  options={[
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                    { value: "divorced", label: "Divorced" },
                    { value: "widowed", label: "Widowed" },
                  ]}
                  {...register(`shareholders.${idx}.taxInfo.maritalStatus`)}
                  error={
                    errors.shareholders?.[idx]?.taxInfo?.maritalStatus?.message
                  }
                  required
                />
                <Input
                  label="Birth Town/City"
                  {...register(`shareholders.${idx}.taxInfo.birthTown`)}
                  error={
                    errors.shareholders?.[idx]?.taxInfo?.birthTown?.message
                  }
                  required
                />
                <Input
                  label="Mother's Maiden Name"
                  {...register(`shareholders.${idx}.taxInfo.mothersName`)}
                  error={
                    errors.shareholders?.[idx]?.taxInfo?.mothersName?.message
                  }
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Number of Shares"
                type="number"
                {...register(`shareholders.${idx}.shares.number`, {
                  valueAsNumber: true,
                })}
                error={errors.shareholders?.[idx]?.shares?.number?.message}
                required
              />
              <Select
                label="Class of Shares"
                options={[
                  { value: "equity", label: "Equity" },
                  { value: "preference", label: "Preference" },
                ]}
                {...register(`shareholders.${idx}.shares.class`)}
                error={errors.shareholders?.[idx]?.shares?.class?.message}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
              <Input
                label="Amount Paid (Cash)"
                type="number"
                {...register(`shareholders.${idx}.shares.amountPaidCash`, {
                  valueAsNumber: true,
                })}
                error={
                  errors.shareholders?.[idx]?.shares?.amountPaidCash?.message
                }
                required
              />
              <Input
                label="Amount Paid (Other)"
                type="number"
                {...register(`shareholders.${idx}.shares.amountPaidOther`, {
                  valueAsNumber: true,
                })}
                error={
                  errors.shareholders?.[idx]?.shares?.amountPaidOther?.message
                }
              />
              <Input
                label="Amount Remaining"
                type="number"
                {...register(`shareholders.${idx}.shares.amountRemaining`, {
                  valueAsNumber: true,
                })}
                error={
                  errors.shareholders?.[idx]?.shares?.amountRemaining?.message
                }
              />
            </div>

            <div className="space-y-2">
              <Checkbox
                label="Serve as Director"
                {...register(`shareholders.${idx}.isDirector`)}
                onChange={(e) => {
                  setValue(`shareholders.${idx}.isDirector`, e.target.checked);
                  // Force validation and state update
                  trigger();
                }}
              />
              <Checkbox
                label="Serve as Beneficial Owner"
                {...register(`shareholders.${idx}.isBeneficialOwner`)}
                onChange={(e) => {
                  setValue(
                    `shareholders.${idx}.isBeneficialOwner`,
                    e.target.checked
                  );
                  // trigger();
                }}
              />
            </div>
          </div>
        </CollapsibleSection>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
      >
        <PlusIcon className="h-4 w-4" /> Add Another Shareholder
      </button>

    </div>
  );
}

function DirectorDetailsStep({
  fields,
  register,
  errors,
  watch,
  setValue,
  remove,
  onAdd,
  onNext,
  onPrev,
  shareholders,
}: {
  fields: FieldArrayWithId<FormData, "directors", "id">[];
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  remove: (index: number) => void;
  onAdd: () => void;
  onNext: () => void;
  onPrev: () => void;
  shareholders: Shareholder[];
}) {
  return (
    <div className="space-y-6">
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Director Details</h1>
        <p className="text-gray-600 mt-1">
          Please provide information for all directors. At least two directors
          are required.
        </p>
      </div>

      {fields.map((field, idx) => {
        const isShareholder = shareholders.find(
          (sh) =>
            sh.fullName === watch(`directors.${idx}.fullName`) && sh.isDirector
        );

        return (
          <CollapsibleSection
            key={field.id}
            title={`Director ${idx + 1}`}
            defaultOpen={idx === fields.length - 1}
          >
            <div className="space-y-4">
              {isShareholder && (
                <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-4">
                  <p className="flex items-center">
                    <InformationCircleIcon className="h-4 w-4 mr-2" />
                    This director is linked to a shareholder. Basic details are
                    synchronized automatically.
                  </p>
                </div>
              )}

              <Input
                label="Full Name"
                {...register(`directors.${idx}.fullName`)}
                error={errors.directors?.[idx]?.fullName?.message}
                required
                disabled={!!isShareholder}
              />

              <Input
                label="Street Address (including Digital Address)"
                {...register(`directors.${idx}.address.streetAddress`)}
                error={errors.directors?.[idx]?.address?.streetAddress?.message}
                required
                disabled={!!isShareholder}
              />
              <Input
                label="Postal Address"
                {...register(`directors.${idx}.address.postalAddress`)}
                error={errors.directors?.[idx]?.address?.postalAddress?.message}
                required
                disabled={!!isShareholder}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Date of Birth"
                  type="date"
                  {...register(`directors.${idx}.dateOfBirth`)}
                  error={errors.directors?.[idx]?.dateOfBirth?.message}
                  required
                  disabled={!!isShareholder}
                />
                <Input
                  label="Place of Birth"
                  {...register(`directors.${idx}.placeOfBirth`)}
                  error={errors.directors?.[idx]?.placeOfBirth?.message}
                  required
                  disabled={!!isShareholder}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Nationality"
                  {...register(`directors.${idx}.nationality`)}
                  error={errors.directors?.[idx]?.nationality?.message}
                  required
                  disabled={!!isShareholder}
                />
                <Input
                  label="Occupation"
                  {...register(`directors.${idx}.occupation`)}
                  error={errors.directors?.[idx]?.occupation?.message}
                  required
                  disabled={!!isShareholder}
                />
              </div>

              <Input
                label="Occupation Address"
                {...register(`directors.${idx}.occupationAddress`)}
                error={errors.directors?.[idx]?.occupationAddress?.message}
                required
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Email Address"
                  type="email"
                  {...register(`directors.${idx}.email`)}
                  error={errors.directors?.[idx]?.email?.message}
                  required
                  disabled={!!isShareholder}
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  {...register(`directors.${idx}.mobile`)}
                  error={errors.directors?.[idx]?.mobile?.message}
                  required
                />
              </div>

              <RadioGroup
                label="Do you have a Tax Identification Number (TIN)?"
                name={`directors.${idx}.taxInfo.hasTin`}
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                value={
                  watch(`directors.${idx}.taxInfo.hasTin`) ? "true" : "false"
                }
                onChange={(v: string) =>
                  setValue(`directors.${idx}.taxInfo.hasTin`, v === "true")
                }
                // disabled={isShareholder}
              />

              {watch(`directors.${idx}.taxInfo.hasTin`) ? (
                <Input
                  label="TIN Number"
                  {...register(`directors.${idx}.taxInfo.tinNumber`)}
                  error={errors.directors?.[idx]?.taxInfo?.tinNumber?.message}
                  required
                  // disabled={isShareholder}
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Name"
                    {...register(`directors.${idx}.taxInfo.name`)}
                    error={errors.directors?.[idx]?.taxInfo?.name?.message}
                    required
                    // disabled={isShareholder}
                  />
                  <Select
                    label="Marital Status"
                    options={[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                      { value: "divorced", label: "Divorced" },
                      { value: "widowed", label: "Widowed" },
                    ]}
                    {...register(`directors.${idx}.taxInfo.maritalStatus`)}
                    error={
                      errors.directors?.[idx]?.taxInfo?.maritalStatus?.message
                    }
                    required
                  />
                  <Input
                    label="Birth Town/City"
                    {...register(`directors.${idx}.taxInfo.birthTown`)}
                    error={errors.directors?.[idx]?.taxInfo?.birthTown?.message}
                    required
                  />
                  <Input
                    label="Mother's Maiden Name"
                    {...register(`directors.${idx}.taxInfo.mothersName`)}
                    error={
                      errors.directors?.[idx]?.taxInfo?.mothersName?.message
                    }
                    required
                  />
                </div>
              )}

              {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Declaration Attachment (File Path)"
                  {...register(`directors.${idx}.declarationAttachment`)}
                  error={
                    errors.directors?.[idx]?.declarationAttachment?.message
                  }
                  required
                />
                <Input
                  label="Consent Letter (File Path)"
                  {...register(`directors.${idx}.consentLetter`)}
                  error={errors.directors?.[idx]?.consentLetter?.message}
                  required
                />
              </div> */}

              <Textarea
                label="Other Directorships"
                {...register(`directors.${idx}.otherDirectorships`)}
                error={errors.directors?.[idx]?.otherDirectorships?.message}
                rows={3}
              />
            </div>
          </CollapsibleSection>
        );
      })}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-primary hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
      >
        <PlusIcon className="h-4 w-4" /> Add Another Director
      </button>

    </div>
  );
}

function SecretaryDetailsStep({
  register,
  errors,
  watch,
  setValue,
  onNext,
  onPrev,
}: {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onNext: () => void;
  onPrev: () => void;
}) {
  const hasZuputoSecretary = watch("hasZuputoSecretary");

  return (
    <div className="space-y-6">
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Secretary Details</h1>
        <p className="text-gray-600 mt-1">
          Provide details for the company secretary.
        </p>
      </div>

      <CollapsibleSection title="Secretary Service">
        <RadioGroup
          label="Would you like ZUPUTO to serve as your company secretary?"
          name="hasZuputoSecretary"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
          value={hasZuputoSecretary ? "true" : "false"}
          onChange={(v: string) => {
            setValue("hasZuputoSecretary", v === "true");
            if (v === "true") {
              setValue("secretary", undefined);
            } else {
              setValue("secretary", {
                isCorporate: false,
                fullName: "",
                address: { streetAddress: "", postalAddress: "" },
                taxInfo: { hasTin: false },
              });
            }
          }}
        />
      </CollapsibleSection>

      {!hasZuputoSecretary && (
        <CollapsibleSection title="Secretary Information">
          <RadioGroup
            label="Is the secretary a corporate body?"
            name="secretary.isCorporate"
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
            value={watch("secretary.isCorporate") ? "true" : "false"}
            onChange={(v: string) => {
              setValue("secretary.isCorporate", v === "true");
              if (v === "true") {
                setValue("secretary", {
                  isCorporate: true,
                  corporateName: "",
                  representative: { taxInfo: { hasTin: false } },
                });
              } else {
                setValue("secretary", {
                  isCorporate: false,
                  fullName: "",
                  address: { streetAddress: "", postalAddress: "" },
                  taxInfo: { hasTin: false },
                });
              }
            }}
          />

          {watch("secretary.isCorporate") ? (
            <>
              <Input
                label="Corporate Name"
                {...register("secretary.corporateName")}
                error={errors.secretary?.corporateName?.message}
                required
              />
              <RadioGroup
                label="Does the representative have a TIN?"
                name="secretary.representative.taxInfo.hasTin"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                value={
                  watch("secretary.representative.taxInfo.hasTin")
                    ? "true"
                    : "false"
                }
                onChange={(v: string) =>
                  setValue(
                    "secretary.representative.taxInfo.hasTin",
                    v === "true"
                  )
                }
              />
              {watch("secretary.representative.taxInfo.hasTin") ? (
                <Input
                  label="TIN Number"
                  {...register("secretary.representative.taxInfo.tinNumber")}
                  error={
                    errors.secretary?.representative?.taxInfo?.tinNumber
                      ?.message
                  }
                  required
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Name"
                    {...register("secretary.representative.taxInfo.name")}
                    error={
                      errors.secretary?.representative?.taxInfo?.name?.message
                    }
                    required
                  />
                  <Select
                    label="Marital Status"
                    options={[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                      { value: "divorced", label: "Divorced" },
                      { value: "widowed", label: "Widowed" },
                    ]}
                    {...register(
                      "secretary.representative.taxInfo.maritalStatus"
                    )}
                    error={
                      errors.secretary?.representative?.taxInfo?.maritalStatus
                        ?.message
                    }
                    required
                  />
                  <Input
                    label="Birth Town/City"
                    {...register("secretary.representative.taxInfo.birthTown")}
                    error={
                      errors.secretary?.representative?.taxInfo?.birthTown
                        ?.message
                    }
                    required
                  />
                  <Input
                    label="Mother's Maiden Name"
                    {...register(
                      "secretary.representative.taxInfo.mothersName"
                    )}
                    error={
                      errors.secretary?.representative?.taxInfo?.mothersName
                        ?.message
                    }
                    required
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <Input
                label="Full Name"
                {...register("secretary.fullName")}
                error={errors.secretary?.fullName?.message}
                required
              />
              <CollapsibleSection title="Address Details" defaultOpen={false}>
                <Input
                  label="Street Address (including Digital Address)"
                  {...register("secretary.address.streetAddress")}
                  error={errors.secretary?.address?.streetAddress?.message}
                  required
                />
                <Input
                  label="Postal Address"
                  {...register("secretary.address.postalAddress")}
                  error={errors.secretary?.address?.postalAddress?.message}
                  required
                />
              </CollapsibleSection>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Date of Birth"
                  type="date"
                  {...register("secretary.dateOfBirth")}
                  error={errors.secretary?.dateOfBirth?.message}
                  required
                />
                <Input
                  label="Place of Birth"
                  {...register("secretary.placeOfBirth")}
                  error={errors.secretary?.placeOfBirth?.message}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Nationality"
                  {...register("secretary.nationality")}
                  error={errors.secretary?.nationality?.message}
                  required
                />
                <Input
                  label="Occupation"
                  {...register("secretary.occupation")}
                  error={errors.secretary?.occupation?.message}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Email Address"
                  type="email"
                  {...register("secretary.email")}
                  error={errors.secretary?.email?.message}
                  required
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  {...register("secretary.mobile")}
                  error={errors.secretary?.mobile?.message}
                  required
                />
              </div>
              <Input
                label="Ghana Card Number"
                {...register("secretary.ghanaCardNumber")}
                error={errors.secretary?.ghanaCardNumber?.message}
                required
              />
              <RadioGroup
                label="Does the secretary have a TIN?"
                name="secretaryHasTin"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                value={watch("secretary.taxInfo.hasTin") ? "true" : "false"}
                onChange={(v: string) =>
                  setValue("secretary.taxInfo.hasTin", v === "true")
                }
              />
              {watch("secretary.taxInfo.hasTin") ? (
                <Input
                  label="TIN Number"
                  {...register("secretary.taxInfo.tinNumber")}
                  error={errors.secretary?.taxInfo?.tinNumber?.message}
                  required
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Name"
                    {...register("secretary.taxInfo.name")}
                    error={errors.secretary?.taxInfo?.name?.message}
                    required
                  />
                  <Select
                    label="Marital Status"
                    options={[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                      { value: "divorced", label: "Divorced" },
                      { value: "widowed", label: "Widowed" },
                    ]}
                    {...register("secretary.taxInfo.maritalStatus")}
                    error={errors.secretary?.taxInfo?.maritalStatus?.message}
                    required
                  />
                  <Input
                    label="Birth Town/City"
                    {...register("secretary.taxInfo.birthTown")}
                    error={errors.secretary?.taxInfo?.birthTown?.message}
                    required
                  />
                  <Input
                    label="Mother's Maiden Name"
                    {...register("secretary.taxInfo.mothersName")}
                    error={errors.secretary?.taxInfo?.mothersName?.message}
                    required
                  />
                </div>
              )}
              <Select
                label="Qualification"
                options={[
                  {
                    value: "professional_qualification",
                    label: "Professional Qualification",
                  },
                  {
                    value: "tertiary_level_qualification",
                    label: "Tertiary Level Qualification",
                  },
                  {
                    value: "company_secretary_trainee",
                    label: "Company Secretary Trainee",
                  },
                  {
                    value: "barrister_or_solicitor",
                    label: "Barrister or Solicitor",
                  },
                  {
                    value: "institute_of_chartered_accountants",
                    label: "Institute of Chartered Accountants",
                  },
                  { value: "under_supervision", label: "Under Supervision" },
                  {
                    value:
                      "institute_of_chartered_secretaries_and_administrators",
                    label:
                      "Institute of Chartered Secretaries and Administrators",
                  },
                ]}
                {...register("secretary.qualification")}
                error={errors.secretary?.qualification?.message}
                required
              />
            </>
          )}
        </CollapsibleSection>
      )}

      <div className="hidden lg:flex justify-between border-t pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <ChevronLeftIcon className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next: Auditor Details <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function AuditorDetailsStep({
  register,
  errors,
  watch,
  setValue,
  onNext,
  onPrev,
}: {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onNext: () => void;
  onPrev: () => void;
}) {
  const hasZuputoAuditor = watch("hasZuputoAuditor");

  return (
    <div className="space-y-6">
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Auditor Details</h1>
        <p className="text-gray-600 mt-1">
          Provide details for the company auditor.
        </p>
      </div>

      <CollapsibleSection title="Auditor Service">
        <RadioGroup
          label="Would you like ZUPUTO to provide an auditor? (No cost at incorporation, minimal quarterly cost applies)"
          name="hasZuputoAuditor"
          options={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
          value={hasZuputoAuditor ? "true" : "false"}
          onChange={(v: string) => {
            setValue("hasZuputoAuditor", v === "true");
            if (v === "true") {
              setValue("auditor", undefined);
            } else {
              setValue("auditor", {
                name: "",
                address: { streetAddress: "", postalAddress: "" },
                tinNumber: "",
                ghanaCardNumber: "",
                mobile: "",
                consentLetter: "",
              });
            }
          }}
        />
      </CollapsibleSection>

      {!hasZuputoAuditor && (
        <CollapsibleSection title="Auditor Information">
          <Input
            label="Auditor Name"
            {...register("auditor.name")}
            error={errors.auditor?.name?.message}
            required
          />
    
            <Input
              label="Street Address (including Digital Address)"
              {...register("auditor.address.streetAddress")}
              error={errors.auditor?.address?.streetAddress?.message}
              required
            />
            <Input
              label="Postal Address"
              {...register("auditor.address.postalAddress")}
              error={errors.auditor?.address?.postalAddress?.message}
              required
            />
  
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="TIN Number"
              {...register("auditor.tinNumber")}
              error={errors.auditor?.tinNumber?.message}
              required
            />
            <Input
              label="Ghana Card Number"
              {...register("auditor.ghanaCardNumber")}
              error={errors.auditor?.ghanaCardNumber?.message}
              required
            />
          </div>
          <Input
            label="Mobile Number"
            type="tel"
            {...register("auditor.mobile")}
            error={errors.auditor?.mobile?.message}
            required
          />
          <Input
            label="Consent Letter (File Path)"
            {...register("auditor.consentLetter")}
            error={errors.auditor?.consentLetter?.message}
            required
          />
        </CollapsibleSection>
      )}

      {/* <div className="hidden lg:flex justify-between border-t pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <ChevronLeftIcon className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next: Beneficial Owners <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div> */}
    </div>
  );
}

function BeneficialOwnersStep({
  fields,
  register,
  errors,
  watch,
  setValue,
  remove,
  onAdd,
  onNext,
  onPrev,
  shareholders,
}: {
  fields: FieldArrayWithId<FormData, "beneficialOwners", "id">[];
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  remove: (index: number) => void;
  onAdd: () => void;
  onNext: () => void;
  onPrev: () => void;
  shareholders: Shareholder[];
}) {
  const boShareholders = shareholders.filter((s: Shareholder) => s.isBeneficialOwner);

  return (
    <div className="space-y-6">
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Beneficial Owners Details
        </h1>
        <p className="text-gray-600 mt-1">
          Provide details for any beneficial owners.
        </p>
      </div>

      {boShareholders.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">
          <p className="flex items-center">
            <InformationCircleIcon className="h-4 w-4 mr-2" />
            No shareholders marked as beneficial owners. You can mark
            shareholders as beneficial owners in the Shareholders section.
          </p>
        </div>
      ) : (
        <>
          {fields.map((field, idx) => {
            const isShareholder = shareholders.some(
              (sh) =>
                sh.fullName === watch(`beneficialOwners.${idx}.fullName`) &&
                sh.isBeneficialOwner
            );

            return (
              <CollapsibleSection
                key={field.id}
                title={`Beneficial Owner ${idx + 1}`}
                defaultOpen={idx === fields.length - 1}
              >
                <div className="space-y-4">
                  {isShareholder && (
                    <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-4">
                      <p className="flex items-center">
                        <InformationCircleIcon className="h-4 w-4 mr-2" />
                        This beneficial owner is linked to a shareholder. Basic
                        details are synchronized automatically.
                      </p>
                    </div>
                  )}

                  <Input
                    label="Full Name"
                    {...register(`beneficialOwners.${idx}.fullName`)}
                    error={errors.beneficialOwners?.[idx]?.fullName?.message}
                    required
                    // disabled={isShareholder}
                  />

                  <CollapsibleSection
                    title="Address Details"
                    defaultOpen={false}
                  >
                    <Input
                      label="Street Address (including Digital Address)"
                      {...register(
                        `beneficialOwners.${idx}.address.streetAddress`
                      )}
                      error={
                        errors.beneficialOwners?.[idx]?.address?.streetAddress
                          ?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                    <Input
                      label="Postal Address"
                      {...register(
                        `beneficialOwners.${idx}.address.postalAddress`
                      )}
                      error={
                        errors.beneficialOwners?.[idx]?.address?.postalAddress
                          ?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                  </CollapsibleSection>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="Date of Birth"
                      type="date"
                      {...register(`beneficialOwners.${idx}.dateOfBirth`)}
                      error={
                        errors.beneficialOwners?.[idx]?.dateOfBirth?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                    <Input
                      label="Place of Birth"
                      {...register(`beneficialOwners.${idx}.placeOfBirth`)}
                      error={
                        errors.beneficialOwners?.[idx]?.placeOfBirth?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="Nationality"
                      {...register(`beneficialOwners.${idx}.nationality`)}
                      error={
                        errors.beneficialOwners?.[idx]?.nationality?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                    <Input
                      label="Occupation"
                      {...register(`beneficialOwners.${idx}.occupation`)}
                      error={
                        errors.beneficialOwners?.[idx]?.occupation?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                  </div>

                  <Input
                    label="Place of Work"
                    {...register(`beneficialOwners.${idx}.placeOfWork`)}
                    error={errors.beneficialOwners?.[idx]?.placeOfWork?.message}
                    required
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="Email Address"
                      type="email"
                      {...register(`beneficialOwners.${idx}.email`)}
                      error={errors.beneficialOwners?.[idx]?.email?.message}
                      required
                      disabled={isShareholder}
                    />
                    <Input
                      label="Mobile Number"
                      type="tel"
                      {...register(`beneficialOwners.${idx}.mobile`)}
                      error={errors.beneficialOwners?.[idx]?.mobile?.message}
                      required
                    />
                  </div>

                  <RadioGroup
                    label="Do you have a Tax Identification Number (TIN)?"
                    name={`beneficialOwners.${idx}.taxInfo.hasTin`}
                    options={[
                      { value: "true", label: "Yes" },
                      { value: "false", label: "No" },
                    ]}
                    value={
                      watch(`beneficialOwners.${idx}.taxInfo.hasTin`)
                        ? "true"
                        : "false"
                    }
                    onChange={(v: string) =>
                      setValue(
                        `beneficialOwners.${idx}.taxInfo.hasTin`,
                        v === "true"
                      )
                    }
                    // disabled={isShareholder}
                  />

                  {watch(`beneficialOwners.${idx}.taxInfo.hasTin`) ? (
                    <Input
                      label="TIN Number"
                      {...register(`beneficialOwners.${idx}.taxInfo.tinNumber`)}
                      error={
                        errors.beneficialOwners?.[idx]?.taxInfo?.tinNumber
                          ?.message
                      }
                      required
                      disabled={isShareholder}
                    />
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Input
                        label="Name"
                        {...register(`beneficialOwners.${idx}.taxInfo.name`)}
                        error={
                          errors.beneficialOwners?.[idx]?.taxInfo?.name?.message
                        }
                        required
                        disabled={isShareholder}
                      />
                      <Select
                        label="Marital Status"
                        options={[
                          { value: "single", label: "Single" },
                          { value: "married", label: "Married" },
                          { value: "divorced", label: "Divorced" },
                          { value: "widowed", label: "Widowed" },
                        ]}
                        {...register(
                          `beneficialOwners.${idx}.taxInfo.maritalStatus`
                        )}
                        error={
                          errors.beneficialOwners?.[idx]?.taxInfo?.maritalStatus
                            ?.message
                        }
                        required
                        disabled={isShareholder}
                      />
                      <Input
                        label="Birth Town/City"
                        {...register(
                          `beneficialOwners.${idx}.taxInfo.birthTown`
                        )}
                        error={
                          errors.beneficialOwners?.[idx]?.taxInfo?.birthTown
                            ?.message
                        }
                        required
                        disabled={isShareholder}
                      />
                      <Input
                        label="Mother's Maiden Name"
                        {...register(
                          `beneficialOwners.${idx}.taxInfo.mothersName`
                        )}
                        error={
                          errors.beneficialOwners?.[idx]?.taxInfo?.mothersName
                            ?.message
                        }
                        required
                        disabled={isShareholder}
                      />
                    </div>
                  )}
                </div>
              </CollapsibleSection>
            );
          })}

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Beneficial Owner
          </button>
        </>
      )}

      {/* <div className="hidden lg:flex justify-between border-t pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <ChevronLeftIcon className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next: Review <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div> */}
    </div>
  );
}

function ReviewStep({
  getValues,
  onPrev,
  isSubmitting,
  isValid,
}: {
  getValues: UseFormGetValues<FormData>;
  onPrev: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}) {
  const values = getValues();

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Review Your Application
        </h2>
        <p className="text-gray-600 mt-1">
          Please review all information before submitting your application.
        </p>
      </div>

      <CollapsibleSection title="Company Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReviewField
            label="Company Name"
            value={values.company.companyName}
          />
          <ReviewField
            label="Authorized Shares"
            value={values.company.authorizedShares}
          />
          <ReviewField
            label="Stated Capital"
            value={values.company.statedCapital}
          />
          <ReviewField
            label="Company Email"
            value={values.company.companyEmail}
          />
          <ReviewField
            label="Company Phone"
            value={values.company.companyPhone}
          />
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Company Address</h4>
          <div className="mt-2 space-y-1">
            <p>{values.company.companyAddress.streetAddress}</p>
            <p>Postal Address: {values.company.companyAddress.postalAddress}</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Secretary Details">
        <ReviewField
          label="ZUPUTO Secretary"
          value={values.hasZuputoSecretary ? "Yes" : "No"}
        />
        {!values.hasZuputoSecretary && values.secretary && (
          <div className="mt-4">
            {values.secretary.isCorporate ? (
              <div className="mt-2 space-y-1">
                <ReviewField
                  label="Corporate Name"
                  value={values.secretary.corporateName}
                />
                <ReviewField
                  label="Representative TIN"
                  value={
                    values.secretary.representative?.taxInfo.tinNumber || "N/A"
                  }
                />
              </div>
            ) : (
              <div className="mt-2 space-y-1">
                <ReviewField
                  label="Full Name"
                  value={values.secretary.fullName}
                />
                <ReviewField
                  label="Ghana Card Number"
                  value={values.secretary.ghanaCardNumber}
                />
                <ReviewField label="Email" value={values.secretary.email} />
                <ReviewField label="Mobile" value={values.secretary.mobile} />
                <ReviewField
                  label="Qualification"
                  value={values.secretary.qualification?.replace(/_/g, " ")}
                />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{values.secretary.address?.streetAddress}</p>
                  <p>
                    Postal Address: {values.secretary.address?.postalAddress}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Auditor Details">
        <ReviewField
          label="ZUPUTO Auditor"
          value={values.hasZuputoAuditor ? "Yes" : "No"}
        />
        {!values.hasZuputoAuditor && values.auditor && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReviewField label="Auditor Name" value={values.auditor.name} />
              <ReviewField
                label="TIN Number"
                value={values.auditor.tinNumber}
              />
              <ReviewField
                label="Ghana Card Number"
                value={values.auditor.ghanaCardNumber}
              />
              <ReviewField
                label="Mobile Number"
                value={values.auditor.mobile}
              />
              <ReviewField
                label="Consent Letter"
                value={values.auditor.consentLetter}
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Address</p>
              <p>{values.auditor.address.streetAddress}</p>
              <p>Postal Address: {values.auditor.address.postalAddress}</p>
            </div>
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection
        title={`Shareholders (${values.shareholders.length})`}
      >
        {values.shareholders.map((shareholder, idx) => (
          <div key={idx} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Shareholder {idx + 1}</h4>
              <div className="flex space-x-2">
                {shareholder.isDirector && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Director
                  </span>
                )}
                {shareholder.isBeneficialOwner && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Beneficial Owner
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <ReviewField label="Full Name" value={shareholder.fullName} />
              <ReviewField
                label="Type"
                value={
                  shareholder.type === "individual" ? "Individual" : "Corporate"
                }
              />
              <ReviewField
                label="Nationality"
                value={shareholder.nationality}
              />
              <ReviewField
                label="Ghana Card Number"
                value={shareholder.ghanaCardNumber}
              />
              <ReviewField
                label="Shares"
                value={`${shareholder.shares.number} (${shareholder.shares.class})`}
              />
              <ReviewField
                label="Amount Paid"
                value={`Cash: ${shareholder.shares.amountPaidCash}, Other: ${shareholder.shares.amountPaidOther}`}
              />
              <ReviewField
                label="Amount Remaining"
                value={shareholder.shares.amountRemaining}
              />
            </div>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title={`Directors (${values.directors.length})`}>
        {values.directors.map((director, idx) => (
          <div key={idx} className="border rounded-lg p-4 mb-4">
            <h4 className="font-medium">Director {idx + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <ReviewField label="Full Name" value={director.fullName} />
              <ReviewField label="Nationality" value={director.nationality} />
              <ReviewField label="Email" value={director.email} />
              <ReviewField label="Mobile" value={director.mobile} />
            </div>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection
        title={`Beneficial Owners (${values.beneficialOwners.length})`}
      >
        {values.beneficialOwners.length === 0 ? (
          <p className="text-gray-500">No beneficial owners provided.</p>
        ) : (
          values.beneficialOwners.map((bo, idx) => (
            <div key={idx} className="border rounded-lg p-4 mb-4">
              <h4 className="font-medium">Beneficial Owner {idx + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <ReviewField label="Full Name" value={bo.fullName} />
                <ReviewField label="Nationality" value={bo.nationality} />
                <ReviewField label="Email" value={bo.email} />
                <ReviewField label="Mobile" value={bo.mobile} />
              </div>
            </div>
          ))
        )}
      </CollapsibleSection>

      <div className="hidden lg:flex justify-between border-t pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <ChevronLeftIcon className="h-4 w-4" /> Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`rounded-md px-4 py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              isSubmitting || !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}

// Main form component
const CompanyIncorporation = () => {
  const steps = [
    { title: "Company Details", description: "Basic company information" },
    { title: "Shareholders", description: "Company ownership details" },
    { title: "Directors", description: "Management team information" },
    { title: "Secretary", description: "Company secretary details" },
    { title: "Auditor", description: "Auditor information" },
    { title: "Beneficial Owners", description: "Ownership transparency" },
    { title: "Review & Submit", description: "Finalize your application" },
  ];

  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set<number>());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      company: {
        companyName: "",
        companyObjects: "",
        authorizedShares: 0,
        statedCapital: 0,
        companyAddress: {
          streetAddress: "",
          postalAddress: "",
        },
        companyEmail: "",
        companyPhone: "",
      },
      shareholders: [getDefaultShareholder()],
      directors: [getDefaultDirector()],
      beneficialOwners: [],
      hasZuputoSecretary: true,
      secretary: undefined,
      hasZuputoAuditor: true,
      auditor: undefined,
    },
  });

  const {
    fields: shareholderFields,
    append: appendShareholder,
    remove: removeShareholder,
    update: updateShareholder,
  } = useFieldArray({
    control,
    name: "shareholders",
  });

  const {
    fields: directorFields,
    append: appendDirector,
    remove: removeDirector,
  } = useFieldArray({
    control,
    name: "directors",
  });

  const {
    fields: boFields,
    append: appendBO,
    remove: removeBO,
  } = useFieldArray({
    control,
    name: "beneficialOwners",
  });

  const shareholders = watch("shareholders");

  // Auto-add directors and BOs based on shareholder flags
  useEffect(() => {
    const currentShareholders = getValues("shareholders");
    const currentDirectors = getValues("directors");
    const currentBOs = getValues("beneficialOwners");

    currentShareholders.forEach((sh, idx) => {
      // Sync with directors
      if (sh.isDirector) {
        const existingDirectorIdx = currentDirectors.findIndex(
          (d) => d.fullName === sh.fullName && d.dateOfBirth === sh.dateOfBirth
        );

        const directorData = {
          fullName: sh.fullName,
          address: sh.address,
          dateOfBirth: sh.dateOfBirth,
          placeOfBirth: sh.placeOfBirth,
          nationality: sh.nationality,
          occupation: sh.occupation,
          email: sh.email,
          taxInfo: sh.taxInfo,
          // Director-specific fields can be added here
          occupationAddress: "",
          mobile: "",
          declarationAttachment: "",
          consentLetter: "",
          otherDirectorships: "",
        };

        if (existingDirectorIdx === -1) {
          appendDirector(directorData);
        } else {
          // Only update the fields that come from shareholder
          setValue(`directors.${existingDirectorIdx}`, {
            ...currentDirectors[existingDirectorIdx],
            ...directorData,
          });
        }
      }

      // Sync with beneficial owners
      if (sh.isBeneficialOwner) {
        const existingBOIdx = currentBOs.findIndex(
          (bo) =>
            bo.fullName === sh.fullName && bo.dateOfBirth === sh.dateOfBirth
        );

        const boData = {
          fullName: sh.fullName,
          address: sh.address,
          dateOfBirth: sh.dateOfBirth,
          placeOfBirth: sh.placeOfBirth,
          nationality: sh.nationality,
          occupation: sh.occupation,
          email: sh.email,
          taxInfo: sh.taxInfo,
          // BO-specific fields
          placeOfWork: "",
          mobile: "",
        };

        if (existingBOIdx === -1) {
          appendBO(boData);
        } else {
          setValue(`beneficialOwners.${existingBOIdx}`, {
            ...currentBOs[existingBOIdx],
            ...boData,
          });
        }
      }
    });

    // Cleanup - remove directors/BOs if shareholder is no longer marked
    for (let idx = currentDirectors.length - 1; idx >= 0; idx--) {
      const dir = currentDirectors[idx];
      const isShareholder = currentShareholders.some(
        (sh) => sh.fullName === dir.fullName && sh.isDirector
      );
      if (!isShareholder) {
        removeDirector(idx);
      }
    }

    currentBOs.forEach((bo, idx) => {
      const isShareholder = currentShareholders.some(
        (sh) => sh.fullName === bo.fullName && sh.isBeneficialOwner
      );
      if (!isShareholder) {
        removeBO(idx);
      }
    });
  }, [
    shareholders,
    getValues,
    setValue,
    appendDirector,
    appendBO,
    removeDirector,
    removeBO,
  ]);

  // Memoize step fields for validation
  const stepFields = useMemo(
    (): {
      1: string[];
      2: string[];
      3: string[];
      4: string[];
      5: string[];
      6: string[];
      7: string[];
    } => ({
      1: [
        "company.companyName",
        "company.companyObjects",
        "company.authorizedShares",
        "company.statedCapital",
        "company.companyAddress.streetAddress",
        "company.companyAddress.postalAddress",
        "company.companyEmail",
        "company.companyPhone",
      ],
      2: shareholderFields.flatMap((_, idx) => [
        `shareholders.${idx}.fullName`,
        `shareholders.${idx}.type`,
        `shareholders.${idx}.address.streetAddress`,
        `shareholders.${idx}.address.postalAddress`,
        `shareholders.${idx}.dateOfBirth`,
        `shareholders.${idx}.placeOfBirth`,
        `shareholders.${idx}.nationality`,
        `shareholders.${idx}.occupation`,
        `shareholders.${idx}.email`,
        `shareholders.${idx}.taxInfo`,
        `shareholders.${idx}.ghanaCardNumber`,
        `shareholders.${idx}.shares.number`,
        `shareholders.${idx}.shares.class`,
        `shareholders.${idx}.shares.amountPaidCash`,
        `shareholders.${idx}.shares.amountPaidOther`,
        `shareholders.${idx}.shares.amountRemaining`,
      ]),
      3: directorFields.flatMap((_, idx) => [
        `directors.${idx}.fullName`,
        `directors.${idx}.address.streetAddress`,
        `directors.${idx}.address.postalAddress`,
        `directors.${idx}.dateOfBirth`,
        `directors.${idx}.placeOfBirth`,
        `directors.${idx}.nationality`,
        `directors.${idx}.occupation`,
        `directors.${idx}.occupationAddress`,
        `directors.${idx}.email`,
        `directors.${idx}.mobile`,
        `directors.${idx}.taxInfo`,
        `directors.${idx}.declarationAttachment`,
        `directors.${idx}.consentLetter`,
      ]),
      4: ["hasZuputoSecretary", "secretary"],
      5: ["hasZuputoAuditor", "auditor"],
      6: boFields.flatMap((_, idx) => [
        `beneficialOwners.${idx}.fullName`,
        `beneficialOwners.${idx}.address.streetAddress`,
        `beneficialOwners.${idx}.address.postalAddress`,
        `beneficialOwners.${idx}.dateOfBirth`,
        `beneficialOwners.${idx}.placeOfBirth`,
        `beneficialOwners.${idx}.nationality`,
        `beneficialOwners.${idx}.occupation`,
        `beneficialOwners.${idx}.placeOfWork`,
        `beneficialOwners.${idx}.email`,
        `beneficialOwners.${idx}.mobile`,
        `beneficialOwners.${idx}.taxInfo`,
      ]),
      7: [],
    }),
    [shareholderFields.length, directorFields.length, boFields.length]
  );

  const handleStepClick = async (stepNumber: number) => {
    if (stepNumber < step) {
      setStep(stepNumber);
      const isValid = await trigger(
        stepFields[step as keyof typeof stepFields] as any
      );
      setMobileMenuOpen(false);
      return;
    }

    const isValid = await trigger(
      stepFields[step as keyof typeof stepFields] as any
    );
    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(step));
      setStep(stepNumber);
      scrollToTop();
      setMobileMenuOpen(false);
    } else {
      setTimeout(() => {
        scrollToFirstError();
      }, 100);
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate = stepFields[step as keyof typeof stepFields] || [];
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      // Wait for state to flush
      await new Promise((resolve) => setTimeout(resolve, 0));
      await trigger();
      setCompletedSteps((prev) => new Set(prev).add(step));
      if (step < steps.length) {
        setStep(step + 1);
        scrollToTop();
      }
    } else {
      setTimeout(() => {
        scrollToFirstError();
      }, 100);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (formRef.current) {
      formRef.current.scrollTop = 0;
    }
  };

  const scrollToFirstError = () => {
    // First try to find the error message element to scroll to
    const errorElements = document.querySelectorAll("[data-error-for]");

    if (errorElements.length > 0) {
      // Find the first error element marked for scrolling
      const firstScrollableError =
        Array.from(errorElements).find((el) =>
          el.hasAttribute("data-scroll-ref")
        ) || errorElements[0];

      firstScrollableError.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Try to focus the associated input field
      const fieldName = firstScrollableError.getAttribute("data-error-for");
      if (fieldName) {
        const inputElement = document.querySelector(
          `[name="${fieldName}"]`
        ) as HTMLInputElement;
        if (inputElement) {
          // Small timeout to ensure scroll completes before focus
          setTimeout(() => inputElement.focus(), 300);
        }
      }

      return true;
    }

    return false;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Submit error", err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addShareholder = () => {
    appendShareholder(getDefaultShareholder());
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const addDirector = () => {
    appendDirector(getDefaultDirector());
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const addBO = () => {
    appendBO(getDefaultBeneficialOwner());
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  return (
    <div className="w-full h-full mt-20">
      <Head>
        <title>{`${strings.zuputo} - ${strings.companyIncorporation}`}</title>
        <meta
          property="og:title"
          content={strings.companyIncorporation}
          key="title"
        />
        <meta
          property="og:description"
          content={strings.companyIncorporation}
          key="description"
        />
      </Head>{" "}
      <div className="container flex flex-col justify-center items-center text-center gap-2">
        <h1 className="text-primary text-lg uppercase font-medium text-center tracking-wider">
          {strings.companyIncorporation}
        </h1>
        <h2 className="text-text text-4xl font-bold max-w-[22ch] leading-normal mb-2">
          {strings.limitedLiability}
        </h2>
        <h3 className="text-text-600 text-xl font-normal max-w-[50ch]">
          {strings.completeStepsBelow}
        </h3>
      </div>{" "}
      <div className="flex flex-col lg:flex-row min-h-screen w-full container mx-auto my-7">
        {/* Mobile Navigation */}
        {/* <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2"
          >
            <Bars3Icon className="h-5 w-5" />
            <span className="font-medium">
              Step {step} of {steps.length}: {steps[step - 1].title}
            </span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={step === 1}
              className={`p-2 rounded-full ${
                step === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Previous step"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              disabled={step === steps.length}
              className={`p-2 rounded-full ${
                step === steps.length
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Next step"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="bg-white border-t">
            <div className="container mx-auto px-4 py-3">
              <div className="space-y-2">
                {steps.map((s, idx) => {
                  const stepNumber = idx + 1;
                  const isCurrent = step === stepNumber;
                  const isCompleted = completedSteps.has(stepNumber);

                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => handleStepClick(stepNumber)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isCurrent
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            isCurrent
                              ? "bg-blue-600 text-white"
                              : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isCompleted ? <CheckIcon /> : stepNumber}
                        </div>
                        <div>
                          <div className="font-medium">{s.title}</div>
                          <div className="text-sm text-gray-500">
                            {s.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div> */}

        {/* Desktop Sidebar */}
        <StepIndicator
          currentStep={step}
          onStepClick={handleStepClick}
          completedSteps={completedSteps}
          steps={steps}
        />

        {/* Main Form Content */}
        <div ref={formRef} className="flex-1 pt-16 lg:pt-4 pb-24 lg:pb-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {steps[step - 1].title}
              </h1>
              <p className="text-gray-600 mt-1">
                {steps[step - 1].description}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <CompanyDetailsStep
                  register={register}
                  errors={errors}
                  onNext={handleNextStep}
                />
              )}
              {step === 2 && (
                <ShareholderDetailsStep
                  fields={shareholderFields}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  remove={removeShareholder}
                  onAdd={addShareholder}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  trigger={trigger}
                />
              )}
              {step === 3 && (
                <DirectorDetailsStep
                  fields={directorFields}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  remove={removeDirector}
                  onAdd={addDirector}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  shareholders={getValues().shareholders}
                />
              )}
              {step === 4 && (
                <SecretaryDetailsStep
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}
              {step === 5 && (
                <AuditorDetailsStep
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}
              {step === 6 && (
                <BeneficialOwnersStep
                  fields={boFields}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  remove={removeBO}
                  onAdd={addBO}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  shareholders={getValues().shareholders}
                />
              )}
              {step === 7 && (
                <ReviewStep
                  getValues={getValues}
                  onPrev={handlePrevStep}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
              )}
            </form>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg ">
          <div className="container mx-auto px-4 py-3 flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={step === 1}
              className={cn(
                "flex items-center gap-1 rounded-md px-4 py-2",
                step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <ChevronLeftIcon className="h-4 w-4" /> Back
            </button>

            {step < 7 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Next <ChevronRightIcon className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={cn(
                  "rounded-md px-4 py-2 text-white",
                  isSubmitting || !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                )}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div> */}
      </div>{" "}
      <div className="sticky w-full bottom-0 left-0 right-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] py-3 md:py-6 z-50 bg-white">
        <div className="w-full flex flex-row container justify-end md:justify-between">
          <div className="hidden md:flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="mb-1 text-sm font-normal text-text-500">
                {strings.progress}
              </div>

              <div className="mb-1 text-sm font-normal text-text-500">
                {(completedSteps.size / steps.length) * 100}%
              </div>
            </div>

            <div className="w-[300px] bg-gray-200 rounded-full h-1.5 mb-4">
              <div
                className={cn("bg-primary h-1.5 rounded-full")}
                style={{
                  width: `${(completedSteps.size / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center space-x-1">
            <Button
            //   buttonStyle="secondary"
              className="py-2 px-7 mb-0"
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              {strings.prev}
            </Button>
            <Button
              type="button"
              className="py-2 px-7 mb-0"
              onClick={handleNextStep}
              // loading={processing}
            >
              {strings.next}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CompanyIncorporation;
