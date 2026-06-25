# Domaine Vogel-Stein — site vitrine

Site vitrine premium **multi-pages** pour un domaine viticole alsacien. Démo
commerciale pensée pour donner envie à un vigneron de signer : éditorial,
multilingue (FR / DE / EN), avec une visite du chai en 3D.

> Domaine fictif par défaut : **Domaine Vogel-Stein**, à Riquewihr (Alsace) —
> _« Quatre générations, un terroir. »_

## Stack

- **Vite + React** — application monopage (SPA)
- **React Router** — navigation multi-pages (`/`, `/le-domaine`, `/nos-cuvees`, `/oenotourisme`, `/contact`, pages légales)
- **Tailwind CSS** — design system (palette terroir, polices serif/sans)
- **Three.js** via **React Three Fiber** + **drei** — scène 3D du chai
- **react-leaflet** — carte d'accès
- **Shopify Storefront API** (GraphQL, headless) — boutique e-commerce optionnelle, sans dépendance ajoutée (`fetch` natif)
- Prêt pour un déploiement **Vercel** (`vercel.json` fourni)

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
```

## Architecture

Le contenu est **entièrement découplé** des composants : tout vit dans un seul
fichier de données.

```
src/
├─ data/domaine.js        ← TOUT le contenu (textes FR/DE/EN, cuvées, pages, boutique, horaires…)
├─ i18n/
│  └─ LanguageContext.jsx ← langue active + helper de traduction t()
├─ hooks/
│  ├─ useReveal.js        ← apparitions douces au scroll
│  └─ useShopifyProducts.js ← charge les produits Shopify (+ repli démo)
├─ lib/shopify.js         ← client Storefront API (produits, panier, checkout)
├─ cart/CartContext.jsx   ← panier client (état + localStorage + checkout)
├─ App.jsx                ← table de routage (React Router)
├─ pages/                 ← une vue par route
│  ├─ Home.jsx            ← /              (hero + univers + chai 3D + CTA)
│  ├─ LeDomaine.jsx       ← /le-domaine    (histoire + terroir + équipe)
│  ├─ NosCuvees.jsx       ← /nos-cuvees    (catalogue des vins)
│  ├─ Boutique.jsx        ← /boutique      (e-commerce Shopify headless)
│  ├─ Oenotourisme.jsx    ← /oenotourisme  (formules + chai 3D + réservation)
│  ├─ Contact.jsx         ← /contact       (coordonnées + carte)
│  ├─ Legal.jsx           ← /mentions-legales, /confidentialite
│  └─ NotFound.jsx        ← 404
├─ components/
│  ├─ Layout.jsx          ← header + footer communs (+ ScrollToTop + mini-panier)
│  ├─ Header.jsx          ← nav par routes + sélecteur de langue + icône panier
│  ├─ PageHero.jsx        ← bannière d'en-tête des pages internes
│  ├─ Seo.jsx             ← <title> + meta description par page
│  ├─ Hero.jsx · HomeUnivers.jsx · CtaBand.jsx      ← accueil
│  ├─ Histoire.jsx · Terroir.jsx · Equipe.jsx       ← le domaine
│  ├─ Cuvees.jsx                                     ← les cuvées
│  ├─ boutique/           ← Boutique.jsx · ProductCard.jsx · CartButton.jsx · CartDrawer.jsx
│  ├─ Oenotourisme.jsx · CalEmbed.jsx · InfosPratiques.jsx ← œnotourisme
│  ├─ Chai3D.jsx          ← visite du chai (charge la 3D en lazy)
│  ├─ Contact.jsx · ContactMap.jsx                  ← contact + carte Leaflet
│  ├─ Footer.jsx
│  └─ cellar/             ← scène 3D (Canvas, fûts, voûte, lanternes)
```

### Ajouter / modifier une page

1. **Contenu** : ajoutez une entrée dans `domaine.pages` (bannière + SEO) et un
   item dans `domaine.nav` (libellé + `to`) dans `src/data/domaine.js`.
2. **Vue** : créez `src/pages/MaPage.jsx` (réutilisez `PageHero`, `Seo` et les
   sections existantes), puis déclarez la `<Route>` dans `src/App.jsx`.

## 🔁 Reskinner pour un autre domaine

**Un seul fichier à toucher : [`src/data/domaine.js`](src/data/domaine.js).**
Aucun composant n'a besoin d'être modifié.

On y trouve, regroupés par section :

- le **nom**, la **tagline**, le **village**, la **région** ;
- les **textes** de chaque section ;
- les **cuvées** (nom, cépage, millésime, notes, couleur de pastille) ;
- les **formules** d'œnotourisme et leurs tarifs ;
- l'**adresse**, les **coordonnées GPS** (carte), les **horaires**, le
  téléphone et l'e-mail ;
- les **images** (URLs Unsplash par défaut) et leurs textes alternatifs.

### Convention multilingue

Chaque texte traduisible est un objet à trois langues :

```js
tagline: {
  fr: 'Quatre générations, un terroir.',
  de: 'Vier Generationen, ein Terroir.',
  en: 'Four generations, one terroir.',
}
```

Les valeurs neutres (nom propre, e-mail, URLs, coordonnées GPS) restent de
simples chaînes. Pour ajouter/retirer une langue, modifiez `LANGS` en haut du
fichier (et `LANG_LABELS` en bas pour le libellé du sélecteur).

### Images

Les visuels sont des **placeholders Unsplash**. Remplacez les URLs
`hero.image`, `histoire.portrait` et les éventuelles autres par les photos du
domaine (ou déposez-les dans `public/` et référencez `/mon-image.jpg`).

## 📅 Brancher le vrai calendrier Cal.com

La réservation utilise un embed **Cal.com**. Pour le connecter au vrai
calendrier du domaine :

1. Ouvrez [`src/data/domaine.js`](src/data/domaine.js).
2. Dans `oenotourisme.calLink`, remplacez le placeholder par l'identifiant
   Cal.com du domaine :

   ```js
   // Avant (démo)
   calLink: 'demo/wine-tasting',
   // Après (exemple)
   calLink: 'domaine-vogel-stein/degustation',
   ```

L'iframe pointe alors vers `https://cal.com/<calLink>`. Elle n'est chargée
qu'au clic de l'utilisateur (performance + pas de cookie tiers avant action).

## 🛒 Brancher la boutique Shopify (headless)

La page **`/boutique`** affiche des produits servis par **Shopify** via la
**Storefront API** (GraphQL). Shopify ne sert que de back-office : produits,
stocks, commandes et **paiement** (checkout hébergé). Le site reste 100 %
custom — aucun code de paiement n'est écrit ici.

> **Sans configuration, ça marche déjà** : la boutique tourne en _mode démo_
> avec 3-4 cuvées de fallback (définies dans `domaine.boutique.produitsDemo`).
> Le panier est pleinement fonctionnel ; seul le paiement réel nécessite une
> vraie boutique connectée.

### 1. Créer un development store (compte Partners)

1. Créez un compte sur [partners.shopify.com](https://partners.shopify.com) (gratuit).
2. **Stores → Add store → Create development store** (sert à tester sans frais).
3. Notez le domaine `xxxx.myshopify.com`.

### 2. Récupérer un Storefront access token

Dans l'admin de la boutique :

1. **Settings → Apps and sales channels → Develop apps → Create an app**.
2. **Configuration → Storefront API** : cochez au minimum les scopes de lecture
   produits (`unauthenticated_read_product_listings`) et de panier
   (`unauthenticated_write_checkouts` / cart).
3. **Install app**, puis onglet **API credentials** → copiez le
   **Storefront API access token** (≠ Admin API).

### 3. Renseigner les variables d'environnement

```bash
cp .env.example .env.local
```

```ini
VITE_SHOPIFY_DOMAIN=ton-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=ton_token_storefront
# VITE_SHOPIFY_API_VERSION=2025-01   # optionnel
```

Puis **redémarrez** `npm run dev` (Vite ne relit les `.env` qu'au démarrage).
`.env.local` est déjà ignoré par git (`*.local` dans `.gitignore`).

### 4. Ajouter des produits de test

Dans l'admin : **Products → Add product**. Renseignez **titre, description,
image, prix** et un **stock** (mettez-en un à 0 pour voir le badge « Épuisé »).
Au rechargement de `/boutique`, les vrais produits remplacent la démo — **le
nombre de produits est dynamique**, aucun code à toucher.

### Comportement du checkout

« Commander » crée un vrai panier Shopify (`cartCreate`) et **redirige vers le
checkout hébergé** par Shopify. En mode démo (produits de fallback, sans vrais
identifiants de variante), le bouton affiche un message clair invitant à
connecter Shopify — il ne simule pas de paiement.

### ⚠️ Note production

Le token Storefront est _public-safe_ (lecture + panier), donc l'exposer côté
client via `VITE_` convient pour cette **démo**. Pour une vraie boutique en
production, on placerait idéalement les appels derrière un **backend/proxy**
(masquage de la config, cache, rate-limiting, et localisation `@inContext` des
produits si besoin de multilingue côté Shopify).

## Performance & accessibilité

- La 3D (three.js) et la carte (leaflet) sont **chargées en lazy** : le bundle
  initial reste léger (~58 ko gzip). La scène ne se monte qu'à l'approche de sa
  section.
- Scène 3D **stylisée** (instancing des fûts, pas d'ombres temps réel) pour
  viser 60 fps, y compris sur mobile.
- HTML sémantique, attributs `alt`, navigation clavier (lien d'évitement,
  focus visibles), respect de `prefers-reduced-motion`.
- Meta tags SEO + Open Graph dans `index.html` ; l'attribut `lang` du `<html>`
  suit la langue choisie.

## Déploiement Vercel

Le projet est détecté comme un site Vite. `vercel.json` fixe la commande de
build (`npm run build`) et le dossier de sortie (`dist`). Importez simplement
le dépôt sur Vercel.

Aucune variable d'environnement n'est requise pour le site vitrine. Pour activer
la **boutique** sur l'environnement déployé, ajoutez `VITE_SHOPIFY_DOMAIN` et
`VITE_SHOPIFY_STOREFRONT_TOKEN` dans **Project Settings → Environment Variables**
(sinon la page `/boutique` reste en mode démo).

---

_Site de démonstration. L'abus d'alcool est dangereux pour la santé._
