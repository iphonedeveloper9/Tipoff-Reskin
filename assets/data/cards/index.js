import {Ninetys_category_img, bison_category_img, black_cinema_category_img, bougie_category_img, chicago_category_img, church_category_img, classic_category_img, gen_z_category_img, hbcu_category_img, holiday_category_img, jaguars_category_img, maroon_tigers_category_img, naija_category_img, rattlers_category_img, quarantine_category_img, travel_category_img} from '../../icons'
import { Nintys_img, bison_img, black_cinema_img, chicago_img, church_img, calssic_img, hbcu_img, jaguars_img, maroon_tigers_img, naija_img, rattlers_img, quarantine_img, travel_img, gen_z_img, bougie_img, holiday_img } from '../../backgrounds';

const packs = exports.packs = () => ([
  {
    name: '90s',
    icon:Ninetys_category_img,
    image:Nintys_img,
    cards: require('./90s.json'),
  },

  {
    name: 'Bison',
    icon:bison_category_img,
    image:bison_img,
    cards: require('./bison.json'),
  },

  {
    name: 'Black Cinema',
    icon:black_cinema_category_img,
    image:black_cinema_img,
    cards: require('./black-cinema.json'),
  },

  // {
  //   name: 'Black History',
  //   icon:,
  //   cards: require('./black-history.json'),
  // },

  {
    name: 'Bougie',
    icon:bougie_category_img,
    image:bougie_img,
    cards: require('./bougie.json'),
  },

  {
    name: 'Chicago',
    icon:chicago_category_img,
    image:chicago_img,
    cards: require('./chicago.json'),
  },

  {
    name: 'Church',
    icon:church_category_img,
    image:church_img,
    cards: require('./church.json'),
  },

  {
    name: 'Classic',
    icon:classic_category_img,
    image:calssic_img,
    cards: require('./classic.json'),
  },

  // {
  //   name: 'Equal Hope',
  //   cards: require('./equal-hope.json'),
  // },

  {
    name: 'Gen-Z',
    icon:gen_z_category_img,
    image:gen_z_img,
    cards: require('./genz.json'),
  },

  {
    name: 'HBCU',
    icon:hbcu_category_img,
    image:hbcu_img,
    cards: require('./hbcu.json'),
  },

  {
    name: 'Holiday',
    icon:holiday_category_img,
    image:holiday_img,
    cards: require('./holiday.json'),
  },

  {
    name: 'Jaguars',
    icon:jaguars_category_img,
    image:jaguars_img,
    cards: require('./jaguars.json'),
  },

  {
    name: 'Maroon Tigers',
    icon:maroon_tigers_category_img,
    image:maroon_tigers_img,
    cards: require('./maroon-tigers.json'),
  },

  {
    name: 'NAIJA',
    icon:naija_category_img,
    image:naija_img,
    cards: require('./naija.json'),
  },

  {
    name: 'Rattlers',
    icon:rattlers_category_img,
    image:rattlers_img,
    cards: require('./rattlers.json'),
  },

  {
    name: 'Quarantine',
    icon:quarantine_category_img,
    image:quarantine_img,
    cards: require('./quarantine.json'),
  },

  {
    name: 'Travel',
    icon:travel_category_img,
    image:travel_img,
    cards: require('./travel.json'),
  },
]);
