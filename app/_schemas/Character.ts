import { z } from "zod";

export const characterSchema = z.object({
  id: z.number().int().positive().optional(),
  userId: z.string().optional(),
  displayName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed."
    ),
  characterName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .trim(),
  icon: z
    .union([
      z.string().url({ message: "Must be a valid image URL" }).nullish(),
      z.literal(""),
    ])
    .transform((val) => val?.replace(/\s+/g, "")),
  blurb: z
    .string()
    .max(500, { message: "Must be less than 500 characters long" })
    .optional(),
  gameName: z
    .string()
    .max(100, { message: "Must be less than 100 characters long" })
    .optional(),
  journalName: z
    .string()
    .max(100, { message: "Must be less than 100 characters long" }),
  journalLink: z
    .union([
      z
        .string()
        .url({
          message: "Must be a valid URL starting with http:// or https://",
        })
        .nullish(),
      z.literal(""),
    ])
    .transform((val) => val?.replace(/\s+/g, "")),
  acLink: z
    .union([
      z
        .string()
        .url({
          message: "Must be a valid URL starting with http:// or https://",
        })
        .nullish(),
      z.literal(""),
    ])
    .transform((val) => val?.replace(/\s+/g, "")),
  isPublic: z.boolean(),
});

export type Character = z.infer<typeof characterSchema>;
