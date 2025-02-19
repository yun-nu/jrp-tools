import { z } from "zod";

export const characterSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" }),
  characterName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" }),
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
  user_id: z.string().optional(),
});

export type Character = z.infer<typeof characterSchema>;

// interface Character {
//   id: number;
//   displayName: string;
//   user_id: string;
//   name: string;
//   game: string;
//   acLink: string;
//   isPublic: boolean;
//   journalName: string;
//   journalLink: string;
// }
