# NurseNow Project

## Overview
NurseNow is a smart home nursing platform that connects patients with qualified healthcare professionals for personalized home care services. The application allows users to find and book certified nurses based on their specific needs.

## Project Structure
```
nursenow
├── src
│   ├── pages
│   │   ├── index.html          # Main HTML file for the application
│   │   └── find-care.html      # Page to find and display relevant nurses
│   ├── css
│   │   └── style.css           # Styles for the application
│   ├── js
│   │   ├── app.js              # Main JavaScript functionality
│   │   └── find-care.js        # JavaScript for find-care.html
│   └── components
│       └── nurse-card.html     # Structure for nurse card component
├── public
│   └── assets                   # Public assets (images, icons, etc.)
├── package.json                 # npm configuration file
└── README.md                    # Project documentation
```

## Features
- **User-Friendly Interface**: Intuitive navigation and layout for easy access to services.
- **Search Functionality**: Users can find nurses based on specialization, location, and experience.
- **Nurse Profiles**: Detailed profiles for each nurse, including ratings and reviews.
- **Booking System**: Users can book appointments directly through the application.
- **Responsive Design**: The application is designed to work on various devices and screen sizes.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd nursenow
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Open the `src/pages/index.html` file in a web browser to view the application.

## Usage
- Navigate to the home page to explore services and available nurses.
- Use the "Find Care" page to search for nurses based on specific criteria.
- Click on the "Book Appointment" button on the nurse cards to schedule a consultation.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.