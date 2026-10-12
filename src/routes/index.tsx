import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Heart,
  Menu,
  Moon,
  Play,
  Radio,
  Send,
  Star,
  Sun,
  Volume2,
  VolumeX,
  X,
  Maximize,
  Pause,
  MapPin,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Logo, Reveal, SectionHeading, ArrowButton, Count, goTo } from "@/components/channel-ui";
import { filterPrograms, hosts, images, programs, timeline } from "@/lib/channel-data";
import familyHero from "@/assets/family-hero.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Наша 7Я — наша семья | Семейный телеканал" },
      {
        name: "description",
        content:
          "Телеканал о том, что по-настоящему важно. Семейные программы, любимые ведущие, добрые истории и онлайн-эфир Наша 7Я.",
      },
      { property: "og:title", content: "Наша 7Я — это твоя семья" },
      {
        property: "og:description",
        content:
          "Истории, которые согревают. Люди, которые вдохновляют. Семейный телеканал Наша 7Я.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
const nav = [
  ["Главная", "home"],
  ["О нас", "about"],
  ["Программы", "programs"],
  ["Ведущие", "hosts"],
  ["Эфир", "live"],
  ["Новости", "news"],
  ["Контакты", "contact"],
];
const categories = [
  "Все программы",
  "Утренние",
  "Дневные",
  "Вечерние",
  "Детские",
  "Документальные",
];
const news = [
  {
    title: "Большая семья — большие истории",
    tag: "Жизнь канала",
    date: "12 октября 2026",
    image: images.hero,
    text: "В новом сезоне мы отправляемся в гости к семьям со всей страны. Разные традиции, разные истории — и одна большая любовь.",
  },
  {
    title: "Осень — время собираться вместе",
    tag: "Новый сезон",
    date: "10 октября 2026",
    image: images.cooking,
    text: "Любимые программы возвращаются с новыми выпусками. Готовим уютные осенние блюда и делимся историями за семейным столом.",
  },
  {
    title: "Маленькие открытия каждый день",
    tag: "Для родителей",
    date: "8 октября 2026",
    image: images.kids,
    text: "Как поддержать детское любопытство? Наши ведущие собрали идеи для совместных игр и добрых семейных выходных.",
  },
];
function Home() {
  const [dark, setDark] = useState(false),
    [menu, setMenu] = useState(false),
    [category, setCategory] = useState("Все программы"),
    [year, setYear] = useState(4),
    [hostStart, setHostStart] = useState(0),
    [galleryFilter, setGalleryFilter] = useState("Все"),
    [story, setStory] = useState(0),
    [modal, setModal] = useState<{
      title: string;
      text: string;
      image?: string;
      kind?: string;
    } | null>(null),
    [playing, setPlaying] = useState(false),
    [muted, setMuted] = useState(true),
    [channel, setChannel] = useState("Наша 7Я"),
    [reminders, setReminders] = useState<string[]>([]),
    [newsletter, setNewsletter] = useState(false),
    [message, setMessage] = useState(false),
    [storySent, setStorySent] = useState(false),
    [copied, setCopied] = useState(""),
    [region, setRegion] = useState("Москва"),
    [seconds, setSeconds] = useState(1080),
    [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const chosen = localStorage.getItem("7ya-theme");
    setDark(chosen === "dark");
    const timeout = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 1080)), 1000);
    return () => clearInterval(timer);
  }, [playing]);
  function toggleTheme() {
    setDark((d) => {
      localStorage.setItem("7ya-theme", d ? "light" : "dark");
      return !d;
    });
  }
  function submit(e: FormEvent<HTMLFormElement>, set: (v: boolean) => void) {
    e.preventDefault();
    set(true);
  }
  function openProgram(p: (typeof programs)[number]) {
    setModal({
      title: p.name,
      text: p.description + ` Новые выпуски в ${p.time}. ${p.episodes} выпусков в архиве.`,
      image: p.image,
    });
  }
  const gallery = [
    { image: images.cooking, label: "На кухне «Семейного ужина»", cat: "Съёмки" },
    { image: images.studio, label: "Тёплые встречи со зрителями", cat: "События" },
    { image: hosts[0].image, label: "Анна перед новым эфиром", cat: "Ведущие" },
    { image: images.morning, label: "Между дублями", cat: "За кадром" },
    { image: images.kids, label: "Наши маленькие герои", cat: "Съёмки" },
  ];
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div className="intro-loader" exit={{ opacity: 0 }}>
            <Logo />
          </motion.div>
        )}
      </AnimatePresence>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav aria-label="Главное меню">
            {nav.map(([label, id]) => (
              <a key={id} className={id === "home" ? "active" : ""} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Button onClick={() => goTo("live")} className="online-button">
              <span className="live-dot" />
              Смотреть онлайн
              <ArrowUpRight />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={dark ? "Светлая тема" : "Тёмная тема"}
              className="theme-toggle"
              onClick={toggleTheme}
            >
              <motion.span
                key={String(dark)}
                initial={{ rotate: -60, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
              >
                {dark ? <Moon /> : <Sun />}
              </motion.span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Открыть меню"
              className="mobile-menu-button"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Закрыть меню"
                onClick={() => setMenu(false)}
              >
                <X />
              </Button>
            </div>
            <nav>
              {nav.map(([label, id], i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenu(false)}
                >
                  {label}
                  <ArrowUpRight />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <section className="hero" id="home">
          <img
            className="hero-photo"
            src={familyHero}
            width={1920}
            height={1088}
            fetchPriority="high"
            alt="Мама, папа и дочь смеются вместе на диване в солнечной гостиной"
          />
          <div className="hero-wash" />
          <div className="hero-inner">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-copy"
            >
              <span className="hero-eyebrow">
                <span className="mini-heart">
                  <Heart size={13} fill="currentColor" />
                </span>{" "}
                ТЕЛЕКАНАЛ О САМОМ ВАЖНОМ
              </span>
              <h1>
                Наша{" "}
                <span className="hero-brand">
                  7Я
                  <Heart className="heading-heart" fill="currentColor" />
                </span>{" "}
                —<br />
                это{" "}
                <span className="accent-word">
                  твоя семья
                  <svg viewBox="0 0 370 18" aria-hidden="true">
                    <path d="M3 13 Q180 -2 367 9" />
                  </svg>
                </span>
              </h1>
              <p>
                Истории, которые согревают. Люди, которые
                <br className="desktop-break" /> вдохновляют. Моменты, которые объединяют.
              </p>
              <div className="hero-ctas">
                <Button
                  onClick={() => {
                    goTo("live");
                    setPlaying(true);
                  }}
                  className="primary-cta"
                >
                  <Play fill="currentColor" />
                  Смотреть эфир
                </Button>
                <Button variant="outline" onClick={() => goTo("programs")} className="outline-cta">
                  Наши программы
                  <ArrowUpRight />
                </Button>
              </div>
              <div className="viewer-line">
                <div className="viewer-avatars">
                  {hosts.map((h) => (
                    <img src={h.image} key={h.name} alt="" width={30} height={30} />
                  ))}
                </div>
                <span>
                  <b>12 458</b> зрителей с нами <span className="live-dot" />
                </span>
                <small>демо</small>
              </div>
            </motion.div>
            <div className="hero-sticker">
              <Heart fill="currentColor" size={23} />
              <span>
                Вместе —<br />
                <b>самое лучшее место</b>
              </span>
            </div>
            <div className="hero-bottom">
              <a href="#about">
                <span>Давайте познакомимся</span>
                <ArrowDown size={16} />
              </a>
              <span>
                Тепло в каждом кадре <Heart size={15} />
              </span>
            </div>
          </div>
          <div className="hero-air-heart">
            <Heart size={45} />
          </div>
        </section>
        <div className="marquee" aria-hidden="true">
          <div>
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                #наша7я <Heart /> #моясемья <Star /> #вместелучше <Heart /> #тепловкаждомкадре{" "}
                <Star />
              </span>
            ))}
          </div>
        </div>
        <Reveal id="programs" className="section programs-section">
          <SectionHeading
            eyebrow="ВКЛЮЧАЙТЕ ТО, ЧТО ЛЮБИТЕ"
            title="Для каждого."
            accent="Для всей семьи."
          >
            <ArrowButton
              onClick={() => {
                setCategory("Все программы");
                goTo("program-grid");
              }}
            >
              Все программы
            </ArrowButton>
          </SectionHeading>
          <div className="filter-row" aria-label="Категории программ">
            {categories.map((c) => (
              <Button
                key={c}
                variant="ghost"
                className={category === c ? "filter active-filter" : "filter"}
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <motion.div
            layout
            id="program-grid"
            className={`program-grid ${category !== "Все программы" ? "filtered-grid" : ""}`}
          >
            <AnimatePresence mode="popLayout">
              {filterPrograms(category).map((p, i) => (
                <motion.article
                  key={p.name}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className={`program-card program-${i}`}
                >
                  <img src={p.image} loading="lazy" alt={p.name} width={900} height={650} />
                  <div className="image-shade" />
                  {i === 0 && category === "Все программы" ? (
                    <span className="program-live">
                      <span className="live-dot" />В ЭФИРЕ СЕЙЧАС
                    </span>
                  ) : (
                    <span className="program-category">{p.category}</span>
                  )}
                  <span className="program-rating">
                    <Star size={12} fill="currentColor" />
                    {p.rating}
                  </span>
                  <div className="program-content">
                    <small>
                      {p.time} · {p.episodes} выпусков
                    </small>
                    <h3>{p.name}</h3>
                    <p>{p.tag}</p>
                    <div className="program-hover">{p.description}</div>
                  </div>
                  <Button
                    aria-label={`Подробнее: ${p.name}`}
                    size="icon"
                    variant="ghost"
                    className="card-arrow"
                    onClick={() => openProgram(p)}
                  >
                    <ArrowUpRight />
                  </Button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>
        <Reveal id="about" className="about-section">
          <div className="section-inner">
            <div className="about-layout">
              <div className="about-photo">
                <img
                  src={images.hero}
                  alt="Большая семья держится за руки на берегу моря"
                  loading="lazy"
                  width={900}
                  height={700}
                />
                <span className="photo-note">Самое важное — быть рядом ♡</span>
              </div>
              <div className="about-copy">
                <span className="eyebrow">
                  <span /> ДАВАЙТЕ ЗНАКОМИТЬСЯ
                </span>
                <h2>
                  Не просто канал.
                  <br />
                  <em>Часть вашей семьи.</em>
                </h2>
                <p>
                  Мы верим: самые большие ценности живут в маленьких моментах. В объятиях после
                  долгого дня. В смехе за общим столом. В простом «как ты?».
                </p>
                <p>
                  «Наша 7Я» — это телевидение, которое объединяет поколения. Мы рассказываем
                  настоящие истории и создаём программы, после которых хочется позвонить близким.
                </p>
                <ArrowButton onClick={() => goTo("timeline")}>
                  Наша история
                  <Heart size={16} />
                </ArrowButton>
              </div>
            </div>
            <div className="stats">
              <Count value={15} suffix=" лет" label="тёплых встреч в эфире" />
              <Count value={2} suffix=" млн" label="зрителей — одна семья" />
              <Count value={150} suffix="+" label="любимых программ" />
              <Count value={50} label="искренних ведущих" />
            </div>
            <div id="timeline" className="timeline">
              {timeline.map((t, i) => (
                <Button
                  key={t.year}
                  variant="ghost"
                  onMouseEnter={() => setYear(i)}
                  onFocus={() => setYear(i)}
                  onClick={() => setYear(i)}
                  className={year === i ? "timeline-point selected" : "timeline-point"}
                >
                  <span className="timeline-dot" />
                  {t.year}
                </Button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="timeline-fact"
                key={year}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <b>{timeline[year].title}</b>
                <span>{timeline[year].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <Reveal id="hosts" className="section hosts-section">
          <SectionHeading eyebrow="НАША СЕМЬЯ В КАДРЕ" title="Лица, которых" accent="вы любите.">
            <div className="carousel-controls">
              <Button
                variant="outline"
                size="icon"
                aria-label="Предыдущий ведущий"
                onClick={() => setHostStart((hostStart + 2) % 3)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Следующий ведущий"
                onClick={() => setHostStart((hostStart + 1) % 3)}
              >
                <ChevronRight />
              </Button>
            </div>
          </SectionHeading>
          <div className="host-grid">
            {Array.from({ length: 3 }, (_, i) => hosts[(hostStart + i) % 3]).map((h, i) => (
              <article className={`host-card host-tone-${i}`} key={h.name}>
                <div className="host-portrait">
                  <img src={h.image} alt={h.name} loading="lazy" width={400} height={400} />
                  <Heart className="portrait-heart" fill="currentColor" />
                </div>
                <span className="host-label">{h.show}</span>
                <h3>{h.name}</h3>
                <p>{h.bio}</p>
                <ArrowButton
                  onClick={() =>
                    setModal({
                      title: h.name,
                      text: h.bio + " Программа: «" + h.show + "».",
                      image: h.image,
                      kind: "host",
                    })
                  }
                >
                  Познакомиться
                </ArrowButton>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal id="live" className="broadcast-section">
          <div className="section-inner">
            <SectionHeading
              eyebrow="МЫ РЯДОМ. ПРЯМО СЕЙЧАС."
              title="Включайте"
              accent="семейное тепло."
            >
              <span className="on-air">
                <span className="live-dot" /> ДЕМОНСТРАЦИОННЫЙ ЭФИР
              </span>
            </SectionHeading>
            <div className="broadcast-layout">
              <div>
                <div className="video-player" ref={videoRef}>
                  <img
                    src={playing ? images.cooking : images.dinner}
                    alt="Кадр демонстрационного эфира «Семейный ужин»"
                    loading="lazy"
                    width={900}
                    height={600}
                  />
                  <div className="image-shade" />
                  <span className="player-logo">наша 7Я</span>
                  <span className="player-badge">{channel} · ДЕМО</span>
                  <Button
                    className="play-big"
                    aria-label={playing ? "Пауза" : "Воспроизвести демонстрационный эфир"}
                    onClick={() => setPlaying(!playing)}
                  >
                    {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                  </Button>
                  <div className="video-controls">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={playing ? "Приостановить" : "Продолжить"}
                      onClick={() => setPlaying(!playing)}
                    >
                      {playing ? <Pause /> : <Play />}
                    </Button>
                    <span className="video-progress">
                      <span className={playing ? "progress-fill playing" : "progress-fill"} />
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={muted ? "Включить звук" : "Выключить звук"}
                      onClick={() => setMuted(!muted)}
                    >
                      {muted ? <VolumeX /> : <Volume2 />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Полный экран"
                      onClick={() => {
                        if (document.fullscreenElement) void document.exitFullscreen();
                        else void videoRef.current?.requestFullscreen();
                      }}
                    >
                      <Maximize />
                    </Button>
                  </div>
                  {!muted && (
                    <small className="silent-note">Демонстрация без звуковой дорожки</small>
                  )}
                </div>
                <div className="current-show">
                  <div>
                    <span className="eyebrow">СЕЙЧАС В ЭФИРЕ</span>
                    <h3>{channel === "Наша 7Я" ? "Семейный ужин" : "Детский час"}</h3>
                    <p>
                      Осталось {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")} ·
                      19:00 — 20:00
                    </p>
                  </div>
                  <label className="channel-select">
                    Канал
                    <select value={channel} onChange={(e) => setChannel(e.target.value)}>
                      <option>Наша 7Я</option>
                      <option>7Я детям</option>
                    </select>
                  </label>
                </div>
              </div>
              <aside className="schedule">
                <div className="schedule-title">
                  <h3>Сегодня в эфире</h3>
                  <span>12 октября, пн</span>
                </div>
                {[
                  ["16:00", "Детский час"],
                  ["17:00", "Родительский час"],
                  ["19:00", "Семейный ужин"],
                  ["20:00", "Бабушкин рецепт"],
                  ["21:00", "Истории любви"],
                ].map(([time, name], i) => (
                  <div className={`schedule-row ${i === 2 ? "current" : ""}`} key={time}>
                    <span>{time}</span>
                    <div>
                      <b>{name}</b>
                      {i === 2 && (
                        <small>
                          <span className="live-dot" /> СЕЙЧАС В ЭФИРЕ
                        </small>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`${reminders.includes(name) ? "Убрать напоминание" : "Напомнить"}: ${name}`}
                      onClick={() =>
                        setReminders((r) =>
                          r.includes(name) ? r.filter((n) => n !== name) : [...r, name],
                        )
                      }
                    >
                      {reminders.includes(name) ? <Check /> : <Bell />}
                    </Button>
                  </div>
                ))}
                {reminders.length > 0 && (
                  <p className="reminder-note">
                    Напоминание отмечено на этой странице: {reminders.join(", ")}
                  </p>
                )}
              </aside>
            </div>
          </div>
        </Reveal>
        <Reveal id="backstage" className="section">
          <SectionHeading eyebrow="ЧУТЬ БЛИЖЕ, ЧУТЬ ЛИЧНЕЕ" title="Магия" accent="за кадром.">
            <div className="filter-row compact">
              {["Все", "Съёмки", "Ведущие", "За кадром", "События"].map((c) => (
                <Button
                  variant="ghost"
                  className={galleryFilter === c ? "filter active-filter" : "filter"}
                  key={c}
                  onClick={() => setGalleryFilter(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </SectionHeading>
          <div className="gallery-grid">
            {gallery
              .filter((g) => galleryFilter === "Все" || g.cat === galleryFilter)
              .map((g, i) => (
                <Button
                  variant="ghost"
                  key={g.label}
                  className={`gallery-item gallery-${i}`}
                  onClick={() =>
                    setModal({ title: g.label, text: g.cat, image: g.image, kind: "gallery" })
                  }
                >
                  <img loading="lazy" src={g.image} alt={g.label} width={900} height={700} />
                  <span>
                    {g.label}
                    <ArrowUpRight />
                  </span>
                </Button>
              ))}
          </div>
        </Reveal>
        <Reveal id="stories" className="stories-section">
          <div className="section-inner">
            <span className="eyebrow">
              <Heart size={14} /> ИСТОРИИ НАШЕЙ БОЛЬШОЙ СЕМЬИ
            </span>
            <div className="story-layout">
              <div>
                <h2>
                  Вы — наша
                  <br />
                  <em>лучшая история.</em>
                </h2>
                <p>
                  За каждым экраном — настоящая жизнь.
                  <br />
                  Спасибо, что делитесь ею с нами.
                </p>
                <Button
                  className="primary-cta"
                  onClick={() => {
                    setStorySent(false);
                    setModal({
                      title: "Расскажите свою историю",
                      text: "Каждая семья — особенная. Поделитесь тем, что важно для вас.",
                      kind: "story",
                    });
                  }}
                >
                  Поделиться историей
                  <Heart />
                </Button>
              </div>
              <div className="testimonial">
                <Heart className="quote-heart" fill="currentColor" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={story}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <blockquote>
                      {
                        [
                          "«Каждый вечер собираемся всей семьёй у телевизора. Ваш канал — наш маленький ритуал, который делает нас ближе.»",
                          "«После „Бабушкиного рецепта“ мы с дочкой снова печём вместе. Спасибо за эти маленькие счастливые моменты.»",
                          "«Здесь так много настоящих, добрых людей. Смотрим вместе с родителями, даже когда между нами тысячи километров.»",
                        ][story]
                      }
                    </blockquote>
                    <div className="story-person">
                      <span>{["МК", "ОС", "АВ"][story]}</span>
                      <div>
                        <b>
                          {["Мария и семья Кузнецовых", "Ольга Смирнова", "Алексей Воронов"][story]}
                        </b>
                        <small>
                          {
                            [
                              "Казань · зрители с 2018 года",
                              "Москва · зрительница с 2020 года",
                              "Екатеринбург · зритель с 2019 года",
                            ][story]
                          }
                        </small>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="story-dots">
                  {[0, 1, 2].map((i) => (
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`История ${i + 1}`}
                      key={i}
                      onClick={() => setStory(i)}
                      className={story === i ? "selected" : ""}
                    >
                      <span />
                    </Button>
                  ))}
                </div>
                <small className="demo-caption">Пример истории зрителей</small>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal id="news" className="section">
          <SectionHeading
            eyebrow="ЧТО НОВОГО В НАШЕЙ СЕМЬЕ"
            title="Хорошие новости."
            accent="И не только."
          >
            <ArrowButton
              onClick={() =>
                setModal({
                  title: "Новости канала",
                  text: news.map((n) => n.date + " — " + n.title).join("\n\n"),
                })
              }
            >
              Все новости
            </ArrowButton>
          </SectionHeading>
          <div className="news-grid">
            {news.map((n) => (
              <article className="news-card" key={n.title}>
                <div className="news-image">
                  <img src={n.image} alt={n.title} loading="lazy" width={900} height={600} />
                  <span>{n.tag}</span>
                </div>
                <small>{n.date} · 4 мин чтения</small>
                <h3>{n.title}</h3>
                <ArrowButton
                  onClick={() => setModal({ title: n.title, text: n.text, image: n.image })}
                >
                  Читать историю
                </ArrowButton>
              </article>
            ))}
          </div>
          <div className="newsletter">
            <div>
              <Send />
              <div>
                <h3>Письма, которые приятно открывать.</h3>
                <p>Новые программы и немного семейного тепла.</p>
              </div>
            </div>
            <form onSubmit={(e) => submit(e, setNewsletter)}>
              <label className="sr-only" htmlFor="newsletter-email">
                Ваш email
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Ваш email"
                required
                disabled={newsletter}
              />
              <Button aria-label="Подписаться на рассылку" type="submit" disabled={newsletter}>
                {newsletter ? <Check /> : <ArrowUpRight />}
              </Button>
              {newsletter && <small>Спасибо! Заявка заполнена. Рассылка пока не подключена.</small>}
            </form>
          </div>
        </Reveal>
        <Reveal id="contact" className="contact-section">
          <div className="section-inner">
            <SectionHeading
              eyebrow="РАССТОЯНИЯ НЕ ИМЕЮТ ЗНАЧЕНИЯ"
              title="Мы рядом."
              accent="Давайте общаться."
            />
            <div className="contact-layout">
              <div className="coverage">
                <div className="coverage-head">
                  <h3>Одна страна. Одна большая семья.</h3>
                  <span>
                    <span className="live-dot" />
                    Карта присутствия · демо
                  </span>
                </div>
                <svg
                  className="russia-map"
                  viewBox="0 0 650 310"
                  role="img"
                  aria-label="Схематическая интерактивная карта России"
                >
                  <path d="M58 117l27-18 5-26 30 13 29-11 22 16 28-18 17 18 39-12 24 20 35-8 13-33 35 13 21-26 34 7 8-20 30 16 30-7 21 21 34-15 11 36 43-7 9 22 32-3 7 28 27 8-21 22-40-6-4 30-38-15-18 21-31-16-36 10-22-27-42 12-24-20-35 22-38-15-37 7-15-27-40 16-8-35-36-11-8-27-27 7-18-24z" />
                  {(
                    [
                      ["Москва", 105, 150],
                      ["Казань", 183, 154],
                      ["Екатеринбург", 253, 149],
                      ["Новосибирск", 346, 166],
                      ["Владивосток", 530, 197],
                      ["Санкт-Петербург", 98, 107],
                    ] as const
                  ).map(([name, x, y]) => (
                    <g
                      key={name}
                      tabIndex={0}
                      role="button"
                      aria-label={String(name)}
                      onClick={() => setRegion(String(name))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setRegion(String(name));
                        }
                      }}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={region === name ? 10 : 6}
                        className={region === name ? "region active-region" : "region"}
                      />
                      <circle cx={x} cy={y} r={20} className="region-hit" />
                    </g>
                  ))}
                </svg>
                <div className="region-info">
                  <MapPin size={18} />
                  <b>{region}</b>
                  <span>Смотрите нас онлайн из любого города</span>
                </div>
                <div className="contact-details">
                  {[
                    ["Электронная почта", "hello@nasha7ya.example"],
                    ["Для партнёров", "partners@nasha7ya.example"],
                  ].map(([label, value]) => (
                    <div key={value}>
                      <small>{label}</small>
                      <span>
                        {value}
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Скопировать ${label}`}
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(value);
                              setCopied(value);
                            } catch {
                              setCopied("");
                            }
                          }}
                        >
                          {copied === value ? <Check /> : <Copy />}
                        </Button>
                      </span>
                    </div>
                  ))}
                </div>
                <small className="demo-caption">
                  Контактные данные — образцы. Адрес редакции будет добавлен.
                </small>
              </div>
              <form className="contact-form" onSubmit={(e) => submit(e, setMessage)}>
                <h3>Есть что рассказать?</h3>
                <p>Мы всегда рады услышать вас.</p>
                <label>
                  Ваше имя
                  <Input required placeholder="Как к вам обращаться?" minLength={2} />
                </label>
                <label>
                  Электронная почта
                  <Input type="email" required placeholder="name@example.com" />
                </label>
                <label>
                  Ваше сообщение
                  <Textarea required placeholder="Напишите нам..." minLength={10} rows={4} />
                </label>
                <label className="consent">
                  <input type="checkbox" required />
                  Согласен на обработку персональных данных
                </label>
                <Button type="submit" className="primary-cta" disabled={message}>
                  {message ? <Check /> : <Send />}
                  {message ? "Форма заполнена" : "Отправить сообщение"}
                </Button>
                {message && <p role="status">Спасибо! Отправка в редакцию пока не подключена.</p>}
              </form>
            </div>
          </div>
        </Reveal>
      </main>
      <footer>
        <div className="section-inner">
          <div className="footer-top">
            <div>
              <Logo />
              <p>
                Тепло в каждом кадре.
                <br />
                Семья — в каждом сердце.
              </p>
              <div className="socials">
                {["VK", "TG", "Дзен"].map((s) => (
                  <Button
                    variant="outline"
                    key={s}
                    onClick={() =>
                      setModal({
                        title: s,
                        text: "Официальная страница канала будет добавлена после подтверждения ссылки.",
                      })
                    }
                    aria-label={s}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4>Наш канал</h4>
              {nav.slice(1, 4).map(([n, id]) => (
                <a key={id} href={`#${id}`}>
                  {n}
                </a>
              ))}
            </div>
            <div>
              <h4>Будем ближе</h4>
              {[
                ["Смотреть эфир", "live"],
                ["Закулисье", "backstage"],
                ["Истории зрителей", "stories"],
                ["Контакты", "contact"],
              ].map(([n, id]) => (
                <a href={`#${id}`} key={id}>
                  {n}
                </a>
              ))}
            </div>
            <div className="footer-love">
              <Heart fill="currentColor" />
              <p>
                Хорошо, когда
                <br />
                <b>мы вместе.</b>
              </p>
              <Button variant="ghost" onClick={() => goTo("home")} className="arrow-link">
                Наверх
                <ArrowUp />
              </Button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 «Наша 7Я — наша семья»</span>
            <Button
              variant="link"
              onClick={() =>
                setModal({
                  title: "Политика конфиденциальности",
                  text: "Это демонстрационный сайт. Формы не отправляют и не сохраняют персональные данные. Выбор темы хранится только в вашем браузере. Политика оператора будет опубликована перед запуском приёма обращений.",
                })
              }
            >
              Политика конфиденциальности
            </Button>
            <span>
              Сделано с любовью <Heart size={12} />
              <b>12+</b>
            </span>
          </div>
        </div>
      </footer>
      <Dialog
        open={Boolean(modal)}
        onOpenChange={(open) => {
          if (!open) setModal(null);
        }}
      >
        <DialogContent className={modal?.kind === "gallery" ? "gallery-dialog" : "content-dialog"}>
          {modal?.image && <img className="modal-image" src={modal.image} alt={modal.title} />}
          <DialogTitle>{modal?.title}</DialogTitle>
          <DialogDescription className="modal-description">{modal?.text}</DialogDescription>
          {modal?.kind === "story" && (
            <form className="story-form" onSubmit={(e) => submit(e, setStorySent)}>
              <label>
                Ваше имя
                <Input required minLength={2} />
              </label>
              <label>
                Ваш email
                <Input type="email" required />
              </label>
              <label>
                Ваша история
                <Textarea required minLength={20} rows={4} />
              </label>
              <label className="consent">
                <input type="checkbox" required />
                Согласен на обработку персональных данных
              </label>
              <Button type="submit" disabled={storySent}>
                {storySent ? <Check /> : <Heart />}
                {storySent ? "История заполнена" : "Поделиться"}
              </Button>
              {storySent && (
                <p role="status">
                  Спасибо за вашу историю! Отправка в редакцию пока не подключена.
                </p>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
