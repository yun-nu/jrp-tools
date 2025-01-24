import Input from "./Input";
import SubmitButton from "./SubmitButton";

export default function CreateNewCharacter() {
  const linkPattern =
    "[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?";

  return (
    <div>
      <form className="py-8 px-12 text-base flex gap-6 flex-col">
        <Input
          id="displayName"
          label="Display Name"
          type="text"
          description="Each display name is unique. This is the username for your character page."
          required
        />

        <Input id="characterName" label="Character Name" type="text" required />

        <Input id="journalName" label="Journal Name" type="text" />

        <Input
          id="journalLink"
          label="Journal Link"
          type="text"
          pattern={linkPattern}
          description="Must start with http:// or https://"
          placeholder="https://journal-name.platform.com/"
        />

        <Input id="game" label="Game Name" type="text" />

        <Input
          id="acLink"
          label="AC Link"
          type="text"
          pattern={linkPattern}
          description="Must start with http:// or https://"
          placeholder="https://game.platform.com/thread"
        />

        <Input
          id="isPublic"
          label="Make character profile public?"
          type="checkbox"
          description="Character profiles are private
            by default. If you'd like to share your character page, check this option."
        />

        <div className="mt-4">
          <SubmitButton>Add Character</SubmitButton>
        </div>
      </form>
    </div>
  );
}
