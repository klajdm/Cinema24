# Cinema24 🎬

A modern Angular movie search application that allows users to discover and explore movies using the OMDB API. Built with Angular 16, Angular Material, and Tailwind CSS for a beautiful and responsive user experience.

## ✨ Features

- **Movie Search**: Search for movies by title with real-time results
- **Movie Details**: View detailed information including ratings, cast, director, and awards
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful interface with Angular Material components and Tailwind CSS
- **IMDB Integration**: Direct links to IMDB for more movie information
- **Error Handling**: Custom 404 page with animated effects

## 🛠️ Tech Stack

- **Frontend**: Angular 16
- **UI Framework**: Angular Material
- **Styling**: Tailwind CSS
- **API**: OMDB API
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/klajdm/Cinema24.git
cd Cinema24
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# The project uses OMDB API key
# Update src/environments/environment.ts with your API key
```

4. Start the development server
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## 📦 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
# Production build
ng build --prod

# Development build
ng build
```

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage
```

## 📁 Project Structure

```
src/
├── app/
│   ├── models/           # Data models
│   ├── pages/            # Page components
│   │   ├── home/         # Home page with search
│   │   ├── movie/        # Movie details page
│   │   └── error404/     # 404 error page
│   ├── services/         # API services
│   ├── shared/           # Shared components
│   │   └── layout/       # Header and footer
│   └── app.module.ts     # Main app module
├── assets/               # Static assets
├── environments/         # Environment configurations
└── styles.css           # Global styles
```

## 🎨 Features in Detail

### Movie Search
- Real-time search functionality
- Configurable result limits (3 or 10 results)
- Loading states and error handling

### Movie Details
- Comprehensive movie information
- Star ratings display
- Direct IMDB integration
- Responsive layout for all screen sizes

### User Interface
- Dark theme with purple accents
- Smooth animations and transitions
- Material Design components
- Mobile-first responsive design

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Klajdi Murataj**
- GitHub: [@klajdm](https://github.com/klajdm)


If you like this project, please consider giving it a ⭐ on GitHub!
