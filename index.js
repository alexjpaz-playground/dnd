const fs = require('fs');
const dust = require('dustjs-linkedin');

var src = fs.readFileSync('./templates/character_sheet.dust', 'utf8');
var compiled = dust.compile(src, 'character_sheet');
dust.loadSource(compiled);

const yaml = require('js-yaml');

const character= yaml.safeLoad(fs.readFileSync('./characters/kriv/basic.yml', 'utf8'));

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

dust.render('character_sheet', character, function(err, out) {
    fs.writeFileSync('./out.html', out);
});
