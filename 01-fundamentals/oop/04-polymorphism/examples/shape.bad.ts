type ShapeKind = "circle" | "rectangle";

interface BadShape {
  kind: ShapeKind;
  radius?: number;
  width?: number;
  height?: number;
}

function area(shape : BadShape) : number{
    if(shape.kind === "circle"){
        return Math.PI * (shape.radius ?? 0) ** 2;
    } else if (shape.kind === "rectangle"){
        return (shape.width ?? 0) * (shape.height ?? 0)
    }
    throw new Error('Unknown shape');
}

console.log(area({ kind: 'circle', radius: 2 }));