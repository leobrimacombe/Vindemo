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
├─ data/domaine.js        ← TOUT le contenu (textes FR/DE/EN, cuvées, pages, horaires…)
├─ i18n/
│  └─ LanguageContext.jsx ← langue active + helper de traduction t()
├─ hooks/useReveal.js     ← apparitions douces au scroll
├─ App.jsx                ← table de routage (React Router)
├─ pages/                 ← une vue par route
│  ├─ Home.jsx            ← /              (hero + univers + chai 3D + CTA)
│  ├─ LeDomaine.jsx       ← /le-domaine    (histoire + terroir + équipe)
│  ├─ NosCuvees.jsx       ← /nos-cuvees    (catalogue des vins)
│  ├─ Oenotourisme.jsx    ← /oenotourisme  (formules + chai 3D + réservation)
│  ├─ Contact.jsx         ← /contact       (coordonnées + carte)
│  ├─ Legal.jsx           ← /mentions-legales, /confidentialite
│  └─ NotFound.jsx        ← 404
├─ components/
│  ├─ Layout.jsx          ← header + footer communs (+ ScrollToTop)
│  ├─ Header.jsx          ← nav par routes + sélecteur de langue
│  ├─ PageHero.jsx        ← bannière d'en-tête des pages internes
│  ├─ Seo.jsx             ← <title> + meta description par page
│  ├─ Hero.jsx · HomeUnivers.jsx · CtaBand.jsx      ← accueil
│  ├─ Histoire.jsx · Terroir.jsx · Equipe.jsx       ← le domaine
│  ├─ Cuvees.jsx                                     ← les cuvées
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
le dépôt sur Vercel — aucune variable d'environnement n'est requise.

---

_Site de démonstration. L'abus d'alcool est dangereux pour la santé._
