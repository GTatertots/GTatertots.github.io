var BASE_URL = "https://caloric-intakes.herokuapp.com"
// PUT THIS BASE_URL IN EVERY FETCH FUNCTION

function loadMessagesFromServer() {

    fetch(BASE_URL + "/caloricintakes", {
        credentials: "include"
    }).then(function (response) {
        response.json().then(function (data){
            console.log("data from the server", data);
            intakeObjects = data;

            var caloricList = document.querySelector("#caloric-list");
            caloricList.innerHTML = "";

            //for intake in IntakeList
            intakeObjects.forEach(function (intake) {
            var newListItem = document.createElement("li");

            var mealDiv = document.createElement("div");
            mealDiv.innerHTML = intake.meal;
            mealDiv.classList.add("intake-meal");

            var typeDiv = document.createElement("div");
            typeDiv.innerHTML = intake.type;
            typeDiv.classList.add("intake-type");

            var caloriesDiv = document.createElement("div");
            caloriesDiv.innerHTML = intake.calories + " Calories";
            caloriesDiv.classList.add("intake-calories");

            var timeDiv = document.createElement("div");
            timeDiv.innerHTML = intake.time;
            timeDiv.classList.add("intake-time");

            var dateDiv = document.createElement("div");
            dateDiv.innerHTML = intake.date;
            dateDiv.classList.add("intake-date");
            
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.onclick = function () {
                console.log("delete clicked", intake.id);
                if (confirm("Are you sure you want to delete?")) {
                    deleteMessage(intake.id);
                }
            };

            var editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.onclick = function () {
                var lineBreak = document.createElement("div");
                lineBreak.innerHTML = " "

                var updateList = document.querySelector("#update-list");
                var updateListItem = document.createElement("li");
                updateListItem.innerHTML = "";

                var newMeal = document.createElement("input");
                newMeal.value = intake.meal;

                var newType = document.createElement("input");
                newType.value = intake.type;

                var newCalories = document.createElement("input");
                newCalories.value = intake.calories;

                var newTime = document.createElement("input");
                newTime.value = intake.time;

                var newDate = document.createElement("input");
                newDate.value = intake.date;

                var updatebutton = document.createElement("button");
                updatebutton.innerHTML = "Update";
                updatebutton.onclick = function () {
                    updateMessage(intake.id, newMeal.value, newType.value, newCalories.value, newTime.value, newDate.value);
                    updateList.innerHTML = ""
                }
                
                newListItem.appendChild(lineBreak)
                newListItem.appendChild(newMeal);
                newListItem.appendChild(newType);
                newListItem.appendChild(newCalories);
                newListItem.appendChild(newTime);
                newListItem.appendChild(newDate);
                newListItem.appendChild(updatebutton);
            };


            newListItem.appendChild(mealDiv);
            newListItem.appendChild(typeDiv);
            newListItem.appendChild(caloriesDiv);
            newListItem.appendChild(timeDiv);
            newListItem.appendChild(dateDiv);
            newListItem.appendChild(deleteButton);
            newListItem.appendChild(editButton);
            caloricList.appendChild(newListItem);
            });
        });
        var main = document.querySelector("#main");
        var login = document.querySelector("#login");
        var signup =  document.querySelector("#sign-up");
    if (response.status == 200) {
        main.style.display = "block";
        login.style.display = "none";
        signup.style.display = "none";
    } else if (response.status == 401) {
        main.style.display = "none";
        login.style.display = "block";
    }
    });
};


var mealInput = document.querySelector("#meal-input");
var typeInput = document.querySelector("#type-input");
var caloricInput = document.querySelector("#caloric-input");
var timeInput = document.querySelector("#time-input");
var dateInput = document.querySelector("#date-input");
var recordButton = document.querySelector('#record-button');
console.log('record button', recordButton);
recordButton.onclick = function () {
    createMessage(mealInput.value, typeInput.value, caloricInput.value, timeInput.value, dateInput.value);
}


function createMessage(meal, type, calories, time, date) {
    var data = "meal=" + encodeURIComponent(meal);
    data += "&type=" + encodeURIComponent(type);
    data += "&calories=" + encodeURIComponent(calories);
    data += "&time=" + encodeURIComponent(time);
    data += "&date=" + encodeURIComponent(date);



    fetch(BASE_URL + "/caloricintakes", {
    // additional options to the fetch request
    credentials: "include",
    method: "POST",
    body: data,  
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    }).then(function (response) {
    // server has responded
    loadMessagesFromServer();
    });

}

function deleteMessage(intakeId) {
    fetch(BASE_URL + "/caloricintakes/" + intakeId, {
    // additional options to the fetch request
    credentials: "include",
    method: "DELETE"

    }).then(function (response) {
    // server has responded
    loadMessagesFromServer();
    });
}

function updateMessage(intakeId, meal, type, calories, time, date) {
    var data = "meal=" + encodeURIComponent(meal);
    data += "&type=" + encodeURIComponent(type);
    data += "&calories=" + encodeURIComponent(calories);
    data += "&time=" + encodeURIComponent(time);
    data += "&date=" + encodeURIComponent(date); 
    
    fetch(BASE_URL + "/caloricintakes/" + intakeId, {
    // additional options to the fetch request
    credentials: "include",
    method: "PUT",
    body: data,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    }).then(function (response) {
    // server has responded
    loadMessagesFromServer();
    });
}

var loginscreen = document.querySelector('#login');
var signupscreen = document.querySelector("#sign-up")
var createButton = document.querySelector('#create-button');
createButton.onclick = function () {
    loginscreen.style.display = "none";
    signupscreen.style.display = "block";
}

// SIGN IN STUFF

var email =  document.querySelector("#email-input")
var password = document.querySelector("#password-input")
var loginButton = document.querySelector("#login-button")
loginButton.onclick = function () {
    createSession(email.value, password.value);
}

function createSession(email, password) {
    var data = "email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);

    fetch(BASE_URL + "/sessions", {
    // additional options to the fetch request
    credentials: "include",
    method: "POST",
    body: data,  
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    }).then(function (response) {
    // server has responded
    if (response.status == 201) {
        loadMessagesFromServer();
    } else if (response.status == 401) {
        confirm("Error signing in: incorrect email or password.")
    }
    });
    
}


var firstName = document.querySelector("#firstname-input")
var lastName = document.querySelector("#lastname-input")
var newEmail = document.querySelector("#newemail-input")
var newPassword = document.querySelector("#newpassword-input")
var signupButton = document.querySelector("#signup-button")
signupButton.onclick = function () {
    createUser(firstName.value, lastName.value, newEmail.value, newPassword.value);
}

function createUser(first, last, email, password) {
    var data = "firstname=" + encodeURIComponent(first);
    data += "&lastname=" + encodeURIComponent(last);
    data += "&email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);



    fetch(BASE_URL + "/users", {
    // additional options to the fetch request
    credentials: "include",
    method: "POST",
    body: data,  
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    }).then(function (response) {
    // server has responded
    if (response.status == 201) {
        loginscreen.style.display = "block";
        signupscreen.style.display = "none";
        confirm("User created succesfully! Please sign in.")
    } else if (response.status == 422) {
        confirm("Error Creating User")
    }
    });

}


loadMessagesFromServer();
