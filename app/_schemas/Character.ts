import { z } from "zod";
import {
  FORM_BLURB_MAX_LENGTH,
  FORM_NAMES_MAX_LENGTH,
  FORM_URL_INVALID,
  generateMaxMessage,
} from "../_utils/consts";

const baseCharacterSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(30, { message: generateMaxMessage(30) })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed."
    )
    .default(""),
  characterName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(FORM_NAMES_MAX_LENGTH, {
      message: generateMaxMessage(FORM_NAMES_MAX_LENGTH),
    })
    .trim()
    .default(""),
  icon: z
    .union([
      z.string().url({ message: "Must be a valid image URL" }).nullish(),
      z.literal(""),
    ])
    .transform((val) => val?.replace(/\s+/g, "")),
  blurb: z
    .string()
    .max(FORM_BLURB_MAX_LENGTH, {
      message: generateMaxMessage(FORM_BLURB_MAX_LENGTH),
    })
    .optional()
    .default(""),
  gameName: z
    .string()
    .max(FORM_NAMES_MAX_LENGTH, {
      message: generateMaxMessage(FORM_NAMES_MAX_LENGTH),
    })
    .optional()
    .default(""),
  journalName: z
    .string()
    .max(FORM_NAMES_MAX_LENGTH, {
      message: generateMaxMessage(FORM_NAMES_MAX_LENGTH),
    })
    .default(""),
  journalLink: z
    .union([
      z
        .string()
        .url({
          message: FORM_URL_INVALID,
        })
        .nullish(),
      z.literal(""),
    ])
    .transform((val) => val?.replace(/\s+/g, ""))
    .default(""),
  acLink: z
    .union([
      z
        .string()
        .url({
          message: FORM_URL_INVALID,
        })
        .nullish(),
      z.literal(""),
    ])
    .transform((val) => val?.replace(/\s+/g, "")),
  isPublic: z.boolean().default(false),
  isActive: z.boolean().default(true),
  acLength: z
    .union([
      z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : Number(val))),
      z.number(),
    ])
    .refine(
      (val) =>
        val === null || (Number.isInteger(val) && val >= 1 && val <= 300),
      { message: "Must be a number between 1 and 300" }
    )
    .nullable()
    .default(null),
  minThreadsAc: z
    .union([
      z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : Number(val))),
      z.number(),
    ])
    .refine(
      (val) => val === null || (Number.isInteger(val) && val >= 1 && val <= 10),
      { message: "Must be a number between 1 and 10" }
    )
    .nullable()
    .default(null),
  maxThreadsAc: z
    .union([
      z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : Number(val))),
      z.number(),
    ])
    .refine(
      (val) => val === null || (Number.isInteger(val) && val >= 1 && val <= 10),
      { message: "Must be a number between 1 and 10" }
    )
    .nullable()
    .default(null),
});

export const newCharacterSchema = baseCharacterSchema.extend({
  userId: z.string(),
});
export const existingCharacterSchema = newCharacterSchema.extend({
  id: z.number().int().positive(),
});

export type NewCharacter = z.infer<typeof newCharacterSchema>;
export type ExistingCharacter = z.infer<typeof existingCharacterSchema>;
export type Character = NewCharacter | ExistingCharacter;

export function isExistingCharacter(
  character: Character | undefined
): character is ExistingCharacter {
  return (
    character !== undefined &&
    "id" in character &&
    typeof character.id === "number"
  );
}
