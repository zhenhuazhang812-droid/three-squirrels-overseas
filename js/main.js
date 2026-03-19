/* =====================================================
   Three Squirrels Overseas - Main JavaScript
   Version: 1.0.0
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initHeader();
  initMobileNav();
  initBackToTop();
  initScrollReveal();
  initCounterAnimations();
  initVideoModal();
  initProductFilters();
  initProductGallery();
  initContactForm();
  initCheckboxGroups();
  initViewToggle();
  initVideoFilters();
});

/* =====================================================
   Header Scroll Effect
   ===================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* =====================================================
   Mobile Navigation
   ===================================================== */
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when clicking on links
  const mobileLinks = mobileNav.querySelectorAll('.nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* =====================================================
   Back to Top Button
   ===================================================== */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =====================================================
   Scroll Reveal Animation
   ===================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));
}

/* =====================================================
   Counter Animation
   ===================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);

        let current = start;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            el.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toLocaleString();
          }
        };

        updateCounter();
        counterObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* =====================================================
   Video Modal
   ===================================================== */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  if (!modal) return;

  const modalVideo = modal.querySelector('video');
  const closeBtn = modal.querySelector('.video-modal-close');
  const videoCards = document.querySelectorAll('.video-card[data-video]');

  // Open modal
  videoCards.forEach(card => {
    card.addEventListener('click', function() {
      const videoSrc = this.dataset.video;
      if (videoSrc) {
        modalVideo.src = videoSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo.play();
      }
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* =====================================================
   Product Filters
   ===================================================== */
function initProductFilters() {
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
  const productCards = document.querySelectorAll('.products-full-grid .product-card');

  if (filterCheckboxes.length === 0 || productCards.length === 0) return;

  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });

  function filterProducts() {
    const activeFilters = Array.from(filterCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    productCards.forEach(card => {
      const categories = card.dataset.categories ? card.dataset.categories.split(',') : [];

      if (activeFilters.length === 0) {
        card.style.display = '';
      } else {
        const matches = activeFilters.some(filter => categories.includes(filter));
        card.style.display = matches ? '' : 'none';
      }
    });

    updateProductCount();
  }

  function updateProductCount() {
    const countEl = document.querySelector('.products-count');
    if (!countEl) return;

    const visibleProducts = document.querySelectorAll('.products-full-grid .product-card:not([style*="display: none"])');
    countEl.textContent = `Showing ${visibleProducts.length} products`;
  }
}

/* =====================================================
   Product Gallery
   ===================================================== */
function initProductGallery() {
  const mainImage = document.querySelector('.product-main-image img');
  const thumbnails = document.querySelectorAll('.product-thumbnail');

  if (!mainImage || thumbnails.length === 0) return;

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const newSrc = this.querySelector('img').src;
      mainImage.src = newSrc;

      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* =====================================================
   Contact Form
   ===================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const inputs = form.querySelectorAll('input, select, textarea');

  // Real-time validation on blur
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent!';
        submitBtn.classList.add('success');

        setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
        }, 2000);
      }, 1500);
    }
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Required check
    if (field.required && !value) {
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
      }
    }

    // Min length check
    if (field.minLength && value.length < field.minLength) {
      isValid = false;
    }

    if (isValid) {
      field.classList.remove('error');
    } else {
      field.classList.add('error');
    }

    return isValid;
  }
}

/* =====================================================
   Checkbox Groups (for product interests)
   ===================================================== */
function initCheckboxGroups() {
  const checkboxItems = document.querySelectorAll('.checkbox-item');

  checkboxItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');

    if (checkbox) {
      item.addEventListener('click', function(e) {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }

        if (checkbox.checked) {
          item.classList.add('checked');
        } else {
          item.classList.remove('checked');
        }
      });
    }
  });
}

/* =====================================================
   View Toggle (Grid/List)
   ===================================================== */
function initViewToggle() {
  const viewBtns = document.querySelectorAll('.view-btn');
  const productsGrid = document.querySelector('.products-full-grid');

  if (viewBtns.length === 0 || !productsGrid) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.dataset.view;

      viewBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      if (view === 'list') {
        productsGrid.classList.add('products-list-view');
      } else {
        productsGrid.classList.remove('products-list-view');
      }
    });
  });
}

/* =====================================================
   Video Filters
   ===================================================== */
function initVideoFilters() {
  const filterBtns = document.querySelectorAll('.video-filters .filter-btn');
  const videoCards = document.querySelectorAll('.videos-full-grid .video-card');

  if (filterBtns.length === 0 || videoCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter videos
      videoCards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =====================================================
   Search Functionality (with debounce)
   ===================================================== */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search initialization for products
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-box input');

  if (searchInput) {
    const handleSearch = debounce(function() {
      const query = this.value.toLowerCase().trim();
      const productCards = document.querySelectorAll('.products-full-grid .product-card');

      productCards.forEach(card => {
        const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.product-category')?.textContent.toLowerCase() || '';

        if (query === '' || name.includes(query) || category.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }, 300);

    searchInput.addEventListener('input', handleSearch);
  }
});

/* =====================================================
   Pagination
   ===================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const paginationBtns = document.querySelectorAll('.pagination-btn');
  const productsGrid = document.querySelector('.products-full-grid');

  if (paginationBtns.length === 0) return;

  const itemsPerPage = 12;
  let currentPage = 1;

  paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.dataset.page;

      if (page === 'prev') {
        currentPage = Math.max(1, currentPage - 1);
      } else if (page === 'next') {
        currentPage++;
      } else {
        currentPage = parseInt(page);
      }

      updatePagination();
      scrollToProducts();
    });
  });

  function updatePagination() {
    const allProducts = productsGrid.querySelectorAll('.product-card');
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    // Update active button
    paginationBtns.forEach(btn => {
      const page = btn.dataset.page;
      if (parseInt(page) === currentPage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Show/hide products based on page
    allProducts.forEach((product, index) => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      if (index >= start && index < end) {
        product.style.display = '';
        product.style.animation = 'fadeUp 0.5s ease forwards';
      } else {
        product.style.display = 'none';
      }
    });
  }

  function scrollToProducts() {
    const productsSection = document.querySelector('.products-main');
    if (productsSection) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = productsSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
});

/* =====================================================
   Smooth Scroll for Anchor Links
   ===================================================== */
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href^="#"]');

  if (link) {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
});

/* =====================================================
   Lazy Loading Images
   ===================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

/* =====================================================
   Loading Screen
   ===================================================== */
window.addEventListener('load', function() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 500);
  }
});
