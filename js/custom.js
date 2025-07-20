// menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.nav-bar-toggler-icon');
    const menu = document.querySelector('.top-bar-mb');

    toggler.addEventListener('click', function () {
      menu.classList.toggle('active');
    });
  });


// subscription show/hide script

document.addEventListener('DOMContentLoaded', function () {
  const subscriptions = document.querySelectorAll('.subscription-option input[type="radio"]');
  const detailGroups = document.querySelectorAll('.subscription-grp .all-details');

  function updateUI(selectedIndex) {
    detailGroups.forEach((group, index) => {
      group.classList.toggle('visible', index === selectedIndex);
      group.classList.toggle('hidden', index !== selectedIndex);
    });

    subscriptions.forEach((radio, index) => {
      const parent = radio.closest('.subscription-option');
      if (index === selectedIndex) {
        parent.classList.remove('inactive');
      } else {
        parent.classList.add('inactive');
      }
    });
  }

  subscriptions.forEach((radio, index) => {
    radio.addEventListener('change', function () {
      if (this.checked) {
        updateUI(index);
      }
    });
  });

  // Initial setup on page load
  subscriptions.forEach((radio, index) => {
    if (radio.checked) {
      updateUI(index);
    }
  });
});



// carousel script

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.querySelector('.product-bg-image img');
  const thumbnails = document.querySelectorAll('.product-thumbnail img');
  const dots = document.querySelectorAll('.dots');
  const nextArrow = document.querySelector('.next-arrow');
  const prevArrow = document.querySelector('.prev-arrow');

  const imageSources = Array.from(thumbnails).map(img => img.src);
  let currentIndex = 0;

  function updateMainImage(index) {
    if (index < 0 || index >= imageSources.length) return;

    // Smooth fade effect
    mainImage.classList.add('fade-out');

    setTimeout(() => {
      mainImage.src = imageSources[index];
      mainImage.classList.remove('fade-out');
    }, 200); // half the transition duration for smoother fade

    currentIndex = index;

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  // Arrow click events
  nextArrow.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % imageSources.length;
    updateMainImage(nextIndex);
  });

  prevArrow.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    updateMainImage(prevIndex);
  });

  // Dot click events
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateMainImage(index);
    });
  });

  // Thumbnail click events
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      updateMainImage(index);
    });
  });

  // Show initial image
  mainImage.src = './assets/images/product-image-original.png';
  currentIndex = imageSources.findIndex(src => src.includes('product-image-original')) || 0;
});



// add to cart url script

 document.addEventListener("DOMContentLoaded", function () {
    const addToCartBtn = document.getElementById("add-to-cart-btn");

    function getSelectedValue(name) {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      return selected ? selected.value : null;
    }

    function updateAddToCartLink() {
      const subscriptionType = getSelectedValue("subscription");
      const fragrance1 = getSelectedValue("fragrance");
      const fragrance2 = getSelectedValue("fragrance2");

      let productUrl = "https://cube.com/cart?";

      if (subscriptionType === "single") {
        productUrl += `type=single&fragrance=${fragrance1}`;
      } else if (subscriptionType === "double") {
        productUrl += `type=double&fragrance1=${fragrance1}&fragrance2=${fragrance2}`;
      }

      // Set the click handler dynamically
      addToCartBtn.onclick = function () {
        window.location.href = productUrl;
      };
    }

    // Set up listeners for all radio buttons
    document.querySelectorAll("input[type=radio]").forEach((radio) => {
      radio.addEventListener("change", updateAddToCartLink);
    });

    // Initialize button link on page load
    updateAddToCartLink();
  });



// counter script

document.addEventListener("DOMContentLoaded", function () {
    const numbersSection = document.querySelector(".numbers-section");
    const numbers = document.querySelectorAll(".single-number h6");
    let hasAnimated = false;

    function animateValue(el, end, duration) {
      let start = 0;
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * end) + "%";
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            numbers.forEach(number => {
              const value = parseInt(number.textContent);
              animateValue(number, value, 2000);
            });
            hasAnimated = true;
            observer.unobserve(numbersSection); // Stop observing after animation
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(numbersSection);
  });



// accordion script

document.addEventListener('DOMContentLoaded', function () {
  const accordionButtons = document.querySelectorAll('.accordion-item h5');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open', 'close');
        i.classList.add('close');
      });

      if (!isOpen) {
        item.classList.remove('close');
        item.classList.add('open');
      }
    });
  });
});


// lazy loading script

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img:not([loading])");
  images.forEach(img => {
    img.setAttribute("loading", "lazy");
  });
});
