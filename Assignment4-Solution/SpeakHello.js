(function (window){
  var helloSpeaker = {};
  window.helloSpeaker=helloSpeaker;
  var speakWord = "Hello";
  helloSpeaker.speak = (function speak(name) {
    console.log(speakWord + " " + name);
  });

})(window);
