let greet = (name, timeOfDay) => {
    console.log(`Good ${timeOfDay}, ${name}!`);
};

greet('Bob', 'night') // expect output Good night, Bob!
greet('Alex', 'morning') // expect output Good morning, Alex!
greet('John', 'afternoon') // expect output Good afternoon, John!