'use strict';

class BloodborneItem {
    constructor(name, use) {
        this.name = this.#capitalize(name);
        this.use = use;
    }

    #capitalize = (phraze) => phraze.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

    showUse = () => console.log(`\n${this.name} ${this.use}.`);
}

class Consumables extends BloodborneItem {
    #maxNoHeld;
    #maxStored;
    #usageType;

    constructor(name, use, maxNoHeld, maxStored) {
        super(name, use);
        this.#maxNoHeld = maxNoHeld;
        this.#maxStored = maxStored;
        this.#usageType = 'finite';
    }

    showDescription = () => console.log(`\n${this.name}`,
        `\n    Max No. held: ${this.#maxNoHeld}`,
        `\n    Max stored: ${this.#maxStored}`,
        `\n    Usage type: ${this.#usageType}`);

    showFullInfo = () => {
        this.showDescription();
        this.showUse();
    }
}

class Chalice extends BloodborneItem {
    #depth;
    #area;
    #materials;

    constructor(name, depth, area, materials) {
        super(name, 'is used for conducting a ritual to unseal a Chalice Dungeon');
        this.#depth = depth;
        this.#area = area;
        this.#materials = materials;
    }

    showDescription = () => console.log(`\n${this.name}`,
        `\n    Depth: ${this.#depth}`,
        `\n    Area: ${this.#area}`);

    showMaterials = () => {
        console.log('\nMaterials needed:');
        for (let material of this.#materials) {
            console.log('   ', material);
        }
    }

    showFullInfo = () => {
        this.showDescription();
        this.showUse();
        this.showMaterials();
    }
}

class PthumeruChalice extends Chalice {
    constructor(name, depth, materials) {
        super(name, depth, 'Pthumeru', materials);
        this.lore = 'The old labyrinth was carved out by the Pthumerians, superhuman beings that are said to have unlocked the wisdom of the eldritch Truth.';
    }

    showLore = () => console.log(`\n${this.lore}`);

    #showFullInfoInitial = this.showFullInfo;

    showFullInfo = () => {
        this.#showFullInfoInitial();
        this.showLore();
    }
}

class IszChalice extends Chalice {
    constructor(name, depth, materials) {
        super(name, depth, 'Isz', materials);
        this.lore = 'According to the Choir, the land of Isz lies in contact with the cosmos, which allowed the Great Ones to function on transcendental planes of thought.';
    }

    showLore = () => console.log(`\n${this.lore}`);

    #showFullInfoInitial = this.showFullInfo;

    showFullInfo = () => {
        this.#showFullInfoInitial();
        this.showLore();
    }
}

const bloodVial = new Consumables('blood vial', 'restores 40% of a player\'s total health upon use', 20, 600);
const chalice1 = new PthumeruChalice('lower Pthumeru root chalice', 3, ['Ritual Blood (3) x12', 'Tomb Mold (3) x8', 'Blood Echoes x3.200']);
const chalice2 = new IszChalice('great Isz chalice', 5, ['Ritual Blood (5) x9', 'Pearl Slug x3', 'Arcane Haze x25', 'Blood Echoes x11.500']);

// bloodVial.showUse();
// bloodVial.showDescription();
bloodVial.showFullInfo();
console.log('\n---------------------');
// chalice1.showUse();
// chalice1.showDescription();
// chalice1.showMaterials();
// chalice1.showLore();
chalice1.showFullInfo();
console.log('\n---------------------');
chalice2.showFullInfo()
console.log('\n---------------------');