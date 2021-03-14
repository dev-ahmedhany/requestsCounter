const express = require('express')
const app = express();
const port = 80;

const URpage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>ELC - Human</title>
</head>
<body>
    <p>Please Stay here 5 minutes</p>
    <a href="/">Home</a>
</body>
</html>
`;

const RUpage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>ELC - Human Test</title>
</head>
<body>
    <p>Are You Human ?</p>
    <a href="/URhuman">Click Here</a>
</body>
</html>
`;

let ips = new Map();
let paths = new Map();
let RUhuman = new Map();
let URhuman = new Map();
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
    plusone(RUhuman, req.ip);
    res.send(RUpage);
})

app.get('/URhuman', (req, res) => {
    plusone(URhuman, req.ip);
    res.send(URpage);
})

app.use((req, res) => {
    plusone(ips, req.ip);
    plusone(paths, req.method + req.path);
    res.redirect("/RUhuman");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

setTimeout(() => {
    // sort by value
    console.log("Top 20 ip");
    console.log(Array.from(sortByValue(ips)).slice(0, size));
    console.log("Top 20 Requests");
    console.log(Array.from(sortByValue(paths)).slice(0, size));
    console.log("Top 20 Human Test");
    console.log(Array.from(sortByValue(RUhuman)).slice(0, size));
    console.log("Top 20 Humans");
    console.log(Array.from(sortByValue(URhuman)).slice(0, size));
    process.exit(0);
}, 20 * 1000)//5 min
