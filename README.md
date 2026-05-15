# ⚒️ SudokuForge

**Forge your logic. Solve the grid.**

A fully offline, single‑user Sudoku web application built with pure HTML, CSS, and JavaScript.  
No frameworks, no libraries, no backend – just clean, hand‑crafted code.

---

## 🚀 Features

- **🎮 Play Sudoku** – 5 difficulty levels (Easy, Moderate, Hard, Gentle, Diabolical) with unique, dynamically generated puzzles.
- **🧠 AI Solver** – Backtracking algorithm that solves any valid 9×9 Sudoku instantly.
- **💡 Hint System** – Get a logical hint (naked single) when you’re stuck, with incorrect‑entry detection.
- **📚 Learn Section** – Detailed explanations of rules and techniques (Naked Single, Hidden Pair, X‑Wing, etc.) plus an interactive 4×4 mini Sudoku.
- **🔄 Cross‑Page Integration** – Send puzzles from the Play page to the Solver with one click.
- **🎨 Custom Cursor & Loader** – A stylish custom cursor with trailing circle (desktop only) and a 3‑second loader with rotating Sudoku tips.
- **🖼️ Animated Puzzle Cycle** – Eight SVG Sudoku grids rotate on the home page.
- **📱 Fully Responsive** – Works seamlessly on phone, tablet, and PC.
- **🧩 Sidebar Navigation** – Emoji‑based sidebar with active‑page highlighting.
- **✨ Creator Profile** – A dedicated page about Affan Adil, the young mind behind the project.

---

## 🛠️ Tech Stack

- **HTML5** – Semantic, accessible markup
- **CSS3** – Custom properties (variables), Flexbox/Grid, animations, responsive media queries
- **JavaScript (ES6)** – Modular scripts, backtracking algorithms, DOM manipulation, `localStorage`
- **Google Fonts** – Inter (professional, clean typeface)

## 📁 Project Structure
SudokuForge/
├── index.html # Homepage
├── solve.html # Interactive Sudoku play page
├── solver.html # AI solver page
├── learn.html # Learning hub with mini Sudoku
├── settings.html # Future settings placeholder
├── creator.html # About the creator
├── css/
│ ├── variables.css # Color palette & design tokens
│ ├── style.css # Global styles & Sudoku grid
│ ├── responsive.css # Media queries
│ ├── loader.css # Full‑screen loader & spinner
│ ├── cursor.css # Custom cursor & trail
│ ├── animations.css # Keyframe animations
│ └── sidebar.css # Sidebar navigation styling
├── js/
│ ├── main.js # Sidebar injection, cursor, global init
│ ├── cycle.js # Home page SVG puzzle rotation
│ ├── solve.js # Puzzle generator, renderer, play logic
│ ├── ai_solver.js # Backtracking Sudoku solver
│ ├── hint.js # Logical hint engine
│ ├── tab-switch.js # Browser tab title updater
│ ├── loader.js # Loader overlay & tips
│ └── creator.js # Typing animation for creator page
├── components/
│ ├── sidebar.html # Reusable sidebar component
│ └── sidebar.js # Active link highlighting
└── assets/ # Empty folder for future assets


## 🎨 Color Palette

| Usage | Color | Hex |
|-------|-------|-----|
| Page background | Off‑white | `#F7F9FC` |
| Cards / sections | White | `#FFFFFF` |
| Primary accent | Deep blue | `#2C6E9E` |
| Secondary accent | Warm amber | `#E8A735` |
| Main text | Dark slate | `#1E2A3A` |
| Secondary text | Muted gray | `#5A6C7E` |
| Grid lines | Soft blue‑gray | `#B0C4DE` |

---

## 🚦 Getting Started

1. **Download or clone** this repository.
2. Open **`index.html`** in any modern browser (Chrome, Firefox, Edge, Safari).
3. No server required – all files run directly from the file system (`file://` protocol), except the sidebar fetch may need a local server for CORS.  
   *Tip: Use VS Code’s Live Server extension or run `npx serve .` if sidebar doesn’t load.*

---

## 🧩 Usage

### 🎮 Play (solve.html)
- Select a difficulty and click **New Game**.
- Click any empty cell and type a number (1‑9).
- Use **Check Solution** to verify your answers.
- Click **Hint** to reveal one logical cell (must have no mistakes).
- Click **Solve with AI** to send the puzzle to the solver page.

### 🤖 Solver (solver.html)
- Enter any Sudoku puzzle manually, or receive one from the Play page.
- Click **Solve** to see the complete solution.

### 📚 Learn (learn.html)
- Read through rules and strategies.
- Practice on the interactive 4×4 grid.

---

## 🙋‍♂️ About the Creator

**Affan Adil**  
Age 14 | Class 8 | India 🇮🇳  
PM Shri Jawahar Navodaya Vidyalaya  
Mother tongue: Bengali  

*“A polymath in training. Building tech & business empire.”*

---

## 📜 License

This project is open‑source. Feel free to learn, modify, and share.

---

Made with ❤️ and pure logic.