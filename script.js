document.addEventListener("DOMContentLoaded", () => {
  // Read more functionality
  const readMoreBtn = document.getElementById("read-more")
  const moreText = document.getElementById("more-text")

  readMoreBtn.addEventListener("click", () => {
    if (moreText.classList.contains("hidden")) {
      moreText.classList.remove("hidden")
      readMoreBtn.textContent = "Read Less ▲"
    } else {
      moreText.classList.add("hidden")
      readMoreBtn.textContent = "Read More ▼"
    }
  })

  // Memory gallery functionality with videos
  const memories = [
    {
      title: "Our First Date",
      description: "Remember that little café where we talked for hours?",
      video:
        "images/1.mp4",
    },
    {
      title: "",
      description: "",
      video: "images/4.mp4",
    },
    {
      title: "Movie Night",
      description: ".",
      video: "images/2.mp4",
    },
  ]

  const memoryVideo = document.getElementById("memory-video")
  const memoryTitle = document.getElementById("memory-title")
  const memoryDescription = document.getElementById("memory-description")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const galleryDots = document.getElementById("gallery-dots")

  let currentIndex = 0

  // Create dots for each memory
  memories.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      currentIndex = index
      updateGallery()
    })
    galleryDots.appendChild(dot)
  })

  // Update gallery function for videos
  function updateGallery() {
    const memory = memories[currentIndex]

    // Pause current video
    memoryVideo.pause()

    // Update video source with fade effect
    memoryVideo.style.opacity = "0"

    setTimeout(() => {
      // Update video source
      memoryVideo.innerHTML = `<source src="${memory.video}" type="video/mp4">`
      memoryVideo.load() // Important to reload the video with new source

      // Show video once it's ready
      memoryVideo.oncanplay = () => {
        memoryVideo.style.opacity = "1"
      }

      // Update text
      memoryTitle.textContent = memory.title
      memoryDescription.textContent = memory.description

      // Update active dot
      const dots = document.querySelectorAll(".dot")
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
    }, 300)
  }

  // Initialize gallery
  updateGallery()

  // Add event listeners for navigation
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + memories.length) % memories.length
    updateGallery()
  })

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % memories.length
    updateGallery()
  })

  // Add some interactivity to the forgiveness buttons
  const forgiveBtn = document.querySelector(".btn-primary")
  forgiveBtn.addEventListener("click", () => {
    alert("Thank you for forgiving me! ❤️")
  })

  const talkBtn = document.querySelector(".btn-outline")
  talkBtn.addEventListener("click", () => {
    alert("I appreciate you wanting to talk more. Let's make time for that.")
  })

  // WhatsApp button functionality
  const whatsappBtn = document.getElementById("whatsapp-btn")
  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault()

    // Replace this with the actual phone number (include country code, no spaces or symbols)
    const phoneNumber = "2349048827642"

    // Create the message (URL encoded)
    const message = encodeURIComponent("Hi, I saw your apology website. Let's talk.")

    // Generate WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`

    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank")
  })
})

