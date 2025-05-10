// Enhanced nurse data
const nurses = [ /* Your existing nurse data array */ ];

// Filter states
let currentFilters = {
    specialization: "",
    location: "",
    verified: false,
    experience: false,
    sortBy: "rating"
};

// DOM Elements
let nurseDetailSelected = null;
let selectedDuration = 1;
let selectedTimeSlot = null;
let isLoggedIn = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderNurses();
    setupEventListeners();
    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 800);
});

// Render nurses based on filters
function renderNurses() {
    const container = document.getElementById('nurseList');
    let filteredNurses = nurses.filter(nurse => {
        const matchesSpecialization = currentFilters.specialization ? 
            nurse.specialization === currentFilters.specialization : true;
        const matchesLocation = currentFilters.location ?
            nurse.location.toLowerCase().includes(currentFilters.location.toLowerCase()) : true;
        const matchesVerified = currentFilters.verified ? nurse.verified : true;
        const matchesExperience = currentFilters.experience ? nurse.experience >= 5 : true;
        
        return matchesSpecialization && matchesLocation && matchesVerified && matchesExperience;
    });

    // Sort nurses
    filteredNurses.sort((a, b) => {
        if(currentFilters.sortBy === "rating") return b.rating - a.rating;
        if(currentFilters.sortBy === "experience") return b.experience - a.experience;
        if(currentFilters.sortBy === "price") return a.priceValue - b.priceValue;
        return 0;
    });

    // Generate nurse cards
    container.innerHTML = filteredNurses.map(nurse => `
        <div class="nurse-card" data-id="${nurse.id}">
            ${nurse.verified ? '<div class="verified-badge">Verified ✔</div>' : ''}
            <img src="${nurse.image}" alt="${nurse.name}">
            <div class="card-content">
                <div class="name-box">
                    <h3>${nurse.name}</h3>
                    <span class="detail-price">${nurse.price}</span>
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(nurse.rating))} (${nurse.rating})
                </div>
                <div class="card-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${nurse.location}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${nurse.experience} years experience</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-stethoscope"></i>
                        <span>${nurse.specialization}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary bookBtn">Book Now</button>
                    <button class="btn btn-secondary detailBtn">Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle search functionality
function handleSearch() {
    currentFilters.specialization = document.getElementById('specializationSelect').value;
    currentFilters.location = document.getElementById('locationInput').value;
    renderNurses();
}

// Handle sorting
function handleSort(e) {
    currentFilters.sortBy = e.target.value;
    renderNurses();
}

// Handle filter tags
function handleFilterTags(e) {
    const tag = e.target.closest('.filter-tag');
    if(!tag) return;

    const filterType = tag.dataset.filter;
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');

    switch(filterType) {
        case 'all':
            currentFilters.verified = false;
            currentFilters.experience = false;
            break;
        case 'verified':
            currentFilters.verified = true;
            currentFilters.experience = false;
            break;
        case 'experience':
            currentFilters.experience = true;
            currentFilters.verified = false;
            break;
    }
    renderNurses();
}

// Show nurse details
function showNurseDetails(nurseId) {
    const nurse = nurses.find(n => n.id === nurseId);
    nurseDetailSelected = nurse;
    
    // Update detail modal content
    document.getElementById('aboutTab').innerHTML = `
        <div class="detail-section">
            <h3>About</h3>
            <p>${nurse.about}</p>
        </div>
        <div class="detail-section">
            <h3>Availability</h3>
            <div class="schedule-grid">
                ${nurse.availability.map(slot => `
                    <div class="time-slot">${slot}</div>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('qualificationsTab').innerHTML = `
        <div class="detail-section">
            <h3>Certifications</h3>
            ${nurse.certifications.map(cert => `
                <div class="cert-badge">${cert}</div>
            `).join('')}
        </div>
        <div class="detail-section">
            <h3>Languages</h3>
            ${nurse.languages.map(lang => `
                <div class="lang-badge">${lang}</div>
            `).join('')}
        </div>
    `;

    document.getElementById('reviewsTab').innerHTML = `
        <div class="detail-section">
            ${nurse.reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <strong>${review.name}</strong>
                        <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                    </div>
                    <p class="review-comment">"${review.comment}"</p>
                </div>
            `).join('')}
        </div>
    `;

    showModal('detailModal');
}

// Handle booking submission
function handleBooking(e) {
    e.preventDefault();
    if(!isLoggedIn) {
        showToast('Please login to book appointments', 'error');
        return;
    }

    const formData = {
        name: document.getElementById('patientName').value,
        age: document.getElementById('patientAge').value,
        gender: document.getElementById('patientGender').value,
        date: document.getElementById('appointmentDate').value,
        duration: selectedDuration,
        details: document.getElementById('careDetails').value
    };

    if(!formData.name || !formData.age || !formData.gender || !formData.date) {
        showToast('Please fill all required fields', 'error');
        return;
    }

    closeModal('bookingModal');
    showModal('successModal');
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulated login
    if(email && password) {
        isLoggedIn = true;
        closeModal('loginModal');
        showToast('Login successful!', 'success');
    }
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if(password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    closeModal('registerModal');
    showToast('Registration successful! Please login', 'success');
}

// Chat functionality
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if(!message) return;

    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML += `
        <div class="message sent">${message}</div>
    `;
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        messagesContainer.innerHTML += `
            <div class="message received">Thank you for your message. Our support team will respond shortly.</div>
        `;
    }, 1000);
}

// Modal controls
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Event listeners setup
function setupEventListeners() {
    // Existing event listeners...
    // Add any additional listeners needed for complete functionality

    // Time slot selection
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('time-slot')) {
            document.querySelectorAll('.time-slot').forEach(slot => 
                slot.classList.remove('selected')
            );
            e.target.classList.add('selected');
            selectedTimeSlot = e.target.textContent;
        }
    });

    // Close modals with escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => 
                modal.style.display = 'none'
            );
        }
    });
}

const professionals = [
  {
    name: "Dr. Anita Sharma",
    role: "General Physician",
    experience: "10 years",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Nurse Ramesh Iyer",
    role: "Home Care Nurse",
    experience: "5 years",
    img: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Rekha Nair",
    role: "Physiotherapist",
    experience: "8 years",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];


const container = document.getElementById("available-professionals");

professionals.forEach(pro => {
  const card = document.createElement("div");
  card.className = "professional-card";
  card.innerHTML = `
    <img src="${pro.img}" alt="${pro.name}" class="profile-pic">
    <h3>${pro.name}</h3>
    <p>${pro.role}</p>
    <p>Experience: ${pro.experience}</p>
  `;
  container.appendChild(card);
});

document.getElementById('chatBtn').addEventListener('click', toggleChat);
document.getElementById('closeChat').addEventListener('click', toggleChat);
