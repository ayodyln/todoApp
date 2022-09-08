let numberArray = [2, 3, 4, 6, 50, 30, 20];

const myForEach = (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    cb(el, i, arr);
  }
};

myForEach(numberArray, (el, i, arr) => {
  console.log(el);
});
