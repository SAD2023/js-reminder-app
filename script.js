counter = 0

function submission(evt) {
  var reminder = document.getElementById("new-reminder").value;

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

  counter++;

  evt.preventDefault();
};

var form = document.getElementById("main-form")
form.addEventListener("submit", submission)



