interface DiscountStrategy {
    calculate(amount : number) : number;
}

class RegularDiscount implements DiscountStrategy {
  public calculate(amount: number): number {
    return amount * 0.05; 
  }
}

class PremiumDiscount implements DiscountStrategy {
  public calculate(amount: number): number {
    return amount * 0.1;
  }
}

class VipDiscount implements DiscountStrategy {
  public calculate(amount: number): number {
    return amount * 0.2;
  }
}


class StudentDiscount implements DiscountStrategy {
  public calculate(amount: number): number {
    return amount * 0.15;
  }
}

class GoodDiscountCalculator {
  public calculate(amount: number, strategy: DiscountStrategy): number {
    return strategy.calculate(amount);
  }
}


const goodCalculator = new GoodDiscountCalculator();

console.log("regular discount:", goodCalculator.calculate(1000, new RegularDiscount()));
console.log("vip discount:", goodCalculator.calculate(1000, new VipDiscount()));
console.log("student discount:", goodCalculator.calculate(1000, new StudentDiscount()));

// Here if want to adding another discount strategy, no need to change main exexting logic
// And its maintain open/close principles close for modification and open for extention.