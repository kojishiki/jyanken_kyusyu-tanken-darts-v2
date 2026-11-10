const places = [
  {  
    name: "福岡 | 海の中道海浜公園",
    mission: "お気に入りの景色を３つ見つけて撮影しよう！",
    image: "images/uminonaka.jpg",
    extras: ["images/uminonaka-flower.jpeg"]
  },

  {
    name: "佐賀 | 吉野ヶ里歴史公園",
    mission: "昔の暮らしを想像して、発見したことを一つ話そう！",
    image: "images/yoshinogari.jpg",
    extras: ["images/yoshinogari-flower.jpeg"]
  },

  {
    name: "大分 | くじゅう花公園",
    mission: "好きな花を探して花の名前と花言葉を３つ覚えよう！",
    image: "images/kuju.jpg",
    extras: ["images/kuju-flower.jpeg"]
  }
];

const button = document.getElementById("draw");
const dart = document.querySelector(".dart");
const dartarea = document.querySelector(".dart-area");
button.addEventListener("click", function() {

  document.getElementById("result").hidden = true;
  dartarea.hidden = false;
  dart.classList.add("flying");
  button.disabled = true;
  button.textContent = "🎯 探検先を探しています...";

const random = Math.random() * places.length;
const number = Math.floor(random);


//探索先とミッションを表示
document.getElementById("place").textContent = places[number].name;
document.getElementById("mission").textContent = places[number].mission;

//写真を表示

const images = [
  places[number].image,
  places[number].extras[0]
];

const photoIds = ["photo", "photo2"];

photoIds.forEach(function(id, i) {
  const photo = document.getElementById(id);
  photo.src = images[i];
});


//Googleマップのリンクを表示
const maplink =document.getElementById("map-link");
maplink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(places[number].name);
maplink.hidden = false;
});

dart.addEventListener("animationend", function() {

  dart.classList.remove("flying");
  dartarea.hidden = true;

  document.getElementById("result").hidden = false;

  button.disabled = false;
  button.textContent = "🎯　別の探検先を探す！";

});