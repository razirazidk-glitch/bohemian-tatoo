/**
 * BOHEMIAN TATOO — CHRISTIANIA, KØBENHAVN
 * Main Interactive Frontend JavaScript Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initGalleryFiltersAndLightbox();
  initAftercareAccordion();
  initBookingForm();
  initHeaderScrollEffect();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION & DRAWER
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-drawer .nav-link, .mobile-nav-drawer .btn');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   2. GALLERY FILTERING & LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initGalleryFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxArtist = document.getElementById('lightbox-artist');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const bookSimilarBtn = document.getElementById('lightbox-book-btn');

  if (!filterBtns.length || !galleryCards.length) return;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Lightbox click handler
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const tag = card.getAttribute('data-tag');
      const artist = card.getAttribute('data-artist');
      const desc = card.getAttribute('data-desc');

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxImg) lightboxImg.alt = title;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxTag) lightboxTag.textContent = tag;
      if (lightboxArtist) lightboxArtist.textContent = `Udført af: ${artist}`;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      if (lightboxModal) {
        lightboxModal.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (bookSimilarBtn) {
    bookSimilarBtn.addEventListener('click', () => {
      closeLightbox();
      const styleSelect = document.getElementById('booking-style');
      if (styleSelect && lightboxTag) {
        // Match style in booking form
        for (let i = 0; i < styleSelect.options.length; i++) {
          if (lightboxTag.textContent.toLowerCase().includes(styleSelect.options[i].text.toLowerCase())) {
            styleSelect.selectedIndex = i;
            break;
          }
        }
      }
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-visible')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   3. AFTERCARE ACCORDION
   -------------------------------------------------------------------------- */
function initAftercareAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Close other items
      items.forEach(otherItem => {
        otherItem.classList.remove('is-active');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('is-active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion item by default
  if (items.length > 0) {
    items[0].classList.add('is-active');
    const firstContent = items[0].querySelector('.accordion-content');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }
}

/* --------------------------------------------------------------------------
   4. BOOKING FORM SUBMISSION & CONFIRMATION
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const confirmModal = document.getElementById('confirmation-modal');
  const confirmCloseBtn = document.querySelector('.confirmation-close-btn');
  const confirmOkBtn = document.getElementById('confirmation-ok-btn');
  const bookingRef = document.getElementById('booking-ref-number');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Generate reference number
    const randomRef = 'BT-' + Math.floor(100000 + Math.random() * 900000);
    if (bookingRef) bookingRef.textContent = randomRef;

    // Show confirmation modal
    if (confirmModal) {
      confirmModal.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }

    form.reset();
  });

  function closeConfirmModal() {
    if (confirmModal) {
      confirmModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  if (confirmCloseBtn) confirmCloseBtn.addEventListener('click', closeConfirmModal);
  if (confirmOkBtn) confirmOkBtn.addEventListener('click', closeConfirmModal);
  if (confirmModal) {
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) closeConfirmModal();
    });
  }
}

/* --------------------------------------------------------------------------
   5. HEADER SCROLL SHADOW
   -------------------------------------------------------------------------- */
function initHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}
