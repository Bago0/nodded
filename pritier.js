. Describe what is Promise in JS?
A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It is used for handling asynchronous operations in a more synchronous-like manner, providing a cleaner and more manageable way to handle callbacks. A Promise can be in one of three states:

Pending: Initial state, neither fulfilled nor rejected.
Fulfilled: Operation completed successfully.
Rejected: Operation failed.
2. Describe closure event in JS?
A closure in JavaScript is a function that remembers the environment in which it was created. It has access to variables from its own scope, the outer function's scope, and the global scope. Closures are often used to create private variables or functions, as they allow a function to have access to the parent scope even after the parent function has closed.

3. Write the function which checks if two strings are anagrams.
javascript
function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) return false;
    
    let sortedStr1 = str1.split('').sort().join('');
    let sortedStr2 = str2.split('').sort().join('');
    
    return sortedStr1 === sortedStr2;
}

// Example usage:
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
4. What is the output of the following code?
javascript
Copy code
const b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(b[i]), 1000);
}

for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(b[i]), 1000);
}
Output:

javascript
Copy code
1
2
3
4
5
6
7
8
9
10
undefined
undefined
undefined
undefined
undefined
undefined
undefined
undefined
undefined
undefined
Explanation:

The let keyword creates a block-scoped variable, so each iteration of the first loop captures its own value of i. Therefore, it logs the elements of the array b correctly.
The var keyword creates a function-scoped variable, so all the timeouts created in the second loop refer to the same variable i, which ends up being 10 after the loop. Since b[10] is undefined, it logs undefined ten times.
5. What will the code below output to the console and why?
javascript
Copy code
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
         }());
       }
 };
myObject.func();
Output:

kotlin
Copy code
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
Explanation:

this in the func method refers to myObject, so this.foo and self.foo are both "bar" in the outer function.
Inside the inner function, this refers to the global object (or undefined in strict mode), not myObject. Therefore, this.foo is undefined and self.foo is still "bar".
6. Write a JavaScript function that takes an array of URLs and downloads the contents of each URL in parallel using Promises.
javascript
Copy code
function fetchUrls(urls) {
    const fetchPromises = urls.map(url => fetch(url).then(response => response.text()));
    return Promise.all(fetchPromises);
}

// Example usage:
fetchUrls(['https://example.com', 'https://example.org'])
    .then(contents => {
        contents.forEach(content => console.log(content));
    })
    .catch(error => console.error('Error fetching URLs:', error));
7. MongoDB queries
Find the restaurants that achieved a score more than 80 but less than 100.
javascript
Copy code
db.restaurants.find({
    "grades.score": { $gt: 80, $lt: 100 }
});
Find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
javascript
Copy code
db.restaurants.find({
    $and: [
        { "grades.score": { $lt: 5 } },
        { "borough": { $in: ["Manhattan", "Brooklyn"] } },
        { "cuisine": { $ne: "American" } }
    ]
});