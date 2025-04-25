import { z } from "zod";
import {
  FORM_BLURB_MAX_LENGTH,
  FORM_NAMES_MAX_LENGTH,
  FORM_URL_INVALID,
  generateMaxMessage,
} from "../_utils/consts";

const baseThreadSchema = z.object({
  date: z.date({
    required_error: "You must pick a date from the calendar",
  }),
  url: z
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
  type: z
    .string()
    .max(30, { message: generateMaxMessage(30) })
    .optional(),
  blurb: z
    .string()
    .max(FORM_BLURB_MAX_LENGTH, {
      message: generateMaxMessage(FORM_BLURB_MAX_LENGTH),
    })
    .optional(),
  commentCount: z.coerce
    .number({ invalid_type_error: "Must be a valid number" })
    .int()
    .min(0)
    .max(9999)
    .nonnegative()
    .default(0),
  isFinished: z.boolean(),
  threadPartner: z
    .string()
    .max(100, {
      message: generateMaxMessage(100),
    })
    .optional(),
  usedForAc: z.boolean().default(false),
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
