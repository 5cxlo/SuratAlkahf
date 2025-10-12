// ---------------------------
// 📖 Surat Al-Kahf Web Script
// ---------------------------

let container = document.getElementById("ayahContainer");
let toggleModeBtn = document.getElementById("toggleMode");
let playAudioBtn = document.getElementById("playAudio");
let shareBtn = document.getElementById("shareBtn");
let audio = new Audio("audio/alkahf.mp3");
let isPlaying = false;

// 🎧 تشغيل/إيقاف التلاوة
playAudioBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playAudioBtn.textContent = "▶️ استماع";
  } else {
    audio.play();
    playAudioBtn.textContent = "⏸️ إيقاف";
  }
  isPlaying = !isPlaying;
});

// 🌗 تبديل الخلفية
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleModeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ خلفية فاتحة"
    : "🌙 خلفية داكنة";
});

// 📤 زر المشاركة
shareBtn.addEventListener("click", async () => {
  try {
    await navigator.share({
      title: "سورة الكهف",
      text: "اقرأ واستمع إلى سورة الكهف 🌿",
      url: window.location.href,
    });
  } catch (err) {
    alert("انسخ الرابط للمشاركة يدويًا ✅");
  }
});

// 📜 تحميل السورة من JSON
fetch("surah.json")
  .then((res) => res.json())
  .then((data) => {
    data.ayah.forEach((v) => {
      let div = document.createElement("div");
      div.className = "ayah";
      div.innerHTML = `<span class="num">﴿${v.n}﴾</span> ${v.a}`;
      container.appendChild(div);
    });

    // 🕊️ دعاء ختامي
    let note = document.createElement("p");
    note.className = "note";
    note.textContent = data.note;
    container.appendChild(note);
  });
