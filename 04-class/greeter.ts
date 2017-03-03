interface Person {
  firstName: string;
  lastName: string;
}

class Student implements Person {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

export function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

const user = new Student('Jane', 'M.', 'User');

console.log(greeter(user));