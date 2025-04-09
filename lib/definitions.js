import { pgTable, uuid, text, boolean, timestamp, varchar} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { json } from "drizzle-orm/gel-core";

// User Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  house: uuid("house").references(() => houses.id),
  patronus: varchar("patronus", { length: 100 }),
});

// Character Table
export const characters = pgTable("characters", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  alternate_names: text("alternate_names").array(),
  species: text("species"),
  gender: text("gender"),
  house: text("house"),
  dateOfBirth: text("date_of_birth"),
  yearOfBirth: text("year_of_birth"),
  wizard: boolean("wizard"),
  ancestry: text("ancestry"),
  eyeColour: text("eye_colour"),
  hairColour: text("hair_colour"),
  wand: json("wand"),
  patronus: text("patronus"),
  hogwartsStudent: boolean("hogwarts_student"),
  actor: text("actor"),
  alternate_actors: text("alternate_actors").array(),
  alive: boolean("alive"),
  image: text("image"),
});

// Potion Table
export const potions = pgTable("potions", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  effect: text("effect"),
  sideEffects: text("side_effects"),
  characteristics: text("characteristics"),
  time: text("time"),
  difficulty: text("difficulty"),
  manufacturer: text("manufacturer"),
});

// Ingredient Table
export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

// Spell Table
export const spells = pgTable("spells", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  incantation: text("incantation"),
  effect: text("effect"),
  canBeVerbal: boolean("can_be_verbal"),
  type: text("type"),
  light: text("light"),
  creator: text("creator"),
});

// House Table
export const houses = pgTable("houses", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  houseColours: text("house_colours").notNull(),
  founder: text("founder").notNull(),
  animal: text("animal").notNull(),
  element: text("element").notNull(),
  ghost: text("ghost").notNull(),
  commonRoom: text("common_room").notNull(),
  image: text("image"),
});

// Book Table
export const books = pgTable("books", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image"),
});

// Beast Table
export const beasts = pgTable("beasts", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image"),
});

// Favorite Items Table (many-to-many relations)
export const favoriteItems = pgTable("favorite_items", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  bookId: uuid("book_id").references(() => books.id),
  characterId: uuid("character_id").references(() => characters.id),
  spellId: uuid("spell_id").references(() => spells.id),
  beastId: uuid("beast_id").references(() => beasts.id),
  potionId: uuid("potion_id").references(() => potions.id),
  ingredientId: uuid("ingredient_id").references(() => ingredients.id),
});

// Character Comments Table
export const characterComments = pgTable("character_comments", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  characterId: uuid("character_id").references(() => characters.id), // Links to the character being commented on
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Spell Comments Table
export const spellComments = pgTable("spell_comments", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  spellId: uuid("spell_id").references(() => spells.id), // Links to the spell being commented on
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Potion Comments Table
export const potionComments = pgTable("potion_comments", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  potionId: uuid("potion_id").references(() => potions.id), // Links to the potion being commented on
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  house: one(houses, { fields: [users.house], references: [houses.id] }),
  favoriteItems: many(favoriteItems)
}));

export const characterCommentsRelations = relations(characterComments, ({ one }) => ({
  user: one(users, { fields: [characterComments.userId], references: [users.id] }),
  character: one(characters, { fields: [characterComments.characterId], references: [characters.id] }),
}));

export const spellCommentsRelations = relations(spellComments, ({ one }) => ({
  user: one(users, { fields: [spellComments.userId], references: [users.id] }),
  spell: one(spells, { fields: [spellComments.spellId], references: [spells.id] }),
}));

export const potionCommentsRelations = relations(potionComments, ({ one }) => ({
  user: one(users, { fields: [potionComments.userId], references: [users.id] }),
  potion: one(potions, { fields: [potionComments.potionId], references: [potions.id] }),
}));

export const favoriteItemsRelations = relations(favoriteItems, ({ one }) => ({
  user: one(users, { fields: [favoriteItems.userId], references: [users.id] }),
  book: one(books, { fields: [favoriteItems.bookId], references: [books.id] }),
  character: one(characters, { fields: [favoriteItems.characterId], references: [characters.id] }),
}));
