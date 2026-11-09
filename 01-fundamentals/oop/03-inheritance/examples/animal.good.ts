export abstract class Animal {
    protected readonly name: string; 

    constructor(name: string) {
        this.name = name;
    }

    protected abstract speak() : string;

    describe() : string {
      return `${this.name} says ${this.speak()}`;
    }
}

export class Dog extends Animal{
    protected override speak(): string {
        return 'Woof';
    }
}

export class Cat extends Animal {
  protected override speak(): string {
    return 'Meow';
  }
}

export class Puppy extends Dog {
  protected override speak(): string {
    return `${super.speak()}! (squeaky)`;
  }
}

const animals: Animal[] = [new Dog('Rex'), new Cat('Tom'), new Puppy('Bolt')];
animals.forEach((a) => console.log(a.describe()));