import { Language } from "@/app/models/Language";

export class Piece {
  text: string;
  TTS: string;
  confirmations: Map<Language, string>; // If this Piece is input, confirmations is a empty map.

  constructor(
    text: string = "",
    TTS: string = "",
    confirmations: Map<Language, string> = new Map()
  ) {
    this.text = text;
    this.TTS = TTS;
    this.confirmations = confirmations;
  }
}

export class Translation {
  input: Piece;
  translations: Map<Language, Piece>;

  constructor(
    input: Piece = new Piece(),
    translations: Map<Language, Piece> = new Map()
  ) {
    this.input = input;
    this.translations = translations;
  }
}
