export type Task = {
  id: number;
  name: string;
}

export function getTasks(): Task[] {
  return [
    { id: 1, name: "Visit a market" },
    { id: 2, name: "Wash the dishes" },
    { id: 3, name: "Choose a gift" },
  ]
}
