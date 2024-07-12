import { Language } from "@/types";

export interface Piece {
  text: string;
  TTS: string;
}

export class Translation {
  input: Piece;
  translations: Map<Language, Piece>;

  constructor(
    input: Piece = { text: "", TTS: "" },
    translations: Map<Language, Piece> = new Map()
  ) {
    this.input = input;
    this.translations = translations;
  }
}
