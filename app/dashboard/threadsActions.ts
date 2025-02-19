import { AuthActionHelper } from "../_lib/actions";
import { Thread, threadSchema } from "../_schemas/Thread";

export async function addThreadAction(threadData: Thread) {
  const { user, supabase } = await AuthActionHelper();

  const newThread: Partial<Thread> = {
    date: threadData.date,
    url: threadData.url,
    blurb: threadData.blurb,
    type: threadData.type,
    isFinished: threadData.isFinished,
  };

  const parsed = threadSchema.safeParse(threadData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  console.log(parsed);
  console.log(newThread);

  //   const { error } = await supabase
  //     .from("characters")
  //     .insert([newCharacter])
  //     .select();

  //   if (error?.code === "23505") {
  //     return { error: "This display name is already taken." };
  //   }

  //   if (error) return { error: "Could not add new character" };

  //   return {
  //     success: "Character created successfully",
  //     displayName: newCharacter.displayName,
  //   };
}
