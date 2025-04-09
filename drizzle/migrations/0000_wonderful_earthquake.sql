CREATE TABLE "beasts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "character_comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"character_id" uuid,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"alternate_names" text[],
	"species" text,
	"gender" text,
	"house" text,
	"date_of_birth" text,
	"year_of_birth" text,
	"wizard" boolean,
	"ancestry" text,
	"eye_colour" text,
	"hair_colour" text,
	"wand" json,
	"patronus" text,
	"hogwarts_student" boolean,
	"actor" text,
	"alternate_actors" text[],
	"alive" boolean,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "favorite_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"book_id" uuid,
	"character_id" uuid,
	"spell_id" uuid,
	"beast_id" uuid,
	"potion_id" uuid,
	"ingredient_id" uuid
);
--> statement-breakpoint
CREATE TABLE "houses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"house_colours" text NOT NULL,
	"founder" text NOT NULL,
	"animal" text NOT NULL,
	"element" text NOT NULL,
	"ghost" text NOT NULL,
	"common_room" text NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "potion_comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"potion_id" uuid,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "potions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"effect" text,
	"side_effects" text,
	"characteristics" text,
	"time" text,
	"difficulty" text,
	"manufacturer" text
);
--> statement-breakpoint
CREATE TABLE "spell_comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"spell_id" uuid,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "spells" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"incantation" text,
	"effect" text,
	"can_be_verbal" boolean,
	"type" text,
	"light" text,
	"creator" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"is_admin" boolean DEFAULT false,
	"house" uuid,
	"patronus" varchar(100),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "character_comments" ADD CONSTRAINT "character_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_comments" ADD CONSTRAINT "character_comments_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_spell_id_spells_id_fk" FOREIGN KEY ("spell_id") REFERENCES "public"."spells"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_beast_id_beasts_id_fk" FOREIGN KEY ("beast_id") REFERENCES "public"."beasts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_potion_id_potions_id_fk" FOREIGN KEY ("potion_id") REFERENCES "public"."potions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_items" ADD CONSTRAINT "favorite_items_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "potion_comments" ADD CONSTRAINT "potion_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "potion_comments" ADD CONSTRAINT "potion_comments_potion_id_potions_id_fk" FOREIGN KEY ("potion_id") REFERENCES "public"."potions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spell_comments" ADD CONSTRAINT "spell_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spell_comments" ADD CONSTRAINT "spell_comments_spell_id_spells_id_fk" FOREIGN KEY ("spell_id") REFERENCES "public"."spells"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_house_houses_id_fk" FOREIGN KEY ("house") REFERENCES "public"."houses"("id") ON DELETE no action ON UPDATE no action;