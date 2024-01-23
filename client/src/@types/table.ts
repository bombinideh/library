export interface TableTitle {
  singular: string;
  plural: string;
  gender: "A" | "O";
}

export interface Column<T extends object> {
  title: string;
  key: keyof T;
  order?: boolean;
  filter?: boolean;
  notManipulable?: boolean;
}