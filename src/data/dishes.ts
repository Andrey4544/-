import { Dish } from '../types';

export const DISHES_DATA: Dish[] = [
  // Breakfast
  {
    id: 'b1',
    category: 'breakfast',
    nameKey: 'Габровски домашни мекици с горски мед и сирене',
    descKey: 'Традиционни пухкави мекици, приготвени по стара балканджийска рецепта, поднесени с домашно овче сирене и чист балкански пчелен мед.',
    priceBgn: 12,
    priceEur: 6,
    isBalkanSpecialty: true,
    isChefRecommendation: true,
  },
  {
    id: 'b2',
    category: 'breakfast',
    nameKey: 'Дърпана балканджийска баница с яйца и масло',
    descKey: 'Хрупкави ръчно точени кори с пълнеж от биволско сирене, домашни яйца и краве масло, поднесена с домашен селски айрян.',
    priceBgn: 11,
    priceEur: 5.5,
    isBalkanSpecialty: true,
  },
  {
    id: 'b3',
    category: 'breakfast',
    nameKey: 'Континентално плато Edelveiss',
    descKey: 'Плато от еленски бут, габровска суджук пастърма, селекция зрели сирена, пресни зеленчуци, маслини и препечен селски хляб с шарена сол.',
    priceBgn: 18,
    priceEur: 9,
    isChefRecommendation: true,
  },
  
  // Salads
  {
    id: 's1',
    category: 'salads',
    nameKey: 'Автентична Шопска салата с печени чушки и домашно сирене',
    descKey: 'Розови домати от градината, хрупкави краставици, сладки печени чушки, червен лук и обилно настъргано зряло българско бяло сирене.',
    priceBgn: 13,
    priceEur: 6.5,
    isBalkanSpecialty: true,
  },
  {
    id: 's2',
    category: 'salads',
    nameKey: 'Балканска салата "Еделвайс" с орехи и печено козе сирене',
    descKey: 'Микс от свежи горски листа, запечено на плоча козе сирене, карамелизирани круши, хрупкави орехи и дресинг от балкански мед и дижонска горчица.',
    priceBgn: 16,
    priceEur: 8,
    isChefRecommendation: true,
  },
  {
    id: 's3',
    category: 'salads',
    nameKey: 'Домашен катък с печени чушки, чесън и орехи',
    descKey: 'Гъст домашен катък по автентична рецепта с печена капия, счукани орехови ядки и свеж копър, поднесен с топли пърленки.',
    priceBgn: 12,
    priceEur: 6,
    isBalkanSpecialty: true,
  },

  // Mains & Sizzling
  {
    id: 'm1',
    category: 'mains',
    nameKey: 'Балканджийски комбиниран сач на дървени въглища (за двама)',
    descKey: 'Крехко свинско филе, телешки суджук, пилешко филе, горски гъби, пресни зеленчуци и кашкавал, запечени на горещ глинен сач.',
    priceBgn: 36,
    priceEur: 18.5,
    isBalkanSpecialty: true,
    isChefRecommendation: true,
  },
  {
    id: 'm2',
    category: 'mains',
    nameKey: 'Традиционна Габровска каварма в глинено гювече',
    descKey: 'Бавно задушено свинско месо с много праз лук, сушени чушки, червено вино и традиционни балкански подправки, запечатано с тесто.',
    priceBgn: 22,
    priceEur: 11.5,
    isBalkanSpecialty: true,
  },
  {
    id: 'm3',
    category: 'mains',
    nameKey: 'Балканска пъстърва на жар с билково масло и печени картофи',
    descKey: 'Прясна пъстърва от чистите планински реки, изпечена на жар с диви билки, чесън и лимон.',
    priceBgn: 24,
    priceEur: 12.5,
    isChefRecommendation: true,
  },

  // Specialties
  {
    id: 'sp1',
    category: 'specialties',
    nameKey: 'Родопски пататник с домашно сирене и мента',
    descKey: 'Хрупкава картофена пита на сач с българско бяло сирене, яйца, масло и див джоджен.',
    priceBgn: 15,
    priceEur: 7.5,
    isBalkanSpecialty: true,
    isChefRecommendation: true,
  },
  {
    id: 'sp2',
    category: 'specialties',
    nameKey: 'Бавно печено телешко джоланче с манатарки и трюфелово пюре',
    descKey: 'Печено 8 часа на бавен огън крехко телешко месо в богат сос от диви манатарки и копринено картофено пюре.',
    priceBgn: 32,
    priceEur: 16.5,
    isChefRecommendation: true,
  },
  {
    id: 'sp3',
    category: 'specialties',
    nameKey: 'Автентичен Габровски пестил ("Габровски шоколад") с домашен сладолед',
    descKey: 'Знаменитият габровски сушен сливов пестил без захар, поднесен с топъл ванилов сладолед и филирани бадеми.',
    priceBgn: 10,
    priceEur: 5,
    isBalkanSpecialty: true,
  },

  // Wines
  {
    id: 'w1',
    category: 'wines',
    nameKey: 'Бутиково червено вино "Широко мелнишко & Рубин" (Реколта 2022)',
    descKey: 'Характерно наситено българско вино с нотки на зрели диви череши, черен шоколад и балкански дъб.',
    priceBgn: 38,
    priceEur: 19.5,
    isChefRecommendation: true,
  },
  {
    id: 'w2',
    category: 'wines',
    nameKey: 'Бяло вино "Врачански мискет & Димят" Свежест от Балкана',
    descKey: 'Елегантно бяло вино с деликатен аромат на бели полски цветя, дюля и свеж цитрусов завършек.',
    priceBgn: 34,
    priceEur: 17.5,
  }
];
