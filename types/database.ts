export interface Word {
  id: number;
  script_type: 'hiragana' | 'katakana';
  japanese: string;
  romaji: string;
  meaning: string;
  category: string | null;
  image_url: string | null;
  image_photographer: string | null;
  image_photographer_url: string | null;
  created_at: string;
}

export interface PracticeSession {
  id: number;
  script_type: 'hiragana' | 'katakana';
  word_ids: number[];
  revealed_ids: number[];
  started_at: string;
  completed_at: string | null;
}
