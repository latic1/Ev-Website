import { z } from "zod";



const addressSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  postalAddress: z.string().min(1, "Postal address is required"),
});

const tinSchema = z.object({
  hasTin: z.boolean(),
  tinNumber: z.string().optional(),
  name: z.string().optional(),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]).optional(),
  birthTown: z.string().optional(),
  mothersName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasTin && !data.tinNumber) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "TIN number is required when hasTin is true", path: ["tinNumber"] });
  }
  if (!data.hasTin) {
    if (!data.name) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is required when hasTin is false", path: ["name"] });
    if (!data.maritalStatus) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Marital status is required when hasTin is false", path: ["maritalStatus"] });
    if (!data.birthTown) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Birth town is required when hasTin is false", path: ["birthTown"] });
    if (!data.mothersName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mother's name is required when hasTin is false", path: ["mothersName"] });
  }
});

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");
const phoneSchemaGhana = z.string().regex(/^0\d{9}$/, "Phone number must be exactly 10 digits and start with 0");
const ghanaCardSchema = z.string().regex(/^GHA-\d{9}-\d$/, "Ghana Card number must follow format GHA-123456789-1");

const auditorSchema = z.object({
  name: z.string().min(1, "Auditor name is required"),
  address: addressSchema,
  tinNumber: z.string().min(1, "TIN number is required"),
  ghanaCardNumber: ghanaCardSchema,
  mobile: phoneSchemaGhana,
  consentLetter: z.string().min(1, "Consent letter is required"),
});

const secretarySchema = z.object({
  isCorporate: z.boolean(),
  fullName: z.string().min(1, "Full name is required").optional(),
  corporateName: z.string().min(1, "Corporate name is required").optional(),
  dateOfBirth: dateSchema.optional(),
  placeOfBirth: z.string().min(1, "Place of birth is required").optional(),
  nationality: z.string().min(1, "Nationality is required").optional(),
  occupation: z.string().min(1, "Occupation is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  mobile: phoneSchemaGhana.optional(),
  address: addressSchema.optional(),
  taxInfo: tinSchema.optional(),
  ghanaCardNumber: ghanaCardSchema.optional(),
  qualification: z.enum([
    "professional_qualification",
    "tertiary_level_qualification",
    "company_secretary_trainee",
    "barrister_or_solicitor",
    "institute_of_chartered_accountants",
    "under_supervision",
    "institute_of_chartered_secretaries_and_administrators",
  ], { message: "Valid qualification is required" }).optional(),
  representative: z.object({
    taxInfo: tinSchema,
  }).optional(),
}).superRefine((data, ctx) => {
  if (data.isCorporate) {
    if (!data.corporateName) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Corporate name is required for corporate secretary", path: ["corporateName"] });
    }
    if (!data.representative) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Representative details are required for corporate secretary", path: ["representative"] });
    }
  } else {
    if (!data.fullName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Full name is required for individual secretary", path: ["fullName"] });
    if (!data.dateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Date of birth is required for individual secretary", path: ["dateOfBirth"] });
    if (!data.placeOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Place of birth is required for individual secretary", path: ["placeOfBirth"] });
    if (!data.nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nationality is required for individual secretary", path: ["nationality"] });
    if (!data.occupation) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Occupation is required for individual secretary", path: ["occupation"] });
    if (!data.email) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email is required for individual secretary", path: ["email"] });
    if (!data.mobile) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mobile number is required for individual secretary", path: ["mobile"] });
    if (!data.address) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Address is required for individual secretary", path: ["address"] });
    if (!data.taxInfo) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Tax information is required for individual secretary", path: ["taxInfo"] });
    if (!data.ghanaCardNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ghana Card number is required for individual secretary", path: ["ghanaCardNumber"] });
    if (!data.qualification) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Qualification is required for individual secretary", path: ["qualification"] });
  }
});

const shareholderSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  type: z.enum(["individual", "corporate"]),
  address: addressSchema,
  dateOfBirth: dateSchema,
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  occupation: z.string().min(1, "Occupation is required"),
  email: z.string().email("Invalid email address"),
  taxInfo: tinSchema,
  ghanaCardNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  phone: z.string(),
  shares: z.object({
    number: z.number().min(1, "At least one share is required"),
    class: z.string().min(1, "Share class is required"),
    amountPaidCash: z.number().min(0, "Amount paid in cash cannot be negative"),
    amountPaidOther: z.number().min(0, "Amount paid in other forms cannot be negative"),
    amountRemaining: z.number().min(0, "Remaining amount cannot be negative"),
  }),
  isDirector: z.boolean().optional(),
  isBeneficialOwner: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.nationality.toLowerCase() === "ghanaian") {
    if (!data.ghanaCardNumber) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ghana Card number is required for Ghanaians", path: ["ghanaCardNumber"] });
    } else {
      const ghanaCardRegex = /^GHA-\d{9}-\d$/;
      if (!ghanaCardRegex.test(data.ghanaCardNumber)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ghana Card number must follow format GHA-123456789-1", path: ["ghanaCardNumber"] });
      }
    }
    if (!/^0\d{9}$/.test(data.phone)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number must be exactly 10 digits and start with 0", path: ["phone"] });
    }
  } else {
    if (!data.passportNumber) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passport number is required for non-Ghanaians", path: ["passportNumber"] });
    }
    if (!/^[+0-9]{7,}$/.test(data.phone)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid international phone number", path: ["phone"] });
    }
  }
});

const directorSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: addressSchema,
  dateOfBirth: dateSchema,
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  occupation: z.string().min(1, "Occupation is required"),
  occupationAddress: z.string().min(1, "Occupation address is required"),
  email: z.string().email("Invalid email address"),
  mobile: phoneSchemaGhana,
  taxInfo: tinSchema,
  otherDirectorships: z.string().optional(),
});

const beneficialOwnerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: addressSchema,
  dateOfBirth: dateSchema,
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  occupation: z.string().min(1, "Occupation is required"),
  placeOfWork: z.string().min(1, "Place of work is required"),
  email: z.string().email("Invalid email address"),
  mobile: phoneSchemaGhana,
  taxInfo: tinSchema,
});

const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyObjects: z.string().min(1, "Company objects are required"),
  authorizedShares: z.number().min(1, "At least one authorized share is required"),
  statedCapital: z.number().min(1, "Stated capital must be greater than zero"),
  companyAddress: addressSchema,
  companyEmail: z.string().email("Invalid company email address"),
  companyPhone: phoneSchemaGhana,
});

export const formSchema = z.object({
  company: companySchema,
  shareholders: z.array(shareholderSchema).min(1, "At least one shareholder is required"),
  directors: z.array(directorSchema).min(1, "At least one director is required"),
  beneficialOwners: z.array(beneficialOwnerSchema).min(0, "Beneficial owners are optional"),
  hasZuputoSecretary: z.boolean(),
  secretary: secretarySchema.optional(),
  hasZuputoAuditor: z.boolean(),
  auditor: auditorSchema.optional(),
}).superRefine((data, ctx) => {
  // Validate secretary requirement
  if (!data.hasZuputoSecretary && !data.secretary) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["secretary"],
      message: "Secretary details are required when ZUPUTO is not acting as secretary",
    });
  }

  // Validate auditor requirement
  if (!data.hasZuputoAuditor && !data.auditor) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["auditor"],
      message: "Auditor details are required when ZUPUTO is not acting as auditor",
    });
  }

  // Ensure at least two directors (including shareholders marked as directors)
  const selectedDirectors = data.shareholders.filter(s => s.isDirector);
  const totalDirectors = selectedDirectors.length + data.directors.length;
  if (totalDirectors < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["directors"],
      message: "At least two directors are required (including shareholders marked as directors)",
    });
  }

  // Collect Ghana Card numbers and TIN numbers for duplicate check
  const allGhanaCardNumbers = [
    ...data.shareholders.map(s => s.ghanaCardNumber),
  ];
  const allTinNumbers = [
    ...data.shareholders.map(s => s.taxInfo.hasTin ? s.taxInfo.tinNumber : undefined),
    ...data.directors.map(d => d.taxInfo.hasTin ? d.taxInfo.tinNumber : undefined),
    ...data.beneficialOwners.map(bo => bo.taxInfo.hasTin ? bo.taxInfo.tinNumber : undefined),
  ].filter((tin): tin is string => !!tin);

  if (data.secretary && !data.hasZuputoSecretary) {
    if (!data.secretary.isCorporate) {
      allGhanaCardNumbers.push(data.secretary.ghanaCardNumber!);
      if (data.secretary.taxInfo?.hasTin) {
        allTinNumbers.push(data.secretary.taxInfo.tinNumber!);
      }
    } else if (data.secretary.representative?.taxInfo.hasTin) {
      allTinNumbers.push(data.secretary.representative.taxInfo.tinNumber!);
    }
  }

  if (data.auditor && !data.hasZuputoAuditor) {
    allGhanaCardNumbers.push(data.auditor.ghanaCardNumber);
    allTinNumbers.push(data.auditor.tinNumber);
  }

  // Check for duplicate Ghana Card numbers
  const duplicateGhanaCardNumbers = allGhanaCardNumbers.filter((id, index) => id && allGhanaCardNumbers.indexOf(id) !== index);
  if (duplicateGhanaCardNumbers.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["auditor", "ghanaCardNumber"],
      message: `Duplicate Ghana Card numbers found: ${duplicateGhanaCardNumbers.join(", ")}`,
    });
  }

  // Check for duplicate TIN numbers
  const duplicateTinNumbers = allTinNumbers.filter((tin, index) => tin && allTinNumbers.indexOf(tin) !== index);
  if (duplicateTinNumbers.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["auditor", "tinNumber"],
      message: `Duplicate TIN numbers found: ${duplicateTinNumbers.join(", ")}`,
    });
  }

  // Ensure consistency between shareholders' isBeneficialOwner and beneficialOwners
  const boShareholders = data.shareholders.filter(s => s.isBeneficialOwner);
  const boTinNumbers = data.beneficialOwners
    .filter(bo => bo.taxInfo.hasTin)
    .map(bo => bo.taxInfo.tinNumber!);

  // Check if every shareholder marked as BO has a corresponding BO entry
  boShareholders.forEach((shareholder, index) => {
    if (shareholder.taxInfo.hasTin && !boTinNumbers.includes(shareholder.taxInfo.tinNumber!)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["shareholders", index, "isBeneficialOwner"],
        message: `Shareholder marked as beneficial owner must have a corresponding entry in beneficialOwners with matching TIN number`,
      });
    }
  });

  // Check if every BO has a corresponding shareholder marked as BO
  data.beneficialOwners.forEach((bo, index) => {
    if (bo.taxInfo.hasTin && !data.shareholders.some(s => s.isBeneficialOwner && s.taxInfo.hasTin && s.taxInfo.tinNumber === bo.taxInfo.tinNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["beneficialOwners", index, "taxInfo", "tinNumber"],
        message: `Beneficial owner must correspond to a shareholder marked as beneficial owner with matching TIN number`,
      });
    }
  });
});