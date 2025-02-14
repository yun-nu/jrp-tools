"use server";
import { revalidatePath } from "next/cache";
import { AuthActionHelper } from "../_lib/actions";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase-server";

export async function addCharacterAction(formData: FormData) {
  const { user, supabase } = await AuthActionHelper();

  const newCharacter: Partial<Character> = {
    user_id: user,
    displayName: formData.get("displayName") as string,
    name: formData.get("characterName") as string,
    game: formData.get("game") as string,
    acLink: formData.get("acLink") as string,
    isPublic: false,
    journalName: formData.get("journalName") as string,
    journalLink: formData.get("journalLink") as string,
  };

  const { error } = await supabase
    .from("characters")
    .insert([newCharacter])
    .select();

  if (error?.code === "23505") {
    return { errorMessage: "This display name is already taken." };
  }

  if (error) throw new Error("Could not add new character.");

  redirect(`/dashboard/${newCharacter.displayName}`);
}

export async function deleteCharacterAction(character: Character) {
  const { user, supabase } = await AuthActionHelper();

  if (user === character.user_id) {
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", character.id);

    if (error) {
      console.log(error);
      throw new Error("Could not delete character.");
    }
  }

  revalidatePath(`/dashboard/${character.name}`);
  redirect(`/dashboard/`);
}

export async function verifyDisplayNameAvailability(
  _previousState: unknown,
  displayName: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("characters")
    .select("displayName")
    .eq("displayName", displayName);

  if (error) throw new Error("Could not perform this action.");

  if (!data?.length)
    return { taken: false, message: "This display name is available." };
  else return { taken: true, message: "This display name is already taken." };
}
