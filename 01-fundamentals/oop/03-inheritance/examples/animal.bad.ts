class Dog {
    constructor(private readonly name : string){}
    speak() : string { return "Woof"}
    describe(): string { return `${this.name} says ${this.speak()}`; }
}

class Cat {
    constructor(private readonly name : string){}
    speak() : string { return "Meow"}
    describe(): string { return `${this.name} says ${this.speak()}`; }
}

// here main problem is duplicated logic.
// If change describe once and you must change it everywhere. 