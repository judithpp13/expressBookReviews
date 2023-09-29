const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    //synchronized method 
//   res.send(JSON.stringify({books},null, 4));

let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    },6000)})

    myPromise.then((successMessage) => {
        console.log("callback " + successMessage)
        res.send(JSON.stringify({books},null, 4));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
//synchronized method
    // let isbn = req.params.isbn;
    // res.send(books[isbn]);
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        },6000)})
    
        myPromise.then((successMessage) => {
            let isbn = req.params.isbn;
            res.send(books[isbn]);
        })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved ")
    },6000)})

    myPromise.then((successMessage) => {
        console.log("callback " + successMessage)
        let author = req.params.author;
        const authorBooks = [];  
        for(var i in books)
        {if (books[i].author===author){
            authorBooks.push(books[i]["title"]);
        }
        }

        if (authorBooks.length > 0) {  
            res.send(authorBooks);  
          } else {
            res.status(404).send('Sorry, no book found!');  
          }

    })


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved ")
    },6000)})

    myPromise.then((successMessage) => {
        console.log("callback " + successMessage)
        const title = req.params.title.toLowerCase();
        const filteredBooks = Object.values(books).filter(book => book.title.toLowerCase().includes(title));
    if(filteredBooks.length > 0){
        return res.status(200).json(filteredBooks);
    }
    else{
        return res.status(404).json({message: "Book not found"});
    }
    
    })
        

       
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved ")
    },6000)})

    myPromise.then((successMessage) => {

        const isbn = req.params.isbn;
        if (!books[isbn]) {
            return res.status(404).json({ message: "Book not found" });
        }
        const reviews = books[isbn].reviews;
        return res.status(200).json({ reviews: reviews });
        
    })
});

module.exports.general = public_users;
