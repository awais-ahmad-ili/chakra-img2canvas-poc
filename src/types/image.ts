export interface ImageSource {
  type: "url" | "file";
  value: string | File;
}

export type ActiveSource = "url" | "file" | null;
