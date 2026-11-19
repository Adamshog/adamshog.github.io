const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false"
    );
  });
}
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => nav?.classList.remove("open"))
  );
const slides = [...document.querySelectorAll(".hero-slide")],
  dots = [...document.querySelectorAll(".slider-dot")];
let current = 0,
  timer;
function showSlide(n) {
  if (!slides.length) return;
  current = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle("active", i === current));
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}
function restart() {
  clearInterval(timer);
  if (slides.length > 1)
    timer = setInterval(() => showSlide(current + 1), 5500);
}
dots.forEach((d, i) =>
  d.addEventListener("click", () => {
    showSlide(i);
    restart();
  })
);
if (slides.length) {
  showSlide(0);
  restart();
}

document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

const quoteButton = document.getElementById("quoteBtn");

if (quoteButton) {
  quoteButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (quoteButton.disabled) return;
    quoteButton.disabled = true;

    const payload = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      location: document.getElementById("location").value,
      service: document.getElementById("service").value,
      details: document.getElementById("details").value,
    };

    let isSuccess = false;

    try {
      const res = await fetch(
        "https://us-central1-incotech-projects.cloudfunctions.net/sendAgoerPlumbingSolutionsQuoteRequest",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      isSuccess = true;
    } catch (error) {
      console.error("Quote request error:", error);
      alert("Sorry, something went wrong");
      quoteButton.disabled = false;
    }

    if (isSuccess) {
      alert("Quote request sent, we will get back to you shortly");
      window.location.reload();
    }
  });
}
