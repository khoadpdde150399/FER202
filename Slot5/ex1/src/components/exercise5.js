function example(){
    let x =10; //block scoped variable
    if(true){
        let y=20; //block scoped variable
        console.log(x); //10
        console.log(y); //20    
    }
    console.log(y); //Error: y is not defined
    console.log(x); //Output: 10
}

example();