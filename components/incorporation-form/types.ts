import { z } from "zod";

export const formSchema = z.object({
  company: z.object({
    companyName: z.string().min(1, "Company name is required"),
    companyObjects: z.string().min(1, "Company objects are required"),
    authorizedShares: z.number().min(1, "Must be at least 1"),
    statedCapital: z.number().min(0, "Cannot be negative"),
    companyAddress: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      region: z.string().min(1, "Region is required"),
      digitalAddress: z.string().optional(),
      postalAddress: z.string().optional(),
    }),
    companyEmail: z.string().email("Invalid email address"),
    companyPhone: z.string().min(1, "Phone number is required"),
  }),
  shareholders: z.array(
    z.object({
      fullName: z.string().min(1, "Full name is required"),
      type: z.enum(["individual", "corporate"]),
      address: z.object({
        street: z.string().min(1, "Street address is required"),
        city: z.string().min(1, "City is required"),
        region: z.string().min(1, "Region is required"),
        digitalAddress: z.string().optional(),
        postalAddress: z.string().optional(),
      }),
      dateOfBirth: z.string().min(1, "Date of birth is required"),
      placeOfBirth: z.string().min(1, "Place of birth is required"),
      nationality: z.string().min(1, "Nationality is required"),
      occupation: z.string().optional(),
      email: z.string().email("Invalid email address").optional(),
      taxInfo: z.object({
        hasTin: z.boolean(),
        tinNumber: z.string().optional(),
        name: z.string().optional(),
        maritalStatus: z.string().optional(),
        birthTown: z.string().optional(),
        mothersName: z.string().optional(),
      }),
      identityNumber: z.string().min(1, "ID number is required"),
      shares: z.object({
        number: z.number().min(1, "Must be at least 1"),
        class: z.string().min(1, "Share class is required"),
        amountPaidCash: z.number().min(0, "Cannot be negative"),
        amountPaidOther: z.number().min(0, "Cannot be negative"),
        amountRemaining: z.number().min(0, "Cannot be negative"),
      }),
      isDirector: z.boolean(),
      isBeneficialOwner: z.boolean(),
    })
  ),
});

export type IncorporationFormValues = z.infer<typeof formSchema>;