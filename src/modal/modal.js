import "./modal.scss";

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const openBtn = document.querySelector(".info");
const wnd = document.querySelector(".window");

function openModal() {
  document.body.classList.add("modal-opened");
  modal.classList.add("modal-opened");
}

function closeModal() {
  document.body.classList.remove("modal-opened");
  modal.classList.remove("modal-opened");
}

closeBtn.addEventListener("click", closeModal);

openBtn.addEventListener("click", openModal);

modal.addEventListener("click", e => {
  if (e.target.closest(".window") != wnd) closeModal();
});
