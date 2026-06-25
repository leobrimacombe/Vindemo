/**
 * ──────────────────────────────────────────────────────────────────────────
 *  domaine.js — SOURCE UNIQUE DE VÉRITÉ
 * ──────────────────────────────────────────────────────────────────────────
 *  Tout le contenu du site vit ici. Pour reskinner le site pour un autre
 *  domaine, il suffit de modifier ce fichier — aucun composant à toucher.
 *
 *  Convention multilingue :
 *  Chaque texte traduisible est un objet { fr, de, en }.
 *  Les composants le résolvent via le helper `t()` du contexte de langue
 *  (voir src/i18n/LanguageContext.jsx).
 *
 *  Les valeurs "neutres" (nom propre, coordonnées, URLs, images) sont des
 *  chaînes simples car elles ne se traduisent pas.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const LANGS = ['fr', 'de', 'en']

export const domaine = {
  // ── Identité ─────────────────────────────────────────────────────────────
  nom: 'Domaine Vogel-Stein',
  // Affichage du nom sur deux lignes pour le hero (optionnel)
  nomLignes: ['Domaine', 'Vogel-Stein'],
  tagline: {
    fr: 'Quatre générations, un terroir.',
    de: 'Vier Generationen, ein Terroir.',
    en: 'Four generations, one terroir.',
  },
  village: 'Riquewihr',
  region: {
    fr: 'Alsace, France',
    de: 'Elsass, Frankreich',
    en: 'Alsace, France',
  },

  // ── Navigation (libellés + ancres) ───────────────────────────────────────
  nav: [
    { id: 'histoire', label: { fr: 'L’histoire', de: 'Die Geschichte', en: 'Our Story' } },
    { id: 'cuvees', label: { fr: 'Nos cuvées', de: 'Unsere Weine', en: 'Our Wines' } },
    { id: 'chai', label: { fr: 'Le chai', de: 'Der Keller', en: 'The Cellar' } },
    { id: 'reserver', label: { fr: 'Réserver', de: 'Reservieren', en: 'Book a Tasting' } },
    { id: 'contact', label: { fr: 'Accès & contact', de: 'Anfahrt & Kontakt', en: 'Visit & Contact' } },
  ],

  // ── Section 1 : Hero ─────────────────────────────────────────────────────
  hero: {
    // Image plein écran (Unsplash — vignoble d'Alsace)
    image:
      'https://images.unsplash.com/photo-1444858345149-8ce5f8b53b16?auto=format&fit=crop&w=2400&q=80',
    imageAlt: {
      fr: 'Rangées de vignes au lever du jour sur les coteaux d’Alsace',
      de: 'Weinreben im Morgenlicht an den Hängen des Elsass',
      en: 'Rows of vines at dawn on the Alsatian hillsides',
    },
    ctaPrimary: {
      fr: 'Réserver une dégustation',
      de: 'Verkostung reservieren',
      en: 'Book a tasting',
    },
    ctaSecondary: {
      fr: 'Découvrir le domaine',
      de: 'Das Weingut entdecken',
      en: 'Discover the estate',
    },
    scrollHint: {
      fr: 'Faites défiler',
      de: 'Nach unten scrollen',
      en: 'Scroll',
    },
  },

  // ── Section 2 : L'histoire ───────────────────────────────────────────────
  histoire: {
    eyebrow: { fr: 'Depuis 1922', de: 'Seit 1922', en: 'Since 1922' },
    titre: {
      fr: 'Une famille, un coteau, une patience',
      de: 'Eine Familie, ein Hang, eine Geduld',
      en: 'One family, one hillside, one patience',
    },
    // Le récit est un tableau de paragraphes pour faciliter la mise en page
    recit: {
      fr: [
        'Tout commence en 1922, lorsque Joseph Vogel achète quelques arpents de granit et de marne sur les hauteurs de Riquewihr. Il n’a alors qu’une certitude : ce coteau, exposé plein sud et balayé par l’air sec des Vosges, est fait pour le Riesling.',
        'Quatre générations plus tard, la famille cultive toujours ces mêmes parcelles, à la main, au rythme des saisons. Nous avons appris à écouter le terroir plutôt qu’à le contraindre : enherbement, vendanges manuelles, levures indigènes et longs élevages sur lies.',
        'Aujourd’hui, c’est Camille Vogel-Stein qui veille sur le chai. Elle perpétue le geste de ses aînés tout en y glissant sa propre signature — des vins droits, lumineux, qui racontent fidèlement leur année.',
      ],
      de: [
        'Alles beginnt 1922, als Joseph Vogel einige Morgen Granit und Mergel auf den Höhen von Riquewihr erwirbt. Er hat nur eine Gewissheit: Dieser nach Süden ausgerichtete, vom trockenen Wind der Vogesen umwehte Hang ist für den Riesling geschaffen.',
        'Vier Generationen später bewirtschaftet die Familie noch immer dieselben Parzellen — von Hand, im Rhythmus der Jahreszeiten. Wir haben gelernt, dem Terroir zuzuhören, statt es zu zwingen: Begrünung, Handlese, einheimische Hefen und lange Reifung auf der Feinhefe.',
        'Heute wacht Camille Vogel-Stein über den Keller. Sie führt die Geste ihrer Vorfahren fort und fügt zugleich ihre eigene Handschrift hinzu — geradlinige, leuchtende Weine, die ihren Jahrgang getreu erzählen.',
      ],
      en: [
        'It all began in 1922, when Joseph Vogel bought a few acres of granite and marl on the heights above Riquewihr. He had but one conviction: this south-facing slope, swept by the dry air of the Vosges, was made for Riesling.',
        'Four generations on, the family still tends those same parcels by hand, to the rhythm of the seasons. We have learned to listen to the terroir rather than constrain it: cover crops, hand harvesting, indigenous yeasts and long ageing on the lees.',
        'Today it is Camille Vogel-Stein who watches over the cellar. She carries on the gestures of her forebears while adding her own signature — precise, luminous wines that faithfully tell the story of their vintage.',
      ],
    },
    // Photo du vigneron / de la vigneronne
    portrait:
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1100&q=80',
    portraitAlt: {
      fr: 'Camille Vogel-Stein dans ses vignes, sécateur à la main',
      de: 'Camille Vogel-Stein in ihren Weinbergen, Rebschere in der Hand',
      en: 'Camille Vogel-Stein in her vineyard, secateurs in hand',
    },
    signature: 'Camille Vogel-Stein',
    signatureRole: {
      fr: '4ᵉ génération · Vigneronne',
      de: '4. Generation · Winzerin',
      en: '4th generation · Winemaker',
    },
    // Quelques chiffres-clés
    chiffres: [
      { valeur: '1922', label: { fr: 'Année de fondation', de: 'Gründungsjahr', en: 'Founded' } },
      { valeur: '14 ha', label: { fr: 'De vignoble', de: 'Rebfläche', en: 'Of vineyard' } },
      { valeur: '4', label: { fr: 'Générations', de: 'Generationen', en: 'Generations' } },
      { valeur: '100%', label: { fr: 'Vendanges manuelles', de: 'Handlese', en: 'Hand-harvested' } },
    ],
  },

  // ── Section 3 : Nos cuvées ───────────────────────────────────────────────
  cuvees: {
    eyebrow: { fr: 'Le millésime', de: 'Der Jahrgang', en: 'The vintage' },
    titre: { fr: 'Nos cuvées', de: 'Unsere Weine', en: 'Our wines' },
    intro: {
      fr: 'Sept cépages, une seule exigence : la transparence du terroir. Chaque cuvée est élevée à son propre rythme.',
      de: 'Sieben Rebsorten, ein einziger Anspruch: die Transparenz des Terroirs. Jeder Wein reift in seinem eigenen Rhythmus.',
      en: 'Seven grape varieties, one single demand: the transparency of terroir. Each wine is aged at its own pace.',
    },
    liste: [
      {
        nom: 'Riesling Grand Cru Schoenenbourg',
        cepage: 'Riesling',
        millesime: '2021',
        couleur: '#E4C65B',
        notes: {
          fr: 'Citron confit, pierre à fusil et une tension saline qui ne faiblit pas. La signature du domaine.',
          de: 'Zitronenkonfit, Feuerstein und eine salzige Spannung, die nicht nachlässt. Die Signatur des Weinguts.',
          en: 'Candied lemon, gunflint and a saline tension that never lets up. The estate’s signature.',
        },
      },
      {
        nom: 'Gewurztraminer Vendanges Tardives',
        cepage: 'Gewurztraminer',
        millesime: '2019',
        couleur: '#E8A24C',
        notes: {
          fr: 'Rose, litchi et gingembre confit. Une douceur ample tenue par une fraîcheur épicée.',
          de: 'Rose, Litschi und kandierter Ingwer. Eine üppige Süße, gehalten von würziger Frische.',
          en: 'Rose, lychee and candied ginger. A generous sweetness held by spiced freshness.',
        },
      },
      {
        nom: 'Pinot Gris « Les Marnes »',
        cepage: 'Pinot Gris',
        millesime: '2022',
        couleur: '#D8B27A',
        notes: {
          fr: 'Poire mûre, noisette et un soupçon de fumé. Texture soyeuse, finale sur les fruits secs.',
          de: 'Reife Birne, Haselnuss und ein Hauch Rauch. Seidige Textur, Abgang auf Trockenfrüchten.',
          en: 'Ripe pear, hazelnut and a hint of smoke. Silky texture, a finish of dried fruits.',
        },
      },
      {
        nom: 'Pinot Noir « Côte de Granit »',
        cepage: 'Pinot Noir',
        millesime: '2021',
        couleur: '#8C2F3A',
        notes: {
          fr: 'Cerise griotte, pivoine et un boisé fondu. Tannins fins, élevage de douze mois en fûts.',
          de: 'Sauerkirsche, Pfingstrose und dezentes Holz. Feine Tannine, zwölf Monate Fassreife.',
          en: 'Morello cherry, peony and integrated oak. Fine tannins, twelve months of barrel ageing.',
        },
      },
      {
        nom: 'Crémant d’Alsace Brut « Cuvée Joseph »',
        cepage: "Crémant d'Alsace",
        millesime: 'Brut',
        couleur: '#EAD9A8',
        notes: {
          fr: 'Bulle fine, brioche et pomme verte. Élaboré selon la méthode traditionnelle, dosage extra-brut.',
          de: 'Feine Perlage, Brioche und grüner Apfel. Traditionelle Flaschengärung, Extra-Brut dosiert.',
          en: 'Fine bubbles, brioche and green apple. Made in the traditional method, extra-brut dosage.',
        },
      },
    ],
    // Lien optionnel vers une carte des vins (placeholder)
    cartePdf: '#',
    carteLabel: {
      fr: 'Voir la carte complète',
      de: 'Komplette Weinkarte ansehen',
      en: 'View the full wine list',
    },
  },

  // ── Section 4 : Visite du chai en 3D ─────────────────────────────────────
  chai: {
    eyebrow: { fr: 'Immersion', de: 'Eintauchen', en: 'Immersion' },
    titre: {
      fr: 'Entrez dans le chai',
      de: 'Treten Sie in den Keller',
      en: 'Step into the cellar',
    },
    intro: {
      fr: 'Nos vins reposent à l’abri de la lumière, dans la fraîcheur des caves voûtées. Tournez autour des fûts de chêne — comme si vous y étiez.',
      de: 'Unsere Weine ruhen im Dunkeln, in der Kühle der gewölbten Keller. Drehen Sie sich um die Eichenfässer — als wären Sie dort.',
      en: 'Our wines rest away from the light, in the cool of the vaulted cellars. Turn around the oak barrels — as if you were there.',
    },
    controlsHint: {
      fr: 'Cliquez-glissez pour explorer · molette pour zoomer',
      de: 'Klicken und ziehen zum Erkunden · Mausrad zum Zoomen',
      en: 'Click & drag to explore · scroll to zoom',
    },
  },

  // ── Section 5 : Œnotourisme / Réserver ───────────────────────────────────
  oenotourisme: {
    eyebrow: { fr: 'Œnotourisme', de: 'Weintourismus', en: 'Wine tourism' },
    titre: {
      fr: 'Vivez une dégustation',
      de: 'Erleben Sie eine Verkostung',
      en: 'Experience a tasting',
    },
    intro: {
      fr: 'Poussez la porte du caveau. Nous vous accueillons toute l’année autour de trois formules, du premier verre à l’accord mets-vins.',
      de: 'Öffnen Sie die Tür des Weinkellers. Wir empfangen Sie das ganze Jahr über mit drei Formeln — vom ersten Glas bis zur Speisenbegleitung.',
      en: 'Push open the cellar door. We welcome you year-round with three experiences, from the first glass to a food-and-wine pairing.',
    },
    formules: [
      {
        nom: { fr: 'Découverte', de: 'Entdeckung', en: 'Discovery' },
        duree: { fr: '45 min', de: '45 Min.', en: '45 min' },
        prix: '12 €',
        description: {
          fr: 'Quatre vins commentés au caveau, pour saisir l’esprit du domaine.',
          de: 'Vier kommentierte Weine im Weinkeller, um den Geist des Weinguts zu erfassen.',
          en: 'Four guided wines in the cellar, to grasp the spirit of the estate.',
        },
        inclus: {
          fr: ['4 vins', 'Visite du caveau', 'Sans réservation possible'],
          de: ['4 Weine', 'Kellerbesichtigung', 'Ohne Reservierung möglich'],
          en: ['4 wines', 'Cellar visit', 'Walk-ins welcome'],
        },
      },
      {
        nom: { fr: 'Prestige', de: 'Prestige', en: 'Prestige' },
        duree: { fr: '1 h 30', de: '1,5 Std.', en: '1.5 hrs' },
        prix: '28 €',
        featured: true,
        description: {
          fr: 'Visite du chai voûté suivie d’une dégustation de six cuvées, dont nos Grands Crus.',
          de: 'Besichtigung des Gewölbekellers, gefolgt von einer Verkostung von sechs Weinen, darunter unsere Grands Crus.',
          en: 'A tour of the vaulted cellar followed by a tasting of six wines, including our Grands Crus.',
        },
        inclus: {
          fr: ['6 vins', 'Visite guidée du chai', 'Planche de fromages d’Alsace'],
          de: ['6 Weine', 'Geführte Kellertour', 'Elsässer Käseplatte'],
          en: ['6 wines', 'Guided cellar tour', 'Alsatian cheese board'],
        },
      },
      {
        nom: { fr: 'Accord mets & vins', de: 'Speisen & Weine', en: 'Food & wine pairing' },
        duree: { fr: '2 h 30', de: '2,5 Std.', en: '2.5 hrs' },
        prix: '65 €',
        description: {
          fr: 'Un déjeuner en cinq services imaginé avec notre cheffe, chaque plat marié à une cuvée.',
          de: 'Ein Fünf-Gänge-Mittagessen mit unserer Küchenchefin, jeder Gang mit einem Wein vermählt.',
          en: 'A five-course lunch designed with our chef, each dish married to a wine.',
        },
        inclus: {
          fr: ['5 plats', '5 vins accordés', 'Sur réservation · groupes 2–8'],
          de: ['5 Gänge', '5 begleitende Weine', 'Auf Reservierung · Gruppen 2–8'],
          en: ['5 courses', '5 paired wines', 'By reservation · groups of 2–8'],
        },
      },
    ],
    reserverTitre: {
      fr: 'Choisissez votre créneau',
      de: 'Wählen Sie Ihren Termin',
      en: 'Choose your slot',
    },
    reserverIntro: {
      fr: 'Réservation en ligne immédiate, confirmation par e-mail. Une question ? Appelez-nous, on adore ça.',
      de: 'Sofortige Online-Buchung, Bestätigung per E-Mail. Eine Frage? Rufen Sie uns an, wir freuen uns.',
      en: 'Instant online booking, confirmation by email. A question? Call us, we love that.',
    },
    // ⚠️ REMPLACER par le vrai lien Cal.com du domaine, ex : "domaine-vogel-stein/degustation"
    calLink: 'demo/wine-tasting',
    calLabel: {
      fr: 'Réserver via Cal.com',
      de: 'Über Cal.com buchen',
      en: 'Book via Cal.com',
    },
  },

  // ── Section 6 : Accès & contact ──────────────────────────────────────────
  contact: {
    eyebrow: { fr: 'Nous trouver', de: 'Uns finden', en: 'Find us' },
    titre: { fr: 'Accès & contact', de: 'Anfahrt & Kontakt', en: 'Visit & contact' },
    intro: {
      fr: 'Au cœur du vieux Riquewihr, à dix minutes de la Route des Vins. Parking gratuit à 80 m.',
      de: 'Im Herzen des alten Riquewihr, zehn Minuten von der Weinstraße. Kostenloser Parkplatz in 80 m.',
      en: 'In the heart of old Riquewihr, ten minutes from the Wine Route. Free parking 80 m away.',
    },
    adresse: {
      ligne1: '12 rue du Général de Gaulle',
      ligne2: '68340 Riquewihr',
      pays: { fr: 'France', de: 'Frankreich', en: 'France' },
    },
    // Coordonnées approximatives de Riquewihr pour la carte Leaflet
    coordonnees: { lat: 48.1667, lng: 7.2978 },
    telephone: '+33 3 89 00 00 00',
    email: 'bonjour@domaine-vogel-stein.fr',
    horaires: {
      titre: {
        fr: 'Horaires du caveau',
        de: 'Öffnungszeiten Weinkeller',
        en: 'Cellar opening hours',
      },
      jours: [
        {
          jour: { fr: 'Lundi', de: 'Montag', en: 'Monday' },
          heures: { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
          ferme: true,
        },
        {
          jour: { fr: 'Mardi – Vendredi', de: 'Dienstag – Freitag', en: 'Tuesday – Friday' },
          heures: { fr: '10 h – 18 h', de: '10 – 18 Uhr', en: '10 am – 6 pm' },
        },
        {
          jour: { fr: 'Samedi', de: 'Samstag', en: 'Saturday' },
          heures: { fr: '10 h – 19 h', de: '10 – 19 Uhr', en: '10 am – 7 pm' },
        },
        {
          jour: { fr: 'Dimanche', de: 'Sonntag', en: 'Sunday' },
          heures: { fr: '11 h – 17 h', de: '11 – 17 Uhr', en: '11 am – 5 pm' },
        },
      ],
      note: {
        fr: 'Dégustations Prestige et Accord mets-vins uniquement sur réservation.',
        de: 'Prestige- und Speisen-Wein-Verkostungen nur mit Reservierung.',
        en: 'Prestige and Food & Wine tastings by reservation only.',
      },
    },
  },

  // ── Réseaux sociaux (optionnel — laissez vide pour masquer) ──────────────
  reseaux: [
    { nom: 'Instagram', url: 'https://instagram.com' },
    { nom: 'Facebook', url: 'https://facebook.com' },
  ],

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    accroche: {
      fr: 'L’abus d’alcool est dangereux pour la santé. À consommer avec modération.',
      de: 'Alkoholmissbrauch ist gesundheitsschädlich. In Maßen genießen.',
      en: 'Excessive drinking is harmful to health. Please drink responsibly.',
    },
    legalLinks: [
      { label: { fr: 'Mentions légales', de: 'Impressum', en: 'Legal notice' }, url: '#' },
      { label: { fr: 'Confidentialité', de: 'Datenschutz', en: 'Privacy' }, url: '#' },
    ],
    credit: {
      fr: 'Site de démonstration — conçu pour les vignerons d’Alsace.',
      de: 'Demo-Website — gestaltet für die Winzer des Elsass.',
      en: 'Demonstration site — crafted for the winemakers of Alsace.',
    },
  },
}

// Libellés du sélecteur de langue (affichés tels quels)
export const LANG_LABELS = {
  fr: { short: 'FR', name: 'Français' },
  de: { short: 'DE', name: 'Deutsch' },
  en: { short: 'EN', name: 'English' },
}

export default domaine
