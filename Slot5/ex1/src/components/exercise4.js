let person = {
    name: "Kate",
    age: 30,
    greet: function(){
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
}