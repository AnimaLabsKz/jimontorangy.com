import xuelancaoLogo from "@/assets/jimon/products/cards/product-xuelancao-brand-card.png";
import mayouLogo from "@/assets/jimon/products/cards/product-mayou-brand-card.png";
import shanlinengLogo from "@/assets/jimon/products/cards/product-shanlineng-blue-card.png";
import tianrancuiLogo from "@/assets/jimon/products/cards/product-tianrancui-card.png";
import birunkangLogo from "@/assets/jimon/products/cards/product-birunkang-card.png";
import xianyonyouLogo from "@/assets/jimon/products/cards/product-xianyonyou-card.png";
import xuelanduoLogo from "@/assets/jimon/products/cards/product-xuelanduo-card.png";
import yuanyunpaiLogo from "@/assets/jimon/products/cards/product-yuanyunpai-card.png";
import jinshananLogo from "@/assets/jimon/products/cards/product-jinshanan-card.png";
import moyuLogo from "@/assets/jimon/products/cards/product-moyuqiaomeiren-card.png";
import yishayanmeiLogo from "@/assets/jimon/products/cards/product-yishayanmei-card.png";
import jimonLogo from "@/assets/jimon/products/cards/product-jimon-card.png";

export type Brand = {
  slug: string;
  name_zh: string;
  name_en: string;
  family: "tcm" | "supplements" | "skincare" | "personal-care" | "beverages";
  logo: string;
  description_ru: string;
  description_en: string;
};

export const BRANDS: Brand[] = [
  { slug: "jimon", name_zh: "金木集团", name_en: "JIMON Group", family: "tcm", logo: jimonLogo,
    description_ru: "Корпоративный бренд группы. Объединяет четыре столетние марки традиционной китайской медицины и шесть производственных площадок.",
    description_en: "Corporate group brand uniting four century-old TCM marks and six manufacturing bases." },
  { slug: "tianrancui", name_zh: "添然萃", name_en: "Tianrancui", family: "beverages", logo: tianrancuiLogo,
    description_ru: "Растительные комплексные напитки на основе дигидрокверцетина и пептидов.",
    description_en: "Botanical blend beverages built on dihydroquercetin and peptide formulas." },
  { slug: "mayou", name_zh: "MAYOU", name_en: "MAYOU", family: "supplements", logo: mayouLogo,
    description_ru: "БАДы и таблетированные конфеты на основе женьшеня и хуанцзин.",
    description_en: "Dietary supplements and pressed candies based on ginseng and polygonatum." },
  { slug: "shanlineng", name_zh: "膳力能", name_en: "Shanlineng", family: "supplements", logo: shanlinengLogo,
    description_ru: "Коллагеновые напитки и пептидные порошки для активного образа жизни.",
    description_en: "Collagen drinks and peptide powders for active lifestyle." },
  { slug: "birunkang", name_zh: "碧润康", name_en: "Birunkang", family: "supplements", logo: birunkangLogo,
    description_ru: "Растительные таблетированные конфеты на основе листа лотоса и боярышника.",
    description_en: "Botanical tablet candies built on lotus leaf and hawthorn." },
  { slug: "xianyonyou", name_zh: "纤韵悠", name_en: "Xianyonyou", family: "supplements", logo: xianyonyouLogo,
    description_ru: "Фруктово-овощные комплексы для повседневного баланса.",
    description_en: "Fruit and vegetable powder candies for daily balance." },
  { slug: "xuelanduo", name_zh: "雪蓝朵", name_en: "Xuelanduo", family: "supplements", logo: xuelanduoLogo,
    description_ru: "Серия с натто и ашитабой — поддержка сосудистой системы.",
    description_en: "Natto and ashitaba series for cardiovascular support." },
  { slug: "yuanyunpai", name_zh: "媛韵牌", name_en: "Yuanyunpai", family: "tcm", logo: yuanyunpaiLogo,
    description_ru: "Линейка для женского здоровья на основе классических рецептов ТКМ.",
    description_en: "Women's wellness line based on classical TCM formulas." },
  { slug: "jinshanan", name_zh: "金膳安", name_en: "Jinshanan", family: "tcm", logo: jinshananLogo,
    description_ru: "Безопасное питание и нутрицевтика для всей семьи.",
    description_en: "Safe nutrition and nutraceuticals for the whole family." },
  { slug: "moyu", name_zh: "墨玉俏美人", name_en: "Moyu Qiao Meiren", family: "skincare", logo: moyuLogo,
    description_ru: "Декоративные ритуалы красоты с восточным акцентом.",
    description_en: "Beauty rituals with an Eastern accent." },
  { slug: "xuelancao", name_zh: "雪蘭草", name_en: "Xuelancao", family: "skincare", logo: xuelancaoLogo,
    description_ru: "Линейка ухода за лицом «Цинхуа Байцы» — фарфоровая чистота кожи.",
    description_en: "Qinghua Baici facial care line — porcelain-clear skin." },
  { slug: "yishayanmei", name_zh: "伊莎妍美", name_en: "Yishayanmei", family: "personal-care", logo: yishayanmeiLogo,
    description_ru: "Деликатный личный уход и антибактериальные средства.",
    description_en: "Gentle personal care and antibacterial products." },
];

export const BRAND_FAMILIES = [
  { key: "tcm", label_ru: "Традиционная китайская медицина", label_en: "Traditional Chinese Medicine" },
  { key: "supplements", label_ru: "БАДы и нутрицевтика", label_en: "Dietary supplements" },
  { key: "skincare", label_ru: "Уход за кожей", label_en: "Facial skincare" },
  { key: "personal-care", label_ru: "Личный уход", label_en: "Personal care" },
  { key: "beverages", label_ru: "Растительные напитки", label_en: "Botanical beverages" },
] as const;
