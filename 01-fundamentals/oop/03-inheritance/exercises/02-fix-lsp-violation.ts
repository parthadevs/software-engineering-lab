// Bad practice
class BadRectangle {
  protected w: number;
  protected h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  setWidth(w: number): void { this.w = w; }
  setHeight(h: number): void { this.h = h; }
  area(): number { return this.w * this.h; }
}

class BadSquare extends BadRectangle {
  override setWidth(w: number): void { this.w = w; this.h = w; }  
  override setHeight(h: number): void { this.w = h; this.h = h; }
}

function resize(r: BadRectangle): number {
  r.setWidth(5);
  r.setHeight(4);
  return r.area(); // expected 20, BadSquare returns 16
}

// Good practice becouse share a contract, not mutable state
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number { return this.width * this.height; }
}

class Square implements Shape {
  private readonly side: number;

  constructor(side: number) {
    this.side = side;
  }

  area(): number { return this.side ** 2; }
}

const shapes: Shape[] = [new Rectangle(5, 4), new Square(4)];
console.log(shapes.map((s) => s.area())); // [20, 16]
console.log(resize(new BadSquare(1, 1))); // 16, not 20