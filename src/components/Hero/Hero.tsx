import { useEffect, useState } from "react";
import adminBlock from "../../assets/budo/admin-block.jpeg";
import patriot from "../../assets/budo/patriot.jpg";
import staff from "../../assets/budo/staff.jpeg";
import "../../css/Hero.css";

type Slide = { image: string; alt: string; focus?: string; headline: string };

// Each photo is paired with the headline that shows over it. One admin shot only — the angled block with the clock.
const SLIDES: Slide[] =
  [
    { image: adminBlock, alt: "The administration block at King's College, Budo, with its clock and the lion crest.", headline: "Growing bright minds and big hearts." },
    { image: patriot, alt: "Hundreds of Budo students in uniform gathered on the school grounds.", focus: "center 65%", headline: "Discovering your path in a community that appreciates all of who you are." },
    { image: staff, alt: "Budo staff gathered around the fountain in the school gardens.", headline: "Being more than a school — a place to explore, connect, and become." },
  ];

const AUTOPLAY_MS = 4000;

export function Hero()
  {
    const [active, setActive] = useState(0);

    // Moving on every 4 seconds. Picking a dot resets the clock so it doesn't jump right away.
    useEffect(() =>
      {
        const timer = window.setTimeout(() => setActive((current) => (current + 1) % SLIDES.length), AUTOPLAY_MS);

        return () => window.clearTimeout(timer);
      }, [active]);

    return (
      <section className="hero" aria-roledescription="carousel" aria-label="Welcome to King's College, Budo">
        <div className="hero__wrapper">
          <div className="container">
            <div className="hero__media">
              {SLIDES.map((slide, index) => (
                <div key={slide.image} className={`hero__media-item${index === active ? " is-active" : ""}`} aria-hidden={index !== active}>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    style={slide.focus ? { objectPosition: slide.focus } : undefined}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="container hero__content-position">
            <div className="hero__content">
              <span className="hero__eyebrow">At King's College, Budo, we're all about</span>

              <div className="hero__headlines" aria-live="polite">
                {SLIDES.map((slide, index) => (
                  <h2 key={slide.headline} className={`hero__headline${index === active ? " is-active" : ""}`} aria-hidden={index !== active}>
                    {slide.headline}
                  </h2>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container hero__dots-position">
          <ul className="hero__dots">
            {SLIDES.map((slide, index) => (
              <li key={slide.image}>
                <button
                  type="button"
                  className={index === active ? "is-active" : undefined}
                  aria-label={`Show slide ${index + 1} of ${SLIDES.length}`}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
