﻿# requestsCounter

quick tool to count Http requests for centos 7

First Install node js

```
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -

sudo yum install nodejs
```

Check if installed

```
node --version
npm --version
```

download App

```shell
curl -O https://raw.githubusercontent.com/dev-ahmedhany/requestsCounter/main/app.js \
     -O https://raw.githubusercontent.com/dev-ahmedhany/requestsCounter/main/package.json
```

How To use

```shell
npm i
npm run start
```

it runs for 5 minutes then log top 20 results
