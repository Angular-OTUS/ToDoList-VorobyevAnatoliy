export interface Task {
  id: number;
  text: string;
}

export function getTasks(): Task[] {
  return [
    { id: 1, text: "Visit a market" },
    { id: 2, text: "Wash the dishes" },
    { id: 3, text: "Choose a gift" },
  ]
}
