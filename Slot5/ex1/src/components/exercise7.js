function sum(...numbers){
    let total = 0;
    for(let number of numbers){
        total += number;
    }
    return total;
}

console.log(sum(1,2,3)); // expect output 6
console.log(sum(5,10,15,20)); // expect output 50
console.log(sum(7,14,21,28,35)); // expect output 105