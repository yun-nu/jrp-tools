import { getCharacters } from "../_lib/data-service";

export default async function Character() {
  // const characters = [
  //   {
  //     name: "Char name",
  //     game: "Awesome game",
  //     threads: [
  //       {
  //         date: "10/07/2024",
  //         url: "url",
  //         type: "Inbox",
  //         blurb: "Some blurb",
  //       },
  //     ],
  //     acLink: "link to ac thread if applicable",
  //   },
  // ];

  const characters = await getCharacters();
  if (!characters.length) return null;

  console.log(characters);

  return (
    <div>
      <h1 className="text-3xl font-semibold">{characters[0].name}</h1>
    </div>
  );
}
