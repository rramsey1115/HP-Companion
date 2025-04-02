import { db } from "../lib/connection/db.js";
import {
  UsersData,
  CharactersData,
  PotionsData,
  IngredientsData,
  SpellsData,
  HousesData,
  BooksData,
  BeastsData,
  FavoriteItemsData,
  CharacterCommentsData,
  SpellCommentsData,
  PotionCommentsData
} from "../lib/placeholder-data.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { users, books, houses, characters, potions, ingredients, spells, beasts, favoriteItems, characterComments, spellComments, potionComments } from "../lib/definitions.js";
import { v4 as uuidv4 } from 'uuid';  // ES Module Import (modern JavaScript syntax)

const seedUsers = async () => {
  console.log("🌱 Seeding users...");
  for (const user of UsersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db
      .insert(users)
      .values({
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        isAdmin: user.isAdmin,
        house: user.house,
        patronus: user.patronus,
      })
      .onConflictDoNothing();
  }
};

const seedBooks = async () => {
  console.log("📚 Seeding books...");
  const booksWithIds = BooksData.map((book) => ({
    ...book,
    id: uuidv4(),
  }));
  await db.insert(books).values(booksWithIds).onConflictDoNothing();
};

const seedHouses = async () => {
  console.log("🏡 Seeding houses...");
  await db.insert(houses).values(HousesData).onConflictDoNothing();
};

const seedCharacters = async () => {
  console.log("🧙‍♂️ Seeding characters...");
  await db.insert(characters).values(CharactersData).onConflictDoNothing();
};

const seedPotions = async () => {
  console.log("🧪 Seeding potions...");
  await db.insert(potions).values(PotionsData).onConflictDoNothing();
};

const seedIngredients = async () => {
  console.log("🌿 Seeding ingredients...");
  await db.insert(ingredients).values(IngredientsData).onConflictDoNothing();
};

const seedSpells = async () => {
  console.log("✨ Seeding spells...");
  await db.insert(spells).values(SpellsData).onConflictDoNothing();
};

const seedBeasts = async () => {
  console.log("🐉 Seeding beasts...");
  // Add a UUID to each book
  const beastsWithIds = BeastsData.map((beast) => ({
    ...beast,
    id: uuidv4()
  }));

  await db.insert(beasts).values(beastsWithIds).onConflictDoNothing();
};

const seedFavoriteItems = async () => {
  console.log("⭐ Seeding favorite items...");
  const fiWithIds = FavoriteItemsData.map((fi) => ({
    ...fi,
    id: uuidv4()
  }))
  await db.insert(favoriteItems).values(fiWithIds).onConflictDoNothing();
};

const seedCharacterComments = async () => {
  console.log("💬 Seeding character comments...");
  const ccWithIds = CharacterCommentsData.map((cc) => ({
    ...cc,
    id: uuidv4()
  }));
  await db.insert(characterComments).values(ccWithIds).onConflictDoNothing();
};

const seedSpellComments = async () => {
  console.log("💬 Seeding spell comments...");
  const scWithIds = SpellCommentsData.map((sc) => ({
    ...sc,
    id: uuidv4()
  }))
  await db.insert(spellComments).values(scWithIds).onConflictDoNothing();
};

const seedPotionComments = async () => {
  console.log("💬 Seeding potion comments...");
  const pcWithIds = PotionCommentsData.map((pc) => ({
    ...pc,
    id: uuidv4()
  }))
  await db.insert(potionComments).values(pcWithIds).onConflictDoNothing();
};

// Main function to seed the database
const seedDatabase = async () => {
  try {
    console.log("🚀 Starting database seeding...");
    await seedHouses();
    await seedBooks();
    await seedCharacters();
    await seedPotions();
    await seedIngredients();
    await seedSpells();
    await seedBeasts();
    await seedCharacterComments();
    await seedSpellComments();
    await seedPotionComments();
    await seedUsers();
    await seedFavoriteItems();
    console.log("✅ Database seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();
