function sleep(timeInSecods: number){
  const timeInMS = timeInSecods * 1000;
  return new Promise(resolve => setTimeout(resolve, timeInMS));
}

export default sleep;