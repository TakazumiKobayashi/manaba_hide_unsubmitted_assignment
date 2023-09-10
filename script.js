//前回表示時のurl情報取得
let urlPre = localStorage.getItem("displayURL");
if (urlPre) {
    urlPre = JSON.parse(urlPre);
    localStorage.removeItem("displayURL");
}

//前回表示時の「隠した課題一覧」表示
let tableHideDisplay = localStorage.getItem("hideDisplay");
if (tableHideDisplay) {
    tableHideDisplay = JSON.parse(tableHideDisplay);
} else {
    tableHideDisplay = "none";
}


//課題一覧の表の取得
let table = document.getElementsByTagName("tbody")[1];

//見出し行の取得
let tr0 = table.getElementsByTagName("tr")[0];

//見出し幅の調節
tr0.getElementsByTagName("th")[0].width = "9%";
tr0.getElementsByTagName("th")[3].width = "16%";
tr0.getElementsByTagName("th")[4].width = "16%";

//新しい見出しの作成
let thnew = document.createElement("th");
thnew.textContent = "隠す";
thnew.className = "top";
tr0.appendChild(thnew);

//隠す・戻すボタン用配列の作成
let Button = new Array();
let Return = new Array();
Button.push("");
Return.push("");

//新しい列の作成
let rownum = table.rows.length;
for (let i = 1; i < rownum; i++){
    let cell = table.rows[i].insertCell();
    Button.push(document.createElement("button"));
    Button[i].className = "button"
    Button[i].style.fontSize = "11px";
    Button[i].style.width = "100%";
    Button[i].textContent = "隠す";
    cell.appendChild(Button[i]); //ボタン追加
}


//「隠した課題の表示」ボタン作成
let content = document.querySelectorAll(".contentbody-l");
let hideButton = document.createElement("button");
hideButton.className = "button"
hideButton.style.marginLeft = "82%";
hideButton.style.marginTop = "12px";
if (tableHideDisplay == "none") {
    hideButton.textContent = "隠した課題の　表示";
} else {
    hideButton.textContent = "隠した課題の非表示";
}
content[0].appendChild(hideButton);


//「隠した課題一覧」
let title = document.createElement("h1");
title.textContent = "隠した課題一覧";
title.style.display = tableHideDisplay;
content[0].appendChild(title);


//隠した科目用の表作成
let tableHide = document.getElementsByClassName("stdlist")[0].cloneNode(true);
tableHide.getElementsByTagName("th")[6].textContent = "戻す";
for (let i = 1; i < tableHide.rows.length; i++){
    tableHide.getElementsByTagName("tr")[i].style.display = "none";
    tableHide.getElementsByTagName("tr")[i].getElementsByTagName("button")[0].remove();
    Return.push(document.createElement("button"));
    Return[i].className = "button"
    Return[i].style.fontSize = "11px";
    Return[i].style.width = "100%";
    Return[i].textContent = "戻す";
    tableHide.getElementsByTagName("tr")[i].getElementsByTagName("td")[6].appendChild(Return[i]);
}
tableHide.style.display = tableHideDisplay;
content[0].appendChild(tableHide);


//「隠した課題の表示」ボタン動作
hideButton.onclick = function () {
    if (tableHide.style.display == "none") {
        tableHide.style.display = "";
        hideButton.textContent = "隠した課題の非表示";
        title.style.display = "";
        tableHideDisplay = "";
        localStorage.setItem("hideDisplay", JSON.stringify(tableHideDisplay, undefined, 1));
    } else {
        tableHide.style.display = "none";
        hideButton.textContent = "隠した課題の　表示";
        title.style.display = "none";
        tableHideDisplay = "none";
        localStorage.setItem("hideDisplay", JSON.stringify(tableHideDisplay, undefined, 1));
    }
};

//前回隠した課題を隠す
if (urlPre) {
    for (let j = 0; j < urlPre.length; j++) {
        console.log("P", urlPre[j]);
    }
    for (let i = 1; i < table.rows.length; i++) {
        let trUrl = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
        for (let j = 0; j < urlPre.length; j++) {
            if (trUrl == urlPre[j]) {
                table.getElementsByTagName("tr")[i].style.display = "none";
                tableHide.getElementsByTagName("tr")[i].style.display = "";
            }
        }
    }
}


//隠す課題のURL保存配列
let url = new Array();
for (let i = 1; i < table.rows.length; i++) {
    let tr = table.getElementsByTagName("tr")[i];
    let td = tr.getElementsByTagName("td")[1];
    if (tr.style.display == "none") {
        url.push(td.getElementsByTagName("a")[0].href);
    }
}
localStorage.setItem("displayURL", JSON.stringify(url, undefined, 1));

for (let i = 0; i < url.length; i++) {
    console.log("新規", url[i]);
}


//「隠す」ボタン操作
for (let i = 1; i < Button.length; i++) {
    Button[i].onclick = function () {
        table.getElementsByTagName("tr")[i].style.display = "none";
        tableHide.getElementsByTagName("tr")[i].style.display = "";

        //隠したURLを配列に追加
        url.push(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href);
        localStorage.setItem("displayURL", JSON.stringify(url, undefined, 1));
        for (let k = 0; k < url.length; k++) {
            console.log("隠す", url[k]);
        }

        
    }
}

//「戻す」ボタン操作
for (let i = 1; i < Return.length; i++) {
    Return[i].onclick = function () {
        table.getElementsByTagName("tr")[i].style.display = "";
        tableHide.getElementsByTagName("tr")[i].style.display = "none";

        //戻したURLを配列から削除
        for (let j = 0; j < url.length; j++) {
            if (url[j] == tableHide.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href) {
                url.splice(j, 1);
                localStorage.setItem("displayURL", JSON.stringify(url, undefined, 1));
                for (let k = 0; k < url.length; k++) {
                    console.log("戻す", url[k]);
                }
            }
        }
    }
}