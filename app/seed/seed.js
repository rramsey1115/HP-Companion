import {
  users,
  characters,
  potions,
  ingredients,
  spells,
  houses,
  books,
  beasts,
  favoriteItems,
  characterComments,
  spellComments,
  ingredientComments,
  potionComments,
} from "@/app/lib/placeholder-data";
import postgres from "postgres";
import bcrypt from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

// Ensure the uuid extension is enabled once
const enableUuidExtension = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
};

//  ---------- Seed Users ----------------
const seedUsers = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN,
      house UUID,
      patronus VARCHAR(255)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, isAdmin, house, patronus)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.isAdmin}, ${user.house}, ${user.patronus})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}; // end of seed users

//  ----------- Seed Books ---------------
const seedBooks = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS books (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      image TEXT
    );
  `;

  const insertedBooks = await Promise.all(
    books.map(async (book) => {
      return sql`
        INSERT INTO books (id, name, description, image)
        VALUES (${book.id}, ${book.name}, ${book.description}, ${book.image})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedBooks;
}; // end of seed books

// ------- seed Houses ----------
const seedHouses = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS houses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      houseColours TEXT NOT NULL,
      founder TEXT NOT NULL,
      animal TEXT NOT NULL,
      element TEXT NOT NULL,
      ghost TEXT NOT NULL,
      commonRoom TEXT NOT NULL,
      heads JSONB,
      traits JSONB,
      image TEXT
    );
  `;

  const insertedHouses = await Promise.all(
    houses.map(async (house) => {
      return sql`
        INSERT INTO houses (id, name, houseColours, founder, animal, element, ghost, commonRoom, heads, traits, image )
        VALUES (${house.id}, 
        ${house.name}, 
        ${house.houseColours}, 
        ${house.founder}, 
        ${house.animal}, 
        ${house.element}, 
        ${house.ghost}, 
        ${house.commonRoom}, 
        ${sql.json(house.heads)}, 
        ${sql.json(house.traits)}, 
        ${house.image})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedHouses;
}; // end of seedHouses

// --------------- Seed Characters ------------------
const seedCharacters = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS characters (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      alternate_names VARCHAR(255)[],
      species VARCHAR(255),
      gender VARCHAR(255),
      house VARCHAR(255),
      dateOfBirth VARCHAR(255),
      yearOfBirth VARCHAR(255),
      wizard BOOLEAN,
      ancestry TEXT,
      eyeColour VARCHAR(255),
      hairColour VARCHAR(255),
      wand JSONB,
      patronus VARCHAR(255),
      hogwartsStudent BOOLEAN,
      actor VARCHAR(255),
      alternate_actors VARCHAR(255)[],
      alive BOOLEAN,
      image TEXT
    );
  `;

  const insertedCharacters = await Promise.all(
    characters.map(async (c) => {
      return sql`
        INSERT INTO characters (id, 
        name, 
        alternate_names, 
        species, 
        gender, 
        house, 
        dateOfBirth, 
        yearOfBirth,
        wizard,
        ancestry,
        eyeColour,
        hairColour,
        wand,
        patronus,
        hogwartsStudent,
        actor,
        alternate_actors,
        alive,
        image)
        VALUES (${c.id}, 
        ${c.name},
        ${c.alternate_names},
         ${c.species},
         ${c.gender},
         ${c.house},
         ${c.dateOfBirth},
         ${c.yearOfBirth},
         ${c.wizard},
         ${c.ancestry},
         ${c.eyeColour},
         ${c.hairColour},
         ${sql.json(c.wand)},
         ${c.patronus},
         ${c.hogwartsStudent},
         ${c.actor},
         ${c.alternate_actors},
         ${c.alive},
         ${c.image}
          )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCharacters;
}; //end of seedCharacters

// ------- seed Potions ----------
const seedPotions = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS potions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      effect TEXT,
      sideEffects TEXT,
      characteristics TEXT,
      time TEXT,
      difficulty TEXT,
      ingredients UUID[], -- Array of Ingredient references (assumes Ingredient table uses UUID as primary key)
      inventors JSONB, -- Array of { id, firstName, lastName } objects
      manufacturer TEXT
    );
  `;

  const insertedPotions = await Promise.all(
    potions.map(async (potion) => {
      return sql`
        INSERT INTO potions (
          id, name, effect, sideEffects, characteristics, time, difficulty, ingredients, inventors, manufacturer
        )
        VALUES (
          ${potion.id},
          ${potion.name},
          ${potion.effect},
          ${potion.sideEffects},
          ${potion.characteristics},
          ${potion.time},
          ${potion.difficulty},
          ${potion.ingredients ? sql.array(potion.ingredients) : sql.array([])},
          ${potion.inventors ? sql.json(potion.inventors) : sql.json([])},
          ${potion.manufacturer}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedPotions;
}; // end of seedPotions

// ------- seed Ingredients ----------
const seedIngredients = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS ingredients (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedIngredients = await Promise.all(
    ingredients.map(async (ingredient) => {
      return sql`
        INSERT INTO ingredients (id, name)
        VALUES (${ingredient.id}, ${ingredient.name})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedIngredients;
}; // end of seedIngredients

// ------- seed Spells ----------
const seedSpells = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS spells (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      incantation TEXT,
      effect TEXT,
      canBeVerbal BOOLEAN,
      type VARCHAR(255),
      light VARCHAR(255),
      creator TEXT
    );
  `;

  const insertedSpells = await Promise.all(
    spells.map(async (spell) => {
      return sql`
        INSERT INTO spells (id, name, incantation, effect, canBeVerbal, type, light, creator)
        VALUES (${spell.id}, ${spell.name}, ${spell.incantation}, ${spell.effect}, ${spell.canBeVerbal}, ${spell.type}, ${spell.light}, ${spell.creator})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedSpells;
}; //end of seedSpells

// ------- seed Beasts ----------
const seedBeasts = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS beasts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image TEXT
    );
  `;

  const insertedBeasts = await Promise.all(
    beasts.map(async (beast) => {
      return sql`
        INSERT INTO beasts (id, name, description, image)
        VALUES (
          ${beast.id}, 
          ${beast.name}, 
          ${beast.description}, 
          ${beast.image}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedBeasts;
}; // end of seedBeasts

// ------- seed Favorite Items ----------
const seedFavoriteItems = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS favorite_items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      fav_books UUID[],
      fav_characters UUID[],
      fav_spells UUID[],
      fav_beasts UUID[],
      fav_potions UUID[],
      fav_ingredients UUID[],
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const insertedFavoriteItems = await Promise.all(
    favoriteItems.map(async (item) => {
      return sql`
        INSERT INTO favorite_items (
          id,
          user_id,
          fav_books,
          fav_characters,
          fav_spells,
          fav_beasts,
          fav_potions,
          fav_ingredients
        )
        VALUES (
          ${item.id},
          ${item.user_id},
          ${item.fav_books || []},
          ${item.fav_characters || []},
          ${item.fav_spells || []},
          ${item.fav_beasts || []},
          ${item.fav_potions || []},
          ${item.fav_ingredients || []}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedFavoriteItems;
}; // end of seedFavoriteItems

// ------- seed Character Comments ----------
const seedCharacterComments = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS character_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      character_id UUID NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_character FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
    );
  `;

  const insertedCharacterComments = await Promise.all(
    characterComments.map(async (comment) => {
      return sql`
        INSERT INTO character_comments (id, user_id, character_id, comment, created_at)
        VALUES (${comment.id}, ${comment.user_id}, ${comment.character_id}, ${comment.comment}, ${comment.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCharacterComments;
};

// ------- seed Spell Comments ----------
const seedSpellComments = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS spell_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      spell_id UUID NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_spell FOREIGN KEY (spell_id) REFERENCES spells(id) ON DELETE CASCADE
    );
  `;

  const insertedSpellComments = await Promise.all(
    spellComments.map(async (comment) => {
      return sql`
        INSERT INTO spell_comments (id, user_id, spell_id, comment, created_at)
        VALUES (${comment.id}, ${comment.user_id}, ${comment.spell_id}, ${comment.comment}, ${comment.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedSpellComments;
};

// ------- seed Beast Comments ----------
const seedBeastComments = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS beast_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      beast_id UUID NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_beast FOREIGN KEY (beast_id) REFERENCES beasts(id) ON DELETE CASCADE
    );
  `;

  console.log("Beast Comments table created (empty)")
};

// ------- seed Book Comments ----------
const seedBookComments = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS book_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      book_id UUID NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );
  `;

  console.log("Book Comments table created (empty)")
};

// ------- seed Potion Comments ----------
const seedPotionComments = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS potion_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      potion_id UUID NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_potion FOREIGN KEY (potion_id) REFERENCES potions(id) ON DELETE CASCADE
    );
  `;

  const insertedPotionComments = await Promise.all(
    potionComments.map(async (comment) => {
      return sql`
        INSERT INTO potion_comments (id, user_id, potion_id, comment, created_at)
        VALUES (${comment.id}, ${comment.user_id}, ${comment.potion_id}, ${comment.comment}, ${comment.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedPotionComments;
};

// ------- seed Ingredient Comments ----------
const seedIngredientComments = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS ingredient_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      ingredient_id UUID NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
    );
  `;

  const insertedIngredientComments = await Promise.all(
    ingredientComments.map(async (comment) => {
      return sql`
        INSERT INTO ingredient_comments (id, user_id, ingredient_id, comment, created_at)
        VALUES (${comment.id}, ${comment.user_id}, ${comment.ingredient_id}, ${comment.comment}, ${comment.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedIngredientComments;
};




//  ---- Main seed function -------------------------------
const seedDatabase = async () => {
  try {
    console.log("Seeding database...");
    await enableUuidExtension();
    await seedUsers();
    await seedBooks();
    await seedHouses();
    await seedCharacters();
    await seedPotions();
    await seedIngredients();
    await seedSpells();
    await seedBeasts();
    await seedFavoriteItems();
    await seedIngredientComments();
    await seedBeastComments();
    await seedPotionComments();
    await seedCharacterComments();
    await seedBookComments();
    await seedSpellComments();
    console.log("✅ Database seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sql.end();
  }
};

seedDatabase();
