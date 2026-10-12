import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import { useCountUp } from "../../hooks/useCountUp";
import crest from "../../assets/budo/crest.png";
import "../../css/Stats.css";

type Stat = { value: number; prefix?: string; suffix?: string; label: string; tone: string; icon: ReactNode };

// Every number here comes from kingscollegebudo.ac.ug: the founding date from Our History, the Heads of State from its Royal Connection, the Old Budonians from Core Values, the Olympiad awards from Why Choose Us. Labels stay plain: the numbers carry it.
const STATS: Stat[] =
  [
    {
      value: 120,
      label: "Years of Excellence",
      tone: "var(--budo-oxblood)",
      icon: <path d="M7 3h10M7 21h10M8 3v3l4 6-4 6v3M16 3v3l-4 6 4 6v3" />,
    },
    {
      value: 10000,
      suffix: "+",
      label: "Old Budonians",
      tone: "var(--budo-ink)",
      icon: <path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 20v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />,
    },
    {
      value: 3,
      label: "Heads of state educated at Budo",
      tone: "var(--budo-line)",
      icon: <path d="M3 19h18M4 19 3 8l5 4 4-7 4 7 5-4-1 11" />,
    },
    {
      value: 4,
      label: "International Science Olympiad awards",
      tone: "var(--budo-oxblood-deep)",
      icon: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9" />,
    },
  ];

const COUNT_STAGGER_MS = 150;

function StatValue({ stat, start, delay }: { stat: Stat; start: boolean; delay: number })
  {
    const count = useCountUp(stat.value, start, delay);
    const format = (n: number) => `${stat.prefix ?? ""}${n.toLocaleString("en-US")}${stat.suffix ?? ""}`;

    // The final number sits hidden underneath so the box is its full width from the start and the label never shifts as the digits grow. Screen readers get only the final number.
    return (
      <span className="stats__value">
        <span className="stats__value-final" aria-hidden="true">{format(stat.value)}</span>
        <span className="stats__value-count" aria-hidden="true">{format(count)}</span>
        <span className="stats__sr">{format(stat.value)}</span>
      </span>
    );
  }

export function Stats()
  {
    const [titleRef, titleShown] = useReveal<HTMLHeadingElement>();
    const [listRef, listShown] = useReveal<HTMLUListElement>();
    const [sealRef, sealShown] = useReveal<HTMLDivElement>();

    return (
      <section className="stats" aria-labelledby="stats-title">
        <div className="container">
          <h2 ref={titleRef} id="stats-title" className={`stats__title stats-reveal${titleShown}`}>Budo at a Glance</h2>

          <div className="stats__grid">
            <ul ref={listRef} className={`stats__list stats-reveal${listShown}`}>
              {STATS.map((stat, index) => (
                <li key={stat.label} className="stats__item">
                  <span className="stats__icon" style={{ background: stat.tone }}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{stat.icon}</svg>
                  </span>

                  <div>
                    <StatValue stat={stat} start={listShown !== ""} delay={index * COUNT_STAGGER_MS} />
                    <span className="stats__label">{stat.label}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div ref={sealRef} className={`stats__seal${sealShown}`} style={{ "--crest": `url(${crest})` } as CSSProperties}>
              <span className="stats__crest" role="img" aria-label="The King's College, Budo crest: the motto Gakyali Mabaga above two shields, one bearing the rampant lion." />
            </div>
          </div>
        </div>
      </section>
    );
  }
