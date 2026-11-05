/**
 * FORKMAX — INDUSTRIAL EQUIPMENT SOLUTIONS
 * Interactive Engine & UI Controller
 */

// 1. Initialize Lucide Icons
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 2. Sticky Header Scroll Effect & Scrollspy
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const sections = document.querySelectorAll('section[id]');

function handleScroll() {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class to header
  if (header) {
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Scrollspy: update active nav item
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

// 3. Mobile Navigation Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenuBtn.classList.toggle('open');
    mobileDrawer.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());
    mobileDrawer.setAttribute('aria-hidden', (!isOpen).toString());
  });

  // Close mobile drawer when clicking any link inside
  const mobileLinks = mobileDrawer.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('open');
      mobileDrawer.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    });
  });
}

// 4. Reference 1 Inspired Hero Equipment Showcase Switcher
const heroFleet = [
  {
    index: '01',
    name: 'FORKMAX FX-3000D',
    sub: '3.0 Ton Compact Yard & Container Lift',
    cap: '3,000 KG',
    height: '4,500 MM',
    engine: 'Turbo Diesel',
    mast: 'Triplex FFL'
  },
  {
    index: '02',
    name: 'FORKMAX FX-5000D',
    sub: '5.0 Ton Heavy-Duty Industrial Workhorse',
    cap: '5,000 KG',
    height: '4,500 MM',
    engine: 'Industrial Diesel',
    mast: 'Triplex FFL'
  },
  {
    index: '03',
    name: 'FORKMAX FX-10000D',
    sub: '10.0 Ton High-Capacity Steel & Yard Lift',
    cap: '10,000 KG',
    height: '5,000 MM',
    engine: 'Heavy Turbo Diesel',
    mast: 'Reinforced Wide-View'
  },
  {
    index: '04',
    name: 'FORKMAX FX-16000D',
    sub: '16.0 Ton Port & Heavy Infrastructure Lifter',
    cap: '16,000 KG',
    height: '6,500 MM',
    engine: 'High-Displacement Tier Diesel',
    mast: 'Failsafe Duplex'
  }
];

let currentHeroEqIndex = 1; // Default to 5.0T (index 1)

function updateHeroEquipment(index) {
  const item = heroFleet[index];
  if (!item) return;

  const eqIndex = document.getElementById('eqIndex');
  const eqName = document.getElementById('eqName');
  const eqSub = document.getElementById('eqSub');
  const eqCap = document.getElementById('eqCap');
  const eqHeight = document.getElementById('eqHeight');
  const eqEngine = document.getElementById('eqEngine');
  const eqMast = document.getElementById('eqMast');

  if (eqIndex) eqIndex.textContent = item.index;
  if (eqName) eqName.textContent = item.name;
  if (eqSub) eqSub.textContent = item.sub;
  if (eqCap) eqCap.textContent = item.cap;
  if (eqHeight) eqHeight.textContent = item.height;
  if (eqEngine) eqEngine.textContent = item.engine;
  if (eqMast) eqMast.textContent = item.mast;
}

const prevEqBtn = document.getElementById('prevEqBtn');
const nextEqBtn = document.getElementById('nextEqBtn');

if (prevEqBtn && nextEqBtn) {
  prevEqBtn.addEventListener('click', () => {
    currentHeroEqIndex = (currentHeroEqIndex - 1 + heroFleet.length) % heroFleet.length;
    updateHeroEquipment(currentHeroEqIndex);
  });

  nextEqBtn.addEventListener('click', () => {
    currentHeroEqIndex = (currentHeroEqIndex + 1) % heroFleet.length;
    updateHeroEquipment(currentHeroEqIndex);
  });
}

// 5. Equipment Section Tab Switcher
const eqTabBtns = document.querySelectorAll('.eq-tab-btn');
const eqPanes = document.querySelectorAll('.eq-pane');

eqTabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTabId = btn.getAttribute('data-tab');

    // Update active tab button
    eqTabBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Update visible pane
    eqPanes.forEach((pane) => {
      pane.classList.remove('active');
      if (pane.getAttribute('id') === targetTabId) {
        pane.classList.add('active');
      }
    });

    // Re-trigger icon rendering for any dynamic elements inside
    initIcons();
  });
});

// 6. Preselect Service in Enquiry Form
window.preselectService = function (serviceName) {
  const serviceSelect = document.getElementById('serviceRequired');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }
};

// 7. Contact & Enquiry Form Validation & Submission
const enquiryForm = document.getElementById('enquiryForm');
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phoneNumber');
const serviceSelect = document.getElementById('serviceRequired');
const messageInput = document.getElementById('messageText');
const submitBtn = document.getElementById('submitEnquiryBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const successBox = document.getElementById('enquirySuccessBox');
const newEnquiryBtn = document.getElementById('newEnquiryBtn');

// Helper to set error
function setError(inputId, errorId, message) {
  const inputEl = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) {
    if (message) {
      inputEl.style.borderColor = '#ff6b6b';
    } else {
      inputEl.style.borderColor = '';
    }
  }
}

// Phone input number restriction
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    // Only allow digits
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (e.target.value.length === 10) {
      setError('phoneNumber', 'phoneNumberError', '');
    }
  });
}

// Form Submission Handler
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = fullNameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      setError('fullName', 'fullNameError', 'Please enter your full name or company name (min 2 characters).');
      isValid = false;
    } else {
      setError('fullName', 'fullNameError', '');
    }

    // Validate Phone (10 digits)
    const phoneVal = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneVal)) {
      setError('phoneNumber', 'phoneNumberError', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    } else {
      setError('phoneNumber', 'phoneNumberError', '');
    }

    // Validate Service
    const serviceVal = serviceSelect.value;
    if (!serviceVal) {
      setError('serviceRequired', 'serviceRequiredError', 'Please select the required service.');
      isValid = false;
    } else {
      setError('serviceRequired', 'serviceRequiredError', '');
    }

    // Validate Message
    const msgVal = messageInput.value.trim();
    if (!msgVal || msgVal.length < 5) {
      setError('messageText', 'messageTextError', 'Please provide a brief message about your equipment requirements.');
      isValid = false;
    } else {
      setError('messageText', 'messageTextError', '');
    }

    if (!isValid) return;

    // UI Loading state
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'TRANSMITTING ENQUIRY...';

    // Simulate instant frontend submission
    setTimeout(() => {
      // Hide Form, show Success feedback
      enquiryForm.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');

        // Populate success message
        const successName = document.getElementById('successCustomerName');
        const successService = document.getElementById('successServiceName');
        const successPhone = document.getElementById('successPhone');
        const successWhatsAppLink = document.getElementById('successWhatsAppLink');

        if (successName) successName.textContent = nameVal;
        if (successService) successService.textContent = serviceVal;
        if (successPhone) successPhone.textContent = `+91 ${phoneVal}`;

        // Create pre-filled WhatsApp message URL
        if (successWhatsAppLink) {
          const waMessage = encodeURIComponent(
            `Hello FORKMAX, I just submitted an enquiry:\n*Name:* ${nameVal}\n*Phone:* ${phoneVal}\n*Service:* ${serviceVal}\n*Details:* ${msgVal}`
          );
          successWhatsAppLink.href = `https://wa.me/919876543210?text=${waMessage}`;
        }
      }

      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'SEND ENQUIRY';
      initIcons();
    }, 700);
  });
}

// Reset form for new submission
if (newEnquiryBtn) {
  newEnquiryBtn.addEventListener('click', () => {
    enquiryForm.reset();
    enquiryForm.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');
  });
}

// 8. Smooth anchor navigation offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Run once on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  handleScroll();
  updateHeroEquipment(1); // Default to 5.0T
});
