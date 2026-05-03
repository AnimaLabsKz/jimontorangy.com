export type ProductCategory =
  | "health-series"
  | "dietary-supplements"
  | "facial-skincare"
  | "botanical-blend-beverages"
  | "botanical-personal-care"
  | "soothing-care"
  | "anti-time-factor";

export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  category: ProductCategory;
  image: string;
};

export type SectionAsset = {
  title: string;
  image: string;
  description?: string;
};

const img = (path: string) => `/jimon/${path}`;

export const categoryLabels: Record<ProductCategory, string> = {
  "health-series": "大健康系列产品",
  "dietary-supplements": "膳食营养补充",
  "facial-skincare": "面部护肤产品",
  "botanical-blend-beverages": "植物复合饮品",
  "botanical-personal-care": "植萃个护产品",
  "soothing-care": "舒缓护理产品",
  "anti-time-factor": "Anti-Time Factor",
};

export const products: Product[] = [
  { id: "tianrancui", title: "添然萃", category: "health-series", image: img("products/cards/product-tianrancui-card.png") },
  { id: "jimon", title: "JIMON Group", category: "health-series", image: img("products/cards/product-jimon-card.png") },
  { id: "mayou-brand", title: "MAYOU", category: "health-series", image: img("products/cards/product-mayou-brand-card.png") },
  { id: "shanlineng-blue", title: "膳力能", category: "health-series", image: img("products/cards/product-shanlineng-blue-card.png") },
  { id: "yuanyunpai", title: "媛韵牌", category: "health-series", image: img("products/cards/product-yuanyunpai-card.png") },
  { id: "jinshanan", title: "金膳安", category: "health-series", image: img("products/cards/product-jinshanan-card.png") },
  { id: "xuelanduo-brand", title: "雪蓝朵", category: "health-series", image: img("products/cards/product-xuelanduo-card.png") },
  { id: "birunkang-brand", title: "碧润康", category: "health-series", image: img("products/cards/product-birunkang-card.png") },
  { id: "xianyonyou-brand", title: "纤韵悠", category: "health-series", image: img("products/cards/product-xianyonyou-card.png") },
  { id: "moyuqiaomeiren", title: "墨玉俏美人", category: "health-series", image: img("products/cards/product-moyuqiaomeiren-card.png") },
  { id: "xuelancao-brand", title: "雪蘭草", category: "health-series", image: img("products/cards/product-xuelancao-brand-card.png") },
  { id: "yishayanmei", title: "伊莎妍美", category: "health-series", image: img("products/cards/product-yishayanmei-card.png") },
  { id: "mayou-ginseng", title: "MAYOU", subtitle: "人参黄精复合压片糖果", category: "dietary-supplements", image: img("products/cards/product-mayou-ginseng-tablet-candy.png") },
  { id: "shanlineng-collagen", title: "膳力能", subtitle: "骨胶原蛋白粉固体饮料", category: "dietary-supplements", image: img("products/cards/product-shanlineng-collagen-solid-drink.png") },
  { id: "shanlineng-flaxseed", title: "膳力能", subtitle: "亚麻籽胶原蛋白肽粉", category: "dietary-supplements", image: img("products/cards/product-shanlineng-flaxseed-collagen-peptide.png") },
  { id: "birunkang-hawthorn", title: "碧润康", subtitle: "荷叶山楂压片糖果", category: "dietary-supplements", image: img("products/cards/product-birunkang-hawthorn-tablet-candy.png") },
  { id: "xianyonyou-fruit", title: "纤韵悠", subtitle: "果蔬粉压片糖果", category: "dietary-supplements", image: img("products/cards/product-xianyonyou-fruit-vegetable-tablet-candy.png") },
  { id: "xuelanduo-natto", title: "雪蓝朵", subtitle: "明日叶纳豆压片糖果", category: "dietary-supplements", image: img("products/cards/product-xuelanduo-natto-tablet-candy.png") },
  { id: "xuelancao-lotion", title: "雪蘭草", subtitle: "青花白瓷精华乳", category: "facial-skincare", image: img("products/cards/product-xuelancao-essence-lotion.png") },
  { id: "xuelancao-cleanser", title: "雪蘭草", subtitle: "青花白瓷红米洁面乳", category: "facial-skincare", image: img("products/cards/product-xuelancao-rice-cleanser.png") },
  { id: "xuelancao-cream", title: "雪蘭草", subtitle: "青花白瓷红米面霜", category: "facial-skincare", image: img("products/cards/product-xuelancao-rice-face-cream.png") },
  { id: "xuelancao-water", title: "雪蘭草", subtitle: "青花白瓷精华水", category: "facial-skincare", image: img("products/cards/product-xuelancao-essence-water.png") },
  { id: "xuelancao-serum", title: "雪蘭草", subtitle: "青花白瓷精华液", category: "facial-skincare", image: img("products/cards/product-xuelancao-essence-serum.png") },
  { id: "xuelancao-cushion", title: "雪蘭草", subtitle: "青花白瓷气垫霜", category: "facial-skincare", image: img("products/cards/product-xuelancao-cushion-cream.png") },
  { id: "xuelancao-spray", title: "雪蘭草", subtitle: "赋活逆龄喷雾", category: "facial-skincare", image: img("products/cards/product-xuelancao-anti-aging-spray.png") },
  { id: "xuelancao-firming", title: "雪蘭草", subtitle: "胶原重组紧致靓肤霜", category: "facial-skincare", image: img("products/cards/product-xuelancao-collagen-firming-cream.png") },
  { id: "xuelancao-sunscreen", title: "雪蘭草", subtitle: "防晒乳", category: "facial-skincare", image: img("products/cards/product-xuelancao-sunscreen.png") },
  { id: "niyouyan-cleanser", title: "逆优妍", subtitle: "赋活塑雕洁颜蜜", category: "anti-time-factor", image: img("products/cards/product-niyouyan-cleansing-honey.png") },
  { id: "niyouyan-spray", title: "逆优妍", subtitle: "赋活塑雕喷雾", category: "anti-time-factor", image: img("products/cards/product-niyouyan-sculpting-spray.png") },
  { id: "niyouyan-coming", title: "逆优妍", subtitle: "新品上市 敬请期待", category: "anti-time-factor", image: img("products/cards/product-niyouyan-coming-soon.png") },
];

export const productBanners: SectionAsset[] = [
  { title: "伊莎妍美抑菌液", image: img("products/banners/banner-yishayanmei-private-health.png"), description: "Jimon Private Health" },
  { title: "雪蘭草 青花白瓷六件套", image: img("products/banners/banner-xuelancao-six-piece-set.png"), description: "Jimon Medicinal Makeup" },
  { title: "科络舒草本平衡双感按摩膏", image: img("products/banners/banner-jimon-pain-management.png"), description: "Jimon Pain Management" },
  { title: "添然萃 二氢槲皮素复合植物饮", image: img("products/banners/banner-tianrancui-gut-lung-axis.png"), description: "Jimon gut lung axis" },
  { title: "添然萃 肝蛋白肽姜黄饮", image: img("products/banners/banner-tianrancui-gut-liver-axis.png"), description: "Jimon Gut-Liver Axis" },
  { title: "逆优妍 逆时因系列产品", image: img("products/banners/banner-niyouyan-anti-time-factor.png"), description: "Auraguru Anti-Time Factor Product Series" },
];

export const homeAssets = {
  hero: img("home/02-hero.png"),
  leader: img("home/03-home-03.png"),
  productFamily: img("home/04-home-04.png"),
  people: img("home/06-home-06.png"),
  research: img("home/10-home-10.png"),
  join: img("home/11-home-11.png"),
  news: img("home/14-39.png"),
  exploreScience: img("home/16-home-16.png"),
  exploreNature: img("home/17-41.png"),
};

export const layoutAssets: SectionAsset[] = [
  { title: "金木集团安国总部", image: img("category-banners/03-28.png") },
  { title: "北京御本堂集团", image: img("category-banners/04-39.png") },
  { title: "重庆御本堂药业产业园区", image: img("category-banners/05-layout-05.png") },
  { title: "中药品牌", image: img("category-banners/08-jimon.png"), description: "Traditional Chinese Medicine" },
  { title: "植物复合饮品", image: img("category-banners/09-jimon.png"), description: "Botanical Blend Beverages" },
  { title: "膳食营养补充", image: img("category-banners/10-jimon.png"), description: "Dietary Supplements" },
  { title: "植萃复合食品", image: img("category-banners/11-layout-11.png"), description: "Botanical Food Blends" },
  { title: "面部护肤产品", image: img("category-banners/12-layout-12.png"), description: "Facial Skincare" },
];

export const brandAssets: SectionAsset[] = [
  { title: "业务拓展遍布全球", image: img("brands/02-hero.png") },
  { title: "企业文化", image: img("brands/05-27.png") },
  { title: "汉中药制药股份有限公司", image: img("brands/08-brands-08.png") },
  { title: "御本堂控股集团", image: img("brands/09-brands-09.png") },
  { title: "河北安国药业集团", image: img("brands/10-brands-10.png") },
  { title: "颐寿堂", image: img("brands/11-brands-11.png") },
  { title: "膳食营养补充品牌", image: img("brands/14-brands-14.png") },
  { title: "面部护肤品牌", image: img("brands/18-31.png") },
];

export const aboutAssets: SectionAsset[] = [
  { title: "走进金木", image: img("references/about.png") },
  { title: "研发与生产", image: img("about/01-43.png") },
  { title: "企业历程", image: img("about/02-26.png") },
  { title: "荣誉资质", image: img("about/04-42.png") },
  { title: "金木荣誉", image: img("about/05-about-05.png") },
];

export const newsAssets: SectionAsset[] = [
  { title: "赋能领航 锻造精英 金木集团卓越", image: img("news/news-company-featured.png"), description: "2025/09/23" },
  { title: "金生有你 朱氏家族:三代人的逆光前行", image: img("news/news-company-list-thumb.png"), description: "2025.10.09" },
  { title: "喜报金木甄选弹联行业双科...", image: img("news/news-media-thumb-01.png") },
  { title: "向着光 共生长", image: img("news/news-media-thumb-02.png") },
  { title: "团队活动影像", image: img("news/news-media-thumb-05.png") },
  { title: "会议现场", image: img("news/news-media-thumb-06.png") },
  { title: "生产参观", image: img("news/news-media-thumb-07.png") },
  { title: "代表发言", image: img("news/news-media-thumb-08.png") },
];

export const contactAssets = {
  hero: img("contact/contact-hero.png"),
  chinaBases: img("contact/contact-china-bases.png"),
  hotlineQr: img("contact/contact-hotline-qr.png"),
};

export const membershipAssets = {
  hero: img("membership/member-hero.png"),
  qr: img("membership/member-qr-codes.png"),
  step1: img("membership/member-step-1-phone.png"),
  step2: img("membership/member-step-2-phone.png"),
  step3: img("membership/member-step-3-phone.png"),
};

export const legalAssets = {
  hero: img("legal/legal-hero.png"),
  statement: img("legal/legal-statement-text.png"),
};
