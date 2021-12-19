export interface TodoItem {
  id: number;
  name: string;
  description: string;
  done: boolean;
  creationDate: Date;
  completionDate: Date;
}
