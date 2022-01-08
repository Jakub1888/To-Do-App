enum TaskType {
  None,
  Home,
  Work,
  Shopping,
}

export interface TodoItem {
  id: number;
  name: string;
  description: string;
  done: boolean;
  creationDate: Date;
  completionDate: Date;
  taskType: TaskType;
}
