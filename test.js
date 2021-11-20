// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('resolved');
//       }, 2000);
//     });
//   }
  
//   async function asyncCall() {
//     console.log('calling');
//     const test = await resolveAfter2Seconds()
//     console.log(test)
//     console.log(3)
//   }
  
//   asyncCall();
//   console.log('end')

const test = new Promise((res, rej) => {
  console.log('1')
  res('test')
})
test.then(data => {
  console.log(data)
})

console.log(2)
