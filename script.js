// ==========================================
// PENGATURAN STATUS KAMAR (MANUAL)
// Ubah "tersedia" menjadi "penuh" atau sebaliknya
// ==========================================
const ROOM_CONFIG = {
    "Standar": "tersedia", 
    "Premium": "tersedia",
    "Eksklusif": "penuh",
    "Deluxe": "tersedia",
    "Suite": "tersedia",
    "Executive": "tersedia",
    "VIP": "tersedia"
};

// Welcome Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeForm = document.getElementById('welcome-form');
    
    if (welcomeScreen && welcomeForm) {
        // Always show on refresh
        welcomeScreen.style.display = 'flex';
        welcomeScreen.style.opacity = '1';

        // Mouse Follower Effect
        welcomeScreen.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            welcomeScreen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(34, 211, 238, 0.15) 0%, rgba(15, 23, 42, 0.95) 70%)`;
        });

        // Typewriter Effect
        const typeText = document.querySelector('#welcome-screen p');
        const originalText = "Silakan lengkapi data diri singkat Anda untuk melanjutkan pencarian kost.";
        if (typeText) {
            typeText.innerText = '';
            let charIndex = 0;
            const typeWriter = () => {
                if (charIndex < originalText.length) {
                    typeText.innerHTML += originalText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 30);
                }
            };
            setTimeout(typeWriter, 800);
        }

        welcomeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('visitor-name').value;
            const job = document.getElementById('visitor-job').value;
            const gender = document.getElementById('visitor-gender').value;
            
            localStorage.setItem('visitor_name', name);
            localStorage.setItem('visitor_job', job);
            localStorage.setItem('visitor_gender', gender);
            localStorage.setItem('visitor_registered', 'true');
            
            // Smooth exit
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                window.scrollTo(0, 0);
                if (typeof goToSlide === 'function') goToSlide(0);
                
                // Greet user on main page
                const heroP = document.querySelector('.hero-content p');
                if (heroP) {
                    heroP.innerHTML = `Selamat datang, <strong>${name}</strong>! ` + "Hunian eksklusif dengan fasilitas premium.";
                }
            }, 500);
        });
    }
});

// Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Lightbox Modal
const modal = document.getElementById("lightbox");
const imgModal = document.getElementById("lightbox-img");
const images = document.querySelectorAll(".gallery-img");
const closeBtn = document.querySelector(".close-btn");

images.forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        imgModal.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close when clicking outside image
modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.style.display = "none";
    }
});

// Room Detail Modal Logic
const roomDetailModal = document.getElementById('room-detail-modal');
const closeRoomDetailBtns = document.querySelectorAll('.close-room-detail, .btn-close-room-detail');
const roomDetailTitle = document.getElementById('room-detail-title');
const roomDetailGallery = document.getElementById('room-detail-gallery');

const roomImages = {
    "Standar": [
        "images/kamar1.jpeg",
        "images/kamar%202.jpeg",
        "images/kamar%203.jpeg"
    ],
    "Premium": [
        "images/kamar%202.jpeg",
        "images/kamar%203.jpeg",
        "images/kamar%204.jpeg"
    ],
    "Eksklusif": [
        "images/kamar%203.jpeg",
        "images/kamar%204.jpeg",
        "images/kamar%205.jpeg"
    ],
    "Deluxe": [
        "images/kamar%204.jpeg",
        "images/kamar%205.jpeg",
        "images/kamar%206.jpeg"
    ],
    "Suite": [
        "images/kamar%205.jpeg",
        "images/kamar%206.jpeg",
        "images/kamar%207.jpeg"
    ],
    "Executive": [
        "images/kamar%206.jpeg",
        "images/kamar%207.jpeg",
        "images/kamar%208.jpeg"
    ],
    "VIP": [
        "images/kamar%207.jpeg",
        "images/kamar%208.jpeg",
        "images/kamar%209.jpeg"
    ]
};

document.querySelectorAll('.room-img-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
        const roomType = e.currentTarget.getAttribute('data-room');
        roomDetailTitle.textContent = `Detail Kamar ${roomType}`;
        
        // Populate gallery
        roomDetailGallery.innerHTML = '';
        if(roomImages[roomType]) {
            roomImages[roomType].forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.style.width = '100%';
                img.style.height = '200px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '8px';
                img.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                img.style.cursor = 'pointer';
                
                // Clicking detail image opens main lightbox
                img.addEventListener("click", () => {
                    modal.style.display = "block";
                    imgModal.src = img.src;
                    roomDetailModal.style.zIndex = "998"; // Send detail modal back
                    modal.style.zIndex = "1000"; // Bring main lightbox front
                });
                
                roomDetailGallery.appendChild(img);
            });
        }
        
        roomDetailModal.style.display = 'flex';
    });
});

closeRoomDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        roomDetailModal.style.display = 'none';
    });
});

roomDetailModal.addEventListener('click', (e) => {
    if(e.target === roomDetailModal) {
        roomDetailModal.style.display = 'none';
    }
});

// Checkout Modal Logic
const checkoutBtns = document.querySelectorAll('.btn-checkout');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.querySelector('.close-checkout');
const durationSelect = document.getElementById('rent-duration');
const totalPaymentEl = document.getElementById('total-payment');
const confirmWaBtn = document.getElementById('btn-confirm-wa');
const checkoutRoomTypeEl = document.getElementById('checkout-room-type');

let selectedBasePrice = 1000000;
let selectedRoomType = "Standar";

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

// Open modal
checkoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.btn-checkout');
        selectedBasePrice = parseInt(targetBtn.getAttribute('data-price'));
        selectedRoomType = targetBtn.getAttribute('data-type');
        
        checkoutRoomTypeEl.textContent = `Tipe ${selectedRoomType}`;
        checkoutModal.style.display = 'flex';
        
        // reset duration to 1 month on open
        durationSelect.value = "1";
        totalPaymentEl.textContent = formatRupiah(selectedBasePrice);
    });
});

// Close modal
if (closeCheckout) {
    closeCheckout.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });
}

// Calculate total
durationSelect.addEventListener('change', (e) => {
    const duration = parseInt(e.target.value);
    const total = selectedBasePrice * duration;
    totalPaymentEl.textContent = formatRupiah(total);
});

// WhatsApp Integration & Auto-Full Status
confirmWaBtn.addEventListener('click', () => {
    const duration = durationSelect.value;
    const moveInDate = document.getElementById('move-in-date').value || '-';
    const total = selectedBasePrice * parseInt(duration);
    const customMessage = document.getElementById('custom-message').value.trim();
    
    // Get visitor info
    const name = localStorage.getItem('visitor_name') || 'Calon Penghuni';
    const job = localStorage.getItem('visitor_job') || 'Tidak disebutkan';
    const gender = localStorage.getItem('visitor_gender') || '-';
    
    let message = `Halo Pak WAHYUDDIN KOST EXCLUSIVE BALIKPAPAN, perkenalkan saya ${name} (${gender}) yang bekerja sebagai ${job}.\n\nSaya ingin memesan kost dengan rincian berikut:\n- Tipe Kamar: ${selectedRoomType}\n- Tanggal Masuk: ${moveInDate}\n- Harga Dasar: ${formatRupiah(selectedBasePrice)} / Bulan\n- Durasi Sewa: ${duration} Bulan\n- Total Pembayaran: ${formatRupiah(total)}\n\n---------------------------------------\nSaya sangat tertarik dan ingin memilih kost ini sebagai hunian saya yang baru. Mohon informasi selanjutnya untuk proses pendaftaran. Terima kasih!`;
    
    if (customMessage) {
        message += `\n\nCatatan Tambahan:\n${customMessage}`;
    }
    
    // AUTO-SET TO FULL on click
    localStorage.setItem(`status_${selectedRoomType}`, "penuh");
    
    const waUrl = `https://wa.me/6282152328862?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    
    // Close modal and refresh UI
    checkoutModal.style.display = 'none';
    if (typeof applyRoomStatus === 'function') applyRoomStatus();
});

// Apply Status on Load
function applyRoomStatus() {
    Object.keys(ROOM_CONFIG).forEach(room => {
        const status = localStorage.getItem(`status_${room}`) || ROOM_CONFIG[room];
        const badge = document.getElementById(`badge-${room}`);
        const card = document.getElementById(`card-${room}`);
        if (!card) return;

        const btn = card.querySelector('.btn-checkout');
        const imgTrigger = card.querySelector('.room-img-trigger');
        const title = card.querySelector('.room-card-title');
        const priceDiv = card.querySelector('.room-card-price');
        const desc = card.querySelector('p');

        if (status === "penuh") {
            badge.style.background = "#ef4444";
            badge.innerHTML = '<i class="fas fa-times-circle"></i> Penuh (Waiting List)';
            if (priceDiv) priceDiv.style.opacity = "0.6";
            if (title) title.style.opacity = "0.6";
            if (imgTrigger) {
                imgTrigger.style.filter = "grayscale(0.8)";
                imgTrigger.style.opacity = "0.7";
            }
            if (desc) desc.style.color = "#94a3b8";
            btn.innerHTML = '<i class="fas fa-clock"></i> Daftar Tunggu';
            btn.style.background = "#475569";
            btn.setAttribute('data-type', `${room} (Waiting List)`);
        } else {
            badge.style.background = "#10b981";
            badge.innerHTML = '<i class="fas fa-check-circle"></i> Tersedia';
            if (priceDiv) priceDiv.style.opacity = "1";
            if (title) title.style.opacity = "1";
            if (imgTrigger) {
                imgTrigger.style.filter = "none";
                imgTrigger.style.opacity = "1";
            }
            if (desc) desc.style.color = "#cbd5e1";
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Pesan Kamar';
            btn.style.background = "var(--primary)";
            btn.setAttribute('data-type', room);
        }
    });
}
document.addEventListener('DOMContentLoaded', applyRoomStatus);

// Handle Badge Clicks for Status Toggle
document.querySelectorAll('.contact-card').forEach(card => {
    const badge = card.querySelector('[id^="badge-"]');
    if (badge) {
        badge.style.cursor = 'pointer';
        badge.title = 'Klik untuk ganti status';
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            const room = card.id.replace('card-', '');
            const currentStatus = localStorage.getItem(`status_${room}`) || (ROOM_CONFIG[room] || 'tersedia');
            const newStatus = (currentStatus === "tersedia") ? "penuh" : "tersedia";
            
            localStorage.setItem(`status_${room}`, newStatus);
            applyRoomStatus(); // Refresh UI
        });
    }
});

// Secret Admin Toggle (Lama - Masih dipertahankan sebagai cadangan)
// Klik 3x pada header "Pesan dari CEO" di modal checkout untuk toggle status
setTimeout(() => {
    const ceoHeader = document.querySelector('h4 i.fa-bullhorn')?.parentElement;
    if (ceoHeader) {
        let clicks = 0;
        ceoHeader.style.cursor = 'pointer';
        ceoHeader.addEventListener('click', () => {
            clicks++;
            if (clicks === 3) {
                const currentStatus = localStorage.getItem(`status_${selectedRoomType}`) || ROOM_CONFIG[selectedRoomType];
                const newStatus = currentStatus === "tersedia" ? "penuh" : "tersedia";
                localStorage.setItem(`status_${selectedRoomType}`, newStatus);
                alert(`ADMIN: Status ${selectedRoomType} diubah ke ${newStatus.toUpperCase()}`);
                location.reload();
            }
            setTimeout(() => { clicks = 0; }, 500);
        });
    }
}, 1000);

// --- MANUAL NAVIGATION ONLY ---
// Kami mematikan fitur pindah slide otomatis agar pengguna bebas scroll ke atas bawah 
// di dalam satu halaman tanpa terlempar ke slide lain.

// Wheel Support (Laptop) - Mengizinkan scroll alami di dalam slide
window.addEventListener('wheel', (e) => {
    const activeSection = slides[currentSlideIndex];
    // Biarkan browser menangani scroll internal di dalam section
}, { passive: true });

// Touch Support (HP) - Mengizinkan scroll alami di dalam slide
window.addEventListener('touchstart', (e) => {
    // Biarkan browser menangani touch/scroll internal
}, { passive: true });

// --- MODAL & GLOBAL CLICK HANDLERS ---
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.close-checkout') || target.closest('.close-btn') || target.closest('.btn-close-room-detail')) {
        checkoutModal.style.display = 'none';
        modal.style.display = 'none';
        roomDetailModal.style.display = 'none';
        return;
    }
    if (target === checkoutModal || target === modal || target === roomDetailModal) {
        target.style.display = 'none';
        return;
    }
    const link = target.closest('a');
    if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && SLIDE_MAP[href] !== undefined) {
            e.preventDefault();
            goToSlide(SLIDE_MAP[href]);
            closeMenu();
        }
    }
});

// --- CORE NAVIGATION ---
const dots = document.querySelectorAll('.slide-dots .dot');
const slides = document.querySelectorAll('header, section, footer');
const mainContent = document.getElementById('main-content');
let currentSlideIndex = 0;

const SLIDE_MAP = { '#': 0, '#gallery-slide': 1, '#location': 2, '#facilities': 3, '#contact': 4, '#faq': 5, '#footer-slide': 6 };

const goToSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    currentSlideIndex = index;
    mainContent.style.transform = `translateY(-${index * 100}vh)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    
    // Trigger reveals
    const reveals = slides[index].querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.add('active'));
    
    // Reset scroll position of the slide we just entered
    slides[index].scrollTop = 0;
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = () => { if(mobileMenu) mobileMenu.style.display = 'none'; };
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => { if(mobileMenu) mobileMenu.style.display = 'flex'; });
document.querySelector('.close-mobile-menu')?.addEventListener('click', closeMenu);

// Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.addEventListener('DOMContentLoaded', () => { 
    goToSlide(0); 
    // Prevent default scroll behaviors that might break our system
    window.addEventListener('keydown', (e) => {
        if(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) {
            // Allow arrow keys to trigger slide change if not in an input
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') handleScrollTransition('down');
                if (e.key === 'ArrowUp' || e.key === 'PageUp') handleScrollTransition('up');
            }
        }
    });
});

