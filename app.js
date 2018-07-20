/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) { 
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();

  switch (searchType) {
    case 'yes':
      searchByName(people);
      break;
    case 'no':
      searchByTraits(people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people); // restart app
      break;
  }
  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch (userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if (el.weight == userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person (in inches)?");

  let newArray = people.filter(function (el) {
    if (el.height == userInputHeight) {
      return true;
    }
  });

  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is the person's eye color?").toLowerCase();

  let newArray = people.filter(function (el) {
    if (el.eyeColor == userInputEyeColor) {
      return true;
    }
  });

  return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("How old is the person?");

  let newArray = people.filter(function (el) {
    el.dob = convertDobToAge(el.dob);
    if (el.dob == userInputAge) {
      return true;
    }
  });

  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender?").toLowerCase();

  let newArray = people.filter(function (el) {
    if (el.gender == userInputGender) {
      return true;
    }
  });

  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?").toLowerCase();

  let newArray = people.filter(function (el) {
    if (el.occupation == userInputOccupation) {
      return true;
    }
  });

  return newArray;
}

function convertDobToAge(dob) {
  let dobInMilliseconds = Math.abs(Date.parse(dob));
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let year = day * 365;

  let yearsFromDobTo1970 = dobInMilliseconds / year;
  let yearsSince1970 = Date.now() / year;

  let age = Math.floor(yearsFromDobTo1970 + yearsSince1970);
  return age;


}



// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person)
      break;
    case "family":
      displayFamily(person)
      break;
    case "descendants":
      let listOfDescendents = [];
      let listOfDescendentObjects = getDescendents(person, listOfDescendents);
      if (listOfDescendentObjects.length === 0) {
        alert("This person has no descendants!");
      } else {
        displayPeople(listOfDescendentObjects);
      }
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  let newArray = people.filter(function (el) {
    if (el.firstName.toLowerCase() == firstName && el.lastName.toLowerCase() == lastName) {
      return true;
    }
  });
  // TODO: find the person using the name they entered
  return newArray
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + convertDobToAge(person.dob) + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamily(person) {
  let familyInfo = '';
  if (person.currentSpouse) {
    let spouseId = person.currentSpouse;
    for (i = 0; i < data.length; i++) {
      if (spouseId === data[i].id) {
        familyInfo += "spouse: " + data[i].firstName + " " + data[i].lastName + "\n";
      }
    }

  }
  if (person.parents.length > 0) {
    familyInfo += "parents: " + getNamesFromIds(person.parents) + "\n";
  } else {
    familyInfo += "parents: Deceased"
  }
  alert(familyInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}

function getDescendents(person, listOfDescendents) {
  let personId = person.id;
  let childrenList = data.filter(function (el) {
    if (el.parents.includes(personId)) {
      return true;
    }
  })
  if (childrenList.length === 0) {
    return listOfDescendents;
  } else {
    for (let j = 0; j < childrenList.length; j++) {
      listOfDescendents.push(childrenList[j]);
    }
    for (let i = 0; i < childrenList.length; i++) {
      getDescendents(childrenList[i], listOfDescendents);
    }
    return listOfDescendents;
  }
}

function getNamesFromIds(listOfIds) {
  let listOfNamesFromIds = listOfIds.map(function (el) {
    for (let i = 0; i < data.length; i++) {
      if (el === data[i].id) {
        el = data[i].firstName + " " + data[i].lastName;
        return el;
      }
    }
  });
  return listOfNamesFromIds;
}

function getNamesFromObject(array) {
  let listOfNamesFromArray = array.map(function (el) {
    return el.firstName + " " + el.lastName;
  });
  return listOfNamesFromArray;
}