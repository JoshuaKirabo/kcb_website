import { useEffect, useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import assembly from "../../assets/budo/assembly.jpeg";
import dance from "../../assets/budo/dance.jpeg";
import awardChaplain from "../../assets/budo/award-chaplain.jpeg";
import awardHandshake from "../../assets/budo/award-handshake.jpeg";
import dinner from "../../assets/budo/dinner.jpeg";
import prizeGiving from "../../assets/budo/prize-giving.jpeg";
import redLion from "../../assets/red-lion.png";
import "../../css/About.css";

type Photo = { image: string; alt: string; focus?: string };

// None of these appear in the hero, so the two sections never show the same shot.
const SLIDES: Photo[] =
  [
    { image: assembly, alt: "Budo students in uniform applauding during a ceremony under a marquee." },
    { image: dance, alt: "Students in uniform dancing in a long line across the grass." },
    { image: awardChaplain, alt: "A student holding her award beside the school chaplain.", focus: "center 30%" },
    { image: awardHandshake, alt: "A student shaking hands as he receives his certificate on stage.", focus: "center 25%" },
  ];

const AUTOPLAY_MS = 6000;
const SLIDE_MS = 500;

export function About()
  {
    // The track carries a copy of the first slide on the end. Sliding onto it then snapping back to 0 keeps the loop going one way.
    const [position, setPosition] = useState(0);
    const [animate, setAnimate] = useState(true);

    const [introRef, introShown] = useReveal<HTMLDivElement>();
    const [mediaRef, mediaShown] = useReveal<HTMLDivElement>();
    const [photoRef, photoShown] = useReveal<HTMLImageElement>();
    const [visionRef, visionShown] = useReveal<HTMLDivElement>();
    const [missionRef, missionShown] = useReveal<HTMLDivElement>();

    // Once the slide onto the copy has had time to finish, it snaps back to 0 without animating. A timer rather than transitionend, since background tabs skip the transition and the event never fires.
    useEffect(() =>
      {
        const onCopy = position === SLIDES.length;
        const timer = window.setTimeout(() =>
          {
            setAnimate(!onCopy);
            setPosition(onCopy ? 0 : position + 1);
          }, onCopy ? SLIDE_MS : AUTOPLAY_MS);

        return () => window.clearTimeout(timer);
      }, [position]);

    const track = [...SLIDES, SLIDES[0]];

    return (
      <section id="about" className="about" aria-labelledby="about-title">
        <div className="container">
          <div ref={introRef} className={`about__intro about-reveal${introShown}`}>
            <span className="about__eyebrow">About Budo</span>
            <h2 id="about-title" className="about__title">A heritage founded on Christian faith, academic excellence, discipline, leadership, and service.</h2>
          </div>

          <div className="about__grid">
            <div ref={mediaRef} className={`about__media about-reveal${mediaShown}`}>
              <div className="about__slider" aria-roledescription="carousel" aria-label="Life at Budo">
                <div
                  className="about__track"
                  style={{ transform: `translateX(-${position * 100}%)`, transition: animate ? `transform ${SLIDE_MS}ms ease` : "none" }}
                >
                  {track.map((slide, index) => (
                    <div key={index} className="about__slide" aria-hidden={index !== position}>
                      <img src={slide.image} alt={slide.alt} style={slide.focus ? { objectPosition: slide.focus } : undefined} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="about__feature">
                <img src={dinner} alt="A group of Budo students dressed up and smiling together at the school dinner." style={{ objectPosition: "center 20%" }} loading="lazy" decoding="async" />
              </div>

              {/* The lion stands where the original's flying owl perches, half over the slider's bottom edge. */}
              <img src={redLion} alt="" className={`about__lion${mediaShown}`} aria-hidden="true" />
            </div>

            <div className="about__aside">
              <img ref={photoRef} src={prizeGiving} alt="Students holding their certificates on stage at the 2026 Prize Giving." className={`about__aside-photo about-reveal${photoShown}`} loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="about__values">
            <div ref={visionRef} className={`about__value about-reveal${visionShown}`}>
              <h5>Our Vision</h5>
              <p>To be the hub of globally enlightened and dignified men and women, rooted in Christian values.</p>
            </div>

            <div ref={missionRef} className={`about__value about-reveal${missionShown}`}>
              <h5>Our Mission</h5>
              <p>To provide an all-round quality secondary education through networking, teaching, and learning. <strong>Gakyali Mabaga.</strong></p>
            </div>

            <div className="about__cta">
              <a href="#about" className="about__button">About Budo</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
