import { z } from "zod";

export const threadSchema = z.object({
  id: z.number().int().positive().optional(),
  characterId: z.number().int().positive().optional(),
  date: z.date({
    required_error: "You must pick a date from the calendar",
  }),
  url: z
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
  type: z
    .string()
    .max(50, { message: "Must be less than 50 characters long" })
    .optional(),
  blurb: z
    .string()
    .max(500, { message: "Must be less than 500 characters long" })
    .optional(),
  isFinished: z.boolean(),
});

export type Thread = z.infer<typeof threadSchema>;
