/**
 * Feathers of Memory - Game Script
 * A story-driven bird adventure game where you recover lost memories
 */

// ===========================
// GAME STATE & INITIALIZATION
// ===========================

// DOM Elements
let gameWorld, player, dialogueSystem, puzzleInterface, memoryJournal; //,birdForms;
let alertContainer, startScreen, loadingScreen, settingsMenu;
let dialogueText, dialogueOptions, speakerName;
let journalPages, formsContainer, puzzleContainer;

/**
 * Main game state object
 */
const gameState = {
    // Player data
    player: {
        name: "",
        position: { x: 50, y: 50 },
        currentForm: "small-bird",
        unlockedForms: ["small-bird"],
        speed: 5
    },
    
    // Game progress
    memories: [],
    currentArea: "meadow",
    npcsInteracted: [],
    puzzlesSolved: [],
    gameStarted: false,
    
    // Settings
    settings: {
        volume: 70,
        theme: "light"
    }
};

// Initialize DOM elements
document.addEventListener('DOMContentLoaded', initGame);

/**
 * Initialize the game and DOM elements
 */
function initGame() {
    // Get DOM elements
    gameWorld = document.getElementById('game-world');
    player = document.getElementById('player');
    dialogueSystem = document.getElementById('dialogue-system');
    puzzleInterface = document.getElementById('puzzle-interface');
    memoryJournal = document.getElementById('memory-journal');
    birdForms = document.getElementById('bird-forms');
    alertContainer = document.getElementById('alert-container');
    startScreen = document.getElementById('start-screen');
    loadingScreen = document.getElementById('loading-screen');
    settingsMenu = document.getElementById('settings-menu');
    
    dialogueText = document.getElementById('dialogue-text');
    dialogueOptions = document.getElementById('dialogue-options');
    speakerName = document.getElementById('speaker-name');
    journalPages = document.getElementById('journal-pages');
    formsContainer = document.getElementById('forms-container');
    puzzleContainer = document.getElementById('puzzle-container');
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for saved game
    checkForSavedGame();
    
    // Setup theme based on settings
    setupTheme();
}

/**
 * Setup event listeners for UI elements
 */
function setupEventListeners() {
    // Start screen buttons
    document.getElementById('new-game').addEventListener('click', startNewGame);
    document.getElementById('continue-game').addEventListener('click', continueGame);
    
    // Navigation buttons
    document.getElementById('open-journal').addEventListener('click', () => showSection(memoryJournal));
    document.getElementById('open-forms').addEventListener('click', () => showSection(birdForms));
    document.getElementById('game-settings').addEventListener('click', () => showSection(settingsMenu));
    
    // Close buttons
    document.getElementById('close-dialogue').addEventListener('click', () => hideSection(dialogueSystem));
    document.getElementById('close-journal').addEventListener('click', () => hideSection(memoryJournal));
    document.getElementById('close-forms').addEventListener('click', () => hideSection(birdForms));
    document.getElementById('close-settings').addEventListener('click', () => hideSection(settingsMenu));
    
    // Control buttons
    document.getElementById('move-left').addEventListener('click', () => movePlayer('left'));
    document.getElementById('move-right').addEventListener('click', () => movePlayer('right'));
    document.getElementById('move-up').addEventListener('click', () => movePlayer('up'));
    document.getElementById('move-down').addEventListener('click', () => movePlayer('down'));
    document.getElementById('interact-btn').addEventListener('click', interactWithNPC);
    
    // Settings
    document.getElementById('theme-switch').addEventListener('change', toggleTheme);
    document.getElementById('save-settings').addEventListener('click', saveSettings);
}
const gameAreas = {
    "meadow": {
        name: "Sunlit Meadow",
        description: "A peaceful meadow with tall grass swaying in the gentle breeze.",
        backgroundColor: "#8EB7AF",
        npcs: ["robin", "sparrow"],
        puzzles: ["feather-sorting"],
        memoryIds: ["memory-1"]
    },
    "forest": {
        name: "Whisper Woods",
        description: "A dense forest with dappled sunlight filtering through the leaves.",
        backgroundColor: "#5A7D5A",
        npcs: ["owl", "bluejay"],
        puzzles: ["bird-call"],
        memoryIds: ["memory-2", "memory-3"]
    },
    "ancient-tree": {
        name: "The Ancient Tree",
        description: "A massive, gnarled tree that has stood for centuries.",
        backgroundColor: "#8B6D5A",
        npcs: ["elder-raven"],
        puzzles: ["nest-building"],
        memoryIds: ["memory-4"] 
    },
    "river": {
        name: "Flowing River",
        description: "A clear river flowing over smooth stones.",
        backgroundColor: "#5A7D8B",
        npcs: ["kingfisher", "duck"],
        puzzles: ["stone-hopping"],
        memoryIds: ["memory-5"]
    }
};

/**
 * NPC characters with their dialogue trees
 */
const npcs = {
    "robin": {
        name: "Robin",
        greeting: "Hello there, little one. You seem lost.",
        dialogues: {
            "start": {
                text: "I haven't seen you around here before. Are you new to these parts?",
                options: [
                    { text: "I think I've lost my memory...", next: "memory" },
                    { text: "Just passing through.", next: "passing" },
                    { text: "Who are you?", next: "introduction" }
                ]
            },
            "memory": {
                text: "Lost your memory? That's terrible! I've heard the Ancient Tree might help. Its roots run deep with wisdom.",
                options: [
                    { text: "Where can I find this tree?", next: "directions" },
                    { text: "Thank you for your help.", next: "end" }
                ]
            },
            "passing": {
                text: "Safe travels then. Watch out for the hawks above.",
                options: [
                    { text: "I'll be careful.", next: "end" }
                ]
            },
            "introduction": {
                text: "I'm Robin, a songbird of the meadow. I know all the best spots for berries and seeds here.",
                options: [
                    { text: "Nice to meet you, Robin.", next: "nice" },
                    { text: "Do you know anything about lost memories?", next: "memory" }
                ]
            },
            "directions": {
                text: "Head east through the forest until you find a clearing. The Ancient Tree stands alone there, impossible to miss.",
                options: [
                    { text: "Thank you!", next: "end" }
                ]
            },
            "nice": {
                text: "Likewise! Feel free to ask if you need anything during your stay in the meadow.",
                options: [
                    { text: "I'll remember that.", next: "end" }
                ]
            },
            "end": {
                text: "May the wind be at your wings, friend.",
                options: []
            }
        },
        unlocksMemory: null,
        unlocksBirdForm: null
    },
    "owl": {
        name: "Wise Owl",
        greeting: "Hoo... a visitor in my woods.",
        dialogues: {
            "start": {
                text: "Not many birds venture this deep into the forest. What brings you here, little one?",
                options: [
                    { text: "I'm looking for the Ancient Tree.", next: "tree" },
                    { text: "I've lost my memories.", next: "memories" },
                    { text: "Just exploring.", next: "exploring" }
                ]
            },
            "tree": {
                text: "Ah, seeking wisdom are we? The Ancient Tree is indeed powerful, but it only reveals its secrets to those who solve its puzzle.",
                options: [
                    { text: "What kind of puzzle?", next: "puzzle" },
                    { text: "Can you guide me there?", next: "guide" }
                ]
            },
            "memories": {
                text: "Memories are like the stars - sometimes hidden by clouds but never truly gone. I sense yours are simply waiting to be found again.",
                options: [
                    { text: "Can you help me?", next: "help" },
                    { text: "Is there something special about this forest?", next: "forest" }
                ]
            },
            "exploring": {
                text: "A curious spirit! Be careful though - not all parts of this forest are welcoming to strangers.",
                options: [
                    { text: "Any places I should avoid?", next: "danger" },
                    { text: "Thank you for the warning.", next: "end" }
                ]
            },
            "puzzle": {
                text: "The Tree's challenge is one of patience and perspective. You must build a nest that withstands the test of time.",
                options: [
                    { text: "How do I do that?", next: "nest-hint" },
                    { text: "I'll figure it out myself.", next: "end" }
                ]
            },
            "guide": {
                text: "I cannot leave these woods, but follow the path of mushrooms eastward. They will lead you true.",
                options: [
                    { text: "Thank you, Wise Owl.", next: "end" }
                ]
            },
            "help": {
                text: "I can offer this wisdom: sometimes to remember who we are, we must help others remember who they are. Seek out the bluejay nearby - they need your assistance.",
                options: [
                    { text: "I'll find the bluejay.", next: "end" }
                ]
            },
            "forest": {
                text: "This forest has stood for centuries, absorbing the stories of all who pass through. Some say the trees themselves remember what we forget.",
                options: [
                    { text: "Fascinating.", next: "end" }
                ]
            },
            "danger": {
                text: "The northern thicket is home to fox dens. And beware the misty hollow - birds have flown in but not out.",
                options: [
                    { text: "I'll steer clear of those areas.", next: "end" }
                ]
            },
            "nest-hint": {
                text: "A strong nest needs both flexibility and stability. Consider carefully what materials you choose and how you arrange them.",
                options: [
                    { text: "Thank you for the hint.", next: "end" }
                ]
            },
            "end": {
                text: "May wisdom guide your wings, little one. Return if you need more guidance.",
                options: []
            }
        },
        unlocksMemory: null,
        unlocksBirdForm: "night-owl"
    },
    "bluejay": {
        name: "Frantic Bluejay",
        greeting: "Oh! Oh! Can you help? Please help!",
        dialogues: {
            "start": {
                text: "My precious blue feather collection is all mixed up! I can't tell which is which anymore!",
                options: [
                    { text: "I can help you sort them.", next: "help" },
                    { text: "Why are they so important?", next: "importance" },
                    { text: "Sorry, I'm busy right now.", next: "refuse" }
                ]
            },
            "help": {
                text: "Really? Oh thank you! Each feather has a slightly different shade of blue. I need them arranged from lightest to darkest.",
                options: [
                    { text: "Let me try.", next: "puzzle" },
                    { text: "Actually, I can't tell blue shades apart.", next: "colorblind" }
                ]
            },
            "importance": {
                text: "Each feather represents a memory of my family's lineage. The order tells our story from beginning to present day.",
                options: [
                    { text: "That's beautiful. I'll help you.", next: "help" },
                    { text: "I understand the importance of memories.", next: "connection" }
                ]
            },
            "refuse": {
                text: "Oh... I understand. If you change your mind, I'll be here amongst my scattered memories.",
                options: [
                    { text: "Actually, I'll help now.", next: "help" },
                    { text: "Good luck with that.", next: "end" }
                ]
            },
            "puzzle": {
                text: "Wonderful! I'll show you the feathers. Take your time arranging them.",
                options: [
                    { text: "Start puzzle", next: "start-puzzle" }
                ]
            },
            "colorblind": {
                text: "Oh dear... perhaps there's another way. Each feather also has a distinct pattern if you look closely enough.",
                options: [
                    { text: "In that case, I can try.", next: "puzzle" },
                    { text: "Sorry, I should be going.", next: "end" }
                ]
            },
            "connection": {
                text: "You too? There's something in your eyes... a familiar lost look. Perhaps in helping me recover my story, you might find pieces of your own.",
                options: [
                    { text: "Let's help each other then.", next: "puzzle" }
                ]
            },
            "success": {
                text: "Perfect! They're all in order now. Our family story from the first bluejay to... well, me! As thanks, let me share something with you.",
                options: [
                    { text: "What is it?", next: "reward" }
                ]
            },
            "reward": {
                text: "A memory came to me while you were working. About a small bird who helped others despite being lost itself. It reminded me of you.",
                options: [
                    { text: "That sounds like... me?", next: "memory-unlock" }
                ]
            },
            "memory-unlock": {
                text: "Yes! I'm certain now. You're the bird who helped my grandmother find her way home during the Great Storm. You were so brave!",
                options: [
                    { text: "The Great Storm...", next: "end" }
                ]
            },
            "end": {
                text: "Thank you again, friend. May your own memories return to you as you've returned order to mine.",
                options: []
            }
        },
        unlocksMemory: "memory-2",
        unlocksBirdForm: null
    },
    "elder-raven": {
        name: "Elder Raven",
        greeting: "Few find their way to me. You must be special indeed.",
        dialogues: {
            "start": {
                text: "I am the keeper of the Ancient Tree's wisdom. What do you seek among its branches?",
                options: [
                    { text: "I've lost my memories.", next: "memories" },
                    { text: "The owl sent me.", next: "owl" },
                    { text: "I'm seeking a special ability.", next: "ability" }
                ]
            },
            "memories": {
                text: "Ah, memories are like leaves - they fall away in life's autumn but nourish our roots nonetheless. The Tree may help you, if you prove worthy.",
                options: [
                    { text: "How can I prove myself?", next: "test" },
                    { text: "What happened to my memories?", next: "explanation" }
                ]
            },
            "owl": {
                text: "The Wise Owl does not send birds here lightly. You must have shown great potential or great need.",
                options: [
                    { text: "Both, I think.", next: "both" },
                    { text: "I need to recover my memories.", next: "memories" }
                ]
            },
            "ability": {
                text: "The Tree grants gifts to those who understand its nature. Each form you take reflects a truth you've embraced.",
                options: [
                    { text: "What form might I earn here?", next: "form-hint" },
                    { text: "I'm ready for any challenge.", next: "test" }
                ]
            },
            "test": {
                text: "To commune with the Ancient Tree, you must build a nest within its branches that honors both its strength and flexibility.",
                options: [
                    { text: "I'll begin the nest-building.", next: "start-puzzle" },
                    { text: "Can you give me a hint?", next: "hint" }
                ]
            },
            "explanation": {
                text: "Sometimes when the spirit experiences great shock or change, it protects itself by hiding memories away. Yours are scattered but not gone.",
                options: [
                    { text: "Will I ever remember everything?", next: "hope" },
                    { text: "Let me try the Tree's test.", next: "test" }
                ]
            },
            "both": {
                text: "Indeed. I see both the wound of loss and the strength of purpose in your eyes. The Tree responds to authenticity above all.",
                options: [
                    { text: "I'm ready to be tested.", next: "test" }
                ]
            },
            "form-hint": {
                text: "The Tree values those who can rise above challenges and see from new perspectives. Perhaps a form that carries you higher...",
                options: [
                    { text: "A form for gliding?", next: "glider-hint" },
                    { text: "Let me try the test first.", next: "test" }
                ]
            },
            "hint": {
                text: "Consider that a nest must withstand both calm days and storms. It must be anchored yet flexible, sheltering yet open to the sky.",
                options: [
                    { text: "I think I understand now.", next: "start-puzzle" }
                ]
            },
            "hope": {
                text: "The path of remembering is different for each bird. Some recover every memory, others find new ones more precious than those lost.",
                options: [
                    { text: "That's comforting, in a way.", next: "test" }
                ]
            },
            "glider-hint": {
                text: "Yes! The Swift Glider form allows one to ride the currents between worlds, seeing connections others miss.",
                options: [
                    { text: "I'll earn this form.", next: "test" }
                ]
            },
            "success": {
                text: "Remarkable! Your nest honors the Tree's wisdom perfectly. Feel how the branches reach out to you now...",
                options: [
                    { text: "I feel... something changing...", next: "transformation" }
                ]
            },
            "transformation": {
                text: "The Tree bestows upon you the Swift Glider form. May it carry you to places beyond reach and perspectives beyond imagination.",
                options: [
                    { text: "Thank you, Elder Raven.", next: "end" }
                ]
            },
            "end": {
                text: "Our paths will cross again, memory-seeker. The Tree has marked you as a friend.",
                options: []
            }
        },
        unlocksMemory: "memory-4",
        unlocksBirdForm: "swift-glider"
    },
    "kingfisher": {
        name: "Darting Kingfisher",
        greeting: "Well, well! A visitor to my river! *splashes water*",
        dialogues: {
            "start": {
                text: "Welcome to the Flowing River! Not many birds come here except to drink. What brings you to my waters?",
                options: [
                    { text: "I'm searching for lost memories.", next: "memories" },
                    { text: "Just exploring the area.", next: "exploring" },
                    { text: "Your colors are beautiful.", next: "compliment" }
                ]
            },
            "memories": {
                text: "Lost memories? The river knows something about that! Water remembers everything it touches, you know.",
                options: [
                    { text: "Can the river help me remember?", next: "river-help" },
                    { text: "That sounds like a myth.", next: "skeptical" }
                ]
            },
            "exploring": {
                text: "A fellow adventurer! I've mapped every bend and pool of this river. Would you like to discover its secret place?",
                options: [
                    { text: "What secret place?", next: "secret" },
                    { text: "Maybe another time.", next: "later" }
                ]
            },
            "compliment": {
                text: "*preens feathers proudly* Thank you! The river gave me these colors. I give it my loyalty in return. We have a special bond.",
                options: [
                    { text: "The river gave you colors?", next: "river-magic" },
                    { text: "I wish I had your confidence.", next: "confidence" }
                ]
            },
            "river-help": {
                text: "Indeed! But you must prove yourself worthy by completing the Stone-Hopping challenge. The river only shares its secrets with the nimble!",
                options: [
                    { text: "What's the Stone-Hopping challenge?", next: "challenge-explain" },
                    { text: "I'm ready to try.", next: "start-puzzle" }
                ]
            },
            "skeptical": {
                text: "Ha! The river doesn't care if you believe. Its memory flows whether you acknowledge it or not. But prove yourself, and you'll see.",
                options: [
                    { text: "How do I prove myself?", next: "challenge-explain" },
                    { text: "I'll take your word for it.", next: "later" }
                ]
            },
            "secret": {
                text: "There's a pool beneath the waterfall where the river speaks most clearly. But you can only reach it by hopping across the shifting stones!",
                options: [
                    { text: "Sounds dangerous.", next: "danger" },
                    { text: "I'd like to try.", next: "challenge-explain" }
                ]
            },
            "later": {
                text: "The river will be here when you're ready. It's been flowing for countless seasons and will flow for countless more.",
                options: [
                    { text: "Actually, I'm interested now.", next: "challenge-explain" },
                    { text: "Thank you for understanding.", next: "end" }
                ]
            },
            "river-magic": {
                text: "When I was young and gray, I saved a water sprite from a predator. The river blessed me with these colors as thanks. Magic exists if you look for it!",
                options: [
                    { text: "Perhaps it can help me too.", next: "river-help" },
                    { text: "What a wonderful story.", next: "end" }
                ]
            },
            "confidence": {
                text: "Confidence comes from knowing your purpose! Mine is to guard the river. What's yours, I wonder?",
                options: [
                    { text: "To recover my memories.", next: "memories" },
                    { text: "I'm still figuring that out.", next: "figuring" }
                ]
            },
            "challenge-explain": {
                text: "You must hop across seven stones to reach the far side. But beware! Some stones sink when touched. Watch the ripples to guess which are stable.",
                options: [
                    { text: "I accept the challenge.", next: "start-puzzle" },
                    { text: "Any hints?", next: "hint" }
                ]
            },
            "danger": {
                text: "Life without risk is no life at all! But don't worry - the river is gentle here. Worst case, you get a little wet!",
                options: [
                    { text: "You're right. I'll try.", next: "start-puzzle" },
                    { text: "I'll think about it.", next: "end" }
                ]
            },
            "figuring": {
                text: "A noble journey in itself! Perhaps the river can help clear your mind, as it has cleared mine countless times.",
                options: [
                    { text: "I'd like that.", next: "challenge-explain" }
                ]
            },
            "hint": {
                text: "Look for small circles in the water around each stone. Three circles means danger! One means safety. Trust your instincts!",
                options: [
                    { text: "Thank you for the hint.", next: "start-puzzle" }
                ]
            },
            "success": {
                text: "Magnificent! You've made it across! Few birds master the stones so quickly. Now follow me to the speaking pool.",
                options: [
                    { text: "Lead the way.", next: "reward" }
                ]
            },
            "reward": {
                text: "Listen... the waterfall whispers your story. Something about bathing in these waters long ago, feeling renewed...",
                options: [
                    { text: "The River's Song...", next: "memory-unlock" }
                ]
            },
            "memory-unlock": {
                text: "Yes! The river remembers you! And with this memory, I sense you've gained the strength to hop as I do. A new form awakens in you!",
                options: [
                    { text: "I feel stronger already!", next: "end" }
                ]
            },
            "end": {
                text: "Visit again anytime! The river and I will be here, watching the world flow by, one splash at a time!",
                options: []
            }
        },
        unlocksMemory: "memory-5",
        unlocksBirdForm: "strong-hopper"
    }
};

/**
 * Puzzle definitions
 */
const puzzles = {
    "feather-sorting": {
        name: "Feather Sorting",
        description: "Help the Bluejay sort feathers from lightest to darkest blue.",
        instructions: "Drag and drop the feathers to arrange them in order from lightest to darkest shade.",
        difficulty: 1,
        type: "sorting",
        data: [
            { id: "feather1", color: "#D4E5F7", order: 1 },
            { id: "feather2", color: "#A9C6EF", order: 2 },
            { id: "feather3", color: "#77A5E0", order: 3 },
            { id: "feather4", color: "#4D85D1", order: 4 },
            { id: "feather5", color: "#2B6CC9", order: 5 }
        ]
    },
    "nest-building": {
        name: "Nest Building",
        description: "Build a nest that honors the Ancient Tree's wisdom.",
        instructions: "Select materials and arrange them to create a nest that is both strong and flexible.",
        difficulty: 2,
        type: "construction",
        data: {
            materials: [
                { id: "twigs", name: "Twigs", strength: 3, flexibility: 1 },
                { id: "grass", name: "Grass", strength: 1, flexibility: 3 },
                { id: "leaves", name: "Leaves", strength: 1, flexibility: 2 },
                { id: "moss", name: "Moss", strength: 2, flexibility: 2 },
                { id: "feathers", name: "Feathers", strength: 1, flexibility: 3 },
                { id: "mud", name: "Mud", strength: 3, flexibility: 1 }
            ],
            goal: {
                minStrength: 7,
                minFlexibility: 7
            }
        }
    },
    "stone-hopping": {
        name: "Stone Hopping",
        description: "Cross the river by hopping on the stable stones.",
        instructions: "Click on stones to hop across. Watch the ripples to identify stable stones.",
        difficulty: 2,
        type: "pathfinding",
        data: {
            path: [
                [0, 1, 0],
                [1, 0, 1],
                [0, 1, 0],
                [1, 0, 1]
            ],
            hints: true
        }
    },
    "bird-call": {
        name: "Bird Call Mimicry",
        description: "Mimic the call pattern to communicate with forest birds.",
        instructions: "Listen to the pattern, then repeat it by clicking the buttons in the correct order.",
        difficulty: 1,
        type: "memory",
        data: {
            patterns: [
                ["high", "low", "high", "high"],
                ["low", "low", "high", "low"],
                ["high", "high", "low", "high"]
            ],
            currentLevel: 0
        }
    }
};

/**
 * Bird forms with their abilities
 */
const birdForms = {
    "small-bird": {
        name: "Small Bird",
        description: "Your original form. Agile but fragile.",
        ability: "Can fit through narrow spaces.",
        icon: "🐦"
    },
    "swift-glider": {
        name: "Swift Glider",
        description: "A form with extended wings for gliding.",
        ability: "Can glide over gaps and water.",
        icon: "🕊️"
    },
    "strong-hopper": {
        name: "Strong Hopper",
        description: "A form with powerful legs.",
        ability: "Can hop to reach higher places.",
        icon: "🦜"
    },
    "melodic-singer": {
        name: "Melodic Singer",
        description: "A form with a beautiful voice.",
        ability: "Can sing to affect the environment.",
        icon: "🐤"
    },
    "night-owl": {
        name: "Night Owl",
        description: "A form adapted to darkness.",
        ability: "Can see in the dark and fly silently.",
        icon: "🦉"
    }
};

/**
 * Memory entries that can be collected
 */
const memoryEntries = [
    {
        id: "memory-1",
        title: "First Flight",
        content: "I remember now... the first time I took flight. The wind beneath my wings, the exhilaration of freedom. My family watched proudly as I soared above our nest.",
        area: "meadow"
    },
    {
        id: "memory-2",
        title: "The Great Storm",
        content: "The storm came without warning. Lightning split the sky, and winds scattered our flock. That was when I lost my way... and my memories began to fade.",
        area: "forest"
    },
    {
        id: "memory-3",
        title: "The Kind Stranger",
        content: "There was a bird with azure feathers who showed me the way when I was lost. They sang a song that still echoes in my mind, though I cannot recall their name.",
        area: "forest"
    },
    {
        id: "memory-4",
        title: "The Ancient Tree",
        content: "The elders spoke of a tree older than time itself. Its branches reached for the stars, and its roots knew the secrets of the earth. I found solace in its hollow once.",
        area: "ancient-tree"
    },
    {
        id: "memory-5",
        title: "The River's Song",
        content: "Water rushing over smooth stones, creating music unlike any bird could sing. I bathed in those waters and felt renewed. The river taught me patience.",
        area: "river"
    }
];