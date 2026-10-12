/**
 * The Living Archive — Literary Entries
 * A curated collection of original poems, essays, letters, and short stories
 * interconnected by shared emotional currents.
 *
 * Data shape:
 * {
 *   id: string,
 *   title: string,
 *   category: 'poem' | 'essay' | 'letter' | 'story',
 *   author: string,
 *   isAnonymous: boolean,
 *   themes: string[],
 *   excerpt: string,
 *   body: string,
 *   readingTime: string,
 *   featured: boolean
 * }
 */

export const INITIAL_ENTRIES = [
  {
    id: 'salt-and-juniper',
    title: 'Salt and Juniper',
    category: 'poem',
    author: 'Elena Vance',
    isAnonymous: false,
    themes: ['Longing', 'Memory', 'Home'],
    excerpt: 'The kitchen clock still ticks in the dialect of coastal rain, measuring what was left behind on the sill.',
    body: `The kitchen clock still ticks in the dialect of coastal rain,
measuring what was left behind on the sill:
a jar of stones smoothed down by waves,
a sprig of dried juniper, brittle as quiet breath.

You said that leaving is just a slower way of keeping.
I held my palms against the cedar counter,
feeling the grain where twenty winters carved their cold.

Out on the inlet, the ferry horn groans twice—
an iron throat parting the salt mist.
We are always standing by water,
waiting for something we once had
to float back disguised as drift.`,
    readingTime: '2 min read',
    featured: true
  },
  {
    id: 'letter-to-the-window-at-dusk',
    title: 'Letter to the Window at Dusk',
    category: 'letter',
    author: 'Anonymous',
    isAnonymous: true,
    themes: ['Longing', 'Solitude', 'Memory'],
    excerpt: 'I never told you that I watched your train pull out of Platform Four until the red tail-lights folded into the rain.',
    body: `November 14

I never told you that I watched your train pull out of Platform Four until the red tail-lights folded into the rain.

I stood beside the newsagent kiosk pretending to read the evening papers, but really I was memorizing the gray collar of your wool coat as you turned toward Carriage C. There is a peculiar cowardice in letting people depart without the true weight of a sentence. We shook hands. Imagine that—shaking hands after three years of sharing cold tea at three in the morning and talking through the fractures in our lives.

The room is very quiet this evening. The lamp gives off that warm amber hum you used to say smelled like old paperbacks. I keep thinking that if I leave the hallway light burning, it might somehow illuminate the road you are traveling on, even though you are already four hundred miles north, in an apartment that smells of fresh plaster and strange rain.

I hope you unpack your books first. I hope the window looks out on something green, even in winter.`,
    readingTime: '3 min read',
    featured: true
  },
  {
    id: 'the-architecture-of-departure',
    title: 'The Architecture of Departure',
    category: 'essay',
    author: 'Julian Cross',
    isAnonymous: false,
    themes: ['Home', 'Belonging', 'Grief'],
    excerpt: 'When an old house is emptied, sound behaves differently. The corners relinquish the small mufflings of rugs and coats.',
    body: `When an old house is emptied, sound behaves differently. The corners relinquish the small mufflings of rugs and coats, and suddenly every step carries the reverberation of a chapel.

Last Tuesday, we carried the mahogany dining table down the narrow staircase. For forty years, that table bore the ink stains of my father's tax returns, the flour dust of holiday loaves, and the circular watermarks left by glasses set down in haste during heated political debates. Without it, the floorboards beneath looked shockingly pale, preserved in amber sunlight while the rest of the pine had oxidized into deep chestnut.

We speak of grief as an internal climate—a fog or an undertow—yet it is fundamentally spatial. Grief is the sudden excess of room in a room. It is the unneeded chair at breakfast, the doorway through which no one brushes past your shoulder with an apology.

To belong to a place is not merely to possess its keys; it is to have your daily rituals inscribed into its plaster. When we closed the front door for the last time and handed the iron key to a young couple whose children were already racing down the gravel driveway, I realized that home is not what shelters you. It is what you allow to bear witness to your undoing.`,
    readingTime: '4 min read',
    featured: true
  },
  {
    id: 'the-moth-in-the-conservatory',
    title: 'The Moth in the Conservatory',
    category: 'story',
    author: 'Clara M. Lin',
    isAnonymous: false,
    themes: ['Solitude', 'Freedom', 'Becoming'],
    excerpt: 'At twenty-eight, Margaret took a room above a botanical greenhouse in the dampest district of the city.',
    body: `At twenty-eight, Margaret took a room above a botanical greenhouse in the dampest district of the city. Her relatives sent polite, anxious letters on heavy parchment, inquiring after her plans, which she filed unread inside a hollowed-out dictionary under the letter V.

By day, she worked beneath the rib-vaulted glass, misting the velvet fronds of staghorn ferns and checking soil acidity with copper probes. The air smelled of wet slate, decomposing humus, and crushed lime leaves. It was an environment that asked nothing of her except attentiveness.

One evening in late October, after the boilers had clicked off and the mercury had plunged outside, she found an atlas moth clinging to the underside of an iron crossbeam. Its wings were the size of dinner plates, marked with translucent triangular windows through which the gray sky showed faintly.

It did not move when she held her palm beneath its legs. It simply shifted its weight, tiny claws gripping the callus on her index finger, its antennae trembling in the draft from the cracked skylight.

Margaret stood under the high glass dome for an hour, balancing the creature in the stillness. In the city she had fled, every hour had been a debt owed to someone else's expectations. Here, in the dim emerald dark, she was neither daughter nor bride nor disappointment. She was merely an arm of warm bone in a house of ferns, holding something that was waiting for nightfall to begin.`,
    readingTime: '5 min read',
    featured: false
  },
  {
    id: 'inheritance-of-sparrows',
    title: 'Inheritance of Sparrows',
    category: 'poem',
    author: 'Arlo Finch',
    isAnonymous: false,
    themes: ['Grief', 'Memory', 'Becoming'],
    excerpt: 'We divided the blue willow teacups by lottery and left his garden boots by the cellar steps to gather moss.',
    body: `We divided the blue willow teacups by lottery
and left his garden boots by the cellar steps to gather moss.

The sparrows don't know the hand that flung the oats
has stopped shaking in the kitchen.
They dive between the apple boughs as always,
quarreling over chaff, their small gray bellies
flashing like coins in the late frost.

Who teaches a child that things outlive their masters?
The wool cardigan on the coat hook
still carries the cedar-shavings and pipe smoke,
stubbornly holding the bend of an elbow
long after the bone has gone to clay.

I put my hands in his pockets.
A piece of string. A brass washer.
Two beech nuts smooth as glass.
These were his wealth.
These are what I inherit:
the patience to carry small, useless things
against the cold.`,
    readingTime: '2 min read',
    featured: false
  },
  {
    id: 'unsent-to-the-curator',
    title: 'Unsent: To the Curator of Antiquities',
    category: 'letter',
    author: 'Anonymous',
    isAnonymous: true,
    themes: ['Memory', 'Belonging', 'Longing'],
    excerpt: 'You label the Roman oil lamp as everyday pottery, but you never mention the thumbprint baked into the clay at the rim.',
    body: `To the Department of Greek & Roman Antiquities,

Room 14, Case 3, Item 892-B.

You label the Roman oil lamp as "Everyday terracotta lamp, 1st Century CE, workshop of Fortis." You list its dimensions, its provenance from the silt of the Tiber, and the chemical composition of its slip.

What your catalog ignores is the shallow indentation near the spout: an artisan’s thumbprint, pressed into the wet clay before the lamp was carried to the kiln.

Two thousand years ago, someone was working under the evening bell in an open-air workshop smelling of cedar smoke and river reeds. Their thumb slipped against the rim. Perhaps they cursed quietly under their breath; perhaps their child called from the street, and they turned their head without wiping the clay smooth.

I come to your gallery on Tuesdays when the rain keeps the tourists away, and I press my forehead against the glass. I have spent the last six years trying to find a place where my own small marks on the world might be kept with such quiet dignity. We spend our lives terrified of being forgotten, yet the only things that truly endure are the accidents.

Keep the glass clean. Some of us are looking at the dust, not the gold.`,
    readingTime: '3 min read',
    featured: true
  },
  {
    id: 'the-solitary-cartographer',
    title: 'The Solitary Cartographer',
    category: 'essay',
    author: 'Sybilla Thorne',
    isAnonymous: false,
    themes: ['Solitude', 'Freedom', 'Memory'],
    excerpt: 'Maps drawn before the invention of the chronometer were full of polite apologies masquerading as illustrations.',
    body: `Maps drawn before the invention of the chronometer were full of polite apologies masquerading as illustrations. Where the surveyor had not walked, he drew sea serpents with curling crests or banners announcing "Terra Incognita."

Solitude is the modern equivalent of those unmapped coastlines. We are bombarded with demands to connect, to sync, to broadcast our whereabouts and emotional statuses into a digital ether that never sleeps. To step into deliberate solitude is to voluntarily decline the compass.

For seven months, while writing in an unheated stone bothy on the Isle of Mull, I kept no clock. Time was measured by the chimney draft and the arrival of gannets plunging into the gray chop of the sound. At first, the silence had teeth—it chewed at the edges of my vanity, demanding to know why no one was listening to me.

Then, around the fourth week, the silence changed from an absence into a presence. It became an old linen sheet, heavy and cool against the skin.

True solitude does not isolate you from the world; it strips away the performance of living so that the world can finally enter on its own terms. When the wind struck the slate roof at midnight, it was no longer a sound happening to me. It was simply the weather of the earth, sovereign and indifferent.`,
    readingTime: '4 min read',
    featured: false
  },
  {
    id: 'fugue-for-leaving',
    title: 'Fugue for Leaving',
    category: 'poem',
    author: 'Mateo R. Reyes',
    isAnonymous: false,
    themes: ['Freedom', 'Longing', 'Becoming'],
    excerpt: 'Pack only what fits beneath the seat of a third-class carriage: two notebooks, a wool muffler, and the refusal to apologize.',
    body: `Pack only what fits beneath the seat of a third-class carriage:
two notebooks, a wool muffler,
and the refusal to apologize.

Behind you, the city folds its soot-stained napkins.
The avenues you walked with shoes too tight,
the parlor chairs where you learned to swallow your tongue—
let the street sweepers have them.

There is a clean terror in moving at seventy miles an hour
through fields where cattle stand knee-deep in fog.
No one on this train knows the names you were called as a child.
No one knows the promise you broke at dawn.

The conductor punches a hole in your ticket.
A tiny circle of card falls to the sawdust floor.
That hole is the shape of tomorrow:
empty, round,
and admitting the entire sky.`,
    readingTime: '2 min read',
    featured: false
  },
  {
    id: 'the-bread-of-strangers',
    title: 'The Bread of Strangers',
    category: 'story',
    author: 'Hana K. Lindqvist',
    isAnonymous: false,
    themes: ['Belonging', 'Home', 'Memory'],
    excerpt: 'The bakery on Rue des Vinaigriers opened at dawn, but Mr. Vane had already been kneading the rye since three.',
    body: `The bakery on Rue des Vinaigriers opened at dawn, but Mr. Vane had already been kneading the rye since three. His forearms were dusted in white flour like an apprentice plasterer, and around his neck hung a small iron key on twine.

Miriam arrived when the streetlamps were still flickering against the pale blue morning. She had lived in the neighborhood for eleven days, speak-less in French save for "merci" and "s'il vous plaît," carrying her displacement like a fragile porcelain cup in her coat pocket.

She pointed to the dark loaf with the cross cut into its crust.

Mr. Vane did not simply wrap the bread in wax paper. He paused, tapped the bottom with his thumb—a dull, hollow thud that proclaimed it well-baked—and then sliced off the crisp heel with a serrated knife. He dipped it into a saucer of coarse olive oil and handed it to her across the glass counter.

"Mange," he said gently, without ceremony.

Miriam chewed the crust. It was sour, dark, and tasted faintly of wood smoke. It was nothing like the sweet braided brioche of her grandmother's kitchen in Odesa, yet as the warm crumbs melted against her tongue, the tight knot beneath her ribs released.

To belong to a city does not require speaking its language like an academic. Sometimes it only requires accepting food from someone who knows that every stranger was once cast out of a garden.`,
    readingTime: '4 min read',
    featured: false
  },
  {
    id: 'a-ledger-of-omissions',
    title: 'A Ledger of Omissions',
    category: 'essay',
    author: 'Dr. Arthur Sterling',
    isAnonymous: false,
    themes: ['Grief', 'Longing', 'Solitude'],
    excerpt: 'In the archives of the Royal Geographical Society, the most revealing documents are often the logbooks where pages have been razored out.',
    body: `In the archives of the Royal Geographical Society, the most revealing documents are often the logbooks where pages have been razored out with a scalpel. An expedition leader, returning from the Antarctic pack ice or the fever-ridden tributaries of the Congo, would sit at an Admiralty desk and excise what was deemed unpalatable: the descent into mutiny, the confession of terror, the nights when grown men wept into their tallow biscuits.

We conduct the same archival curation on our own hearts.

Look back through the letters you have kept in ribbons in the back of your bureau drawer. Notice how you preserved the affirmations—the notes that praise your wit, your reliability, your charm—while throwing into the fireplace the letters that named your cruelties or your sudden withdrawals.

We curate a myth of our past to make our present tolerable. But what is left unwritten has its own gravitational pull.

I think of the sentences I choked back at dinner tables: the "I don't love you anymore" that became "Please pass the salt"; the "Don't leave me alone in this house" that turned into "Drive carefully on the bridge." These suppressed sentences do not evaporate into the ether. They seep into the floorboards. They become the ghosts that make old rooms groan when the temperature drops.`,
    readingTime: '4 min read',
    featured: true
  },
  {
    id: 'thresholds-and-tenderness',
    title: 'Thresholds and Tenderness',
    category: 'poem',
    author: 'Mira Sen',
    isAnonymous: false,
    themes: ['Belonging', 'Home', 'Becoming'],
    excerpt: 'You do not enter a new country on the day your passport is stamped; you enter it on the morning you stop converting currency in your head.',
    body: `You do not enter a new country
on the day your passport is stamped;
you enter it on the morning
you stop converting currency in your head.

You enter it when the kettle sings
and you know which burner takes three turns to catch.
You enter it when the grocer
does not ask where you are from,
only if you want the plums from the orchard near the canal.

Home is not the soil where your ancestors are buried;
it is the floor you sweep with your own hands
until the bristles know every knot in the oak.

We build our lives in the doorways between languages,
translating our mothers' prayers
into whispers the cold rain can understand.`,
    readingTime: '2 min read',
    featured: false
  },
  {
    id: 'the-anatomy-of-a-bird-skeleton',
    title: 'The Anatomy of a Bird Skeleton',
    category: 'essay',
    author: 'Clara M. Lin',
    isAnonymous: false,
    themes: ['Freedom', 'Grief', 'Becoming'],
    excerpt: 'To fly requires hollow bones. Nature does not grant ascension without first demanding that you empty yourself of density.',
    body: `In comparative osteology, the bird skeleton is a masterwork of radical sacrifice. The bones of a swift or an albatross are not solid like the femur of an ox; they are honeycombed with air sacs, paper-thin trabeculae that provide structural rigidity with almost zero mass.

To fly requires hollow bones. Nature does not grant ascension without first demanding that you empty yourself of density.

For years, I believed that strength was defined by accumulation: accumulating qualifications, obligations, furniture, relationships that functioned as emotional ballast against the unpredictability of fate. I wanted to be an oak: immovable, rooted, deep-ringed.

It took the sudden death of my brother in an avalanche to understand the trap of ballast. When grief stripped away my certainty, I discovered that what I had called stability was actually captivity. I had loaded myself with so much lead that even the gentlest thermal breeze could not lift me.

Becoming free is not a celebratory leap into the sunlight. It is the painful, surgical process of hollowing out the interior struts until you are light enough to be carried by the wind. It hurts to empty yourself. But once the hollows are clean, the air has somewhere to sing.`,
    readingTime: '3 min read',
    featured: false
  },
  {
    id: 'notes-from-the-attic-study',
    title: 'Notes from the Attic Study',
    category: 'poem',
    author: 'Julian Cross',
    isAnonymous: false,
    themes: ['Solitude', 'Memory', 'Longing'],
    excerpt: 'The roof slates rattle like iron teeth when the gale turns south across the estuary.',
    body: `The roof slates rattle like iron teeth
when the gale turns south across the estuary.

Up here, between the chimney stack and the dormer,
I have arranged my secular cathedral:
twelve stacks of unread pamphlets,
a brass telescope with a cracked objective lens,
and the silence that follows an answered letter.

Downstairs, the clocks are busy with their schedules,
insisting that Tuesday must become Wednesday.
Up here under the eaves,
an hour is just the shadow of a cloud
passing slowly across the Persian rug.

If you come looking for me,
listen for the scratching of steel on rag paper.
I am writing down the names of all the places
we planned to visit
and will never see.`,
    readingTime: '2 min read',
    featured: false
  },
  {
    id: 'the-bell-in-the-marsh',
    title: 'The Bell in the Marsh',
    category: 'story',
    author: 'Mateo R. Reyes',
    isAnonymous: false,
    themes: ['Belonging', 'Solitude', 'Grief', 'Home'],
    excerpt: 'In the sunken church of Saint Jude-in-the-Fen, the tide rose twice a day through the shattered stained glass of the chancel.',
    body: `In the sunken church of Saint Jude-in-the-Fen, the tide rose twice a day through the shattered stained glass of the chancel. By four in the afternoon, the water would lap against the limestone altar, carrying floating weed, water-beetles, and the cold salt smell of the Wash.

Father Thomas lived in the stone cottage on the levee. He had not celebrated a congregation mass in thirteen years, since the sea defenses broke and the parish took their cattle inland to higher pastures. Yet every evening at dusk, when the mudflats turned the color of bruised plums, he pulled on his wading boots and made his way along the wooden causeway to the bell tower.

The rope was thick hemp, green with slime at its lower tail.

He pulled three times. The bronze bell, cast in Norwich in 1642, rang out across five miles of empty salt marsh. Curlews rose from the samphire beds in whistling clouds.

"Who are you ringing for, Father?" a surveyor from the drainage board asked him one afternoon while taking measurements of the silt level. "There's not a soul living within walking distance."

Thomas wiped his hands on his canvas apron.

"A bell isn't only rung to gather the living," he said. "It's rung to let the dead know that someone is still keeping watch over their quiet. As long as the bell strikes, this ground is not abandoned. It is merely waiting."`,
    readingTime: '5 min read',
    featured: true
  }
];

// Helper functions for content querying
export function getAllEntries() {
  return [...INITIAL_ENTRIES];
}

export function getEntryById(id) {
  return INITIAL_ENTRIES.find(entry => entry.id === id) || null;
}

export function getFeaturedEntries() {
  return INITIAL_ENTRIES.filter(entry => entry.featured);
}

export function getEntriesByTheme(themeName) {
  return INITIAL_ENTRIES.filter(entry => 
    entry.themes.some(t => t.toLowerCase() === themeName.toLowerCase())
  );
}

export function getEntriesByCategory(category) {
  return INITIAL_ENTRIES.filter(entry => entry.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedEntries(currentEntry, limit = 3) {
  if (!currentEntry) return [];
  return INITIAL_ENTRIES
    .filter(entry => entry.id !== currentEntry.id)
    .map(entry => {
      // Calculate shared themes score
      const sharedCount = entry.themes.filter(t => currentEntry.themes.includes(t)).length;
      return { entry, score: sharedCount };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.entry);
}

/**
 * Appends a newly submitted entry to the active archive collection.
 * Ready to be swapped with an API fetch/POST in full-stack setups.
 * @param {Object} newEntry
 */
export function addEntry(newEntry) {
  INITIAL_ENTRIES.unshift(newEntry);
  return newEntry;
}

