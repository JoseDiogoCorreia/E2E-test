const JSZip = require('jszip');
const fs = require('fs');

function zipBundle() {
    const outDir = 'out';
    const packDir = `${outDir}/pack`;
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    if (!fs.existsSync(packDir)) fs.mkdirSync(packDir);

    const zip = new JSZip();

    // Add config and docs
    zip.file('tsconfig.json', fs.readFileSync('tsconfig.json'));
    zip.file('package-lock.json', fs.readFileSync('package-lock.json'));
    zip.file('package.json', fs.readFileSync('package.json'));
    zip.file('cucumber.js', fs.readFileSync('cucumber.js'));

    // Add all test files from src/*
    fs.readdirSync('./src').forEach(subDir => {
        fs.readdirSync(`./src/${subDir}`).forEach(file => {
            zip.file(`./src/${subDir}/${file}`, fs.readFileSync(`./src/${subDir}/${file}`));
        });
    });

    // Write to updated artifact name
    zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(`${packDir}/dcx-e2e-tests.zip`));
}

zipBundle();
