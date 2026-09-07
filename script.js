const form = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");
const roleInput = form.elements.role;
const showPasswordButton = document.querySelector(".show-password");
const submitButton = document.querySelector(".submit-button");
const responsePanel = document.querySelector(".response-panel");
const responseOutput = document.querySelector("#response-output code");
const statusCode = document.querySelector("#status-code");
const hintButton = document.querySelector("#hint-button");
const hint = document.querySelector("#hint");
const resetButton = document.querySelector("#reset-button");

const defaultResponse = {
  status: "ready",
  message: "Kirim form untuk memulai."
};

const hints = [
  "Tekan F12 atau klik kanan → Inspect, lalu cari elemen <form>.",
  "Tidak semua data form terlihat di layar. Periksa input dengan type=\"hidden\".",
  "Aplikasi memercayai nilai field role. Ubah value-nya menjadi admin sebelum mengirim form."
];

let hintIndex = 0;

function renderResponse(data, state = "") {
  responseOutput.textContent = JSON.stringify(data, null, 2);
  responsePanel.classList.remove("success", "error");
  if (state) responsePanel.classList.add(state);
  statusCode.textContent = state === "success" ? "200 OK" : state === "error" ? "403 FORBIDDEN" : "MENUNGGU";
}

showPasswordButton.addEventListener("click", () => {
  const willShow = passwordInput.type === "password";
  passwordInput.type = willShow ? "text" : "password";
  showPasswordButton.textContent = willShow ? "Tutup" : "Lihat";
  showPasswordButton.setAttribute("aria-label", willShow ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
  showPasswordButton.setAttribute("aria-pressed", String(willShow));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  submitButton.firstElementChild.textContent = "Memproses…";

  const data = new FormData(form);
  const role = String(data.get("role") || "").toLowerCase();

  window.setTimeout(() => {
    if (role === "admin") {
      renderResponse({
        status: "ADMIN_GRANTED",
        message: "Berhasil! Browser berhasil memalsukan role.",
        lesson: "Otorisasi harus diverifikasi ulang oleh server."
      }, "success");
    } else {
      renderResponse({
        status: "USER_ONLY",
        message: "Login valid, tetapi akses admin ditolak.",
        receivedRole: role || null
      }, "error");
    }

    submitButton.disabled = false;
    submitButton.firstElementChild.textContent = "Kirim request";
  }, 450);
});

hintButton.addEventListener("click", () => {
  hint.hidden = false;
  hint.textContent = hints[hintIndex];
  hintIndex = Math.min(hintIndex + 1, hints.length - 1);
  hintButton.textContent = hintIndex === hints.length - 1 ? "Petunjuk terakhir" : `Buka petunjuk ${hintIndex + 1}/3`;
});

resetButton.addEventListener("click", () => {
  form.reset();
  roleInput.value = "user";
  passwordInput.type = "password";
  showPasswordButton.textContent = "Lihat";
  showPasswordButton.setAttribute("aria-label", "Tampilkan kata sandi");
  showPasswordButton.setAttribute("aria-pressed", "false");
  hintIndex = 0;
  hint.hidden = true;
  hint.textContent = "";
  hintButton.textContent = "Buka petunjuk 1/3";
  renderResponse(defaultResponse);
});

renderResponse(defaultResponse);
