// Find Care functionality

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const nurseList = document.getElementById('nurseList');

    searchBtn.addEventListener('click', () => {
        const specialization = document.getElementById('specializationSelect').value;
        const location = document.getElementById('locationInput').value;

        fetchNurseData(specialization, location);
    });
});

function fetchNurseData(specialization, location) {
    // Simulated nurse data fetching
    const nurses = [
        {
            id: 1,
            name: "Dr. Anita Sharma",
            specialization: "General Physician",
            location: "New York",
            experience: 10,
            rating: 4.5,
            price: "$100",
            verified: true,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Nurse Ramesh Iyer",
            specialization: "Home Care Nurse",
            location: "Los Angeles",
            experience: 5,
            rating: 4.0,
            price: "$80",
            verified: true,
            image: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            id: 3,
            name: "Rekha Nair",
            specialization: "Physiotherapist",
            location: "Chicago",
            experience: 8,
            rating: 4.8,
            price: "$90",
            verified: false,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        }
    ];

    const filteredNurses = nurses.filter(nurse => 
        nurse.specialization.toLowerCase().includes(specialization.toLowerCase()) &&
        nurse.location.toLowerCase().includes(location.toLowerCase())
    );

    renderNurseCards(filteredNurses);
}

function renderNurseCards(nurses) {
    const nurseList = document.getElementById('nurseList');
    nurseList.innerHTML = '';

    nurses.forEach(nurse => {
        const card = document.createElement('div');
        card.className = 'nurse-card';
        card.innerHTML = `
            <img src="${nurse.image}" alt="${nurse.name}">
            <div class="card-content">
                <h3>${nurse.name}</h3>
                <p>Specialization: ${nurse.specialization}</p>
                <p>Location: ${nurse.location}</p>
                <p>Experience: ${nurse.experience} years</p>
                <p>Rating: ${'⭐'.repeat(Math.floor(nurse.rating))} (${nurse.rating})</p>
                <p>Price: ${nurse.price}</p>
                <button class="btn btn-primary" onclick="bookAppointment(${nurse.id})">Book Appointment</button>
            </div>
        `;
        nurseList.appendChild(card);
    });
}

function bookAppointment(nurseId) {
    // Logic to handle booking appointment
    alert(`Appointment booked with nurse ID: ${nurseId}`);
}