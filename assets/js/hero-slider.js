document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  let current = 0;
  let interval;

  // Generar slices para cada slide
  slides.forEach((slide) => {
    for (let i = 0; i < 6; i++) {
      const slice = document.createElement("div");
      slice.classList.add("slice");
      slice.style.backgroundImage = `var(--bg)`;
      slice.style.backgroundPosition = `${(i * 100) / 5}% center`;
      slide.appendChild(slice);
    }
  });

  // Crear dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  const dots = dotsContainer.querySelectorAll("button");

  function goToSlide(index) {
    if (index === current) return;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    // Animación de salida (fragmentación hacia costados)
    const slices = currentSlide.querySelectorAll(".slice");
    slices.forEach((slice, i) => {
      const direction = i % 2 === 0 ? -100 : 100;
      slice.style.transform = `translateX(${direction}%)`;
      slice.style.opacity = 0;
    });

    // Esperar la animación y mostrar el siguiente
    setTimeout(() => {
      currentSlide.classList.remove("active");
      currentSlide.querySelectorAll(".slice").forEach((slice) => {
        slice.style.transform = "translateX(0)";
        slice.style.opacity = 1;
      });

      nextSlide.classList.add("active");
      current = index;
      updateDots();
    }, 800); // tiempo igual a la animación CSS
  }

  function updateDots() {
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === current)
    );
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    goToSlide(next);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }

  // Init
  startAutoplay();
});
