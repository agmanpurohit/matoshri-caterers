/**
 * CENTRAL IMAGE REGISTRY
 * ---------------------------------------------------------------
 * ALL photographs on the site are referenced by key from this file.
 *
 * TEMPORARY PHOTOGRAPHY: every entry marked `placeholder: true` is a
 * free-to-use photo from Unsplash (Unsplash License — commercial use
 * permitted, no attribution required). These are illustrative stock
 * photos and do NOT show Matoshri Caterers' own food or events. The
 * site never captions them as such.
 *
 * TO REPLACE WITH REAL BUSINESS PHOTOS:
 *   1. Put the file in /public/images/ (e.g. /public/images/wedding-buffet.jpg)
 *   2. Change `src` to "/images/wedding-buffet.jpg", update width/height
 *      to the file's real pixel size, rewrite `alt` to describe the real photo
 *   3. Set `placeholder: false`
 * No component needs to change.
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: { en: string; hi: string };
  placeholder: boolean;
  /** Source page, kept for licence records. */
  credit?: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=2000&q=80`;

const img = (id: string, w: number, h: number, en: string, hi: string): SiteImage => ({
  src: u(id),
  width: w,
  height: h,
  alt: { en, hi },
  placeholder: true,
  credit: "Unsplash",
});

export const images = {
  // — Hero & thalis —
  heroThalis: img("1567337710282-00832b415979", 2000, 1127, "Fresh rotis served with dal and vegetable curries on a stainless steel thali", "स्टील की थाली में दाल और सब्ज़ियों के साथ परोसी गई ताज़ी रोटियाँ"),
  thaliSpread: img("1711153419402-336ee48f2138", 2000, 1360, "A divided steel thali with paneer, vegetables, roti and accompaniments", "पनीर, सब्ज़ी, रोटी और साथ के व्यंजनों से सजी खानेदार स्टील की थाली"),
  thaliPortrait: img("1680359873864-43e89bf248ac", 2000, 1337, "A vegetarian thali with rotis, rice and curries, decorated with flowers and spices", "फूलों और मसालों से सजी रोटी, चावल और सब्ज़ियों वाली शाकाहारी थाली"),
  steelThali: img("1589778655375-3e622a9fc91c", 2000, 1400, "Assorted vegetarian dishes on a stainless steel thali", "स्टील की थाली में परोसे गए विभिन्न शाकाहारी व्यंजन"),
  dalMakhani: img("1788601988466-9f361c34c6cb", 2000, 1253, "Dal makhani served with rice, onion salad and flatbread", "चावल, प्याज़ के सलाद और रोटी के साथ परोसी गई दाल मखनी"),
  rotiGreens: img("1576846806147-8065a16f89b0", 2000, 1333, "Rotis served with leafy greens, salad and a bowl of curry", "हरी सब्ज़ी, सलाद और कटोरी भर सब्ज़ी के साथ परोसी गई रोटियाँ"),
  regionalPlate: img("1743674453123-93356ade2891", 1500, 2010, "A plate of rice with several regional vegetarian preparations", "चावल के साथ कई क्षेत्रीय शाकाहारी व्यंजनों वाली थाली"),
  dal: img("1755090154817-58d9d36ec988", 2000, 1333, "A bowl of tempered yellow dal served with bread", "तड़के वाली पीली दाल और रोटी"),
  pooriSabzi: img("1717587052948-fb9825de50f8", 2000, 2147, "Bowls of vegetarian curries served with puffed pooris", "फूली हुई पूरियों के साथ परोसी गई सब्ज़ियाँ"),

  // — Regional cuisines —
  dosa: img("1668236543090-82eba5ee5976", 2000, 1333, "A crisp dosa served with potato masala, sambar and chutneys", "आलू मसाला, सांभर और चटनियों के साथ कुरकुरा डोसा"),
  idliDosa: img("1787024231387-edccb8c44700", 1500, 2000, "Idli, vada and dosa with chutney on a banana leaf", "केले के पत्ते पर चटनी के साथ इडली, वड़ा और डोसा"),
  bananaLeafMeal: img("1625398407796-82650a8c135f", 2000, 2000, "A traditional South Indian vegetarian meal on a banana leaf", "केले के पत्ते पर परोसा गया पारंपरिक दक्षिण भारतीय शाकाहारी भोजन"),
  paneerNaan: img("1781332146569-9c5093bc2ca5", 2000, 1333, "A plate of paneer, naan, vegetables and gravy", "पनीर, नान, सब्ज़ियाँ और ग्रेवी से सजी प्लेट"),
  choleBhature: img("1788602564560-9bcbf0f9acb6", 1500, 2000, "Chana masala garnished with coriander, served with bhature", "हरे धनिये से सजा छोले मसाला और भटूरे"),
  paneerCurry: img("1631452180519-c014fe946bc7", 1333, 2000, "A rich paneer curry in a metal bowl with rice on the side", "धातु के कटोरे में पनीर की सब्ज़ी और साथ में चावल"),
  pavBhaji: img("1753357303396-704b5abe8945", 2000, 1987, "Pav bhaji garnished with onion and butter", "प्याज़ और मक्खन से सजी पाव भाजी"),
  papdiChaat: img("1788602563638-840d0d1d3ad2", 2000, 1540, "Papdi chaat topped with yogurt, pomegranate seeds and sev", "दही, अनार के दानों और सेव से सजी पापड़ी चाट"),
  paneerTikka: img("1793093399980-78c115de8377", 2000, 1333, "Paneer tikka with green peppers and onion rings", "हरी शिमला मिर्च और प्याज़ के छल्लों के साथ पनीर टिक्का"),

  // — Sweets & snacks —
  sweetsDisplay: img("1758910536889-43ce7b3199fd", 1500, 2000, "An assortment of colourful Indian sweets on display", "रंग-बिरंगी भारतीय मिठाइयों का प्रदर्शन"),
  jalebi: img("1778448806371-b55a71bf9a35", 1430, 2000, "Jalebi garnished with rose petals and pistachios", "गुलाब की पंखुड़ियों और पिस्ते से सजी जलेबी"),
  samosa: img("1601050690597-df0568f70950", 2000, 1333, "Golden samosas on a wooden tray with green chillies", "हरी मिर्च के साथ लकड़ी की ट्रे पर सुनहरे समोसे"),
  paniPuri: img("1781243680771-1fea4521e196", 2000, 1480, "Pani puri arranged on serving plates", "परोसने की प्लेटों में सजी पानी पूरी"),

  // — Buffet & dining —
  buffetChafing: img("1555244162-803834f70033", 2000, 1333, "A buffet counter with polished chafing dishes", "चमचमाती चेफिंग डिश के साथ बुफ़े काउंटर"),
  buffetElegant: img("1686853021522-1b0e9a81706e", 2000, 1333, "An elegantly lit buffet table set for guests", "मेहमानों के लिए सजी, रोशनी से जगमगाती बुफ़े टेबल"),

  // — Weddings & occasions —
  mandap: img("1587271636175-90d58cdad458", 2000, 1333, "A couple in traditional attire seated under a floral wedding canopy", "फूलों से सजे मंडप के नीचे पारंपरिक परिधान में बैठा दंपति"),
  receptionOutdoor: img("1772127822525-7eda37383b9f", 2000, 1333, "An outdoor reception venue with draped canopies and dining tables", "पर्दों से सजे शामियाने और भोजन की मेज़ों वाला खुला रिसेप्शन स्थल"),
  receptionTables: img("1772127822514-682aeffcc0d3", 1395, 2000, "Outdoor reception tables with elegant decorations", "सुंदर सजावट वाली खुली जगह पर रिसेप्शन की मेज़ें"),
  ceremonyStage: img("1744805624954-a6686543c3ff", 1333, 2000, "A beautifully decorated stage set for a ceremony", "समारोह के लिए खूबसूरती से सजा मंच"),
  banquetNight: img("1736155983520-a0f7d5949d39", 2000, 1333, "A banquet set up outdoors at night with warm lights", "रात में गर्म रोशनी के साथ खुले में सजा भोज स्थल"),
  henna: img("1621801306185-8c0ccf9c8eb8", 2000, 1333, "Hands decorated with intricate henna holding each other", "बारीक मेहंदी से सजे हाथ"),
  balloons: img("1525351159099-81893194469e", 2000, 1340, "Colourful balloons floating for a celebration", "उत्सव के लिए हवा में उड़ते रंग-बिरंगे गुब्बारे"),
  diyas: img("1760630004439-18b3bbd826be", 2000, 1333, "Lit diyas arranged on a platter", "थाली में सजे जलते दीये"),
  rangoli: img("1761392366758-c04853a207a6", 1333, 2000, "A woman creating a colourful rangoli on the floor", "फ़र्श पर रंग-बिरंगी रंगोली बनाती महिला"),
  marigoldPrep: img("1787295779641-28182ac10feb", 1500, 2000, "Two women arranging marigold flowers for a celebration", "उत्सव के लिए गेंदे के फूल सजाती दो महिलाएँ"),
  garlands: img("1789971649652-ae5dfeeaa7b4", 1333, 2000, "Hanging garlands of marigold and jasmine flowers", "गेंदे और चमेली के फूलों की लटकती मालाएँ"),

  // — Equipment & vessels —
  brassPots: img("1652960018678-1f19799996c5", 2000, 1333, "A collection of traditional brass pots and vessels", "पीतल के पारंपरिक बर्तनों और पात्रों का संग्रह"),
  brassBowls: img("1727124443486-659f329a08c2", 2000, 1333, "Rows of metal bowls and serving spoons", "धातु की कटोरियों और परोसने के चम्मचों की कतारें"),
  vesselMarket: img("1750847009743-e0281d1bca7d", 2000, 1328, "Brass and steel vessels stacked at a market stall", "बाज़ार में सजे पीतल और स्टील के बर्तन"),
  metalContainers: img("1670339367678-2c75387b2151", 2000, 1500, "A group of metal cooking containers", "खाना पकाने के धातु के बर्तनों का समूह"),
  largeCookingPots: img("1790008882050-76a602990485", 2000, 1333, "Three large metal cooking pots on a counter", "काउंटर पर रखे तीन बड़े धातु के भगोने"),
  ornateContainers: img("1774978238263-325655a7b0b6", 2000, 1333, "Ornate golden serving containers with lids", "ढक्कन वाले नक्काशीदार सुनहरे सर्विंग पात्र"),
  brassThaliSet: img("1708193754228-75fa48241030", 1500, 2000, "A metal thali set with bowls and spoons", "कटोरियों और चम्मचों के साथ धातु का थाली सेट"),
  platesStack: img("1715690998809-11c2a60558fd", 2000, 1428, "A neat stack of ceramic plates and bowls", "चीनी मिट्टी की प्लेटों और कटोरियों का व्यवस्थित ढेर"),
  ladles: img("1773946734714-3a15e8b39b7c", 2000, 1125, "A row of metal ladles hanging against a wall", "दीवार पर टंगी धातु की करछियों की कतार"),

  // — Heritage —
  hawaMahal: img("1477587458883-47145ed94245", 2000, 1333, "Decorated horses passing the Hawa Mahal in Jaipur, Rajasthan", "जयपुर, राजस्थान में हवा महल के सामने से गुज़रते सजे हुए घोड़े"),
  amberFort: img("1599661046289-e31897846e41", 1500, 2667, "The ramparts of Amber Fort in Jaipur, Rajasthan", "जयपुर, राजस्थान में आमेर किले की प्राचीर"),
  jalMahal: img("1661924326425-c14a6426d989", 2000, 1333, "Jal Mahal palace on the lake in Jaipur", "जयपुर में झील के बीच स्थित जल महल"),
  gujaratTemple: img("1765798875434-7e934cec1180", 2000, 1333, "An ancient carved stone temple in Gujarat", "गुजरात का प्राचीन नक्काशीदार पत्थर का मंदिर"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
