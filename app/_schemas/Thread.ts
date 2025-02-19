import { z } from "zod";

export const threadSchema = z.object({
  id: z.number().int().positive().optional(),
  characterId: z.string().optional(),
  date: z.date(),
  url: z.union([
    z
      .string()
      .url({ message: "Must start with http:// or https://" })
      .nullish(),
    z.literal(""),
  ]),
  type: z.string().optional(),
  blurb: z.string().optional(),
  isFinished: z.boolean(),
});

export type Thread = z.infer<typeof threadSchema>;
