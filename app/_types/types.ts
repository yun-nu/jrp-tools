interface Character {
  id: number;
  displayName: string;
  user_id: string;
  name: string;
  game: string;
  acLink: string;
  isPublic: boolean;
  journalName: string;
  journalLink: string;
}

interface Threads {
  id: number;
  characterId: string;
  date: string;
  url: string;
  type: string;
  blurb: string;
  arePublic: boolean;
  isFinished: boolean;
}
