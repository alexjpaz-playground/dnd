function Character(input) {
    this.constructor = function(character) {
        character.abilities_list = Object.keys(character.abilities).map(k => {
            return Object.assign({ 
                ability: k,
                proficient: character.profenciences.includes(k),
            }, character.abilities[k]);
        });

        const abilities = [
            "Strength",
            "Dexterity",
            "Constitution",
            "Intelligence",
            "Wisdom",
            "Charisma",
        ];

        character.saving_throws = abilities.map((ability) => {
            return {
                ability: ability,
                mod: character.abilities[ability].mod,
                proficient: character.profenciences.includes(ability)
            }
        });

        const skills = {
            Acrobatics: "Dexterity",
            AnimalHandling: "Wisdom",
            Arcana: "Intelligence",
            Athletics: "Strength",
            Deception: "Charisma",
            History: "Intelligence",
            Insight: "Wisdom",
            Intimidation: "Charisma",
            Investigation: "Intelligence",
            Medicine: "Wisdom",
            Nature: "Intelligence",
            Perception: "Wisdom",
            Performance: "Charisma",
            Persuasion: "Charisma",
            Religion: "Intelligence",
            SleightOfHand: "Dexterity",
            Stealth: "Dexterity",
            Survival: "Wisdom",
        };

        character.skills = Object.keys(skills).map((key) => {
            return {
                skill: key, 
                mod: character.abilities[skills[key]].mod + character.profeciency_bonus, 
                proficient: character.profenciences.includes(key)
            };
        });

        character.timestamp = new Date();

        Object.assign(this, character);
    };


    this.constructor(input);
}

module.exports = Character;
