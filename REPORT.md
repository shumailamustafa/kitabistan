# Kitabistan: Online Bookstore Project Report

> **Kitabistan (کتابستان)**: *Read More. Dream Bigger.*
> An online bookstore for Pakistani readers, with Cash on Delivery and free delivery to 24 cities.

| | |
|---|---|
| **Student name** | _(your name)_ |
| **Roll number** | _(your roll no.)_ |
| **Course / Subject** | _(course name)_ |
| **Submitted to** | _(teacher name)_ |
| **Live website** | `https://kitabistan.netlify.app` _(replace with your actual Netlify link)_ |
| **Date** | November 2026 |

---

## Table of Contents

1. [Business Idea](#1-business-idea)
2. [Online Store Development and Hosting](#2-online-store-development-and-hosting)
3. [Product Catalog](#3-product-catalog)
4. [Price Discrimination](#4-price-discrimination)
5. [Marketing Strategy](#5-marketing-strategy)
6. [Imaging (Brand and Visual Identity)](#6-imaging-brand-and-visual-identity)
7. [Products Worth (Inventory Value)](#7-products-worth-inventory-value)
8. [Expected Revenue Generation](#8-expected-revenue-generation)
9. [Areas of Success](#9-areas-of-success)
10. [Audience Interest: Google Keyword Planner](#10-audience-interest-google-keyword-planner)
11. [Screenshots](#11-screenshots)
12. [Conclusion](#12-conclusion)

---

## 1. Business Idea

**Kitabistan** is an online bookstore that sells original, publisher-printed books across Pakistan.

**Problem:**
- Many cities have few good bookshops, and the ones that exist rarely stock university course books or Urdu literature together.
- Online buyers don't trust prepaid payment and often receive photocopied (pirated) books.
- Students can't afford full-price computer science textbooks (PKR 4,000 to 5,000+).

**Solution:**
- One store for **5 categories**: Fiction, Self-Help and Business, Computer Science and Academic, Urdu Literature, and Kids.
- **Cash on Delivery (COD)**: the customer pays the rider when the books arrive.
- **Free delivery** to 24 cities.
- **Original books only**, with no reprints.
- **Different prices for different customers** (student, bundle, bulk and launch offers). See Section 4.

**Target customers:** university and college students, young professionals (self-help and business readers), Urdu novel readers (mostly women aged 18 to 45), parents buying for children, and schools and libraries buying in bulk.

---

## 2. Online Store Development and Hosting

The assignment allows any GUI or programming site (Wix, WordPress, Shopify and so on). Kitabistan was **built with code** so the pricing logic (discounts that combine automatically) could be fully controlled.

| Item | Detail |
|---|---|
| Design / prototype | Figr (screen-based UI design) |
| Front-end | React 18 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router (Home, Shop, Book Detail, Cart, Checkout, Order Confirmed, Offers) |
| Icons | Lucide icons |
| Build tool | Vite |
| Hosting | **Netlify** (free plan) |

### Website pages

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, stats, featured books, categories, new arrivals, launch offer, bestsellers, reviews, newsletter |
| Shop | `/shop` | Full catalog with category filter and search |
| Book detail | `/books/<name>` | Description, rating, Standard/Premium edition, quantity, add to cart |
| Cart | `/cart` | Quantities, student toggle, promo code, automatic discounts |
| Checkout | `/checkout` | Name, phone, city, address, Cash on Delivery |
| Order confirmed | `/order-confirmed` | Order number and summary |
| Offers and Pricing | `/offers` | Explains every price-discrimination offer |

### How it was hosted on Netlify (free)

1. Upload the project folder to a new **GitHub** repository.
2. Log in at **app.netlify.com** and choose **Add new site → Import an existing project → GitHub**.
3. Select the repository. Netlify reads `netlify.toml` automatically:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - A redirect rule sends every URL to `index.html` so pages like `/shop` work on refresh.
4. Click **Deploy**. After 1 to 2 minutes the site is live at `https://<site-name>.netlify.app`.
5. (Optional) Rename the site under **Site configuration → Change site name** to `kitabistan`.

---

## 3. Product Catalog

The store launches with **12 titles in 5 categories**. Every title comes in two editions: **Standard (paperback)** and **Premium (hardcover)**.

| # | Title | Author | Category | Language | Standard (PKR) | Premium (PKR) | Rating | Student discount |
|---|---|---|---|---|---:|---:|---|---|
| 1 | The Alchemist | Paulo Coelho | Fiction | English | 1,200 | 1,700 | 4.7 (318) | — |
| 2 | 1984 | George Orwell | Fiction | English | 1,100 | 1,550 | 4.8 (276) | — |
| 3 | Pride and Prejudice | Jane Austen | Fiction | English | 950 | 1,350 | 4.6 (204) | — |
| 4 | Atomic Habits | James Clear | Self-Help | English | 1,800 | 2,500 | 4.9 (512) | — |
| 5 | Rich Dad Poor Dad | Robert T. Kiyosaki | Business | English | 1,500 | 2,100 | 4.5 (389) | — |
| 6 | Deep Work | Cal Newport | Self-Help | English | 1,700 | 2,400 | 4.6 (241) | — |
| 7 | Clean Code | Robert C. Martin | Computer Science | English | 4,500 | 6,300 | 4.7 (167) | ✔ 10% |
| 8 | Python Crash Course | Eric Matthes | Computer Science | English | 3,800 | 5,300 | 4.8 (198) | ✔ 10% |
| 9 | Database System Concepts | Silberschatz et al. | Academic | English | 5,200 | 7,300 | 4.5 (94) | ✔ 10% |
| 10 | Peer-e-Kamil (پیرِ کامل) | Umera Ahmed | Urdu Literature | Urdu | 1,600 | 2,250 | 4.9 (442) | — |
| 11 | Raja Gidh (راجہ گدھ) | Bano Qudsia | Urdu Literature | Urdu | 1,400 | 1,950 | 4.7 (213) | — |
| 12 | Little Explorer Story Set | Kitabistan Kids | Kids | English | 1,300 | 1,800 | 4.8 (126) | — |

**Category summary**

| Category | Titles | Price range (Standard) |
|---|---:|---|
| Fiction | 3 | PKR 950 – 1,200 |
| Self-Help and Business | 3 | PKR 1,500 – 1,800 |
| Computer Science and Academic | 3 | PKR 3,800 – 5,200 |
| Urdu Literature | 2 | PKR 1,400 – 1,600 |
| Kids | 1 | PKR 1,300 |

Website sections built from the catalog:
- **Featured:** The Alchemist, Atomic Habits, Clean Code, Peer-e-Kamil, Rich Dad Poor Dad, Pride and Prejudice, Python Crash Course
- **New arrivals:** Python Crash Course, Deep Work, Little Explorer Story Set, Raja Gidh
- **Bestsellers:** Atomic Habits, Peer-e-Kamil, The Alchemist, Rich Dad Poor Dad

---

## 4. Price Discrimination

**Price discrimination** means selling the same product at different prices to different groups of buyers, based on how much each group is willing or able to pay. Kitabistan uses **four types**, all calculated automatically in the cart.

| # | Offer | Rule | Type | Who it targets |
|---|---|---|---|---|
| 1 | **Student discount** | 10% off computer science and academic books | **Third-degree** (price by customer group) | Students, who are price-sensitive |
| 2 | **Bundle deal** | Buy 3 or more books, get 15% off | **Second-degree** (price by quantity) | Single-book buyers, nudged to buy 3 |
| 3 | **Bulk / library order** | 10 or more books, 20% off | **Second-degree** | Schools, universities, libraries, reading clubs |
| 4 | **Launch code READ15** | 15% off with the code | **Promotional pricing** | New, engaged customers |
| 5 | **Standard vs Premium** | Premium hardcover costs 40% more | **Versioning** | Gift buyers and collectors pay more |

### Worked examples (taken from the live Offers page)

| Offer | Cart | Normal price | Customer pays | Saving |
|---|---|---:|---:|---:|
| Student discount | Clean Code ×1 | PKR 4,500 | **PKR 4,050** | PKR 450 |
| Bundle deal | The Alchemist + 1984 + Pride and Prejudice | PKR 3,250 | **PKR 2,762** | PKR 488 |
| Bulk order | Python Crash Course ×10 | PKR 38,000 | **PKR 30,400** | PKR 7,600 |
| Code READ15 | Atomic Habits ×1 | PKR 1,800 | **PKR 1,530** | PKR 270 |
| Versioning | Peer-e-Kamil | Standard PKR 1,600 | Premium **PKR 2,250** | +PKR 650 (extra revenue) |

### Rules for combining offers
1. The student discount is applied first, on eligible books only, and works with every other offer.
2. Bundle, bulk and READ15 **don't stack**. The cart applies whichever saves the customer the most.
3. At 10 or more books, the 20% bulk discount replaces the 15% bundle deal.
4. All discounts apply to both editions. Delivery is always free.

**Combined example (from the cart screen):** Clean Code (Standard) + Peer-e-Kamil (Premium) + Atomic Habits, as a student:
`8,550 subtotal − 450 student − 1,215 bundle (15%) = PKR 6,885`

**Why this works:** students can afford textbooks, heavy readers buy more per order, institutions get a reason to choose Kitabistan, and Premium editions capture extra revenue from buyers who are willing to pay more.

---

## 5. Marketing Strategy

### 5.1 Positioning
> *"Original books, delivered free, paid in cash at your door."*

The three trust points that matter most to Pakistani online shoppers are **original copies, Cash on Delivery and free delivery**.

### 5.2 The 4 Ps

| P | Kitabistan |
|---|---|
| **Product** | 12 launch titles in 5 categories, Standard and Premium editions, original copies only |
| **Price** | PKR 950 – 5,200, with student, bundle, bulk and launch discounts |
| **Place** | Online store with delivery to 24 cities through a courier (e.g. TCS, Leopards, PostEx) |
| **Promotion** | Social media, student ambassadors, Google Ads, WhatsApp, email, influencers |

### 5.3 Channels and activities

| Channel | Activity | Audience |
|---|---|---|
| **Instagram and TikTok (#BookTok)** | Short reels: "book of the week", unboxing, Urdu quotes from Peer-e-Kamil | Ages 16 to 30 |
| **Facebook** | Urdu novel reader groups, page ads targeting Lahore, Karachi and Islamabad | Ages 25 to 45, Urdu readers |
| **University ambassadors** | One student per campus shares a referral link and promotes the student discount | CS and engineering students |
| **Google Search Ads** | Bid on keywords like "buy books online Pakistan" and "Atomic Habits price in Pakistan" (see Section 10) | High-intent buyers |
| **SEO** | Book detail pages titled "<Book> price in Pakistan", with blog posts such as "Top 10 Urdu novels" | Organic search |
| **WhatsApp Business** | Order updates, catalog sharing, COD confirmation | All customers |
| **Email newsletter** | "New books, first": a signup form on the home page | Repeat buyers |
| **Influencers** | Micro-influencers (10K–50K followers) in books and studies | Young readers |
| **Events** | Stalls at book fairs (Karachi International Book Fair, Lahore Book Fair) | Book lovers |
| **Seasonal campaigns** | Eid gifting (Premium editions), back-to-university (Sept/Feb), exam season | All |

### 5.4 Launch plan (first 90 days)

| Month | Focus | Goal |
|---|---|---|
| 1 | Launch code **READ15**, Instagram/Facebook page, first 10 university ambassadors | 150 orders |
| 2 | Google Search Ads, BookTok reels, first newsletter | 250 orders |
| 3 | Library/school outreach (bulk 20%), review collection, referral rewards | 350 orders |

### 5.5 Marketing budget (monthly, estimated)

| Item | PKR / month |
|---|---:|
| Facebook and Instagram ads | 30,000 |
| Google Search Ads | 20,000 |
| Influencer collaborations | 15,000 |
| Ambassador rewards (free books / commission) | 10,000 |
| Content (design, reels) | 5,000 |
| **Total** | **80,000** |

---

## 6. Imaging (Brand and Visual Identity)

| Element | Choice | Reason |
|---|---|---|
| **Name** | Kitabistan (کتابستان), "land of books" | Easy to say in Urdu and English, and local |
| **Tagline** | *Read More. Dream Bigger.* | Aspirational, aimed at students and young readers |
| **Logo** | Red square with the Urdu letter **ک** and "Kitabistan" in a serif font | Shows Pakistani identity and stays simple at small sizes |
| **Colours** | Strict **white (#FFFFFF), red (#D32F2F), black (#111111)** | Bold and memorable, like a classic book cover. Red is used for offers and calls to action |
| **Fonts** | *Fraunces* (headings, bookish serif), *Manrope* (body text), *Noto Nastaliq Urdu* (Urdu text) | Literary feel, readable, and correct Urdu script |
| **Book covers** | Custom-drawn covers in 3 themes (red, black, white), each with a symbol (sun for The Alchemist, eye for 1984, braces `{ }` for Clean Code, crescent for Peer-e-Kamil, vulture for Raja Gidh, kite for the kids' set) | One consistent look across the store, with no copyright problems from publisher artwork |
| **Motion** | Animated hero book with turning pages, floating books, sections that flip in on scroll, animated counters (5,000+ books, 10,000+ readers, 24 cities) | Makes the store feel lively and premium |
| **Tone of voice** | Short, friendly, honest ("Pay the rider in cash when your books reach your door") | Builds trust |

---

## 7. Products Worth (Inventory Value)

**Value of the catalog at listed prices (one copy of each title):**

| Category | Standard (PKR) | Premium (PKR) |
|---|---:|---:|
| Fiction | 3,250 | 4,600 |
| Self-Help and Business | 5,000 | 7,000 |
| Computer Science and Academic | 13,500 | 18,900 |
| Urdu Literature | 3,000 | 4,200 |
| Kids | 1,300 | 1,800 |
| **Total (12 titles)** | **26,050** | **36,500** |

Average Standard price per book: **PKR 2,171**.

**Opening stock plan (estimated):** 25 copies of each title in Standard and 5 in Premium.

| | Copies | Retail value (PKR) | Purchase cost at ~70% of retail (PKR) |
|---|---:|---:|---:|
| Standard stock (25 × 12) | 300 | 651,250 | 455,875 |
| Premium stock (5 × 12) | 60 | 182,500 | 127,750 |
| **Total** | **360** | **833,750** | **≈ 583,625** |

> Assumption: books are bought from distributors at about 30% below retail price, which is a common trade discount in Pakistan.

---

## 8. Expected Revenue Generation

### Assumptions
- **Average order:** 2.3 books, with an average order value after discounts of about **PKR 3,800**.
- **Gross margin** on books: **30%** before discounts, about 20% after average discounts.
- **Delivery cost** (paid by Kitabistan, since delivery is free): about PKR 200 per order.
- Orders grow as marketing builds: 150 → 300 → 500 per month in the first year.

### Year 1 projection

| Period | Orders / month | Months | Orders | Revenue (PKR) |
|---|---:|---:|---:|---:|
| Months 1–3 (launch) | 150 | 3 | 450 | 1,710,000 |
| Months 4–6 (growth) | 300 | 3 | 900 | 3,420,000 |
| Months 7–12 (stable) | 500 | 6 | 3,000 | 11,400,000 |
| **Year 1 total** | | | **4,350** | **≈ PKR 16.5 million** |

### Profit estimate (Year 1)

| Item | PKR |
|---|---:|
| Revenue | 16,530,000 |
| Gross profit (≈ 20% after discounts) | 3,306,000 |
| Less: delivery (4,350 × 200) | (870,000) |
| Less: marketing (80,000 × 12) | (960,000) |
| Less: packaging, hosting/domain, misc. | (300,000) |
| **Estimated net profit** | **≈ 1,176,000** |

### Three scenarios

| Scenario | Orders in Year 1 | Revenue (PKR) | Net profit (PKR) |
|---|---:|---:|---:|
| Pessimistic | 2,000 | 7.6 million | about break-even |
| **Expected** | **4,350** | **16.5 million** | **≈ 1.2 million** |
| Optimistic | 7,000 | 26.6 million | ≈ 2.7 million |

> Hosting cost is **PKR 0** on the Netlify free plan. A custom domain (e.g. `kitabistan.pk`) costs about PKR 3,000 to 4,000 a year.

---

## 9. Areas of Success

1. **Student market.** The 10% student discount on expensive textbooks (PKR 3,800 to 5,200) fills a real need. Pakistan has over 2 million university students.
2. **Urdu literature niche.** Few online stores focus on Urdu novels. Peer-e-Kamil is the highest-rated title on the site (4.9 from 442 reviews).
3. **Trust through COD.** Most e-commerce orders in Pakistan are paid by Cash on Delivery, and Kitabistan supports it fully.
4. **Free delivery.** This removes the most common reason shoppers leave at checkout.
5. **Larger orders.** Bundle (3 books) and bulk (10 books) offers raise average order value, and the cart reminds shoppers how many more books they need for the next discount.
6. **Institutional sales.** The 20% bulk price targets schools, libraries and reading clubs, which bring large repeat orders.
7. **Premium editions.** Hardcover versioning earns 40% more from gift buyers, especially around Eid and birthdays.
8. **Strong brand.** A clean red, black and white identity and a bilingual name make the store easy to remember.
9. **Low running cost.** Free hosting and a fast static website mean low fixed costs.

**Risks and how they're handled**

| Risk | How it's handled |
|---|---|
| COD order refusals | Confirm by WhatsApp or phone before dispatch |
| Pirated books sold cheaper by competitors | Market the "original copy" guarantee, plus student and bundle pricing |
| Delivery cost eating into margin | Bundles raise order value, so cost per book falls |

---

## 10. Audience Interest: Google Keyword Planner

**Method:** Google Ads → Tools → **Keyword Planner** → *Discover new keywords*
**Location:** Pakistan | **Language:** English and Urdu | **Period:** last 12 months

> ⚠️ **Note:** The figures below are **estimated ranges** for planning. Before submitting, open Keyword Planner yourself, enter the same keywords, replace these values with the real results, and add the screenshot in Section 11.

| Keyword | Avg. monthly searches (Pakistan) | Competition | Top-of-page bid (PKR) | Interest |
|---|---|---|---|---|
| books online pakistan | 10K – 100K | High | 15 – 60 | 🔥 High |
| buy books online | 1K – 10K | High | 20 – 70 | High |
| online bookstore pakistan | 1K – 10K | Medium | 15 – 50 | High |
| urdu novels | 10K – 100K | Low | 5 – 20 | 🔥 High |
| peer e kamil | 10K – 100K | Low | 5 – 15 | 🔥 High |
| raja gidh | 1K – 10K | Low | 5 – 15 | Medium |
| umera ahmed novels | 1K – 10K | Low | 5 – 15 | Medium |
| atomic habits | 10K – 100K | Medium | 10 – 40 | 🔥 High |
| atomic habits price in pakistan | 1K – 10K | Medium | 10 – 40 | High (buying intent) |
| rich dad poor dad | 10K – 100K | Medium | 10 – 35 | High |
| the alchemist book | 1K – 10K | Medium | 10 – 30 | Medium |
| python book | 1K – 10K | Medium | 15 – 50 | Medium |
| clean code book | 100 – 1K | Low | 15 – 50 | Low–Medium |
| database system concepts | 1K – 10K | Low | 10 – 30 | Medium (students) |
| kids story books | 1K – 10K | Medium | 10 – 40 | Medium |
| cash on delivery books | 100 – 1K | Low | 10 – 30 | Low (but high intent) |

### What the data tells us

- **Highest interest:** Urdu novels (especially *Peer-e-Kamil*) and popular self-help titles (*Atomic Habits*, *Rich Dad Poor Dad*). These books are featured on the home page and listed as bestsellers.
- **Cheap opportunity:** Urdu literature keywords have **low competition and low cost per click**, which makes them the best place to spend the Google Ads budget.
- **Buying intent:** searches like "*<book> price in pakistan*" show people ready to buy. Product pages should use these phrases for SEO.
- **Student demand:** steady searches for textbooks such as *Database System Concepts* and programming books support the student discount.
- **Seasonality:** academic keywords rise in **Feb–Mar and Aug–Sep** (semester start). Gift and kids' keywords rise before **Eid**.

### How the keyword research shapes marketing

| Finding | Action |
|---|---|
| Urdu novel searches are high, with low competition | Put the largest share of the ad budget into Urdu literature campaigns |
| "price in pakistan" searches | Rename product page titles to "<Book> price in Pakistan – Kitabistan" |
| Students search for textbooks at semester start | Run student discount ads in Feb and Sep |
| "books online pakistan" is competitive | Rely on SEO and social media instead of expensive bids |

---

## 11. Screenshots

> Save the screenshots in a `screenshots/` folder next to this file, using the names below, and they will appear here automatically.
> **Tip:** On Windows, press `Win + Shift + S` to capture, then save.

### 11.1 Home page (hero)
![Home page – hero](screenshots/01-home-hero.png)
*Kitabistan hero with the Urdu logo, tagline and "Shop Now" button.*

### 11.2 Home page (categories and bestsellers)
![Home – categories](screenshots/02-home-categories.png)
*Shop by category: Fiction, Self-Help and Business, CS and Academic, Urdu Literature, Kids.*

### 11.3 Launch offer banner (READ15)
![Launch offer](screenshots/03-launch-offer.png)

### 11.4 Shop / product catalog
![Shop page](screenshots/04-shop.png)
*All 12 books with category filter and search.*

### 11.5 Book detail page (Standard vs Premium)
![Book detail](screenshots/05-book-detail.png)
*Example: Peer-e-Kamil, showing the edition choice and price difference.*

### 11.6 Cart with student and bundle discounts
![Cart](screenshots/06-cart.png)
*Clean Code + Peer-e-Kamil (Premium) + Atomic Habits as a student, totalling PKR 6,885.*

### 11.7 Checkout (Cash on Delivery)
![Checkout](screenshots/07-checkout.png)

### 11.8 Order confirmed
![Order confirmed](screenshots/08-order-confirmed.png)

### 11.9 Offers and Pricing page (price discrimination)
![Offers page](screenshots/09-offers.png)

### 11.10 Netlify deployment
![Netlify dashboard](screenshots/10-netlify-deploy.png)
*Netlify dashboard showing "Published" status and the live URL.*

### 11.11 Google Keyword Planner results
![Keyword Planner](screenshots/11-keyword-planner.png)
*Search volumes for the keywords in Section 10 (Pakistan, last 12 months).*

### 11.12 Mobile view
![Mobile view](screenshots/12-mobile.png)

---

## 12. Conclusion

Kitabistan is a working online bookstore, built with React and hosted free on Netlify, aimed at Pakistani readers. Its catalog covers 12 titles in 5 categories, and four types of price discrimination (student, bundle, bulk and promotional, plus Standard/Premium versioning) let it charge each customer group a fair price while growing the average order. The marketing plan relies on social media, student ambassadors and keyword-driven Google Ads. Keyword research shows strong, low-cost demand for Urdu novels and popular self-help titles. With an expected first-year revenue of about **PKR 16.5 million**, the business has clear strengths in the student market, Urdu literature, Cash on Delivery trust and free delivery.

---
*Prepared for the E-Commerce / Online Store assignment. All prices are in Pakistani Rupees (PKR).*
