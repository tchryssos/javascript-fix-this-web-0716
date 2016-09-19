var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(function() {
      updateFunction(serve.call(this, "Happy Eating!", this.customer))
    }.bind(this), 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
  decorate: function(updateFunction){
    cake.decorate.call(this, updateFunction) }
}

function makeCake() {
  var updateCakeStatus=updateStatus.bind(this);
  updateCakeStatus.call(this, "Making cake");
  mix.call(cake,updateCakeStatus);
}

function makePie() {
  var updatePieStatus=updateStatus.bind(this);
  updatePieStatus.call(this, "Making pie");
  mix.call(pie,updatePieStatus);
}

function updateStatus(statusText) {
  document.getElementById(this.divId).getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool.call(this, updateFunction)
  }.bind(this), 2000)
  updateFunction(status)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(function() {
    bake.call(this, updateFunction)
  }.bind(this), 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(function() {
    this.decorate(updateFunction)
  }.bind(this), 2000)
  updateFunction(status)
}

function makeDessert() {
  if (this.innerHTML === "Make Cake"){
    cake.divId=this.parentElement.id;
    makeCake.call(cake);
  }
  else if (this.innerHTML === "Make Pie"){
    pie.divId=this.parentElement.id;
  makePie.call(pie);
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
