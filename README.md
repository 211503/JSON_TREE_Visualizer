# JSON Tree Visualizer

An interactive web application that visualizes JSON data as a hierarchical tree structure with search and highlighting functionality.

## Features

### Mandatory Features
- **JSON Input & Parsing**: Paste or type JSON data with validation and error messages
- **Tree Visualization**: Hierarchical node tree using React Flow with:
  - Object nodes (blue)
  - Array nodes (green)
  - Primitive nodes (orange)
  - Connected parent-child relationships
- **Search Functionality**: Search by JSON path (e.g., `$.user.address.city`) with:
  - Node highlighting
  - Automatic view centering
  - Match found/not found feedback

### Bonus Features
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Clear/Reset**: Clear input and tree visualization
- **Copy JSON Path**: Click any node to copy its path to clipboard
- **Download Tree**: Export the tree visualization as PNG image
- **Zoom Controls**: Zoom in/out and fit view
- **Pan Navigation**: Drag canvas to navigate
- **Node Information**: Hover to see path and value

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: React Flow
- **Build Tool**: Vite
- **Icons**: Lucide React

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Usage

1. Paste or type JSON data in the text area (sample JSON provided)
2. Click "Generate Tree" to visualize
3. Use the search bar to find nodes by JSON path
4. Click nodes to copy their paths
5. Use zoom controls and pan to navigate
6. Toggle dark/light mode as preferred
7. Download tree as image if needed

## Project Structure

```
src/
├── components/
│   ├── CustomNode.tsx       # Custom React Flow node component
│   ├── JsonInput.tsx        # JSON input and validation
│   ├── SearchBar.tsx        # Search functionality
│   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   └── TreeVisualization.tsx # Main tree visualization
├── types/
│   └── json.ts              # TypeScript interfaces
├── utils/
│   └── jsonToTree.ts        # JSON to tree conversion logic
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## Code Quality

- Clean and modular code structure
- TypeScript for type safety
- Responsive design
- Proper error handling
- Commented code where necessary

## License

MIT
