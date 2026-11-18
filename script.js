const places = [
  {  
    name: "福岡 | 海の中道海浜公園",
    mission: "お気に入りの景色を３つ見つけて撮影しよう！",
    image: "images/uminonaka.jpg",
    extras: ["images/uminonaka-flower.jpeg"],

    //気分・同行条件の追加
    moods: ["exciting", "moving", "active"],
    kids: "ok",
    kidNote: "",
    pets: "unknown",
    petNote: "ペット同伴の利用条件は未確認です"
  },

  {
    name: "佐賀 | 吉野ヶ里歴史公園",
    mission: "昔の暮らしを想像して、発見したことを一つ話そう！",
    image: "images/yoshinogari.jpg",
    extras: ["images/yoshinogari-flower.jpeg"],

    //気分・同行条件の追加
    moods: ["exciting", "learning"],
    kids: "ok",
    kidNote: "",
    pets: "unknown",
    petNote: "ペット同伴の利用条件は未確認です"
  },

  {
    name: "大分 | くじゅう花公園",
    mission: "好きな花を探して花の名前と花言葉を３つ覚えよう！",
    image: "images/kuju.jpg",
    extras: ["images/kuju-flower.jpeg"],

    //気分・同行条件の追加
    moods: ["moving", "active"],
    kids: "ok",
    kidNote: "",
    pets: "unknown",
    petNote: "ペット同伴の利用条件は未確認です"
  }
];

const button = document.getElementById("draw");
const dart = document.querySelector(".dart");
const dartarea = document.querySelector(".dart-area");
button.addEventListener("click", function() {


  // 結果が表示されているときは条件選択画面に戻る
  if (!document.getElementById("result").hidden) {
    document.getElementById("result").hidden = true;
    document.getElementById("filter-area").hidden = false;

    button.textContent = "🎯 ダーツを投げる！";
    return;
  }


//ユーザーが選んだ条件を取得する
const mood = document.getElementById("mood").value;
const withKids = document.getElementById("with-kids").checked;
const withPets = document.getElementById("with-pets").checked;


// 条件に合う探検先だけを取り出す
const candidates = places.filter(function(place) {
  
  const moodOK =
  mood === "random" || place.moods.includes(mood);
  
  const kidsOK =
  !withKids ||
  place.kids === "ok" ||
  place.kids === "conditional";
  
  const petsOK =
  !withPets ||
  place.pets === "ok" ||
  place.pets === "conditional";
  
  return moodOK && kidsOK && petsOK;
});
// 条件に合う探検先だけを取り出す。ここまで


  // 条件に合う探検先が0件なら抽選しない
  if (candidates.length === 0) {
    alert("条件に合う探検先がありません。条件を変更してね！");
    return;
  }

  // 候補がある場合だけダーツを飛ばす 前回は上部ifの前にこのコード置いていたが条件分岐でダーツのアニメーションを防ぐ
  document.getElementById("result").hidden = true;

  // 条件選択エリアを隠す
  document.getElementById("filter-area").hidden = true;
  //
  
  dartarea.hidden = false;
  dart.classList.add("flying");
  button.disabled = true;
  button.textContent = "🎯 探検先を探しています...";


  // 条件に合う探検先からランダムで1か所選ぶ
  const random = Math.random() * candidates.length;
  const number = Math.floor(random);
  const selectedPlace = candidates[number];

  // 選ばれた観光地の詳細情報を表示する
  showPlaceDetail(selectedPlace);

// ダーツから開いた場合は、行きたいリストへの戻るボタンを隠す
document.getElementById("back-to-want-list").hidden = true;


});


// ダーツのアニメーションが終わったときの処理
dart.addEventListener("animationend", function() {

  dart.classList.remove("flying");
  dartarea.hidden = true;

  // 結果を表示する
  document.getElementById("result").hidden = false;

  // ダーツボタンを再び使えるようにする
  button.disabled = false;
  button.textContent = "🎯 別の探検先を探す！";

});





// 行きたい場所リストを画面に表示する
function showWantToGoList() {

  // 保存済みの場所を取得する
  const savedPlaces = JSON.parse(localStorage.getItem("wantToGo")) || [];

  // HTMLのリストを取得する
  const list = document.getElementById("want-to-go-list");

  // 一度リストの中身を空にする
  list.innerHTML = "";

  // 保存した場所を1件ずつ表示する
  savedPlaces.forEach(function(placeName) {

    const li = document.createElement("li");
   
// 観光地の詳細を開くボタンを作る
const placeButton = document.createElement("button");

placeButton.type = "button";
placeButton.textContent = "📍 " + placeName;

// ボタンが押されたときの処理

placeButton.addEventListener("click", function() {

  // 保存した名前と一致する観光地を探す
  const selectedPlace = places.find(function(place) {
    return place.name === placeName;
  });

  // 観光地が見つかった場合
  if (selectedPlace) {

    // 共通関数を呼び出す
    showPlaceDetail(selectedPlace);

    // 行きたいリストを隠す
    wantToGoArea.hidden = true;

    // 詳細画面を表示する
    document.getElementById("result").hidden = false;

// 行きたいリストへの戻るボタンを表示
document.getElementById("back-to-want-list").hidden = false;

  }

});

// リストの中にボタンを追加
li.appendChild(placeButton);

    list.appendChild(li);

  });
}

// ページを開いたときにリストを表示する
showWantToGoList();


// 行きたいリストの画面切り替え
const openWantListButton = document.getElementById("open-want-list");
const backToDartsButton = document.getElementById("back-to-darts");
const wantToGoArea = document.getElementById("want-to-go-area");

// 行きたいリストを開く
openWantListButton.addEventListener("click", function() {

  // ダーツ画面の各エリアを隠す
  document.querySelector(".header").hidden = true;
  document.getElementById("result").hidden = true;
  document.getElementById("filter-area").hidden = true;
  document.querySelector(".button-area").hidden = true;

  // リストを開くボタンを隠す
  openWantListButton.hidden = true;

  // ダーツの画像エリアを隠す
  dartarea.hidden = true;

  // 行きたいリストを表示する
  wantToGoArea.hidden = false;
  showWantToGoList();

});


// ダーツ画面に戻る
backToDartsButton.addEventListener("click", function() {

  // 行きたいリストを隠す
  wantToGoArea.hidden = true;

  // ダーツ画面を表示する
  document.querySelector(".header").hidden = false;
  document.querySelector(".button-area").hidden = false;
  openWantListButton.hidden = false;

  // 条件選択画面に戻す
  document.getElementById("filter-area").hidden = false;
  document.getElementById("result").hidden = true;

  // ダーツの画像エリアを隠した状態に戻す
  dartarea.hidden = true;

  // ダーツボタンの文字を戻す
  button.textContent = "🎯 ダーツを投げる！";

});




// 行きたい場所を保存するボタンを取得
const savePlaceButton = document.getElementById("save-place");

// 保存ボタンが押されたときの処理
savePlaceButton.addEventListener("click", function() {

  // 表示中の観光地の名前を取得
  const placeName = document.getElementById("place").textContent;

  // 保存済みの場所を取得
  const savedPlaces = JSON.parse(localStorage.getItem("wantToGo")) || [];

  // まだ保存されていない場合
  if (!savedPlaces.includes(placeName)) {

    // リストに追加
    savedPlaces.push(placeName);

    // ブラウザに保存
    localStorage.setItem("wantToGo", JSON.stringify(savedPlaces));

    // 行きたいリストを更新
    showWantToGoList();

    alert(placeName + " を行きたい場所に追加したよ！");

  } else {

    alert("この場所はすでに登録されているよ！");

  }

});

// 観光地の詳細情報を表示する共通関数
function showPlaceDetail(place) {

  // 観光地の名前とミッション
  document.getElementById("place").textContent = place.name;
  document.getElementById("mission").textContent = place.mission;

  // 同行条件の表示用ラベル
  const statusLabels = {
    ok: "同伴OK",
    ng: "同伴NG",
    conditional: "条件付きOK",
    unknown: "要確認"
  };

  // 子ども・ペットの情報
  document.getElementById("kids-info").textContent =
    "👨‍👩‍👧 子ども連れ：" + statusLabels[place.kids];

  document.getElementById("kids-note").textContent = place.kidNote;

  document.getElementById("pets-info").textContent =
    "🐶 ペット連れ：" + statusLabels[place.pets];

  document.getElementById("pets-note").textContent = place.petNote;

  // 写真
  document.getElementById("photo").src = place.image;
  document.getElementById("photo2").src = place.extras[0];

  // Googleマップ
  const maplink = document.getElementById("map-link");

  maplink.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(place.name);

  maplink.hidden = false;
}

// 行きたいリストに戻るボタンを取得
const backToWantListButton = document.getElementById("back-to-want-list");

// 戻るボタンを押したときの処理
backToWantListButton.addEventListener("click", function() {

  // 観光地の詳細画面を隠す
  document.getElementById("result").hidden = true;

  // 戻るボタンを隠す
  backToWantListButton.hidden = true;

  // 行きたいリストを表示する
  wantToGoArea.hidden = false;

  // 保存済みの場所を一覧に表示する
  showWantToGoList();

});