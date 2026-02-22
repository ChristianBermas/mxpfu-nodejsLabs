const express = require('express');
const router = express.Router();


let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  let user = users.filter((user) => user.email === email);

  res.send(user);
});

// GET by specific ID request: Retrieve a single user with LastName
router.get("/lastName/:lastName", (req, res) => {
  const lastName = req.params.lastName;

  let user = users.filter((user) => user.lastName === lastName);

  res.send(user);
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}
// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  // Sort the users array by DOB in ascending order
  let sorted_users = users.sort(function (a, b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
    return d1 - d2;
  });

  // Send the sorted_users array as the response to the client
  res.send(sorted_users);
});

// POST request: Create a new user
router.post("/", (req, res) => {
  const newUser = req.query;
  users.push(newUser);

  res.send(`User ${newUser.firstName} has been added successfully!`);
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided
    let DOB = req.query.DOB;

    if (DOB) {
      filtered_user.DOB = DOB;
    }

    /*
    Include similar code here for updating other attributes as needed
    */

    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} updated.`);
  } else {
    // Send error message if no user found
    res.send("Unable to find user!");
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;

  users = users.filter((user) => user.email != email);

  res.send(`User with the email ${email} deleted.`);
});

module.exports = router;
