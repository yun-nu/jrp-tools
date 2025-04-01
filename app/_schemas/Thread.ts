import { z } from "zod";

const baseThreadSchema = z.object({
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
    .max(30, { message: "Must be less than 30 characters long" })
    .optional(),
  blurb: z
    .string()
    .max(500, { message: "Must be less than 500 characters long" })
    .optional(),
  isFinished: z.boolean(),
});

export const newThreadSchema = baseThreadSchema.extend({
  characterId: z.number().int().positive(),
});

export const existingThreadSchema = newThreadSchema.extend({
  id: z.number().int().positive(),
});

export type NewThread = z.infer<typeof newThreadSchema>;
export type ExistingThread = z.infer<typeof existingThreadSchema>;
export type Thread = NewThread | ExistingThread;

export function isExistingThread(
  thread: Thread | undefined
): thread is ExistingThread {
  return (
    thread !== undefined && "id" in thread && typeof thread.id === "number"
  );
}
