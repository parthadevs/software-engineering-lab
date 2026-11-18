type CustomerType = "regular" | "premium" | "vip";

class DiscountCalculator {
  public calculate(amount: number, customerType: CustomerType) {
    if (customerType === "regular") {
      return amount * 0.05; 
    } else if (customerType === "premium") {
      return amount * 0.1;
    } else if (customerType === "vip") {
      return amount * 0.2; 
    }

    return 0


    // here main problem is adding new customer type need to modify calculate method.
    // its brack open/close principles.
    // becouse open/close principles said a class or method should open for extension
    // but close for modification.
  }
}

const calculator = new DiscountCalculator();
console.log("Regular discount:", calculator.calculate(1000, "regular"));
console.log("VIP discount:", calculator.calculate(1000, "vip"));