(function () {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  // console.log("hello coursera!");
  for (var x in names){
    // console.log(names[x]);
    
    
    var firstLetter = names[x].charAt(0).toLowerCase();
    // console.log(firstLetter);
      // STEP 11:
      // Retrieve the first letter of the current name in the loop.
      // Use the string object's 'charAt' function. Since we are looking for
      // names that start with either upper case or lower case 'J'/'j', call
      // string object's 'toLowerCase' method on the result so we can compare
      // to lower case character 'j' afterwards.
      // Look up these methods on Mozilla Developer Network web site if needed.
      // var firstLetter =
  
      // STEP 12:
      // Compare the 'firstLetter' retrieved in STEP 11 to lower case
      // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
      // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
      // name in the loop.
    if (firstLetter === "j") {
      // console.log("byeSpeaker works");
      byeSpeaker.speak(names[x]);
    } else {
      // console.log("helloSpeaker works");
      helloSpeaker.speak(names[x]);
    }
  }

  })();
