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


//探索先とミッションを表示
document.getElementById("place").textContent = selectedPlace.name;
document.getElementById("mission").textContent = selectedPlace.mission;


  // 子ども・ペット同伴情報を表示
  const statusLabels = {
    ok: "同伴OK",
    ng: "同伴NG",
    conditional: "条件付きOK",
    unknown: "要確認"
  };

  document.getElementById("kids-info").textContent =
    "👨‍👩‍👧 子ども連れ：" + statusLabels[selectedPlace.kids];

  document.getElementById("kids-note").textContent =
    selectedPlace.kidNote;

  document.getElementById("pets-info").textContent =
    "🐶 ペット連れ：" + statusLabels[selectedPlace.pets];

  document.getElementById("pets-note").textContent =
    selectedPlace.petNote;



//写真を表示
const images = [
  selectedPlace.image,
  selectedPlace.extras[0]
];

const photoIds = ["photo", "photo2"];

photoIds.forEach(function(id, i) {
  const photo = document.getElementById(id);
  photo.src = images[i];
});


//Googleマップのリンクを表示
const maplink =document.getElementById("map-link");
maplink.href = 
"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(selectedPlace.name);
maplink.hidden = false;
});

dart.addEventListener("animationend", function() {

  dart.classList.remove("flying");
  dartarea.hidden = true;

  document.getElementById("result").hidden = false;

  button.disabled = false;
  button.textContent = "🎯　別の探検先を探す！";

});