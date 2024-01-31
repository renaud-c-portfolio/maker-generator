
const data = {

    keywords:[
        "none",
        "genre", 
        "theme",
        "adject",
        "create",
        "think",
        "bigCat",
        "medCat",
        "miniCat",
        "specialCat",
        "media",
        "theming",

        "place",
        "character",
    ],

    mainStruct:[
        "@create# @specialCat# @genre# @theming#",
        "@create# @genre#... except it's also a @genre#!",
        "invent a new genre, a @adject#@media# @think# @medCat#", 
    ],

    subStruct:[
        "an excuse to make @miniCat#",
        "initially about @theme#s but then @theme#s!", 
        "the @place# is invaded by @character#s!"
    ],

    detailStruct:[
        "the @medCat# is @miniCat#!",
        "@bigCat# focuses on @theme#",
    ],

    none:1,
    genre: 17,

    bigCat: 8,
    medCat: 8,
    miniCat: 8,

    specialCat:10,
    
    adject: 32,
    create: 8,
    think: 3,
    media:4,
    theme:8,
    theming:8,

    place:8,
    character:8,

    packages:{
         allThemes:["@character#","@tool#","@place#"],
    },

    videogame:{

        none:[""],

        create:[
            "craft a",
            "handmake a",
            "the minimalist",
            "a rough, messy",
            "reinvent the",
            "an insult to the genre of",
            "A version you'd hate of",
            "a clone of your favorite",
            "a parody",
        ],

        theming:[
            "about @theme#s",
            "about a @theme#",
            "about... @theme#s!",
            "about making @theme#s",
            "with theme: @theme#s",
            "about fighting @theme#s",
            "starring a @theme#",
            "starring @theme#s",
            "secretly about  @theme#s",
            "about collecting  @theme#s",
        ],
        media:[
            "game",
            "game",
            "competitive game",
            "MMO",
            "puzzler",
            "toy",
            "storygame"
        ],

        think:[
            "rethinking",
            "focusing on",
            "with no",
        ], 
        

        genre: [
            "autobattler",
            "platformer",
            "jrpg",
            "soulslike",
            "topdown",
            "beat'em up",
            "fighting game",
            "shmup", 
            "pseudoboardgame",
            "monster collecter",
            "creature raising sim",
            "detective game",
            "dungeon crawler",
            "classic roguelike",
            "crazy taxi",
            "building game", 
            "citybuilder",
            "deckbuilder",
            "beautiful explorable world",
            "idle game",
            "shared persistent world",
        ],
        
        specialCat:[
            "",
            "unclear-if-coop",
            "endlessly looping",
            "super-short",
            "story-based",
            "roguelite",
            "rpg-elements",
            "co-op",
            "competitive",
            "assymetric-multiplayer"
        ],

        bigCat: [
            "chara creation",
            "combat",
            "exploration",
            "dialogue",
            "worldbuild-sim",
            "loadout-powerups",
            "party-building",
            "inventory",
        ],

        medCat: [
            "class-change",
            "heat actions",
            "headshots",
            "critical hits",
            "cooking",
            "monsterhunter grind",
            "special super attacks",
            "no-recipe mixing",
            "unclear openworld",
            "branching evolutions",
            "robot assembly",
            "party building",
            "card deck equivalent",
            "parrying",
            "chara customization",
            "too many weapons",
            "farming / building",
            "roguelite element",
            "procedural levels",
            "metro-idvania progression"
        ],

        miniCat:[
            "treasure",
            "crafting",
            "healing",
            "npcs",
            "hit points",
            "bosses",
            "cards",
            "weapons",
            "equipment",
            "romances",
            "super moves",
            "monsters",
            "other players",
            "rpg stats",
        ],

        character: [
            "baboon",
            "gorilla",
            "monkey",
            "cat",
            "orangutan",
            "robot",
            "dark lord",
            "demon",  
        ],

        theme: [
            "baboon",
            "gorilla",
            "monkey",
            "cat",
            "orangutan",
            "robot",
            "hell",
            "demon",  
        ],

        adject:[
            "",
            "",
            "nonrandom ", 

            "kawaii ",
            "shining ",
            "burning ",
            "loathsome ",
            "wretched ",
            "accursed ",
            "legendary ",
            "dream ",
            "horror ",
            "spooky ",
            "spicy ",
            "sci- ",
            "sci-@adject#",
            "bug ",
            "bone ",
            "blood ",
            "combining ",
            "transforming ",
            "communist ",
            "just ",
            "divine ",
            "undead ",
            "powerful ",
            "friendly ",
            "goofy ",
            "exaggerated ",
            "cyborg ",
            "cyber",
            "robo",
            "world-destroying ",
            "eco-friendly ",
            "romantic ",
            "giga-banana ",
            "super auto ",
        ],

        tool:[
             
        ],

        place:[
             "earth",
             "world tree",
             "earth",
             "world tree",
             "earth",
             "world tree",
             "earth",
             "world tree",

        ],

    }
}

export default data