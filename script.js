import { useState, useEffect } from 'react';
import { Bird, Heart, TreeDeciduous, Flower2, Droplets, Sun, Moon, Egg, MapPin, PlaneTakeoff, Info } from 'lucide-react';

// Bird database with characteristics and habitat requirements
const birdDatabase = [
  {
    name: "Northern Cardinal",
    image: "cardinal",
    description: "Vibrant red bird with distinctive crest and black face mask",
    habitat: "Woodland edges, gardens, shrubby areas",
    diet: "Seeds, fruits, insects",
    nesting: "Dense shrubs, vines, low trees",
    range: "Eastern/Central US",
    migration: "Non-migratory",
    waterNeeds: "Regular water source",
    personalityTraits: ["Bold", "Territorial", "Vocal"],
    gardenTips: [
      "Plant dense shrubs for nesting",
      "Provide sunflower seeds in feeders",
      "Include berry-producing plants",
      "Maintain brush piles for shelter"
    ]
  },
  {
    name: "American Goldfinch",
    image: "goldfinch",
    description: "Bright yellow bird with black wings and forehead",
    habitat: "Open meadows, gardens, fields with thistle",
    diet: "Seeds (especially thistle), some insects",
    nesting: "Shrubs and small trees",
    range: "Across North America",
    migration: "Partial migrant",
    waterNeeds: "Shallow water source",
    personalityTraits: ["Social", "Acrobatic", "Cheerful"],
    gardenTips: [
      "Plant native thistles and coneflowers",
      "Leave seed heads on plants in fall",
      "Provide nyjer/thistle feeders",
      "Include tall grasses and wildflowers"
    ]
  },
  {
    name: "Eastern Bluebird",
    image: "bluebird",
    description: "Sky-blue upperparts with rusty throat and breast",
    habitat: "Open grasslands with scattered trees",
    diet: "Insects, berries, fruits",
    nesting: "Cavities, nesting boxes",
    range: "Eastern/Central US",
    migration: "Partial migrant",
    waterNeeds: "Birdbath or shallow water",
    personalityTraits: ["Gentle", "Family-oriented", "Territorial"],
    gardenTips: [
      "Install bluebird nesting boxes",
      "Maintain open lawn areas for hunting",
      "Plant fruiting shrubs like dogwood",
      "Avoid pesticides to protect insect food sources"
    ]
  },
  {
    name: "Rufous Hummingbird",
    image: "hummingbird",
    description: "Small hummingbird with rusty-orange back and belly",
    habitat: "Forests, gardens with nectar flowers",
    diet: "Nectar, small insects",
    nesting: "Tiny cup nests on tree branches",
    range: "Western North America",
    migration: "Long-distance migrant",
    waterNeeds: "Misting water features",
    personalityTraits: ["Aggressive", "Energetic", "Territorial"],
    gardenTips: [
      "Plant tubular flowers in red and orange",
      "Install hummingbird feeders",
      "Create vertical layers of plants",
      "Provide small perching branches"
    ]
  },
  {
    name: "Black-capped Chickadee",
    image: "chickadee",
    description: "Small bird with black cap and bib, white cheeks",
    habitat: "Deciduous and mixed forests, parks",
    diet: "Insects, seeds, berries",
    nesting: "Cavities in trees, birdhouses",
    range: "Northern US and Canada",
    migration: "Non-migratory",
    waterNeeds: "Fresh water source",
    personalityTraits: ["Curious", "Bold", "Intelligent"],
    gardenTips: [
      "Include coniferous and deciduous trees",
      "Provide suet and black oil sunflower seeds",
      "Install chickadee-sized nest boxes",
      "Create brush piles for shelter"
    ]
  },
  {
    name: "American Robin",
    image: "robin",
    description: "Gray-brown bird with warm orange underparts",
    habitat: "Lawns, parks, woodlands, gardens",
    diet: "Earthworms, insects, fruits, berries",
    nesting: "Trees, shrubs, on structures",
    range: "Throughout North America",
    migration: "Partial migrant",
    waterNeeds: "Birdbath or shallow water",
    personalityTraits: ["Adaptable", "Early riser", "Industrious"],
    gardenTips: [
      "Maintain some open lawn areas",
      "Plant fruit-bearing trees and shrubs",
      "Provide platform bird baths",
      "Include trees for nesting sites"
    ]
  },
  {
    name: "Barn Swallow",
    image: "swallow",
    description: "Dark blue-black above with rusty throat and forehead",
    habitat: "Open areas near structures, farmland",
    diet: "Flying insects",
    nesting: "Mud nests on structures",
    range: "North America, summer",
    migration: "Long-distance migrant",
    waterNeeds: "Mud puddles, water sources",
    personalityTraits: ["Aerial acrobat", "Social", "Fast"],
    gardenTips: [
      "Install nesting shelves under eaves",
      "Create mud puddles for nest building",
      "Avoid pesticides to protect insect populations",
      "Provide open flying space"
    ]
  },
  {
    name: "Cedar Waxwing",
    image: "waxwing",
    description: "Sleek, crested bird with subtle brown and yellow coloring",
    habitat: "Woodland edges, orchards, gardens",
    diet: "Fruits, berries, insects",
    nesting: "Trees, preferably near water",
    range: "North America",
    migration: "Nomadic, following fruit sources",
    waterNeeds: "Clean water source",
    personalityTraits: ["Social", "Gentle", "Nomadic"],
    gardenTips: [
      "Plant berry-producing trees and shrubs",
      "Include serviceberry, dogwood, and cedar",
      "Create vertical layers of vegetation",
      "Provide water features"
    ]
  },
  {
    name: "Baltimore Oriole",
    image: "oriole",
    description: "Brilliant orange and black with white wing bars",
    habitat: "Open woodlands, river corridors, parklands",
    diet: "Insects, fruits, nectar",
    nesting: "Hanging pouch nests in tall trees",
    range: "Eastern/Central North America",
    migration: "Long-distance migrant",
    waterNeeds: "Bird bath or water source",
    personalityTraits: ["Colorful", "Musical", "Skilled nest builder"],
    gardenTips: [
      "Plant tall deciduous trees like elms",
      "Include fruit-bearing plants like cherries",
      "Hang orange halves as feeders",
      "Plant nectar-rich flowers"
    ]
  },
  {
    name: "Dark-eyed Junco",
    image: "junco",
    description: "Slate-gray above with white belly and white outer tail feathers",
    habitat: "Coniferous forests, woodland edges",
    diet: "Seeds, insects",
    nesting: "Ground or low shrubs",
    range: "North America",
    migration: "Altitudinal or short-distance migrant",
    waterNeeds: "Ground-level water source",
    personalityTraits: ["Ground forager", "Adaptable", "Social"],
    gardenTips: [
      "Create ground-level bird baths",
      "Include coniferous trees and shrubs",
      "Scatter seed on ground feeding areas",
      "Leave leaf litter in some areas"
    ]
  },
  {
    name: "Downy Woodpecker",
    image: "woodpecker",
    description: "Small woodpecker with black and white pattern, males have red patch",
    habitat: "Woodlands, parks, residential areas",
    diet: "Insects, some seeds and fruits",
    nesting: "Tree cavities",
    range: "Throughout North America",
    migration: "Non-migratory",
    waterNeeds: "Water source",
    personalityTraits: ["Industrious", "Acrobatic", "Persistent"],
    gardenTips: [
      "Leave dead tree snags when safe",
      "Install woodpecker nest boxes",
      "Provide suet feeders",
      "Plant native trees and shrubs"
    ]
  },
  {
    name: "Purple Martin",
    image: "martin",
    description: "Large swallow, males are glossy blue-black",
    habitat: "Open areas near water",
    diet: "Flying insects",
    nesting: "Colonial nest boxes",
    range: "Eastern and Central North America",
    migration: "Long-distance migrant",
    waterNeeds: "Nearby water source",
    personalityTraits: ["Social", "Colonial", "Aerial"],
    gardenTips: [
      "Install purple martin houses in open areas",
      "Locate near water if possible",
      "Maintain open flying space",
      "Avoid pesticides to protect insect populations"
    ]
  }
];

// Garden element database
const gardenElements = [
  {
    category: "Trees",
    items: [
      { name: "Oak", benefits: ["Provides habitat for many birds", "Acorns for food"], zones: "3-9" },
      { name: "Pine", benefits: ["Evergreen shelter", "Seeds for finches and chickadees"], zones: "3-8" },
      { name: "Maple", benefits: ["Nesting sites", "Attracts insects for food"], zones: "3-9" },
      { name: "Dogwood", benefits: ["Berries for birds", "Nesting sites"], zones: "5-9" },
      { name: "Crabapple", benefits: ["Persistent fruit for winter", "Spring blossoms attract insects"], zones: "4-8" },
      { name: "Birch", benefits: ["Seeds for finches", "Attracts insects in bark"], zones: "2-7" }
    ]
  },
  {
    category: "Shrubs",
    items: [
      { name: "Serviceberry", benefits: ["Berries for birds", "Early season food"], zones: "3-9" },
      { name: "Elderberry", benefits: ["Abundant berries", "Attracts insects"], zones: "3-9" },
      { name: "Holly", benefits: ["Winter berries", "Dense shelter"], zones: "5-9" },
      { name: "Viburnum", benefits: ["Berries", "Nesting sites"], zones: "2-9" },
      { name: "Arrowwood", benefits: ["Fall berries", "Dense cover"], zones: "3-8" },
      { name: "Juniper", benefits: ["Evergreen cover", "Berries"], zones: "3-9" }
    ]
  },
  {
    category: "Perennials",
    items: [
      { name: "Coneflower", benefits: ["Seeds for finches", "Attracts insects"], zones: "3-9" },
      { name: "Bee Balm", benefits: ["Nectar for hummingbirds", "Seeds for finches"], zones: "4-9" },
      { name: "Black-eyed Susan", benefits: ["Seeds for songbirds", "Attracts insects"], zones: "3-9" },
      { name: "Salvia", benefits: ["Nectar for hummingbirds", "Long blooming season"], zones: "4-9" },
      { name: "Sunflower", benefits: ["Seeds for many birds", "Attracts insects"], zones: "3-9" },
      { name: "Aster", benefits: ["Late season nectar", "Seeds for birds"], zones: "3-8" }
    ]
  },
  {
    category: "Water Features",
    items: [
      { name: "Bird Bath", benefits: ["Drinking water", "Bathing area"], zones: "All" },
      { name: "Small Pond", benefits: ["Attracts insects", "Water source"], zones: "All" },
      { name: "Fountain", benefits: ["Moving water attracts birds", "Sound mask"], zones: "All" },
      { name: "Mister", benefits: ["Attracts hummingbirds", "Creates humidity"], zones: "All" },
      { name: "Rain Garden", benefits: ["Attracts insects", "Natural water filtration"], zones: "All" },
      { name: "Puddling Area", benefits: ["Mud for nest building", "Mineral source"], zones: "All" }
    ]
  },
  {
    category: "Structures",
    items: [
      { name: "Nest Box", benefits: ["Nesting sites for cavity-nesters", "Protection from predators"], zones: "All" },
      { name: "Brush Pile", benefits: ["Shelter from predators", "Foraging area"], zones: "All" },
      { name: "Snag (Dead Tree)", benefits: ["Insects for food", "Natural cavities"], zones: "All" },
      { name: "Bird Feeder", benefits: ["Supplemental food source", "Observation point"], zones: "All" },
      { name: "Nesting Shelf", benefits: ["Platform for open-nesting birds", "Protected location"], zones: "All" },
      { name: "Bat House", benefits: ["Insect control", "Complementary wildlife"], zones: "All" }
    ]
  }
];

export default function BirdGardenPlanner() {
  const [selectedBird, setSelectedBird] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gardenPlan, setGardenPlan] = useState([]);
  const [activeTab, setActiveTab] = useState('birdInfo');

  // Roll for a random bird
  const rollRandomBird = () => {
    setIsRolling(true);
    
    // Animation effect for rolling
    let counter = 0;
    const max = 10;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * birdDatabase.length);
      setSelectedBird(birdDatabase[randomIndex]);
      counter++;
      
      if (counter >= max) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  // Add a garden element to the plan
  const addToGarden = (item, category) => {
    const newItem = { ...item, category, id: Date.now() };
    setGardenPlan([...gardenPlan, newItem]);
  };

  // Remove a garden element from the plan
  const removeFromGarden = (id) => {
    setGardenPlan(gardenPlan.filter(item => item.id !== id));
  };

  // Icon component to make the UI more visual
  const BirdIcon = ({ type }) => {
    switch(type) {
      case 'habitat': return <TreeDeciduous size={18} />;
      case 'diet': return <Flower2 size={18} />;
      case 'nesting': return <Home size={18} />;
      case 'water': return <Droplets size={18} />;
      case 'migration': return <PlaneTakeoff size={18} />;
      case 'range': return <MapPin size={18} />;
      case 'personality': return <Heart size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50 text-green-900">
      <header className="bg-green-800 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bird size={24} />
          Bird-Friendly Garden Planner
        </h1>
        <p className="text-green-100">Roll a random bird and create a garden suited to its habitat needs</p>
      </header>

      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-auto">
        {/* Bird Selection Section */}
        <div className="md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <div className="text-center mb-6">
            <button 
              onClick={rollRandomBird} 
              disabled={isRolling} 
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full text-lg font-bold flex items-center justify-center gap-2 mx-auto transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {isRolling ? 'Rolling...' : 'Roll Random Bird'}
              <Bird size={20} />
            </button>
          </div>

          {selectedBird && (
            <div className="mt-4">
              <div className="border-b border-green-200 pb-2 mb-4">
                <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
                  <Bird size={20} />
                  {selectedBird.name}
                </h2>
                <p className="text-green-700 italic">{selectedBird.description}</p>
              </div>

              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setActiveTab('birdInfo')}
                  className={`flex-1 py-2 px-4 rounded-t-lg ${activeTab === 'birdInfo' ? 'bg-green-600 text-white' : 'bg-green-100'}`}
                >
                  Bird Info
                </button>
                <button 
                  onClick={() => setActiveTab('gardenTips')}
                  className={`flex-1 py-2 px-4 rounded-t-lg ${activeTab === 'gardenTips' ? 'bg-green-600 text-white' : 'bg-green-100'}`}
                >
                  Garden Tips
                </button>
              </div>

              {activeTab === 'birdInfo' ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <BirdIcon type="habitat" />
                    <div>
                      <h3 className="font-semibold text-green-800">Habitat:</h3>
                      <p>{selectedBird.habitat}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BirdIcon type="diet" />
                    <div>
                      <h3 className="font-semibold text-green-800">Diet:</h3>
                      <p>{selectedBird.diet}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Egg size={18} />
                    <div>
                      <h3 className="font-semibold text-green-800">Nesting:</h3>
                      <p>{selectedBird.nesting}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BirdIcon type="water" />
                    <div>
                      <h3 className="font-semibold text-green-800">Water Needs:</h3>
                      <p>{selectedBird.waterNeeds}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BirdIcon type="migration" />
                    <div>
                      <h3 className="font-semibold text-green-800">Migration:</h3>
                      <p>{selectedBird.migration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BirdIcon type="range" />
                    <div>
                      <h3 className="font-semibold text-green-800">Range:</h3>
                      <p>{selectedBird.range}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BirdIcon type="personality" />
                    <div>
                      <h3 className="font-semibold text-green-800">Personality:</h3>
                      <p>{selectedBird.personalityTraits.join(", ")}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold text-green-800">Garden Tips for {selectedBird.name}:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedBird.gardenTips.map((tip, index) => (
                      <li key={index} className="text-green-700">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Garden Planning Section */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold text-green-800 mb-4">Garden Elements</h2>
            
            <div className="space-y-6">
              {gardenElements.map((category) => (
                <div key={category.category} className="border-b border-green-100 pb-4">
                  <h3 className="font-bold text-green-700 mb-2">{category.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {category.items.map((item) => (
                      <div key={item.name} className="border border-green-200 rounded-md p-3 bg-green-50 hover:bg-green-100">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">{item.name}</h4>
                          <button 
                            onClick={() => addToGarden(item, category.category)}
                            className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm text-green-700">Zones: {item.zones}</p>
                        <ul className="text-sm mt-1">
                          {item.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-green-600">•</span> {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Garden Plan */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <TreeDeciduous size={20} />
              Your Garden Plan {selectedBird && `for ${selectedBird.name}`}
            </h2>
            
            {gardenPlan.length === 0 ? (
              <div className="text-center py-10 text-green-600">
                <p>Your garden plan is empty. Add elements from above to create a bird-friendly habitat.</p>
              </div>
            ) : (
              <div>
                {['Trees', 'Shrubs', 'Perennials', 'Water Features', 'Structures'].map(category => {
                  const categoryItems = gardenPlan.filter(item => item.category === category);
                  if (categoryItems.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-4">
                      <h3 className="font-bold text-green-700 mb-2">{category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {categoryItems.map(item => (
                          <div key={item.id} className="border border-green-200 rounded-md p-3 bg-green-50">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold">{item.name}</h4>
                              <button 
                                onClick={() => removeFromGarden(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-sm"
                              >
                                ×
                              </button>
                            </div>
                            <p className="text-sm text-green-700">Zones: {item.zones}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="bg-green-800 text-white p-2 text-center text-sm">
        Bird-Friendly Garden Planner - Create habitats that attract and support wild birds
      </footer>
    </div>
  );
}