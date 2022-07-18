function FizzBuzz() {
    const number = 100;
   
    let res ;
    
    let mult = 3 * 5;
    for (let i = 1; i <= 100; i++) {

       i % mult == 0 ? res = 'FizzBuzz'
            : i % 5 == 0 ? res = 'Buzz'
            : i % 3 == 0 ? res = 'Fizz'
            :  res = i;
      
        console.log(res);
    }
  }

  FizzBuzz();
  