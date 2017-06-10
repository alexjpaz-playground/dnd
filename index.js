const Character = require('./lib/character');

const fs = require('fs');
const dust = require('dustjs-linkedin');

var src = fs.readFileSync('./templates/character_sheet.dust', 'utf8');
var compiled = dust.compile(src, 'character_sheet');
dust.loadSource(compiled);

const yaml = require('js-yaml');

const data = yaml.safeLoad(fs.readFileSync('./characters/kriv/basic.yml', 'utf8'));

var character = new Character(data);


dust.render('character_sheet', character, function(err, out) {
    fs.writeFileSync('./out.html', out);
});
