export interface ITodo {
  id: string,
  title: string;
  description: string;
  priority: string;
  status: string;
}

export interface ITodos {
  todos: ITodo[] | null | undefined;
  loading: boolean;
  error?: string;
}
