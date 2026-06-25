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

  // ── Navigation (libellés + routes) ───────────────────────────────────────
  // `to` est le chemin de la page. Modifiez ici pour réorganiser le menu.
  nav: [
    { to: '/le-domaine', label: { fr: 'Le domaine', de: 'Das Weingut', en: 'The Estate' } },
    { to: '/nos-cuvees', label: { fr: 'Nos cuvées', de: 'Unsere Weine', en: 'Our Wines' } },
    { to: '/oenotourisme', label: { fr: 'Œnotourisme', de: 'Weintourismus', en: 'Wine Tourism' } },
    { to: '/contact', label: { fr: 'Accès & contact', de: 'Anfahrt & Kontakt', en: 'Visit & Contact' } },
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
        type: 'blanc',
        service: '8–10 °C',
        signature: true,
        notes: {
          fr: 'Citron confit, pierre à fusil et une tension saline qui ne faiblit pas. La signature du domaine.',
          de: 'Zitronenkonfit, Feuerstein und eine salzige Spannung, die nicht nachlässt. Die Signatur des Weinguts.',
          en: 'Candied lemon, gunflint and a saline tension that never lets up. The estate’s signature.',
        },
        accord: {
          fr: 'Truite des Vosges, choucroute de la mer, fromages de chèvre frais.',
          de: 'Vogesen-Forelle, Fisch-Sauerkraut, frische Ziegenkäse.',
          en: 'Vosges trout, seafood choucroute, fresh goat’s cheeses.',
        },
      },
      {
        nom: 'Gewurztraminer Vendanges Tardives',
        cepage: 'Gewurztraminer',
        millesime: '2019',
        couleur: '#E8A24C',
        type: 'blanc',
        service: '9–11 °C',
        notes: {
          fr: 'Rose, litchi et gingembre confit. Une douceur ample tenue par une fraîcheur épicée.',
          de: 'Rose, Litschi und kandierter Ingwer. Eine üppige Süße, gehalten von würziger Frische.',
          en: 'Rose, lychee and candied ginger. A generous sweetness held by spiced freshness.',
        },
        accord: {
          fr: 'Foie gras, munster affiné, tarte aux mirabelles.',
          de: 'Gänseleber, gereifter Munster, Mirabellen-Tarte.',
          en: 'Foie gras, aged Munster, mirabelle plum tart.',
        },
      },
      {
        nom: 'Pinot Gris « Les Marnes »',
        cepage: 'Pinot Gris',
        millesime: '2022',
        couleur: '#D8B27A',
        type: 'blanc',
        service: '10–12 °C',
        notes: {
          fr: 'Poire mûre, noisette et un soupçon de fumé. Texture soyeuse, finale sur les fruits secs.',
          de: 'Reife Birne, Haselnuss und ein Hauch Rauch. Seidige Textur, Abgang auf Trockenfrüchten.',
          en: 'Ripe pear, hazelnut and a hint of smoke. Silky texture, a finish of dried fruits.',
        },
        accord: {
          fr: 'Volaille à la crème, risotto aux cèpes, poissons fumés.',
          de: 'Geflügel in Rahm, Steinpilz-Risotto, geräucherter Fisch.',
          en: 'Creamed poultry, cep risotto, smoked fish.',
        },
      },
      {
        nom: 'Pinot Noir « Côte de Granit »',
        cepage: 'Pinot Noir',
        millesime: '2021',
        couleur: '#8C2F3A',
        type: 'rouge',
        service: '14–16 °C',
        notes: {
          fr: 'Cerise griotte, pivoine et un boisé fondu. Tannins fins, élevage de douze mois en fûts.',
          de: 'Sauerkirsche, Pfingstrose und dezentes Holz. Feine Tannine, zwölf Monate Fassreife.',
          en: 'Morello cherry, peony and integrated oak. Fine tannins, twelve months of barrel ageing.',
        },
        accord: {
          fr: 'Baeckeoffe, gibier à plume, magret de canard.',
          de: 'Baeckeoffe, Federwild, Entenbrust.',
          en: 'Baeckeoffe, feathered game, duck breast.',
        },
      },
      {
        nom: 'Crémant d’Alsace Brut « Cuvée Joseph »',
        cepage: "Crémant d'Alsace",
        millesime: 'Brut',
        couleur: '#EAD9A8',
        type: 'effervescent',
        service: '6–8 °C',
        notes: {
          fr: 'Bulle fine, brioche et pomme verte. Élaboré selon la méthode traditionnelle, dosage extra-brut.',
          de: 'Feine Perlage, Brioche und grüner Apfel. Traditionelle Flaschengärung, Extra-Brut dosiert.',
          en: 'Fine bubbles, brioche and green apple. Made in the traditional method, extra-brut dosage.',
        },
        accord: {
          fr: 'À l’apéritif, huîtres, desserts peu sucrés.',
          de: 'Als Aperitif, Austern, wenig süße Desserts.',
          en: 'As an aperitif, oysters, lightly sweetened desserts.',
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

  // ── Méta des pages (bannières + SEO par route) ───────────────────────────
  // Chaque page possède une bannière (titre + image) et des balises SEO.
  pages: {
    '/le-domaine': {
      eyebrow: { fr: 'Le domaine', de: 'Das Weingut', en: 'The estate' },
      titre: { fr: 'Le domaine', de: 'Das Weingut', en: 'The estate' },
      sous: {
        fr: 'Quatre générations au service d’un même coteau.',
        de: 'Vier Generationen im Dienst eines einzigen Hangs.',
        en: 'Four generations devoted to a single hillside.',
      },
      image:
        'https://images.unsplash.com/photo-1543418219-44e30b057fea?auto=format&fit=crop&w=2000&q=80',
      imageAlt: {
        fr: 'Vignoble en terrasses sous la lumière dorée de fin de journée',
        de: 'Terrassierter Weinberg im goldenen Abendlicht',
        en: 'Terraced vineyard in golden evening light',
      },
      seoTitle: {
        fr: 'Le domaine — Domaine Vogel-Stein',
        de: 'Das Weingut — Domaine Vogel-Stein',
        en: 'The estate — Domaine Vogel-Stein',
      },
      seoDesc: {
        fr: 'Histoire, terroir et savoir-faire du Domaine Vogel-Stein, vignoble familial de Riquewihr depuis 1922.',
        de: 'Geschichte, Terroir und Handwerk des Weinguts Vogel-Stein, Familienweingut in Riquewihr seit 1922.',
        en: 'History, terroir and craft of Domaine Vogel-Stein, a family estate in Riquewihr since 1922.',
      },
    },
    '/nos-cuvees': {
      eyebrow: { fr: 'La cave', de: 'Der Weinkeller', en: 'The cellar' },
      titre: { fr: 'Nos cuvées', de: 'Unsere Weine', en: 'Our wines' },
      sous: {
        fr: 'Sept expressions d’un terroir de granit et de marne.',
        de: 'Sieben Ausdrucksformen eines Terroirs aus Granit und Mergel.',
        en: 'Seven expressions of a granite-and-marl terroir.',
      },
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=80',
      imageAlt: {
        fr: 'Bouteilles de vin d’Alsace alignées dans la pénombre de la cave',
        de: 'Elsässer Weinflaschen im Halbdunkel des Kellers',
        en: 'Alsatian wine bottles lined up in the dim cellar',
      },
      seoTitle: {
        fr: 'Nos cuvées — Domaine Vogel-Stein',
        de: 'Unsere Weine — Domaine Vogel-Stein',
        en: 'Our wines — Domaine Vogel-Stein',
      },
      seoDesc: {
        fr: 'Riesling Grand Cru, Gewurztraminer, Pinot Gris, Pinot Noir et Crémant d’Alsace : découvrez nos cuvées et leurs accords.',
        de: 'Riesling Grand Cru, Gewurztraminer, Pinot Gris, Pinot Noir und Crémant d’Alsace: entdecken Sie unsere Weine.',
        en: 'Riesling Grand Cru, Gewurztraminer, Pinot Gris, Pinot Noir and Crémant d’Alsace: discover our wines and pairings.',
      },
    },
    '/oenotourisme': {
      eyebrow: { fr: 'Œnotourisme', de: 'Weintourismus', en: 'Wine tourism' },
      titre: { fr: 'Visites & dégustations', de: 'Besuche & Verkostungen', en: 'Visits & tastings' },
      sous: {
        fr: 'Du premier verre à l’accord mets-vins, vivez le domaine de l’intérieur.',
        de: 'Vom ersten Glas bis zur Speisenbegleitung — erleben Sie das Weingut von innen.',
        en: 'From the first glass to a food pairing, experience the estate from within.',
      },
      image:
        'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=2000&q=80',
      imageAlt: {
        fr: 'Verres de vin blanc levés lors d’une dégustation conviviale',
        de: 'Erhobene Weißweingläser bei einer geselligen Verkostung',
        en: 'Glasses of white wine raised during a convivial tasting',
      },
      seoTitle: {
        fr: 'Visites & dégustations — Domaine Vogel-Stein',
        de: 'Besuche & Verkostungen — Domaine Vogel-Stein',
        en: 'Visits & tastings — Domaine Vogel-Stein',
      },
      seoDesc: {
        fr: 'Réservez une dégustation au Domaine Vogel-Stein à Riquewihr : formules Découverte, Prestige et accord mets-vins.',
        de: 'Buchen Sie eine Verkostung im Weingut Vogel-Stein in Riquewihr: Formeln Entdeckung, Prestige und Speisenbegleitung.',
        en: 'Book a tasting at Domaine Vogel-Stein in Riquewihr: Discovery, Prestige and food-pairing experiences.',
      },
    },
    '/contact': {
      eyebrow: { fr: 'Nous trouver', de: 'Uns finden', en: 'Find us' },
      titre: { fr: 'Accès & contact', de: 'Anfahrt & Kontakt', en: 'Visit & contact' },
      sous: {
        fr: 'Au cœur du vieux Riquewihr, sur la Route des Vins.',
        de: 'Im Herzen des alten Riquewihr, an der Weinstraße.',
        en: 'In the heart of old Riquewihr, on the Wine Route.',
      },
      image:
        'https://images.unsplash.com/photo-1597933534024-debb6018d8d6?auto=format&fit=crop&w=2000&q=80',
      imageAlt: {
        fr: 'Ruelle pavée et maisons à colombages de Riquewihr',
        de: 'Gepflasterte Gasse und Fachwerkhäuser in Riquewihr',
        en: 'Cobbled lane and half-timbered houses of Riquewihr',
      },
      seoTitle: {
        fr: 'Accès & contact — Domaine Vogel-Stein',
        de: 'Anfahrt & Kontakt — Domaine Vogel-Stein',
        en: 'Visit & contact — Domaine Vogel-Stein',
      },
      seoDesc: {
        fr: 'Adresse, horaires et accès au caveau du Domaine Vogel-Stein, 12 rue du Général de Gaulle, 68340 Riquewihr.',
        de: 'Adresse, Öffnungszeiten und Anfahrt zum Weinkeller Vogel-Stein, 12 rue du Général de Gaulle, 68340 Riquewihr.',
        en: 'Address, hours and directions to the Domaine Vogel-Stein cellar, 12 rue du Général de Gaulle, 68340 Riquewihr.',
      },
    },
  },

  // ── Page d'accueil : intro + accès aux univers ───────────────────────────
  home: {
    introEyebrow: { fr: 'Bienvenue', de: 'Willkommen', en: 'Welcome' },
    introTitre: {
      fr: 'Des vins d’Alsace qui racontent leur terre',
      de: 'Elsässer Weine, die von ihrem Boden erzählen',
      en: 'Wines of Alsace that tell of their soil',
    },
    introTexte: {
      fr: 'À Riquewihr, sur un coteau de granit exposé plein sud, la famille Vogel-Stein façonne depuis 1922 des vins précis et lumineux. Poussez la porte : il y a une histoire, une cave, et toujours un verre à partager.',
      de: 'In Riquewihr, an einem nach Süden ausgerichteten Granithang, formt die Familie Vogel-Stein seit 1922 präzise, leuchtende Weine. Treten Sie ein: Es gibt eine Geschichte, einen Keller und immer ein Glas zum Teilen.',
      en: 'In Riquewihr, on a south-facing granite slope, the Vogel-Stein family has been shaping precise, luminous wines since 1922. Step inside: there is a story, a cellar, and always a glass to share.',
    },
    // Cartes "univers" qui mènent vers les pages
    univers: [
      {
        to: '/le-domaine',
        titre: { fr: 'Le domaine', de: 'Das Weingut', en: 'The estate' },
        texte: {
          fr: 'Quatre générations, un terroir, une obsession : la justesse.',
          de: 'Vier Generationen, ein Terroir, eine Obsession: die Präzision.',
          en: 'Four generations, one terroir, one obsession: precision.',
        },
        image:
          'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1000&q=80',
        imageAlt: {
          fr: 'La vigneronne marchant dans ses rangs de vigne',
          de: 'Die Winzerin geht durch ihre Rebzeilen',
          en: 'The winemaker walking through her vine rows',
        },
        cta: { fr: 'Notre histoire', de: 'Unsere Geschichte', en: 'Our story' },
      },
      {
        to: '/nos-cuvees',
        titre: { fr: 'Nos cuvées', de: 'Unsere Weine', en: 'Our wines' },
        texte: {
          fr: 'Riesling, Gewurztraminer, Pinot Noir, Crémant… sept cépages, sept caractères.',
          de: 'Riesling, Gewurztraminer, Pinot Noir, Crémant… sieben Rebsorten, sieben Charaktere.',
          en: 'Riesling, Gewurztraminer, Pinot Noir, Crémant… seven grapes, seven characters.',
        },
        image:
          'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1000&q=80',
        imageAlt: {
          fr: 'Verre de vin blanc devant un rang de vigne',
          de: 'Glas Weißwein vor einer Rebzeile',
          en: 'Glass of white wine in front of a vine row',
        },
        cta: { fr: 'Découvrir la cave', de: 'Den Keller entdecken', en: 'Explore the cellar' },
      },
      {
        to: '/oenotourisme',
        titre: { fr: 'Nous rendre visite', de: 'Uns besuchen', en: 'Visit us' },
        texte: {
          fr: 'Dégustations, visite du chai voûté, accords mets-vins toute l’année.',
          de: 'Verkostungen, Besichtigung des Gewölbekellers, Speisenbegleitung das ganze Jahr.',
          en: 'Tastings, vaulted-cellar tours and food pairings all year round.',
        },
        image:
          'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1000&q=80',
        imageAlt: {
          fr: 'Table dressée pour une dégustation de vins',
          de: 'Gedeckter Tisch für eine Weinverkostung',
          en: 'Table set for a wine tasting',
        },
        cta: { fr: 'Réserver', de: 'Reservieren', en: 'Book now' },
      },
    ],
    // Bandeau d'appel final (avant le footer)
    ctaBand: {
      titre: {
        fr: 'Et si on partageait un verre ?',
        de: 'Wie wäre es mit einem Glas?',
        en: 'Shall we share a glass?',
      },
      texte: {
        fr: 'Le caveau vous attend du mardi au dimanche. Réservez votre dégustation en quelques clics.',
        de: 'Der Weinkeller erwartet Sie von Dienstag bis Sonntag. Buchen Sie Ihre Verkostung in wenigen Klicks.',
        en: 'The cellar awaits you Tuesday to Sunday. Book your tasting in a few clicks.',
      },
      cta: { fr: 'Réserver une dégustation', de: 'Verkostung reservieren', en: 'Book a tasting' },
    },
  },

  // ── Le domaine : terroir + savoir-faire + équipe ─────────────────────────
  terroir: {
    eyebrow: { fr: 'Le terroir', de: 'Das Terroir', en: 'The terroir' },
    titre: {
      fr: 'Granit, marne et le souffle des Vosges',
      de: 'Granit, Mergel und der Atem der Vogesen',
      en: 'Granite, marl and the breath of the Vosges',
    },
    intro: {
      fr: 'Riquewihr est l’une des plus belles enclaves sèches d’Alsace : protégée par les Vosges, la commune reçoit moins de pluie que la moyenne. Nos parcelles s’étagent entre 250 et 380 mètres, sur deux sols qui dessinent le style de la maison.',
      de: 'Riquewihr ist eine der schönsten Trockeninseln des Elsass: von den Vogesen geschützt, erhält die Gemeinde weniger Regen als der Durchschnitt. Unsere Parzellen liegen zwischen 250 und 380 Metern, auf zwei Böden, die den Stil des Hauses prägen.',
      en: 'Riquewihr is one of Alsace’s finest dry pockets: sheltered by the Vosges, the village receives less rain than average. Our parcels rise between 250 and 380 metres, on two soils that shape the house style.',
    },
    points: [
      {
        titre: { fr: 'Sols de granit', de: 'Granitböden', en: 'Granite soils' },
        texte: {
          fr: 'Ils donnent au Riesling sa droiture saline et sa minéralité de pierre à fusil.',
          de: 'Sie verleihen dem Riesling seine salzige Geradlinigkeit und feuersteinige Mineralität.',
          en: 'They give Riesling its saline backbone and gunflint minerality.',
        },
      },
      {
        titre: { fr: 'Marnes calcaires', de: 'Kalkmergel', en: 'Calcareous marl' },
        texte: {
          fr: 'Elles apportent rondeur et générosité aux Pinots Gris et Gewurztraminer.',
          de: 'Sie verleihen Pinot Gris und Gewurztraminer Fülle und Großzügigkeit.',
          en: 'They bring roundness and generosity to Pinot Gris and Gewurztraminer.',
        },
      },
      {
        titre: { fr: 'Culture en bio', de: 'Bio-Anbau', en: 'Organic farming' },
        texte: {
          fr: 'Enherbement, labours légers, ni désherbant ni engrais chimique. Certifiés depuis 2015.',
          de: 'Begrünung, leichte Bodenbearbeitung, weder Herbizide noch Kunstdünger. Zertifiziert seit 2015.',
          en: 'Cover crops, light ploughing, no herbicides or chemical fertilisers. Certified since 2015.',
        },
      },
    ],
  },

  equipe: {
    eyebrow: { fr: 'La famille', de: 'Die Familie', en: 'The family' },
    titre: { fr: 'Les visages du domaine', de: 'Die Gesichter des Weinguts', en: 'The faces of the estate' },
    membres: [
      {
        nom: 'Camille Vogel-Stein',
        role: { fr: 'Vigneronne · 4ᵉ génération', de: 'Winzerin · 4. Generation', en: 'Winemaker · 4th generation' },
        photo:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
        bio: {
          fr: 'Formée à Beaune puis en Nouvelle-Zélande, elle a repris les rênes en 2014.',
          de: 'Ausgebildet in Beaune und Neuseeland, übernahm sie 2014 die Leitung.',
          en: 'Trained in Beaune and New Zealand, she took the reins in 2014.',
        },
      },
      {
        nom: 'Henri Vogel-Stein',
        role: { fr: 'Maître de chai', de: 'Kellermeister', en: 'Cellar master' },
        photo:
          'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80',
        bio: {
          fr: 'Le père de Camille veille sur les élevages et les vieilles vignes depuis quarante ans.',
          de: 'Camilles Vater wacht seit vierzig Jahren über Ausbau und alte Reben.',
          en: 'Camille’s father has watched over ageing and old vines for forty years.',
        },
      },
      {
        nom: 'Léa Marchand',
        role: { fr: 'Accueil & œnotourisme', de: 'Empfang & Weintourismus', en: 'Hospitality & wine tourism' },
        photo:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80',
        bio: {
          fr: 'Elle imagine les dégustations et vous accueille au caveau, en trois langues.',
          de: 'Sie gestaltet die Verkostungen und empfängt Sie im Weinkeller, in drei Sprachen.',
          en: 'She designs the tastings and welcomes you at the cellar, in three languages.',
        },
      },
    ],
  },

  // ── Œnotourisme : infos pratiques (page dédiée) ──────────────────────────
  infosPratiques: {
    titre: { fr: 'Bon à savoir', de: 'Gut zu wissen', en: 'Good to know' },
    items: [
      {
        titre: { fr: 'Langues', de: 'Sprachen', en: 'Languages' },
        texte: { fr: 'Visites en français, allemand et anglais.', de: 'Führungen auf Französisch, Deutsch und Englisch.', en: 'Tours in French, German and English.' },
      },
      {
        titre: { fr: 'Groupes', de: 'Gruppen', en: 'Groups' },
        texte: { fr: 'Jusqu’à 20 personnes sur réservation.', de: 'Bis zu 20 Personen nach Vereinbarung.', en: 'Up to 20 people by reservation.' },
      },
      {
        titre: { fr: 'Accessibilité', de: 'Barrierefreiheit', en: 'Accessibility' },
        texte: { fr: 'Caveau de plain-pied, accessible PMR.', de: 'Ebenerdiger Weinkeller, rollstuhlgerecht.', en: 'Ground-level cellar, wheelchair accessible.' },
      },
      {
        titre: { fr: 'Enfants', de: 'Kinder', en: 'Children' },
        texte: { fr: 'Bienvenus : jus de raison maison offert.', de: 'Willkommen: hausgemachter Traubensaft gratis.', en: 'Welcome: complimentary homemade grape juice.' },
      },
    ],
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
      { label: { fr: 'Mentions légales', de: 'Impressum', en: 'Legal notice' }, to: '/mentions-legales' },
      { label: { fr: 'Confidentialité', de: 'Datenschutz', en: 'Privacy' }, to: '/confidentialite' },
    ],
    credit: {
      fr: 'Site de démonstration — conçu pour les vignerons d’Alsace.',
      de: 'Demo-Website — gestaltet für die Winzer des Elsass.',
      en: 'Demonstration site — crafted for the winemakers of Alsace.',
    },
  },

  // ── Pages légales ────────────────────────────────────────────────────────
  // Contenu volontairement générique (démo). Chaque page = liste de blocs
  // { titre, corps:[paragraphes] }.
  legal: {
    '/mentions-legales': {
      titre: { fr: 'Mentions légales', de: 'Impressum', en: 'Legal notice' },
      maj: { fr: 'Dernière mise à jour : janvier 2026', de: 'Letzte Aktualisierung: Januar 2026', en: 'Last updated: January 2026' },
      blocs: [
        {
          titre: { fr: 'Éditeur du site', de: 'Herausgeber', en: 'Publisher' },
          corps: {
            fr: ['Domaine Vogel-Stein — EARL au capital de 50 000 €.', '12 rue du Général de Gaulle, 68340 Riquewihr, France.', 'SIRET 000 000 000 00000 — TVA FR00 000000000.', 'Directrice de la publication : Camille Vogel-Stein.'],
            de: ['Domaine Vogel-Stein — EARL mit einem Kapital von 50 000 €.', '12 rue du Général de Gaulle, 68340 Riquewihr, Frankreich.', 'SIRET 000 000 000 00000 — USt-IdNr. FR00 000000000.', 'Verantwortlich: Camille Vogel-Stein.'],
            en: ['Domaine Vogel-Stein — EARL with capital of €50,000.', '12 rue du Général de Gaulle, 68340 Riquewihr, France.', 'SIRET 000 000 000 00000 — VAT FR00 000000000.', 'Publication director: Camille Vogel-Stein.'],
          },
        },
        {
          titre: { fr: 'Hébergement', de: 'Hosting', en: 'Hosting' },
          corps: {
            fr: ['Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.'],
            de: ['Gehostet von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.'],
            en: ['Hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.'],
          },
        },
        {
          titre: { fr: 'Propriété intellectuelle', de: 'Urheberrecht', en: 'Intellectual property' },
          corps: {
            fr: ['L’ensemble des contenus (textes, photographies, identité visuelle) est protégé. Toute reproduction sans autorisation est interdite.'],
            de: ['Alle Inhalte (Texte, Fotos, visuelle Identität) sind geschützt. Jede Vervielfältigung ohne Genehmigung ist untersagt.'],
            en: ['All content (texts, photographs, visual identity) is protected. Any reproduction without authorisation is prohibited.'],
          },
        },
      ],
    },
    '/confidentialite': {
      titre: { fr: 'Politique de confidentialité', de: 'Datenschutzerklärung', en: 'Privacy policy' },
      maj: { fr: 'Dernière mise à jour : janvier 2026', de: 'Letzte Aktualisierung: Januar 2026', en: 'Last updated: January 2026' },
      blocs: [
        {
          titre: { fr: 'Données collectées', de: 'Erhobene Daten', en: 'Data collected' },
          corps: {
            fr: ['Ce site ne collecte aucune donnée personnelle à votre insu. Les réservations sont gérées par Cal.com selon sa propre politique de confidentialité.'],
            de: ['Diese Website erhebt keine personenbezogenen Daten ohne Ihr Wissen. Reservierungen werden von Cal.com gemäß dessen eigener Datenschutzrichtlinie verwaltet.'],
            en: ['This site collects no personal data without your knowledge. Bookings are handled by Cal.com under its own privacy policy.'],
          },
        },
        {
          titre: { fr: 'Cookies', de: 'Cookies', en: 'Cookies' },
          corps: {
            fr: ['Seul un stockage local conserve votre choix de langue. Le widget de réservation n’est chargé qu’après votre action explicite.'],
            de: ['Nur ein lokaler Speicher behält Ihre Sprachwahl. Das Buchungs-Widget wird erst nach Ihrer ausdrücklichen Aktion geladen.'],
            en: ['Only local storage keeps your language choice. The booking widget loads only after your explicit action.'],
          },
        },
        {
          titre: { fr: 'Vos droits', de: 'Ihre Rechte', en: 'Your rights' },
          corps: {
            fr: ['Conformément au RGPD, vous pouvez exercer vos droits d’accès, de rectification et de suppression en écrivant à bonjour@domaine-vogel-stein.fr.'],
            de: ['Gemäß DSGVO können Sie Ihre Rechte auf Auskunft, Berichtigung und Löschung per E-Mail an bonjour@domaine-vogel-stein.fr ausüben.'],
            en: ['Under the GDPR, you may exercise your rights of access, rectification and erasure by writing to bonjour@domaine-vogel-stein.fr.'],
          },
        },
      ],
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
