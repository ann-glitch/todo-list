// const inboxBtn = document.getElementById("inbox-button");
// inboxBtn.addEventListener("click", function (event) {
//   inboxBtn.innerHTML = `<section class="main">
//   <div class="child">
//   <h4>Inbox</h4>
//   <button>+ Add Task</button>
//   </div>
// </section>`;
// });

const taskButton = document.querySelector(".task-btn");
taskButton.addEventListener("click", function (e) {
  console.log("button clicked");
  const inputBar = document.createElement("input");
  inputBar.setAttribute("type", "text");
  document.body.appendChild(inputBar);
  taskButton.innerHTML = inputBar;
});

const inboxBtn = document.getElementById("inbox-button");
inboxBtn.addEventListener("click", function (e) {
  console.log("clicked");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  document.body.appendChild(input);
});
