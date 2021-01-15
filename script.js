// Creates counter for active reminders
if (localStorage.getItem("counter") === null) {
  var old_counter = 0
}
else {
  var old_counter = parseInt(localStorage.getItem("counter"))
}
counter = 0 + old_counter

// Function adds new reminder to the page once the top form is submitted
function submission(evt) {
  var reminder = document.getElementById("new-reminder").value;
  // add value to localStorage
  localStorage.setItem(`${counter}`, reminder)

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox"
  var text = document.createTextNode(reminder);
  var label = document.createElement("label")
  label.textContent = reminder
  checkbox.labels = label
  checkbox.id = `${counter}`
  checkbox.class = "checkbox"
  checkbox.value = reminder
  var breakline = document.createElement("br")

  var element = document.getElementById("list-of-reminders");
  element.appendChild(checkbox);
  element.appendChild(label)
  element.appendChild(breakline)

  document.getElementById("new-reminder").value = ""

  // Update counter
  counter++;
  localStorage.setItem("counter", counter);

  location.reload();
  evt.preventDefault();
};

// Listener for when a new reminder is added
var form = document.getElementById("main-form")
form.addEventListener("submit", submission)


// function to reload old form data. Restores active reminders to the page
function restore() {
  var counter = parseInt(localStorage.getItem("counter"))
  for (i = 0; i < counter; i++) {
    data = localStorage.getItem(`${i}`)
    if (data !== null) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox"
      var text = document.createTextNode(data);
      var label = document.createElement("label")
      label.textContent = data
      checkbox.id = `${i}`
      label.id = checkbox.id + "label"
      checkbox.class = "checkbox"
      checkbox.value = data
      var breakline = document.createElement("br")
      var element = document.getElementById("list-of-reminders");
      element.appendChild(checkbox);
      element.appendChild(label)
      element.appendChild(breakline)
    }
  }
}

// restores the past reminders to the page
function restore_old_reminders() {
  var past_counter = parseInt(localStorage.getItem("past-counter"))
  for (i = 0; i < past_counter; i++) {
    data = localStorage.getItem("old:" + `${i}`)
    if (data !== null) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox"
      var text = document.createTextNode(data);
      var label = document.createElement("label")
      label.textContent = data
      checkbox.id = "old:" + `${past_counter}`
      label.id = checkbox.id + "label"
      checkbox.class = "checkbox"
      checkbox.value = data
      var breakline = document.createElement("br")
      var element = document.getElementById("list-of-old-reminders");
      element.appendChild(checkbox);
      element.appendChild(label)
      element.appendChild(breakline)
    }
  }
}

// called to restore info when it loads new page
window.onload = restore()
window.onload = restore_old_reminders()

// checks if any of the checkboxes have been checked
var checkboxes = document.querySelectorAll('input[type=checkbox]')
checkboxes.forEach(check_if_checked)


// sets the past counter for past reminders
if (localStorage.getItem("past-counter") === null) {
  var old_past_counter = 0
}
else {
  var old_past_counter = parseInt(localStorage.getItem("past-counter"))
}
past_counter = 0 + old_counter

// called when a box is checked. Removes it from active reminders and adds to
// past reminders
function check_if_checked(checkbox) {
  console.log(checkbox)
  checkbox.addEventListener('change', function () {
    if (localStorage.getItem(this.id) !== null) {
      if (this.checked) {
        this.remove()
        document.getElementById(this.id + "label").remove()
        localStorage.removeItem(this.id)

        //add checked element to old-reminders section
        var element = document.getElementById("list-of-old-reminders");
        var label = document.createElement("label")
        label.textContent = checkbox.value
        checkbox.class = "old-stuff"
        element.appendChild(checkbox);
        element.appendChild(label)
        var breakline = document.createElement("br")
        element.appendChild(breakline)

        //add old ones to localstorage
        localStorage.setItem("old:" + `${past_counter}`, this.value)
        past_counter = past_counter + 1
        localStorage.setItem("past-counter", past_counter)

        location.reload();
      } else {
        console.log("")
      }
    }
  })
}

