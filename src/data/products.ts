// Static catalog seeded from the JIMON PSD asset pack.
// Categories follow the brief: TCM, Botanical Blend Beverages, Dietary Supplements,
// Botanical Food Blends, Facial Skincare, Botanical Personal Care, Soothing Care, Functional Plant Products.

import tianrancui from "@/assets/jimon/products/cards/product-tianrancui-card.png";
import jimon from "@/assets/jimon/products/cards/product-jimon-card.png";
import mayouBrand from "@/assets/jimon/products/cards/product-mayou-brand-card.png";
import shanlinengBlue from "@/assets/jimon/products/cards/product-shanlineng-blue-card.png";
import yuanyunpai from "@/assets/jimon/products/cards/product-yuanyunpai-card.png";
import jinshanan from "@/assets/jimon/products/cards/product-jinshanan-card.png";
import xuelanduo from "@/assets/jimon/products/cards/product-xuelanduo-card.png";
import birunkang from "@/assets/jimon/products/cards/product-birunkang-card.png";
import xianyonyou from "@/assets/jimon/products/cards/product-xianyonyou-card.png";
import moyuqiaomeiren from "@/assets/jimon/products/cards/product-moyuqiaomeiren-card.png";
import xuelancao from "@/assets/jimon/products/cards/product-xuelancao-brand-card.png";
import yishayanmei from "@/assets/jimon/products/cards/product-yishayanmei-card.png";

import mayouGinseng from "@/assets/jimon/products/cards/product-mayou-ginseng-tablet-candy.png";
import shanlinengCollagen from "@/assets/jimon/products/cards/product-shanlineng-collagen-solid-drink.png";
import shanlinengFlax from "@/assets/jimon/products/cards/product-shanlineng-flaxseed-collagen-peptide.png";
import birunkangHawthorn from "@/assets/jimon/products/cards/product-birunkang-hawthorn-tablet-candy.png";
import xianyonyouFruit from "@/assets/jimon/products/cards/product-xianyonyou-fruit-vegetable-tablet-candy.png";
import xuelanduoNatto from "@/assets/jimon/products/cards/product-xuelanduo-natto-tablet-candy.png";

import xuelancaoLotion from "@/assets/jimon/products/cards/product-xuelancao-essence-lotion.png";
import xuelancaoCleanser from "@/assets/jimon/products/cards/product-xuelancao-rice-cleanser.png";
import xuelancaoCream from "@/assets/jimon/products/cards/product-xuelancao-rice-face-cream.png";
import xuelancaoWater from "@/assets/jimon/products/cards/product-xuelancao-essence-water.png";
import xuelancaoSerum from "@/assets/jimon/products/cards/product-xuelancao-essence-serum.png";
import xuelancaoCushion from "@/assets/jimon/products/cards/product-xuelancao-cushion-cream.png";
import xuelancaoSpray from "@/assets/jimon/products/cards/product-xuelancao-anti-aging-spray.png";
import xuelancaoFirming from "@/assets/jimon/products/cards/product-xuelancao-collagen-firming-cream.png";
import xuelancaoSun from "@/assets/jimon/products/cards/product-xuelancao-sunscreen.png";

import niyouyanCleansing from "@/assets/jimon/products/cards/product-niyouyan-cleansing-honey.png";
import niyouyanSpray from "@/assets/jimon/products/cards/product-niyouyan-sculpting-spray.png";
import niyouyanSoon from "@/assets/jimon/products/cards/product-niyouyan-coming-soon.png";

import bannerYishayanmei from "@/assets/jimon/products/banners/banner-yishayanmei-private-health.png";
import bannerXuelancaoSet from "@/assets/jimon/products/banners/banner-xuelancao-six-piece-set.png";
import bannerJimonPain from "@/assets/jimon/products/banners/banner-jimon-pain-management.png";
import bannerTianrancuiLung from "@/assets/jimon/products/banners/banner-tianrancui-gut-lung-axis.png";
import bannerTianrancuiLiver from "@/assets/jimon/products/banners/banner-tianrancui-gut-liver-axis.png";
import bannerNiyouyan from "@/assets/jimon/products/banners/banner-niyouyan-anti-time-factor.png";

export type ProductCategory =
  | "tcm"
  | "beverages"
  | "supplements"
  | "food-blends"
  | "skincare"
  | "personal-care"
  | "soothing"
  | "functional";

export type Product = {
  slug: string;
  image: string;
  name_zh: string;
  name_en: string;
  brand: string;
  category: ProductCategory;
};

export const PRODUCT_CATEGORIES: { key: ProductCategory; label_ru: string; label_en: string }[] = [
  { key: "tcm", label_ru: "Традиционная китайская медицина", label_en: "Traditional Chinese Medicine" },
  { key: "beverages", label_ru: "Растительные напитки", label_en: "Botanical Blend Beverages" },
  { key: "supplements", label_ru: "БАДы", label_en: "Dietary Supplements" },
  { key: "food-blends", label_ru: "Растительные продукты", label_en: "Botanical Food Blends" },
  { key: "skincare", label_ru: "Уход за кожей лица", label_en: "Facial Skincare" },
  { key: "personal-care", label_ru: "Растительный личный уход", label_en: "Botanical Personal Care" },
  { key: "soothing", label_ru: "Успокаивающий уход", label_en: "Soothing Care" },
  { key: "functional", label_ru: "Функциональные продукты", label_en: "Functional Plant Products" },
];

export const PRODUCTS: Product[] = [
  // Health-series brand cards (TCM line cards)
  { slug: "tianrancui", image: tianrancui, name_zh: "添然萃", name_en: "Tianrancui", brand: "Tianrancui", category: "tcm" },
  { slug: "jimon-group", image: jimon, name_zh: "金木集团", name_en: "JIMON Group", brand: "JIMON", category: "tcm" },
  { slug: "mayou-brand", image: mayouBrand, name_zh: "MAYOU", name_en: "MAYOU", brand: "MAYOU", category: "tcm" },
  { slug: "shanlineng", image: shanlinengBlue, name_zh: "膳力能", name_en: "Shanlineng", brand: "Shanlineng", category: "tcm" },
  { slug: "yuanyunpai", image: yuanyunpai, name_zh: "媛韵牌", name_en: "Yuanyunpai", brand: "Yuanyunpai", category: "tcm" },
  { slug: "jinshanan", image: jinshanan, name_zh: "金膳安", name_en: "Jinshanan", brand: "Jinshanan", category: "tcm" },
  { slug: "xuelanduo", image: xuelanduo, name_zh: "雪蓝朵", name_en: "Xuelanduo", brand: "Xuelanduo", category: "tcm" },
  { slug: "birunkang", image: birunkang, name_zh: "碧润康", name_en: "Birunkang", brand: "Birunkang", category: "tcm" },
  { slug: "xianyonyou", image: xianyonyou, name_zh: "纤韵悠", name_en: "Xianyonyou", brand: "Xianyonyou", category: "tcm" },
  { slug: "moyuqiaomeiren", image: moyuqiaomeiren, name_zh: "墨玉俏美人", name_en: "Moyu Qiao Meiren", brand: "Moyu", category: "tcm" },
  { slug: "xuelancao", image: xuelancao, name_zh: "雪蘭草", name_en: "Xuelancao", brand: "Xuelancao", category: "tcm" },
  { slug: "yishayanmei", image: yishayanmei, name_zh: "伊莎妍美", name_en: "Yishayanmei", brand: "Yishayanmei", category: "tcm" },

  // Dietary supplements
  { slug: "mayou-ginseng-tablet", image: mayouGinseng, name_zh: "MAYOU 人参黄精复合压片糖果", name_en: "MAYOU Ginseng & Polygonatum Tablet Candy", brand: "MAYOU", category: "supplements" },
  { slug: "shanlineng-collagen-drink", image: shanlinengCollagen, name_zh: "膳力能 骨胶原蛋白粉固体饮料", name_en: "Shanlineng Bone Collagen Solid Drink", brand: "Shanlineng", category: "supplements" },
  { slug: "shanlineng-flax-collagen", image: shanlinengFlax, name_zh: "膳力能 亚麻籽胶原蛋白肽粉", name_en: "Shanlineng Flaxseed Collagen Peptide Powder", brand: "Shanlineng", category: "supplements" },
  { slug: "birunkang-hawthorn", image: birunkangHawthorn, name_zh: "碧润康 荷叶山楂压片糖果", name_en: "Birunkang Lotus Hawthorn Tablet Candy", brand: "Birunkang", category: "supplements" },
  { slug: "xianyonyou-fruit-veg", image: xianyonyouFruit, name_zh: "纤韵悠 果蔬粉压片糖果", name_en: "Xianyonyou Fruit & Vegetable Tablet Candy", brand: "Xianyonyou", category: "supplements" },
  { slug: "xuelanduo-natto", image: xuelanduoNatto, name_zh: "雪蓝朵 明日叶纳豆压片糖果", name_en: "Xuelanduo Ashitaba Natto Tablet Candy", brand: "Xuelanduo", category: "supplements" },

  // Facial skincare (Xuelancao Qinghua Baici line)
  { slug: "xuelancao-essence-lotion", image: xuelancaoLotion, name_zh: "雪蘭草 青花白瓷精华乳", name_en: "Xuelancao Qinghua Baici Essence Lotion", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-rice-cleanser", image: xuelancaoCleanser, name_zh: "雪蘭草 青花白瓷红米洁面乳", name_en: "Xuelancao Qinghua Baici Red Rice Cleanser", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-rice-cream", image: xuelancaoCream, name_zh: "雪蘭草 青花白瓷红米面霜", name_en: "Xuelancao Qinghua Baici Red Rice Face Cream", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-essence-water", image: xuelancaoWater, name_zh: "雪蘭草 青花白瓷精华水", name_en: "Xuelancao Qinghua Baici Essence Water", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-essence-serum", image: xuelancaoSerum, name_zh: "雪蘭草 青花白瓷精华液", name_en: "Xuelancao Qinghua Baici Essence Serum", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-cushion", image: xuelancaoCushion, name_zh: "雪蘭草 青花白瓷气垫霜", name_en: "Xuelancao Qinghua Baici Cushion Cream", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-anti-aging-spray", image: xuelancaoSpray, name_zh: "雪蘭草 赋活逆龄喷雾", name_en: "Xuelancao Anti-Aging Vital Spray", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-firming-cream", image: xuelancaoFirming, name_zh: "雪蘭草 胶原重组紧致靓肤霜", name_en: "Xuelancao Collagen Firming Cream", brand: "Xuelancao", category: "skincare" },
  { slug: "xuelancao-sunscreen", image: xuelancaoSun, name_zh: "雪蘭草 防晒乳", name_en: "Xuelancao Sunscreen Lotion", brand: "Xuelancao", category: "skincare" },

  // Anti-time factor (Functional / Niyouyan)
  { slug: "niyouyan-cleansing-honey", image: niyouyanCleansing, name_zh: "逆优妍 赋活塑雕洁颜蜜", name_en: "Niyouyan Sculpting Cleansing Honey", brand: "Niyouyan", category: "functional" },
  { slug: "niyouyan-sculpting-spray", image: niyouyanSpray, name_zh: "逆优妍 赋活塑雕喷雾", name_en: "Niyouyan Sculpting Spray", brand: "Niyouyan", category: "functional" },
  { slug: "niyouyan-coming-soon", image: niyouyanSoon, name_zh: "逆优妍 新品上市敬请期待", name_en: "Niyouyan — New Products Coming Soon", brand: "Niyouyan", category: "functional" },
];

export type ProductBanner = {
  image: string;
  title_zh: string;
  title_en: string;
  category: ProductCategory;
};

export const PRODUCT_BANNERS: ProductBanner[] = [
  { image: bannerYishayanmei, title_zh: "伊莎妍美抑菌液 / Jimon Private Health", title_en: "Jimon Private Health — Yishayanmei", category: "personal-care" },
  { image: bannerXuelancaoSet, title_zh: "雪蘭草 青花白瓷六件套", title_en: "Xuelancao Qinghua Baici 6-Piece Set", category: "skincare" },
  { image: bannerJimonPain, title_zh: "科络舒草本平衡双感按摩膏", title_en: "Kelaoshu Herbal Balance Massage Balm", category: "soothing" },
  { image: bannerTianrancuiLung, title_zh: "添然萃 二氢槲皮素复合植物饮", title_en: "Tianrancui Dihydroquercetin Botanical Drink", category: "beverages" },
  { image: bannerTianrancuiLiver, title_zh: "添然萃 肝蛋白肽姜黄饮", title_en: "Tianrancui Liver Peptide Turmeric Drink", category: "beverages" },
  { image: bannerNiyouyan, title_zh: "逆优妍 逆时因系列产品", title_en: "Auraguru Anti-Time Factor Series", category: "functional" },
];
