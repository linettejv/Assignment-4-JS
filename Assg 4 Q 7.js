function simulateAsyncTask() {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.random();
      console.log(randomNumber)
      setTimeout(() => {
        if (randomNumber < 0.38) {
          resolve('Success');
        } else {
          reject('Error: Task failed');
        }
      }, 500);});
  }
  
  function retry(task,no_of_tries) {
    const p = new Promise((r,s) => {
      task().then((res) => {
        console.log("resolved in try no " +no_of_tries);
        r("resolved");
        // simulateAsyncTask is resolved , we can exit
        // this function also , passing resolved for exiting
      },(res) => {
        // task before has failed
        if (no_of_tries > 0){
          // try again
          console.log("current no of tries = " +no_of_tries);
          retry(task,--no_of_tries).then(res => r(res) , rej => s(rej) )
   	 
        }
        else{
          // total failure
          console.log("failed after " +no_of_tries +" no of tries");
          s("Failure");
        }
      })
    })
   
    return p;
    // Your code here
  }
  
  // Sample invocation
  retry(simulateAsyncTask, 3)
    .then(result => console.log('Result:', result))
    .catch(error => console.log('Error:', error));
  

