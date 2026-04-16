import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["Все", "Ювелирные украшения", "Часы", "Аксессуары", "Одежда", "Обувь"];
const MATERIALS = ["Золото", "Серебро", "Платина", "Кожа", "Шёлк", "Кашемир", "Бриллианты"];
const CHARACTERISTICS = ["Новинка", "Лимитированная серия", "Эксклюзив", "Ручная работа", "Сертификат"];

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  material: string[];
  tags: string[];
  gradient: string;
  accent: string;
  iconName: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Кольцо Eternité",
    brand: "Maison Royale",
    price: 285000,
    category: "Ювелирные украшения",
    material: ["Золото", "Бриллианты"],
    tags: ["Лимитированная серия", "Ручная работа"],
    gradient: "from-amber-950 via-amber-900 to-yellow-950",
    accent: "from-amber-400 to-yellow-300",
    iconName: "Gem",
  },
  {
    id: 2,
    name: "Хронограф Prestige",
    brand: "Temporal Swiss",
    price: 1250000,
    category: "Часы",
    material: ["Платина"],
    tags: ["Новинка", "Сертификат", "Эксклюзив"],
    gradient: "from-zinc-950 via-slate-900 to-zinc-950",
    accent: "from-slate-300 to-white",
    iconName: "Clock",
  },
  {
    id: 3,
    name: "Клатч Milano",
    brand: "Casa Vero",
    price: 195000,
    category: "Аксессуары",
    material: ["Кожа"],
    tags: ["Ручная работа", "Сертификат"],
    gradient: "from-stone-950 via-stone-900 to-amber-950",
    accent: "from-amber-600 to-amber-400",
    iconName: "Briefcase",
  },
  {
    id: 4,
    name: "Пальто Imperial",
    brand: "Atelier Nord",
    price: 420000,
    category: "Одежда",
    material: ["Кашемир"],
    tags: ["Новинка", "Лимитированная серия"],
    gradient: "from-neutral-950 via-stone-900 to-neutral-950",
    accent: "from-stone-400 to-stone-200",
    iconName: "Shirt",
  },
  {
    id: 5,
    name: "Колье Lumière",
    brand: "Bijoux d'Or",
    price: 680000,
    category: "Ювелирные украшения",
    material: ["Золото", "Бриллианты", "Платина"],
    tags: ["Эксклюзив", "Ручная работа", "Сертификат"],
    gradient: "from-yellow-950 via-amber-900 to-orange-950",
    accent: "from-yellow-300 to-amber-400",
    iconName: "Gem",
  },
  {
    id: 6,
    name: "Туфли Élégance",
    brand: "Riva Milano",
    price: 145000,
    category: "Обувь",
    material: ["Кожа", "Серебро"],
    tags: ["Новинка"],
    gradient: "from-rose-950 via-red-900 to-rose-950",
    accent: "from-rose-400 to-red-300",
    iconName: "Footprints",
  },
  {
    id: 7,
    name: "Шарф Heritage",
    brand: "Maison Cachemire",
    price: 89000,
    category: "Аксессуары",
    material: ["Шёлк", "Кашемир"],
    tags: ["Лимитированная серия"],
    gradient: "from-violet-950 via-purple-900 to-violet-950",
    accent: "from-violet-400 to-purple-300",
    iconName: "Wind",
  },
  {
    id: 8,
    name: "Серьги Constellation",
    brand: "Maison Royale",
    price: 375000,
    category: "Ювелирные украшения",
    material: ["Золото", "Бриллианты"],
    tags: ["Эксклюзив", "Сертификат"],
    gradient: "from-amber-950 via-yellow-900 to-amber-950",
    accent: "from-yellow-400 to-amber-300",
    iconName: "Star",
  },
];

const formatPrice = (p: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(p);

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1500000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleMaterial = (m: string) =>
    setSelectedMaterials((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const toggleTag = (t: string) =>
    setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const filtered = PRODUCTS.filter((p) => {
    if (activeCategory !== "Все" && p.category !== activeCategory) return false;
    if (selectedMaterials.length && !selectedMaterials.some((m) => p.material.includes(m))) return false;
    if (selectedTags.length && !selectedTags.some((t) => p.tags.includes(t))) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const activeFiltersCount =
    (activeCategory !== "Все" ? 1 : 0) +
    selectedMaterials.length +
    selectedTags.length +
    (priceRange[0] > 0 || priceRange[1] < 1500000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-body overflow-x-hidden">

      {/* NAVIGATION */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--border))]"
        style={{ background: "hsla(20,10%,4%,0.92)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-display text-2xl tracking-[0.2em] text-shimmer">LUX STORE</span>
            <div className="hidden md:flex gap-6 text-xs tracking-[0.15em] uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
              {["Новинки", "Коллекции", "Бренды", "О нас"].map((item) => (
                <button
                  key={item}
                  className="transition-colors duration-300"
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="transition-colors duration-300"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >
              <Icon name="Search" size={18} />
            </button>
            <button
              className="relative transition-colors duration-300"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >
              <Icon name="Heart" size={18} />
              {wishlist.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-bold"
                  style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              className="relative transition-colors duration-300"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
            >
              <Icon name="ShoppingBag" size={18} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-bold"
                  style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsla(42,80%,10%,0.8) 0%, hsl(20,10%,4%) 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, hsla(42,80%,58%,0.08) 60px),
              repeating-linear-gradient(90deg, transparent, transparent 59px, hsla(42,80%,58%,0.08) 60px)`,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full py-24">
          <div className="max-w-3xl">
            <div className="animate-fade-in flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: "hsl(var(--gold))" }} />
              <span className="text-xs tracking-[0.3em] uppercase font-body" style={{ color: "hsl(var(--gold))" }}>
                Коллекция 2026
              </span>
            </div>

            <h1
              className="animate-fade-in-up delay-100 font-display leading-none mb-6"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 300 }}
            >
              Искусство
              <br />
              <em style={{ color: "hsl(var(--gold))", fontStyle: "italic" }}>роскоши</em>
              <br />
              без компромисс
            </h1>

            <p
              className="animate-fade-in-up delay-300 text-lg mb-10 max-w-xl leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Эксклюзивные предметы роскоши от мировых домов моды. Каждый товар — история безупречного вкуса.
            </p>

            <div className="animate-fade-in-up delay-500 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase font-body transition-all duration-300 hover:scale-105"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                className="flex items-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase font-body border transition-all duration-300"
                style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--gold))";
                  (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--gold))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--border))";
                  (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--muted-foreground))";
                }}
              >
                Новые поступления
              </button>
            </div>
          </div>

          <div className="animate-fade-in delay-700 mt-20 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: "500+", label: "Товаров" },
              { value: "120+", label: "Брендов" },
              { value: "15 лет", label: "На рынке" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l pl-6" style={{ borderColor: "hsla(42,80%,58%,0.3)" }}>
                <div className="font-display text-3xl" style={{ color: "hsl(var(--gold))", fontWeight: 300 }}>
                  {value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[45vw] h-[70vh] pointer-events-none">
          <div className="w-full h-full relative">
            <div className="absolute inset-8 border opacity-10" style={{ borderColor: "hsl(var(--gold))" }} />
            <div className="absolute inset-16 border opacity-5" style={{ borderColor: "hsl(var(--gold))" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display select-none leading-none"
                style={{ fontSize: "20vw", opacity: 0.03, color: "hsl(var(--gold))" }}
              >
                L
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING LINE */}
      <section
        className="py-5 border-y overflow-hidden"
        style={{ borderColor: "hsl(var(--border))", background: "hsla(42,80%,58%,0.04)" }}
      >
        <div
          className="flex gap-12 items-center whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {[...Array(4)].flatMap((_, i) =>
            ["Новые поступления", "·", "Бесплатная доставка от 50 000 ₽", "·", "Гарантия подлинности", "·", "Личный стилист", "·"].map(
              (item, j) => (
                <span
                  key={`${i}-${j}`}
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: item === "·" ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }}
                >
                  {item}
                </span>
              )
            )
          )}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px" style={{ background: "hsl(var(--gold))" }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "hsl(var(--gold))" }}>
                Каталог
              </span>
            </div>
            <h2 className="font-display text-5xl font-light">Наши товары</h2>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="relative flex items-center gap-3 px-6 py-3 border text-sm tracking-[0.1em] uppercase transition-all duration-300"
            style={{
              borderColor: filterOpen ? "hsl(var(--gold))" : "hsl(var(--border))",
              color: filterOpen ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))",
            }}
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
            {activeFiltersCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: activeCategory === cat ? "hsl(var(--gold))" : "transparent",
                color: activeCategory === cat ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                border: `1px solid ${activeCategory === cat ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div
            className="mb-10 p-8 border animate-scale-in"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-xl mb-5 font-light">Цена</h3>
                <Slider
                  min={0}
                  max={1500000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full mb-4"
                />
                <div className="flex justify-between text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl mb-5 font-light">Материалы</h3>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((m) => (
                    <button
                      key={m}
                      onClick={() => toggleMaterial(m)}
                      className="px-3 py-1.5 text-xs tracking-wider transition-all duration-200"
                      style={{
                        background: selectedMaterials.includes(m) ? "hsla(42,80%,58%,0.15)" : "transparent",
                        color: selectedMaterials.includes(m) ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))",
                        border: `1px solid ${selectedMaterials.includes(m) ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl mb-5 font-light">Характеристики</h3>
                <div className="flex flex-col gap-3">
                  {CHARACTERISTICS.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      <div
                        className="w-4 h-4 border flex items-center justify-center transition-all duration-200 flex-shrink-0"
                        style={{
                          borderColor: selectedTags.includes(tag) ? "hsl(var(--gold))" : "hsl(var(--border))",
                          background: selectedTags.includes(tag) ? "hsl(var(--gold))" : "transparent",
                        }}
                      >
                        {selectedTags.includes(tag) && (
                          <Icon name="Check" size={10} style={{ color: "hsl(var(--background))" }} />
                        )}
                      </div>
                      <span
                        className="text-sm transition-colors duration-200 select-none"
                        style={{
                          color: selectedTags.includes(tag) ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div
                className="mt-6 pt-6 border-t flex items-center justify-between"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Найдено: {filtered.length}{" "}
                  {filtered.length === 1 ? "товар" : filtered.length < 5 ? "товара" : "товаров"}
                </span>
                <button
                  onClick={() => {
                    setActiveCategory("Все");
                    setSelectedMaterials([]);
                    setSelectedTags([]);
                    setPriceRange([0, 1500000]);
                  }}
                  className="text-xs tracking-wider uppercase transition-opacity"
                  style={{ color: "hsl(var(--gold))", opacity: 0.7 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                >
                  Сбросить всё
                </button>
              </div>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="opacity-20 flex justify-center mb-4">
              <Icon name="PackageSearch" size={48} />
            </div>
            <p className="font-display text-2xl font-light mb-2">Ничего не найдено</p>
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Попробуйте изменить параметры фильтрации
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="group relative cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s` }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`relative aspect-[3/4] bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top, hsla(20,10%,4%,0.6) 0%, transparent 60%)" }}
                  />
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br ${product.accent} opacity-20 blur-2xl transition-all duration-700 group-hover:w-48 group-hover:h-48 group-hover:opacity-30`}
                  />
                  <div className="absolute inset-6 border border-white opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${product.accent} opacity-40 flex items-center justify-center`}>
                      <Icon name={product.iconName} size={28} className="text-white opacity-60" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <Badge
                      className="text-[9px] tracking-[0.15em] uppercase border-0 font-body"
                      style={{ background: "hsla(42,80%,58%,0.9)", color: "hsl(var(--background))" }}
                    >
                      {product.tags[0]}
                    </Badge>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ color: wishlist.includes(product.id) ? "hsl(var(--gold))" : "white" }}
                  >
                    <Icon
                      name="Heart"
                      size={18}
                      style={{ fill: wishlist.includes(product.id) ? "hsl(var(--gold))" : "transparent" }}
                    />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => setCartCount((c) => c + 1)}
                      className="w-full py-3 text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2"
                      style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
                    >
                      <Icon name="ShoppingBag" size={14} />
                      В корзину
                    </button>
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(var(--gold))" }}>
                    {product.brand}
                  </p>
                  <h3 className="font-display text-xl font-light mb-1 group-hover:opacity-80 transition-opacity">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {product.material.map((m) => (
                      <span key={m} className="text-[10px] tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <p
                    className="font-body text-lg transition-colors duration-300"
                    style={{ color: hoveredId === product.id ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}
                  >
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BRANDS */}
      <section className="border-t border-b py-16" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-10" style={{ color: "hsl(var(--muted-foreground))" }}>
            Наши партнёры
          </p>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            {["Maison Royale", "Temporal Swiss", "Casa Vero", "Atelier Nord", "Bijoux d'Or", "Riva Milano"].map((brand) => (
              <span
                key={brand}
                className="font-display text-xl font-light tracking-widest cursor-pointer transition-opacity duration-300"
                style={{ opacity: 0.3 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.3")}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-display text-2xl tracking-[0.2em] text-shimmer">LUX STORE</span>
            <div className="flex gap-6 text-xs tracking-[0.15em] uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
              {["Доставка", "Возврат", "Гарантии", "Контакты"].map((item) => (
                <button
                  key={item}
                  className="transition-colors duration-300"
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))")}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>© 2026 LUX STORE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
