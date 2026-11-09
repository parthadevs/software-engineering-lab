// BAD: Penguin breaks the contract promised by Bird (Liskov Substitution Principle)
class BadBird {
  fly(): string { return 'flying'; }
}

class BadPenguin extends BadBird {
  override fly(): string {
    throw new Error('Penguins cannot fly'); // now crash
  }
}

function makeFly(bird: BadBird): string {
  return bird.fly();
}

// GOOD: model capabilities separately
interface Flyable {
  fly(): string;
}

interface Swimmable {
  swim(): string;
}

abstract class Bird {
  protected readonly name: string
  constructor(name : string) {
    this.name = name;
  }
}

class Sparrow extends Bird implements Flyable {
  fly(): string { return `${this.name} is flying`; }
}

class Penguin extends Bird implements Swimmable {
  swim(): string { return `${this.name} is swimming`; }
}

function launch(f: Flyable): string {
  return f.fly(); 
}

console.log(launch(new Sparrow('Sparky')));

console.log(makeFly(new BadBird()));