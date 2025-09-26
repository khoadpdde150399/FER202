function example(){
    const PI = 3.14159; //constant
    
    if(true){
        const MAX_VALUE = 100; //constant
        console.log(PI);// output: 3.14159
        console.log(MAX_VALUE); // output: 100
    }
    console.log(PI); // output: 3.14159
    console.log(MAX_VALUE); // Error: MAX_VALUE is not defined
}

example();