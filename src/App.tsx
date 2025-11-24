import React from 'react';
import { ThemeProvider } from './packages/theme/ThemeProvider';
import TechTreeSmartNav from './TechTreeSmartNav';
import './landing.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <TechTreeSmartNav />
        <main className="main-content">
          <section className="hero">
            <h1>OswegoPark Labs</h1>
            <p>TechTree IntelliNav Platform</p>
            <div className="icon-showcase">
              {/* Your icons will be integrated here */}
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;