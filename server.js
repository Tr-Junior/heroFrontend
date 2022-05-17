const express = require('express');
const app = express();
const appName = 'hero';
const outputPath = `${__dirname}/dist/${appName}`;

const PORT = process.env.PORT || 4500;

app.use(express.static(outputPath));

app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
})

app.listen(PORT, () => {
    console.log('servidor' + PORT);
})
