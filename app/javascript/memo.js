function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form")),
    const XHR = new XMLHttpRequest();
    XHR.open("post", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // itemはレスポンスとして返却されたメモのレコードデータを取得している
      const list = document.getElementById("list");
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
      const formText = document.getElementById("content");
      // formTextを取得する理由は、メモの入力フォームをリセットするため
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 「メモとして描画する部分のHTML」を定義しています。
      list.insertAdjacentHTML("afterend", HTML);
      // 第一引数にafterendを指定することで、要素listの直後に挿入できます。
      formText.value = "";
      // 「メモの入力フォームに入力されたままの文字」はリセットされます
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);