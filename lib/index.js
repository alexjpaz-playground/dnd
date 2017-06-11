const server = require('./server');

const ViewCompiler = require('./ViewCompiler');
const viewCompiler = new ViewCompiler();

console.log(viewCompiler.views);

const Character = require('./Character');
const CharacterLoader = require('./CharacterLoader');

const dust = require('dustjs-linkedin');
const fs = require('fs');

const publicDir = "./public";

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

CharacterLoader.forEach((character) => {



    fs.writeFileSync(`${publicDir}/${character.name}.json`, JSON.stringify(character, null, 4), 'utf8');

    dust.render('character_sheet', character, function(err, out) {
        console.log(err);
        fs.writeFileSync(`${publicDir}/${character.name}.html`, out, 'utf8');
    });
});

dust.render('index', {
    characters: CharacterLoader
}, (err, out) => {
    console.log(err, out);
    const publicDir = "./public";

    if (!fs.existsSync(publicDir)){
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(`${publicDir}/index.html`, out, 'utf8');
});



//['kriv'].forEach((character) => {
    //const data = yaml.safeLoad(fs.readFileSync(`./characters/${character}.yml`, 'utf8'));

    //var characterData = new Character(data);

    //dust.render('character_sheet', characterData, function(err, out) {
        //const publicDir = "./public";
        //if (!fs.existsSync(publicDir)){
            //fs.mkdirSync(publicDir);
        //}
        //fs.writeFileSync(`${publicDir}/${character}.html`, out, 'utf8');
        //fs.writeFileSync(`${publicDir}/${character}.json`, JSON.stringify(characterData, null, 4), 'utf8');
    //});
//});
