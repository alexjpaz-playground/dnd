const glob = require('glob');
const yaml = require('js-yaml');

const fs = require('fs');

const Character = require('./Character');


const basePath = "./characters/";

const characters = glob.sync(`${basePath}/*.yml`).map((path) => {;
    const data = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    return new Character(data);
});

module.exports = characters;
