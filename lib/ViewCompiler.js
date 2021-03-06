const fs = require('fs');
const glob = require('glob');

const dust = require('dustjs-linkedin');



module.exports = function ViewCompiler(options) {
    const basePath = "./templates/";
    let files = glob.sync(`${basePath}**/*.dust`);

    this.views = files.map(file => {
        try {
            const name = file
                .replace(basePath,'')
                .replace(/\.dust$/,'');
            var src = fs.readFileSync(file, 'utf8');
            var compiled = dust.compile(src, name);
            dust.loadSource(compiled);
            return name;
        } catch(e) {
            throw new Error(`Unable to load template ${file}.\nCaused by ${e}`);
        }
    });
};
