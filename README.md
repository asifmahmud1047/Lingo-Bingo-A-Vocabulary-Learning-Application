# Lingo Bingo - Japanese Vocabulary Learning Application

A fun and interactive language learning application designed to help users expand their Japanese vocabulary and improve their communication skills.

## Live Website
[Lingo Bingo - Learn Japanese](https://lingo-bingo-japanese.netlify.app/)

## Project Purpose
Learning a new language can be challenging, especially when it comes to retaining vocabulary. Lingo Bingo makes this process easier and more enjoyable by providing a structured approach to learning Japanese vocabulary through interactive lessons, visual cues, and pronunciation practice.

## Key Features
- **User Authentication**: Secure login/registration system using Firebase Authentication
- **Japanese Vocabulary Cards**: Interactive cards displaying Japanese words with meanings, pronunciation, and usage examples
- **Lesson-Based Structure**: Organized lessons with vocabulary grouped by difficulty and theme
- **Text-to-Speech**: Hear the correct pronunciation of Japanese words
- **Video Tutorials**: Watch embedded YouTube videos to enhance your learning experience
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop viewing
- **User Profile**: Personalized user profiles with the ability to update information
- **Animated Elements**: Visual feedback and animations to enhance user experience

## Technologies Used
- **React**: Frontend library for building the user interface
- **Firebase**: Authentication and data storage
- **React Router**: For navigation between pages
- **Tailwind CSS**: For styling and responsive design
- **React CountUp**: For animated number counting in statistics
- **AOS (Animate On Scroll)**: For scroll-based animations
- **React Toastify**: For toast notifications
- **Web Speech API**: For text-to-speech functionality

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your Firebase configuration
4. Run the development server: `npm run dev`

## Firebase Configuration
Create a `.env.local` file in the root directory with the following variables:
```
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

## Project Structure
- `src/components`: React components for UI elements
- `src/utils`: Utility functions and data files
- `src/hooks`: Custom React hooks
- `src/assets`: Static assets like images

## Deployment
The application is deployed on Netlify with continuous deployment from the main branch.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.