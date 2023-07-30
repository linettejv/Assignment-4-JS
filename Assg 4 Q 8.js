function simulateAsyncTask() {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.random();
      console.log(randomNumber)
      setTimeout(() => {
        if (randomNumber < 0.08) {
          resolve('Success');
        } else {
          reject('Error: Task failed');
        }
      }, 500);});
  }
  
  async function retry(task,no_of_tries){
 try{
  const res = await task();
  console.log("resolved in try no " +no_of_tries);
  return "resolved";
 }
 catch(e){
  if (no_of_tries > 0){
    // try again
    console.log("current no of tries = " +no_of_tries);
    try{
      const res2 = await retry(task,--no_of_tries);
      return res2
    }
    catch(e){
      return "failure";
    }
 }
 else{
  console.log("failed after " +no_of_tries +" no of tries");
  return "failure";
 }
}
}


async function last(){
  try{
    const final = await retry(simulateAsyncTask, 3);
    console.log('Result :',final);
  }
  catch{
    console.log('Error:',final)
  }
}

last();