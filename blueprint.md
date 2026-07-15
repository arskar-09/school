# Poem Arena - Project Blueprint

## Overview
Poem Arena is a minimalist web application for crafting and discovering poetry through an engaging "Poem World Cup" interface. Users can write their own poems, save them to local storage, and participate in a selection game where two random poems are compared head-to-head.

## Features
- **Poem Writer:** A clean, focused interface for authoring and saving new poems.
- **Poem World Cup:** An interactive selection interface that displays two random poems, allowing users to vote for their favorite.
- **Persistence:** Poems are saved and retrieved using browser `localStorage`.
- **Modern UI:** Clean, responsive, card-based design with elegant typography.

## Architecture
- **Framework:** Vanilla JavaScript (ES Modules).
- **UI Components:** Custom Elements (Web Components).
- **Navigation:** Single-page application router logic switching between "Write" and "World Cup" views.
- **Data:** `localStorage` to manage the collection of poems.

## Current Planned Changes
1. **Refactor UI:** Update `index.html` to act as a main container with a navigation header and a content area (`<main>`).
2. **Implement Components:**
    - `poem-editor`: Custom element for the writing page.
    - `poem-selector`: Custom element for the selection page.
3. **Logic:**
    - Update `main.js` to manage the view state and poem data.
    - Implement the algorithm to pick two unique random poems.
4. **Styling:** Update `style.css` to support a modern, clean, and responsive design.

## Implementation Steps
1. **Draft Initial Layout & Components:** Set up the main navigation and view switching logic.
2. **Build Poem Editor:** Create the `poem-editor` custom element with input forms.
3. **Build World Cup Selector:** Create the `poem-selector` custom element with random poem display and selection logic.
4. **Style Polish:** Ensure the aesthetic is clean, polished, and responsive.
