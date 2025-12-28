# Learn Like An AI

An interactive story game website that teaches you how AI learns by putting you in the same situations that AI models face. Experience the learning process firsthand through engaging scenarios and challenges.

## About

This website is a game-style story that teaches you how AI learns by putting you in the same situations that AI models face. No prior knowledge of AI is required - the game is designed for everyone, whether you're completely new to AI or want to deepen your understanding.

## Features

- **Interactive Learning Experience**: Step into the role of an AI model and make decisions that affect your learning
- **Three Learning Paths**: Explore supervised, unsupervised, and reinforcement learning
- **Hands-On Scenarios**: Experience real challenges that AI models face during training
- **No Prerequisites**: Designed for beginners with no prior AI knowledge required
- **Beautiful UI**: Clean, modern interface with smooth animations
- **Guided RL Mini-Games**: Hidden treasure/pirate grid with radar and danger sensors so players focus on learning signals, not guessing

## Learning Paths

### 1. Supervised Learning
Learn how AI models train on labeled data, making predictions and improving through feedback. Experience the 4-step learning loop that powers most AI systems.

### 2. Unsupervised Learning
Discover how AI finds patterns in data without labels. Learn about clustering, anomaly detection, and discovering hidden structures.

### 3. Reinforcement Learning
Experience how AI learns through trial and error, receiving rewards and penalties. In the treasure hunt mini-game, the reward and hazard locations are hidden, but you get structured signals (distance-to-treasure “radar,” pirate danger sensor, move counter) to emulate how agents learn from partial information.

##  Project Structure

```
LearnLikeAnAI/
├── index.html              # Homepage
├── Public/
│   ├── start.html          # Starting point for learning
│   ├── learnmore.html      # Deep dive into AI concepts
│   ├── supervised/         # Supervised learning modules (1–4)
│   ├── unsupervised/       # Unsupervised learning modules (1–4)
│   └── reinforcement/      # Reinforcement learning mini-games
│       ├── reinforcement1.html   # Intro to RL
│       ├── chooseYourOwnAdverture.html
│       ├── treasureHunt.html     # Hidden treasure/pirate grid with radar + danger sensors
│       ├── reinforcement3.html
│       └── reinforcement4.html
├── styles/
│   ├── main.css           # Main stylesheet
│   ├── main.js            # Main JavaScript
│   ├── learnmore.css      # Learn more page styles
│   ├── learnmore.js       # Learn more page scripts
│   ├── unsupervised.js    # Unsupervised learning scripts
│   ├── reinforcement/     # Reinforcement scripts
│   │   ├── reinforcementChooseYourOwnAdventure.js
│   │   └── reinforcementTreasureHunt.js
│   └── logo.svg           # Logo
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd LearnLikeAnAI
```

2. Open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### Deployment

The project is configured for Vercel deployment. Simply connect your repository to Vercel for automatic deployments.

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **JavaScript**: Interactive functionality
- **SVG**: Logo and graphics
- **Vercel**: Hosting and deployment

## How to Use

1. **Start**: Visit the homepage and click "Start" to begin your learning journey
2. **Choose a Path**: Select one of the three learning types (Supervised, Unsupervised, or Reinforcement)
3. **Experience Scenarios**: Step into the role of an AI model and make decisions
4. **Learn**: Understand how AI actually learns and improves through your choices
5. **Explore More**: Visit "Learn More" for a deep dive into AI concepts

## Educational Goals

- Understand the fundamental differences between supervised, unsupervised, and reinforcement learning
- Experience the learning process from an AI's perspective
- Learn through interactive scenarios rather than passive reading
- Build intuition about how AI models work

## License

This project is open source and available for educational purposes.

## Contributing

Contributions, issues, and feature requests are welcome!

---

**Learn Like An AI** - Experience AI learning through interactive storytelling
