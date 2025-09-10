// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")
  const mobileLinks = document.querySelectorAll(".nav-mobile-link")

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    mobileNav.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      mobileNav.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileMenuBtn.classList.remove("active")
      mobileNav.classList.remove("active")
    }
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  let lastScrollTop = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Contact form button
  const contactForm = document.getElementById("contactForm")
  contactForm.addEventListener("click", (e) => {
    e.preventDefault()
    // Replace with your Google Form URL
    const googleFormUrl = "https://forms.google.com/your-form-url"
    window.open(googleFormUrl, "_blank")
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".observatorio-card, .informe-card, .novedad-card, .stat-item")
  animatedElements.forEach((el) => observer.observe(el))

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link, .nav-mobile-link")

  window.addEventListener("scroll", () => {
    let current = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debounce to scroll events
  const debouncedScroll = debounce(() => {
    // Any scroll-based functionality can be added here
  }, 10)

  window.addEventListener("scroll", debouncedScroll)

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      mobileMenuBtn.classList.remove("active")
      mobileNav.classList.remove("active")
    }
  })

  // Console log for debugging
  console.log("[v0] Website initialized successfully")
})

// Utility functions
function isMobile() {
  return window.innerWidth <= 768
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

function isDesktop() {
  return window.innerWidth > 1024
}

// Export functions for potential use in other scripts
window.WebsiteUtils = {
  isMobile,
  isTablet,
  isDesktop,
}
