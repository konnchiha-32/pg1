let array = [];
window.addEventListener("load", loadData);
document.getElementById("sendButton").addEventListener("click", saveData);
document.getElementById("deleteButton").addEventListener("click", deleteAll);

function saveData() {
  let input = document.getElementById("textInput");
  let titleInput = document.getElementById("titleInput");
  let title = titleInput.value;
  let text = input.value;
  if (title === "" || text === "") {
  alert("映画タイトル、感想を入力してください");
  return;
}

  let now = new Date();
  let time =
    now.getFullYear() + "/" +
    (now.getMonth() + 1) + "/" +
    now.getDate() + " " +
    now.getHours() + ":" +
    now.getMinutes();

    array.push({
        title: title,
        text: text,
        time: time
    });

  console.log(array);

  localStorage.setItem("impressions", JSON.stringify(array));

  displayList();

  input.value = "";
  titleInput.value = "";
}

function loadData() {
  let data = localStorage.getItem("impressions");
  if (data) {
    array = JSON.parse(data);
  }
  displayList();
}

function displayList() {
  let outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = "<h1>感想</h1>";

  array.forEach(item => {
    let p = document.createElement("p");
    p.textContent =
    item.time + "｜" + "Title " + item.title + "｜" + item.text;
    outputArea.appendChild(p);
  });

  let count = document.createElement("p");
  count.textContent = "記録件数：" + array.length;
  outputArea.appendChild(count);
}

function deleteAll() {
  if (!confirm("すべての感想を削除しますか？")) return;

  array = [];
  localStorage.removeItem("impressions");
  displayList();
}