const express = require('express')
const app = express();
const port = 80;

const page = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>ELC - Human Test</title>
</head>
<body>
    <p>This is test Page Please Stay here 5 minutes</p>
    <a href="/">Home</a>
</body>
</html>
`;

let ips = new Map();
let paths = new Map();
let human = new Map();
const size = 20;

let sortByValue = (myMap) => new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

let plusone = (map, key) => {
    if (map.has(key)) {
        map.set(key, map.get(key) + 1);
    } else {
        map.set(key, 1);
    }
}

app.get('/RUhuman', (req, res) => {
    plusone(human, req.ip);
    res.send(page);
})

app.use((req, res) => {
    plusone(ips, req.ip);
    plusone(paths, req.path);
    res.redirect("/RUhuman");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

setTimeout(() => {
    // sort by value
    console.log(Array.from(sortByValue(ips)).slice(0, size));
    console.log(Array.from(sortByValue(human)).slice(0, size));
    console.log(Array.from(sortByValue(paths)).slice(0, size));
    process.exit(0);
}, 5 * 60 * 1000)//5 min
