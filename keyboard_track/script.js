const insert = document.getElementById("insert");
window.addEventListener("keypress", (e) => {
  const key = e.key == " " ? "space" : e.key;
  const keycode = e.keyCode;
  const code = e.code;

  insert.innerHTML = `<div class="color">
<table>
  <tr>
  <th colspan="2">KeyName: "${key.toUpperCase()}"</th>
  </tr>
  <tr>
  <td>KeyCode: "${keycode}"</td>
  <td>code: "${code}"</td>
  </tr>
</table>
</div>`;
});
