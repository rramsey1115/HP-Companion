// definitions for data
// manually defining for now

export const User = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  house: { type: String, ref: 'House', required: true },
  patronus: { type: String, required: true },
};

export const Character = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  alternate_names: [{type: String}],
  species: String,
  gender: String,
  house: String,
  dateOfBirth: String,
  yearOfBirth: String,
  wizard: Boolean,
  ancestry: String,
  eyeColour: String,
  hairColour: String,
  wand: { wood: String, core: String, length: String },
  patronus: String,
  hogwartsStudent: Boolean,
  actor: String,
  alternate_actors: [{type: String}],
  alive: Boolean,
  image: String,
};

export const Potion = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  effect: String,
  sideEffects: String,
  characteristics: String,
  time: String,
  difficulty: String,
  ingredients: [{ type: String, ref: 'Ingredient' }],
  inventors: [{id: String, firstName: String, lastName: String}],
  manufacturer: String,
};

export const Ingredient = {
  id: { type: String, required: true },
  name: { type: String, required: true },
};

export const Spell = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  incantation: String,
  effect: String,
  canBeVerbal: Boolean,
  type: String,
  light: String,
  creator: String,
};

export const House = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  houseColours: { type: String, required: true },
  founder: { type: String, required: true },
  animal: { type: String, required: true },
  element: { type: String, required: true },
  ghost: { type: String, required: true },
  commonRoom: { type: String, required: true },
  heads: [{ id: String, firstName: String, lastName: String }],
  traits: [{ id: String, name: String }],
  image: String,
};

export const Book = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
};

export const Beast = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
};

export const FavoriteItem = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  fav_books: [{ type: String, ref: 'Book' }],
  fav_characters: [{ type: String, ref: 'Character' }],
  fav_spells: [{ type: String, ref: 'Spell' }],
  fav_beasts: [{ type: String, ref: 'Beast' }],
  fav_potions: [{ type: String, ref: 'Potion' }],
  fav_ingredients: [{ type: String, ref: 'Ingredient' }],
};

export const CharacterComment = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  character_id: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
};

export const SpellComment = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  spell_id: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};

export const BeastComment = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  beast_id: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};

export const BookComment = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  book_id: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};

export const PotionComment = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  potion_id: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};

export const IngredientComment = {
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  ingredient_id: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};
