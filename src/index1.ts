// console.log("Hello, World!");
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@gmail.com", role: "user" },
  { id: 2, name: "Bob", email: "bob@gmail.com", role: "admin" },
];

console.log(
  `User: ${users[1].name}, Email: ${users[1].email}, Role: ${users[1].role}`,
);

// Generic Function: T ໝາຍເຖິງ Type ຫຍັງກໍໄດ້
function paginate<A>(items: A[], page: number, limit: number): A[] {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const page = paginate<number>(numbers, 2, 4);

console.log({ page });
