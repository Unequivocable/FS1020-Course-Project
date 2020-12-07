
const userFile = [
    {
      "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "name": "Some",
      "email": "address@email.com"
  },
  {
    "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "name": "Some Name",
    "email": "address@emaddil.com"
  }
  ]

// const finder = (findProp, findValue) => {
//     return userFile.find(a => a.name == findValue).email
//     }
    
let input = { email: "address@email.com"}

    const finder = (findValue) => {
      return userFile.find(a => a.email == findValue).name
      }


console.log(finder(input.email))

// const finder2 = userFile.find(a => a.name == "Some").email
// console.log(finder2)

