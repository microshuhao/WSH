const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navbtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");
navbtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navbtn.setAttribute("aria-expanded", open ? "true" : "false");
});
nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("is-open"));
});

// Photo lightbox (works on project pages too)
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

function openLightbox(src, alt){
  if(!lightbox || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt || "Expanded photo";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  if(!lightbox || !lbImg) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".card img").forEach(img => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});
lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if(e.target === lightbox) closeLightbox();
});

// Film modal (MP4)
const modal = document.getElementById("modal");
const mBody = document.getElementById("mBody");
const mClose = document.getElementById("mClose");

function openModalMp4(src){
  if(!modal || !mBody) return;
  mBody.innerHTML = "";

  const v = document.createElement("video");
  v.src = src;
  v.controls = true;
  v.autoplay = true;
  v.playsInline = true;
  v.style.width = "100%";
  v.style.height = "100%";
  mBody.appendChild(v);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  if(!modal || !mBody) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  mBody.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".film").forEach(item => {
  item.addEventListener("click", () => {
    if(item.dataset.type === "mp4"){
      openModalMp4(item.dataset.src);
    }
  });
});

mClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  if(e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    closeLightbox();
    closeModal();
  }
});