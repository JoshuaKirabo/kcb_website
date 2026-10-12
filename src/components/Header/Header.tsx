import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import redLion from "../../assets/red-lion.png";
import "../../css/Header.css";

type QuickLink = { label: string; href: string; icon: IconName };
type NavItem = { label: string; href: string; links: string[] };
type Panel = "menu" | "search" | null;

const QUICK_LINKS: QuickLink[] =
  [
    { label: "Portal", href: "#", icon: "person" },
    { label: "Calendar", href: "#", icon: "calendar" },
    { label: "Arts", href: "#", icon: "palette" },
    { label: "Sports", href: "#", icon: "trophy" },
    { label: "Apply", href: "#", icon: "edit" },
    { label: "Enquire", href: "#", icon: "help" },
    { label: "Giving", href: "#", icon: "heart" },
    { label: "Old Budonians", href: "#", icon: "group" },
  ];

const NAV: NavItem[] =
  [
    { label: "About Budo", href: "#about", links: ["Our History", "Mission & Values", "Leadership", "Our Staff", "Old Budonians", "Careers"] },
    { label: "Academics", href: "#", links: ["Our Approach", "O-Level", "A-Level", "Departments", "Library & Resources"] },
    { label: "Student Life", href: "#", links: ["Boarding Houses", "Chapel", "Clubs & Societies", "Sports", "Music & Drama", "Student Support"] },
    { label: "Admissions", href: "#", links: ["How to Apply", "Fees & Bursaries", "Visit Budo", "Enquire", "Apply"] },
  ];

const MENU_SHORTCUTS: QuickLink[] =
  [
    { label: "Enquire", href: "#", icon: "help" },
    { label: "Apply", href: "#", icon: "edit" },
    { label: "Giving", href: "#", icon: "heart" },
  ];

const MENU_PILLS_LEFT: QuickLink[] =
  [
    { label: "Calendar", href: "#", icon: "calendar" },
    { label: "News", href: "#", icon: "news" },
    { label: "Giving", href: "#", icon: "heart" },
  ];

const MENU_PILLS_RIGHT: QuickLink[] =
  [
    { label: "Portal", href: "#", icon: "person" },
    { label: "Old Budonians", href: "#", icon: "group" },
  ];

// Ignoring tiny scroll wiggles so the strip doesn't flicker on a trackpad.
const SCROLL_SLACK = 6;

function Brand()
  {
    return (
      <a className="brand" href="/">
        <img className="brand__lion" src={redLion} alt="" width={169} height={180} />
        <span className="brand__text">
          <span className="brand__name">King's College, Budo</span>
          <span className="brand__est">Est. 1906</span>
        </span>
      </a>
    );
  }

function Pill({ link }: { link: QuickLink })
  {
    return (
      <a className="site-menu__pill" href={link.href}>
        <Icon name={link.icon} />
        {link.label}
      </a>
    );
  }

export function Header()
  {
    const [topbarHidden, setTopbarHidden] = useState(false);
    const [panel, setPanel] = useState<Panel>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const menuCloseRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Scrolling down tucks the quick-links strip away, scrolling up (or reaching the top) brings it back.
    useEffect(() =>
      {
        let lastScroll = window.scrollY;

        const onScroll = () =>
          {
            const current = window.scrollY;

            if(current <= 0)
              {
                setTopbarHidden(false);
                lastScroll = 0;
                return;
              }

            if(Math.abs(current - lastScroll) < SCROLL_SLACK) return;

            setTopbarHidden(current > lastScroll);
            lastScroll = current;
          };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
      }, []);

    // While a panel is open the page stops scrolling, Escape closes it, and focus goes back to the button that opened it.
    useEffect(() =>
      {
        if(!panel) return;

        const trigger = panel === "menu" ? menuButtonRef.current : searchButtonRef.current;
        const onKeyDown = (event: KeyboardEvent) =>
          {
            if(event.key === "Escape") setPanel(null);
          };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        // Waiting a frame so the panel has dropped its inert flag before we try to focus inside it.
        const frame = requestAnimationFrame(() => (panel === "menu" ? menuCloseRef.current : searchInputRef.current)?.focus());

        return () =>
          {
            cancelAnimationFrame(frame);
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
            trigger?.focus();
          };
      }, [panel]);

    return (
      <>
        <header className={`site-header${topbarHidden ? " is-topbar-hidden" : ""}`}>
          <div className="site-header__topbar">
            <div className="container">
              <ul className="site-header__quick-links">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>
                      <Icon name={link.icon} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="site-header__bar">
            <div className="container site-header__row">
              <Brand />

              <div className="site-header__actions">
                <nav className="site-header__nav" aria-label="Main">
                  <ul>
                    {NAV.map((item) => (
                      <li key={item.label} className="site-header__nav-item">
                        <a className="site-header__nav-link" href={item.href}>{item.label}</a>

                        <ul className="site-header__dropdown">
                          {item.links.map((link) => (
                            <li key={link}><a href="#">{link}</a></li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </nav>

                <button
                  ref={searchButtonRef}
                  type="button"
                  className="site-header__search"
                  aria-label="Search"
                  aria-expanded={panel === "search"}
                  aria-controls="site-search"
                  onClick={() => setPanel("search")}
                >
                  <Icon name="search" size={20} />
                </button>

                <button
                  ref={menuButtonRef}
                  type="button"
                  className="site-header__menu-button"
                  aria-expanded={panel === "menu"}
                  aria-controls="site-menu"
                  onClick={() => setPanel("menu")}
                >
                  <span className="site-header__menu-label">Menu</span>
                  <span className="site-header__menu-orb" aria-hidden="true">
                    <span className="site-header__menu-dot" />
                    <span className="site-header__menu-lines">
                      <span className="site-header__menu-line" />
                      <span className="site-header__menu-line" />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div id="site-search" className={`site-search${panel === "search" ? " is-open" : ""}`} inert={panel !== "search"}>
          <div className="site-search__backdrop" onClick={() => setPanel(null)} />

          <div className="site-search__sheet" role="dialog" aria-modal="true" aria-label="Search the site">
            <form className="container site-search__form" role="search" action="/search" method="get">
              <Icon name="search" size={28} />
              <label htmlFor="site-search-input" className="visually-hidden">Search</label>
              <input ref={searchInputRef} id="site-search-input" name="q" type="search" placeholder="What are you looking for?" autoComplete="off" />
              <button type="button" className="site-search__close" aria-label="Close search" onClick={() => setPanel(null)}>
                <Icon name="close" size={22} />
              </button>
            </form>
          </div>
        </div>

        <div id="site-menu" className={`site-menu${panel === "menu" ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu" inert={panel !== "menu"}>
          <div className="site-menu__top">
            <div className="container site-menu__brand">
              <Brand />
            </div>

            <div className="site-menu__shortcuts">
              {MENU_SHORTCUTS.map((link) => (
                <a key={link.label} href={link.href}>
                  <span><Icon name={link.icon} />{link.label}</span>
                </a>
              ))}
            </div>

            <button ref={menuCloseRef} type="button" className="site-menu__close" aria-label="Close menu" onClick={() => setPanel(null)}>
              <span className="site-menu__close-fill" aria-hidden="true" />
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav className="site-menu__body" aria-label="Site">
            <div className="container site-menu__columns">
              {NAV.map((item) => (
                <div key={item.label} className="site-menu__column">
                  <a className="site-menu__heading" href={item.href}>{item.label}</a>

                  <ul>
                    {item.links.map((link) => (
                      <li key={link}><a href="#">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="container site-menu__footer">
            <div className="site-menu__pills">
              {MENU_PILLS_LEFT.map((link) => <Pill key={link.label} link={link} />)}
            </div>

            <div className="site-menu__pills">
              {MENU_PILLS_RIGHT.map((link) => <Pill key={link.label} link={link} />)}
            </div>
          </div>
        </div>
      </>
    );
  }
