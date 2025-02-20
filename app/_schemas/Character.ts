import { z } from "zod";

export const characterSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" }),
  characterName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" }),
  characterBlurb: z
    .string()
    .max(500, { message: "Must be less than 500 characters long" })
    .optional(),
  gameName: z.string().optional(),
  journalName: z.string(),
  journalLink: z.union([
    z
      .string()
      .url({ message: "Must start with http:// or https://" })
      .nullish(),
    z.literal(""),
  ]),
  acLink: z.union([
    z
      .string()
      .url({ message: "Must start with http:// or https://" })
      .nullish(),
    z.literal(""),
  ]),
  isPublic: z.boolean(),
  id: z.number().int().positive().optional(),
  userId: z.string().optional(),
});

export type Character = z.infer<typeof characterSchema>;
