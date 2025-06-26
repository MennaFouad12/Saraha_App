function test() {
  try{
    const x=10;
  x=5;
      return x ;
  }
catch(error){
  console.log(error.message);
} 

}
// test();
function test2(a){
  try{
    const letter=10;
    const result=letter.toLowerCase();
      return result ;
  }
catch(error){
  console.log(error.message);
} 
}
test2();


function catchError(fn) {
  return (arg)=>{
    try {
      fn();
    } catch (error) {
      console.log(error.message);
    }
  }
  
}
const result=catchError(test2);
result();