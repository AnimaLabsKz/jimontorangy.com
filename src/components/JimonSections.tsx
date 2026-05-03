import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, PackagePlus, Send, ShoppingBag, X } from "lucide-react";
import {
  aboutAssets,
  brandAssets,
  categoryLabels,
  contactAssets,
  homeAssets,
  layoutAssets,
  legalAssets,
  membershipAssets,
  newsAssets,
  productBanners,
  products,
  type Product,
  type ProductCategory,
  type SectionAsset,
} from "@/data/jimon";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>}
      <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function HomeExperience() {
  return (
    <>
      <section className="bg-background">
        <img src={homeAssets.hero} alt="JIMON production network" className="h-auto w-full" />
      </section>
      <section className="bg-background py-16 md:py-24">
        <div className="container-app">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              ["4", "四大百年中药老字号"],
              ["1+6+1", "产业布局"],
              ["~2000", "集团员工"],
              ["33", "品牌创业年"],
            ].map(([value, label]) => (
              <div key={label} className="border-l-4 border-primary bg-card p-6 shadow-sm">
                <p className="text-display text-4xl font-extrabold text-primary">{value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <img src={homeAssets.leader} alt="JIMON leadership belief" className="w-full rounded-md border border-border bg-card" />
            <div>
              <SectionHeading
                eyebrow="JIMON Group"
                title="百年传承，科研为本"
                subtitle="以中医药和大健康产业双轮驱动，结合现代科研力量，持续推进健康产品与品牌体系建设。"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/about" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                  走进金木 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/products" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold">
                  查看产品
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <img src={homeAssets.productFamily} alt="JIMON product family" className="w-full rounded-md" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-app">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <img src={homeAssets.people} alt="Healthy life" className="w-full rounded-md" />
            <SectionHeading
              eyebrow="About"
              title="了解更多我们的信息"
              subtitle="一家以中医药和大健康产业双轮驱动，致力于提升健康生活质量的公司。"
            />
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <img src={homeAssets.research} alt="JIMON research center" className="w-full rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              {["90+ 研发科学家", "30+ 国家专利", "200+ 药品批文", "93+ 准字号药品"].map((item) => (
                <div key={item} className="bg-card p-5 text-center shadow-sm">
                  <p className="text-display text-2xl font-extrabold text-primary">{item.split(" ")[0]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.split(" ").slice(1).join(" ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-app">
          <SectionHeading eyebrow="News Center" title="新闻中心" subtitle="集团动态、品牌活动与新媒体内容。" />
          <AssetGrid assets={newsAssets.slice(0, 4)} className="mt-10" />
        </div>
      </section>
    </>
  );
}

export function ProductCatalog({ limit, showInquiry = true }: { limit?: number; showInquiry?: boolean }) {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const [basket, setBasket] = useState<Product[]>([]);
  const visible = useMemo(() => {
    const list = active === "all" ? products : products.filter((product) => product.category === active);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [active, limit]);

  const add = (product: Product) => setBasket((items) => (items.some((item) => item.id === product.id) ? items : [...items, product]));
  const remove = (id: string) => setBasket((items) => items.filter((item) => item.id !== id));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active={active === "all"} onClick={() => setActive("all")}>Все</FilterButton>
        {(Object.keys(categoryLabels) as ProductCategory[]).map((key) => (
          <FilterButton key={key} active={active === key} onClick={() => setActive(key)}>{categoryLabels[key]}</FilterButton>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <article key={product.id} className="flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm">
            <div className="aspect-[4/5] bg-cream">
              <img src={product.image} alt={product.subtitle ? `${product.title} ${product.subtitle}` : product.title} loading="lazy" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs text-primary">{categoryLabels[product.category]}</p>
              <h3 className="mt-1 text-display text-lg font-bold text-foreground">{product.title}</h3>
              {product.subtitle && <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>}
              {showInquiry && (
                <button onClick={() => add(product)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  <PackagePlus className="h-4 w-4" /> Добавить в заявку
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {showInquiry && (
        <div className="mt-8 rounded-md border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"><ShoppingBag className="h-5 w-5" /></span>
              <div>
                <p className="font-semibold">Корзина заявки</p>
                <p className="text-sm text-muted-foreground">Без онлайн-оплаты: выбранные товары попадут в запрос на консультацию.</p>
              </div>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground">
              Запросить консультацию <Send className="h-4 w-4" />
            </Link>
          </div>
          {basket.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {basket.map((item) => (
                <button key={item.id} onClick={() => remove(item.id)} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                  {item.title} {item.subtitle ? `· ${item.subtitle}` : ""} <X className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={active ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" : "rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"}>
      {children}
    </button>
  );
}

export function ProductBanners() {
  return <AssetGrid assets={productBanners} className="mt-10" />;
}

export function AssetGrid({ assets, className = "" }: { assets: SectionAsset[]; className?: string }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${className}`}>
      {assets.map((asset) => (
        <article key={`${asset.title}-${asset.image}`} className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <img src={asset.image} alt={asset.title} loading="lazy" className="h-auto w-full" />
          <div className="p-4">
            <h3 className="text-display text-lg font-bold">{asset.title}</h3>
            {asset.description && <p className="mt-1 text-sm text-muted-foreground">{asset.description}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function BrandsContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="Brands" title="我们的品牌" subtitle="四大百年品牌与大健康产品矩阵。" />
        <AssetGrid assets={brandAssets} className="mt-10" />
      </div>
    </section>
  );
}

export function LayoutContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="Industrial Layout" title="规划布局" subtitle="一个核心、六个基地、一个研发中心，覆盖中药、营养补充、植物饮品与护肤产品。" />
        <AssetGrid assets={layoutAssets} className="mt-10" />
      </div>
    </section>
  );
}

export function AboutContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="Walk into JIMON" title="走进金木" subtitle="以传承为根基，以科研和现代化生产为支撑。" />
        <div className="mt-10 space-y-8">
          {aboutAssets.slice(1).map((asset) => (
            <img key={asset.image} src={asset.image} alt={asset.title} className="w-full rounded-md border border-border bg-card" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="News Center" title="新闻中心" subtitle="公司动态、健康专题与新媒体中心。" />
        <AssetGrid assets={newsAssets} className="mt-10" />
      </div>
    </section>
  );
}

export function MembershipContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="Member Guide" title="会员注册指引" subtitle="以下为金木官方中国会员平台流程。若后续有哈萨克斯坦本地会员系统，应单独替换。" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <img src={membershipAssets.hero} alt="Member guide hero" className="rounded-md border border-border bg-card" />
          <img src={membershipAssets.qr} alt="Official QR codes" className="rounded-md border border-border bg-card" />
          <img src={membershipAssets.step1} alt="Step 1" className="rounded-md border border-border bg-card" />
          <img src={membershipAssets.step2} alt="Step 2" className="rounded-md border border-border bg-card" />
          <img src={membershipAssets.step3} alt="Step 3" className="rounded-md border border-border bg-card" />
        </div>
      </div>
    </section>
  );
}

export function ContactContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="Contact" title="Контакты" subtitle="Юридические данные Казахстана указаны отдельно от официальных китайских каналов." />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <img src={contactAssets.hero} alt="Contact center" className="w-full rounded-md border border-border" />
            <div className="rounded-md border border-border bg-card p-6">
              <h3 className="text-display text-xl font-bold">JIMON TORANGY DAILY NECESSITES ЖШС</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> Алматы қ., Дарабоз ш.а., 49-үй, 37-кеңсе</li>
                <li>БСН/БИН: 250540014840</li>
                <li>ИИК: KZ48722S000052175278</li>
                <li>Банк: АҚ «Kaspi Bank» · БИК: CASPKZKA</li>
              </ul>
            </div>
          </div>
          <div className="space-y-5">
            <div className="rounded-md border border-border bg-card p-6">
              <h3 className="text-display text-xl font-bold">Напишите нам</h3>
              <div className="mt-5 grid gap-4">
                <input placeholder="Ваше имя" className="rounded-md border border-input bg-background px-4 py-3 text-sm" />
                <input placeholder="Телефон или E-mail" className="rounded-md border border-input bg-background px-4 py-3 text-sm" />
                <textarea placeholder="Сообщение" rows={5} className="rounded-md border border-input bg-background px-4 py-3 text-sm" />
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                  Отправить <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
            <img src={contactAssets.chinaBases} alt="China official bases" className="w-full rounded-md border border-border" />
            <img src={contactAssets.hotlineQr} alt="China hotline and official QR" className="w-full rounded-md border border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-app">
        <SectionHeading eyebrow="Law" title="法律声明" subtitle="Официальное правовое заявление JIMON Group по онлайн-информации и неавторизованным продажам." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <img src={legalAssets.hero} alt="Legal statement" className="w-full rounded-md border border-border" />
          <div className="rounded-md border border-border bg-card p-6">
            <img src={legalAssets.statement} alt="JIMON legal statement text" className="w-full" />
            <div className="mt-6 rounded-md bg-cream p-5 text-sm leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Важно для сайта Казахстана</p>
              <p className="mt-2">Каталог на этом сайте является корпоративной витриной и заявкой на консультацию. Онлайн-оплата и публичная продажа через сторонние площадки не включены без отдельного письменного подтверждения клиента.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CheckList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {["Исправлены реквизиты", "Каталог наполнен товарами", "Корзина работает как заявка", "Правовое заявление вынесено отдельно"].map((item) => (
        <div key={item} className="flex items-center gap-2 rounded-md bg-card p-3 text-sm shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
        </div>
      ))}
    </div>
  );
}
