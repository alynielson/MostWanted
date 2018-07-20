
function app(people) { 
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let filteredPeople;

  switch (searchType) {
    case 'yes':
      filteredPeople = searchByName(people);
      break;
    case 'no':
      searchByTraits(people);
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

  if (filteredPeople.length === 1) {
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
  }
  else if (filteredPeople.length === 0) {
    alert("There is nobody with all of the traits you just searched for! Try again.");
    searchByTraits(people);
  }
  else {
    displayPeople(filteredPeople);
    
    let searchChoice = promptFor("Your search returned multiple people! Would you like to continue searching the filtered list? Enter 'yes' or 'no'.", yesNo).toLowerCase();
    switch (searchChoice) {
      case 'yes':
      searchByTraits(filteredPeople); 
      break;
      case 'no':
      app(people);
      break;
    }
    
  }

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




function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); 
  }
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  
  switch (displayOption) {
    case "info":
      displayPerson(person);
      getMoreInfo(person, people);
      break;
    case "family":
      displayFamily(person);
      getMoreInfo(person, people);
      break;
    case "descendants":
      let listOfDescendents = [];
      let listOfDescendentObjects = getDescendents(person, listOfDescendents);
      if (listOfDescendentObjects.length === 0) {
        alert("This person has no descendants!");
      } else {
        displayPeople(listOfDescendentObjects);
        getMoreInfo(person, people);
      }
      break;
    case "restart":
      app(people); 
      break;
    case "quit":
      return; 
    default:
      return mainMenu(person, people); 
  }
}

function getMoreInfo (person, people) {

  let moreInfo = prompt('What else would you like to know about ' + person.firstName + " " + person.lastName + "? Please enter 'info', 'family', or 'descendants', or enter 'restart' or 'quit'" )
  switch (moreInfo) {
    case "info":
      displayPerson(person);
      getMoreInfo(person, people);
      break;
    case "family":
      displayFamily(person);
      getMoreInfo(person, people);
      break;
    case "descendants":
      let listOfDescendents = [];
      let listOfDescendentObjects = getDescendents(person, listOfDescendents);
      if (listOfDescendentObjects.length === 0) {
        alert("This person has no descendants!");
      } else {
        displayPeople(listOfDescendentObjects);
      }
      getMoreInfo(person, people);
      break;
    case "restart":
      app(people); 
      break;
    case "quit":
      return; 
    default:
      return mainMenu(person, people);
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
  return newArray;
}


function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  var personInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + convertDobToAge(person.dob) + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
}

function displayFamily(person) {
  let familyInfo = '';
  if (person.currentSpouse) {
    let spouseId = person.currentSpouse;
    for (i = 0; i < data.length; i++) {
      if (spouseId === data[i].id) {
        familyInfo += "Spouse: " + data[i].firstName + " " + data[i].lastName + "\n";
      }
    }

  }
  if (person.parents.length > 0) {
    familyInfo += "Parents: " + getNamesFromIds(person.parents) + "\n";
  } else {
    familyInfo += "Parents: Deceased \n" 
  }

  let listOfChildren = getChildren(person);
  familyInfo += "Children: ";
  for (let i = 0; i < listOfChildren.length; i++) { 
      familyInfo += listOfChildren[i].firstName + " " + listOfChildren[i].lastName +  ", ";
      if (i+1 == listOfChildren.length) {
        familyInfo = familyInfo.slice(0,-2) + "\n";
      }
    
    familyInfo += "Parents: Deceased";
  }
  let siblingsOfPerson = getSiblings(person);
  if (siblingsOfPerson.length >0) {
    familyInfo += "Siblings: " + getNamesFromObject(siblingsOfPerson) + "\n";
  }
  alert(familyInfo);
}

function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
  }
  else {
    alert("Wrong! Please enter 'yes' or 'no'.")
  }
}
  
function chars(input) {
  return true; 
}

function getChildren(person) {
  let personId = person.id;
  let listOfChildren = data.filter(function(el) {
    if (el.parents.includes(personId)) {
      return true;
    }
  });
  return listOfChildren;
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

function getSiblings(person) {
  let listOfSiblings = data.filter(function(el) {
    for (let i=0;i<person.parents.length;i++) {
      if (el.parents.includes(person.parents[i])) {
        return true;
      } 
    }
  });
  let siblingsOfPerson = listOfSiblings.filter(function(el) {
    if (el !== person) {
      return true;
    }
  });
  return siblingsOfPerson;
}

function getNamesFromObject(array) {
  let listOfNamesFromArray = array.map(function(el) {
      return el.firstName + " " + el.lastName; 
      });
  return listOfNamesFromArray;
}