const server = require('./server');

const Character = require('./character');

const fs = require('fs');
const dust = require('dustjs-linkedin');

var src = fs.readFileSync('./templates/character_sheet.dust', 'utf8');
var compiled = dust.compile(src, 'character_sheet');
dust.loadSource(compiled);

const yaml = require('js-yaml');

['kriv'].forEach((character) => {
    const data = yaml.safeLoad(fs.readFileSync(`./characters/${character}.yml`, 'utf8'));

    var characterData = new Character(data);

    dust.render('character_sheet', characterData, function(err, out) {
        const publicDir = "./public";
        if (!fs.existsSync(publicDir)){
            fs.mkdirSync(publicDir);
        }
        fs.writeFileSync(`${publicDir}/${character}.html`, out, 'utf8');
        fs.writeFileSync(`${publicDir}/${character}.json`, JSON.stringify(characterData, null, 4), 'utf8');
    });
});
