if (localStorage.getItem("counter") === null) {
  var old_counter = 0
}
else {
  var old_counter = parseInt(localStorage.getItem("counter"))
}
counter = 0 + old_counter

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
  // document.getElementById("list-of-reminders").innerText = reminder

  // Update counter
  counter++;
  localStorage.setItem("counter", counter);

  location.reload();
  evt.preventDefault();
};

var form = document.getElementById("main-form")
form.addEventListener("submit", submission)


// function to reload old form data
function restore() {
  //alert(localStorage.getItem("counter"))
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
// what happens when it loads new page
// document.addEventListener("DOMContentLoaded", restore);
window.onload = restore()
window.onload = restore_old_reminders()

var checkboxes = document.querySelectorAll('input[type=checkbox]')
// console.log(checkboxes)
checkboxes.forEach(check_if_checked)

if (localStorage.getItem("past-counter") === null) {
  var old_past_counter = 0
}
else {
  var old_past_counter = parseInt(localStorage.getItem("past-counter"))
}
past_counter = 0 + old_counter

// what happens when a box is checked
function check_if_checked(checkbox) {
  console.log(checkbox)
  checkbox.addEventListener('change', function () {
    if (localStorage.getItem(this.id) !== null) {
      if (this.checked) {
        // console.log("Checkbox: " + `${this.value}`)

        this.remove()
        document.getElementById(this.id + "label").remove()
        localStorage.removeItem(this.id)

        //add checked element to old-reminders section
        var element = document.getElementById("list-of-old-reminders");
        //console.log(checkbox)
        var label = document.createElement("label")
        label.textContent = checkbox.value
        checkbox.class = "old-stuff"
        // document.getElementsByClassName("old-stuff").disabled = true
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

