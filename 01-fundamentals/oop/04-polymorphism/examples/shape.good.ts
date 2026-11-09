export abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `${this.constructor.name} with area ${this.area().toFixed(2)}`;
  }
}

export class Circle extends Shape {
  private readonly radius: number;
  constructor(redius: number) {
    super();
    this.radius = redius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

export class Rectangle extends Shape {
  private readonly width: number;
  private readonly height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

// New shape: no existing code changes
export class Triangle extends Shape {
    private readonly base: number;
    private readonly height: number;
  constructor(
    base : number , height : number
  ) {
    super();
    this.base = base;
    this.height = height;
  }

  area(): number {
    return (this.base * this.height) / 2;
  }
}

// Caller depends on Shape only
function totalArea(shapes: readonly Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}

const shapes: Shape[] = [
  new Circle(2),
  new Rectangle(3, 4),
  new Triangle(5, 2),
];
shapes.forEach((s) => console.log(s.describe()));
console.log(totalArea(shapes).toFixed(2));
