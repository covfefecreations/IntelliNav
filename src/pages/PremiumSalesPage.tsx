// src/pages/PremiumSalesPage.tsx
import React, { useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';
import { OswegoTreeLogo } from '@/icons/OswegoTreeLogo';
import { OswegoLabsBeakerLogo } from '@/icons/OswegoLabsBeakerLogo';
import { TechTreeSmartNav } from '@/components/TechTreeSmartNav';
import '@/pages/premium.css';

const Starfield: React.FC<{ density?: number }> = ({ density = 120 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    let stars: { x: number; y: number; r: number; vx: number; vy: number; o: number }[] = [];

    const init = () => {
      stars = [];
      for (let i = 0; i < density; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          o: 0.4 + Math.random() * 0.6
        });
      }
    };
    init();

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // subtle background gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(255,255,255,0.02)');
      g.addColorStop(1, 'rgba(200,220,255,0.02)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
        ctx.beginPath();
        ctx.globalAlpha = s.o;
        ctx.fillStyle = 'white';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
      init();
    };
    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [density]);

  return <canvas ref={ref} className="premium-starfield" aria-hidden />;
};

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="premium-header">
      <div className="logo-row">
        <OswegoTreeLogo size={56} />
        <div className="brand-text">
          <h1>OswegoPark Labs</h1>
          <p className="sub">TechTree · IntelliNav — Premium UI Kit</p>
        </div>
        <OswegoLabsBeakerLogo size={46} />
      </div>

      <div className="actions">
        <label className="theme-switch">
          <span>Theme</span>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as ThemeName)}
          >
            <option value="technologyForest">Night — TechnologyForest</option>
            <option value="technologyForestDaylight">Daylight — TechnologyForest</option>
          </select>
        </label>
        <a className="buy-btn" href="#buy">Buy PremiumKit</a>
      </div>
    </header>
  );
};
export const PremiumSalesPage: React.FC = () => {
  return (
    <ThemeProvider initial="technologyForest">
      <div className="premium-shell">
        <Starfield density={160} />
        <div className="premium-content">
          <Header />
          <main className="premium-main">
            <section className="hero">
              <h2 className="hero-title">Cultivate your stack</h2>
              <p className="hero-sub">An advanced UI kit for platform teams. Floating dock navigation, theme tokens, Storybook-ready components — all wrapped in the TechnologyForest theme.</p>
              <div className="hero-cta">
                <a className="cta-primary" href="#demo">Live Demo</a>
                <a className="cta-secondary" href={"/mnt/data/TechTreeSpec.md"}>View Spec</a>
              </div>
            </section>

            <aside className="dock-preview">
              <div className="dock-frame">
                <TechTreeSmartNav />
              </div>
              <p className="dock-note">Drag, reorder, and scale — try the dock preview. In the real product this persists to user settings.</p>
            </aside>

            <section className="features">
              <article>
                <h3>Reorderable dock</h3>
                <p>Touch-first, keyboard friendly, and tiny enough to float in the corner of your app.</p>
              </article>
              <article>
                <h3>Theme tokens</h3>
                <p>Switch between Night and Daylight themes. Tokens control color, spacing, and glow radii.</p>
              </article>
              <article>
                <h3>Figma + Storybook</h3>
                <p>Ship consistent designs with tokens, Storybook docs, and story-driven examples.</p>
              </article>
            </section>
          </main>

          <footer className="premium-footer">
            <small>© {new Date().getFullYear()} OswegoPark Labs — Platform Engineering UIKit</small>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PremiumSalesPage;