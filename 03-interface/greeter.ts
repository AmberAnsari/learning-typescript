interface Person {
  firstName: string;
  lastName: string;
}

export function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

var user = { firstName: "Jane", lastName: "User" };

console.log(greeter(user));