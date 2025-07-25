import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('[data-accordion-item]');

  accordionItems.forEach(item => {
    const header = item.querySelector('[data-accordion-header]');
    const content = item.querySelector('[data-accordion-content]');
    const numberSpan = item.querySelector('span');
    const titleH3 = item.querySelector('h3');
    const svgPath = item.querySelector('svg path');

    // Function to open an accordion item
    const openAccordion = (itemToOpen) => {
      // Close all other accordion items
      accordionItems.forEach(otherItem => {
        if (otherItem !== itemToOpen) {
          otherItem.classList.remove('open', 'bg-lime-green');
          otherItem.classList.add('bg-white');
          otherItem.querySelector('[data-accordion-content]').style.maxHeight = null;
          otherItem.querySelector('span').classList.add('text-dark-bg');
          otherItem.querySelector('h3').classList.add('text-dark-bg');
          otherItem.querySelector('svg path').setAttribute('d', 'M12 4v16m8-8H4'); // Change SVG to '+'
        }
      });

      // Open the selected accordion item
      itemToOpen.classList.add('open', 'bg-lime-green');
      itemToOpen.classList.remove('bg-white');
      content.style.maxHeight = content.scrollHeight + 'px'; // Adjust height
      numberSpan.classList.remove('text-dark-bg');
      titleH3.classList.remove('text-dark-bg');
      svgPath.setAttribute('d', 'M20 12H4'); // Change SVG to '-'
    };

    // Function to close an accordion item
    const closeAccordion = (itemToClose) => {
      itemToClose.classList.remove('open', 'bg-lime-green');
      itemToClose.classList.add('bg-white');
      content.style.maxHeight = null; // Collapse content
      numberSpan.classList.add('text-dark-bg');
      titleH3.classList.add('text-dark-bg');
      svgPath.setAttribute('d', 'M12 4v16m8-8H4'); // Change SVG to '+'
    };

    // Initialize state for the item if it has the 'open' class
    if (item.classList.contains('open')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      numberSpan.classList.remove('text-dark-bg');
      titleH3.classList.remove('text-dark-bg');
      item.classList.remove('bg-white');
      item.classList.add('bg-lime-green');
      svgPath.setAttribute('d', 'M20 12H4');
    } else {
      item.classList.add('bg-white');
      numberSpan.classList.add('text-dark-bg');
      titleH3.classList.add('text-dark-bg');
      svgPath.setAttribute('d', 'M12 4v16m8-8H4');
    }

    header.addEventListener('click', () => {
      if (item.classList.contains('open')) {
        closeAccordion(item);
      } else {
        openAccordion(item);
      }
    });
  });
});

// Testimonials Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || !prevBtn || !nextBtn) return; // Exit if elements don't exist
    
    let currentSlide = 0;
    const totalSlides = 4;
    
    // Function to update the carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.remove('bg-gray-600');
                dot.classList.add('bg-lime-green');
            } else {
                dot.classList.remove('bg-lime-green');
                dot.classList.add('bg-gray-600');
            }
        });
    }
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    // Dots functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-advance carousel every 5 seconds (optional)
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        
        // Determine swipe direction
        if (startX - endX > 50) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        } else if (endX - startX > 50) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Custom Radio Buttons
    const radioInputs = document.querySelectorAll('.contact-radio');
    const radioDots = document.querySelectorAll('.radio-dot');
    
    radioInputs.forEach((radio, index) => {
        radio.addEventListener('change', function() {
            // Reset all radio dots
            radioDots.forEach(dot => {
                dot.classList.remove('opacity-100');
                dot.classList.add('opacity-0');
            });
            
            // Show selected radio dot
            if (this.checked) {
                radioDots[index].classList.remove('opacity-0');
                radioDots[index].classList.add('opacity-100');
            }
        });
    });
    
    // Form Submission
  const contactForm = document.getElementById('contactForm');
    if (contactForm) {
          contactForm.addEventListener('submit', function(e) {
              e.preventDefault();
              
              // Get form data
              const formData = new FormData(this);
              const contactType = document.querySelector('.contact-radio:checked').value;
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              
              // Basic validation
              if (!email || !message) {
                  alert('Please fill in all required fields.');
                  return;
              }
              
              // Simulate form submission
              const submitBtn = this.querySelector('button[type="submit"]');
              const originalText = submitBtn.textContent;
              
              submitBtn.textContent = 'Sending...';
              submitBtn.disabled = true;
              
              // Simulate API call
              setTimeout(() => {
                  alert('Thank you for your message! We\'ll get back to you soon.');
                  
                  // Reset form
                  this.reset();
                  
                  // Reset radio buttons to default
                  document.querySelector('.contact-radio[value="say-hi"]').checked = true;
                  radioDots.forEach((dot, index) => {
                      if (index === 0) {
                          dot.classList.add('opacity-100');
                          dot.classList.remove('opacity-0');
                      } else {
                          dot.classList.add('opacity-0');
                          dot.classList.remove('opacity-100');
                      }
                  });
                  
                  // Reset button
                  submitBtn.textContent = originalText;
                  submitBtn.disabled = false;
              }, 2000);
          });
      }
  });