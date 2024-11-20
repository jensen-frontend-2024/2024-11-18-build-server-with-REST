# 2024-11-18 Bygga server med REST.

<details open>
<summary>Innehåll</summary>

- [Rest](#rest)

  - [Grundkoncepten](#grundkoncepten-i-rest)
  - [Viktiga egenskaper](#viktiga-egenskaper-i-rest)
  - [Sammanfattning](#sammanfattning)

- [Postman](#postman)

- [Bygga server efter REST](#bygga-server-efter-rest)

  - [Get](#get)
    - [getAll](#getall)
    - [getById](#getbyid)
  - [Post](#post)
  - [Put](#put)
  - [Delete](#delete)

- [Vi lägger till en databas](#vi-lägger-till-en-databas)

  - [Installera](#installera)
  - [Integrera better-sqlite3 med vår server](#integrera-better-sqlite3-med-vår-server)
  - [Post till sqlite](#post-till-sqlite)

</details>

## REST

REST står för "Representational State Transfer" och är ett arkitekturmönster som används för att bygga webbtjänster, inklusive API:er. När du bygger API:er med JS kan REST göra det enkare att skapa tydliga och förutsägbara endpoints för att hantera data.

### Grundkoncepten i REST

- **Resurser**: I ett RESTful API representerar resurser data, tex en student, lärare, kurser och så vidare. Varje resurs identifieras av en unik URL. Till exempel: `/students`, `/students/5`.

- **HTTP-metoder**: REST använder standardiseraade HTTP-metoder för att utföra olika operationer på resurserna.
  - **GET**: Hämtar data från servern ( läsning )
  - **POST**: Skapar nya resurser på servern
  - **PUT**: Updaterar existerande resurser
  - **DELETE**: Tar bort resurser

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### Viktiga egenskaper i REST

- **Stateless**: Varje förfrågan från en klient till servern måste innehålla all information som behövs för att förstå och bearbeta förfrågan. Servern sparar inte någon klientspecifik information mellan förfrågningar.

- **URI-struktur**: En resurs representeras av en unik URI _(Uniform Resource Identifer)_, till exempel: `/students/25`.

- **JSON**: Vanligtvis _(majoriteten av allt)_ använder REST API:er JSON som dataformat vilket gör det väldigt enkelt att arbeta med i JS.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### Sammanfattning

Sammanfattningsvis innebär RESt att skapa enkla och förutsägbara regler för hur man interagerar med data genom att använda vanliga HTTP-metoder och URL-strukturer för att representera resurser. Det gör det enkelt att bygga skalbara och flexibla API:er men även att som utvecklare hoppa in i existerande API:er och kunna börja jobba på en gång.

Nedan har ni en länk att läsa om som göller URL, URL och URN: [URI vs URN vs URL](https://medium.com/@abhirup.acharya009/uri-vs-urn-vs-url-key-distinctions-explained-dec8e02ebd18)

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

## Postman

Postman är ett verktyg som används för att testa och skicka förfrågningar till API:er. När du bygger en server med Express kan du använda Postman för att kontrollera om dina endpoints fungerar som förväntat. Istället för att skriva egen frontend-kod eller använda en webbläsare för att testa API-anrop, låter Postman dig skapa och skicka HTTP-förfrågningar (som GET, POST, PUT och DELETE) direkt.

Med Postman kan du:

- Skapa och spara olika förfrågningar.
- Ange parametrar, headers och data för dina förfrågningar.
- Få tydliga svar från servern, inklusive statuskoder och svarsinnehåll.

Exempel: Om du har en Express-server med en `GET /users`-route kan du använda Postman för att skicka en `GET`-förfrågan till `http://localhost:3000/users` och se svaret från servern. Det gör det enkelt att se till att din server fungerar som du förväntar dig!

Länk för att ladda ner postman finner ni här: [Postman Download](https://www.postman.com/downloads/)

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

## Bygga server efter REST

### GET

Vi skapar två stycken get-endpoints. En för att hämta alla blogposter och en för att hämta en specifik blogpost efter ett id.

#### getAll

```js
app.get("/blog-posts", (req, res) => {
  res.json(blogPosts);
});
```

En väldigt enkel endpoint som bara skickar tillbaks hela arrayen i ett respons. `blogPosts` är importerad in i `index.js`.

```js
let { blogPosts } = require("./data.js");
```

Den är definerad med en `let` eftersom vi "ersätter" den när vi filtrerar bort blogPosts med hjälp an en delete längre ner i koden.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

#### getById

Denna endpoint är lite mer komplicerad då vi måste ta hänsyn till ett id som kommer in som en path-variabel.

```js
app.get("/blog-posts/:id", (req, res) => {
  const params = req.params;
  const id = params.id;

  const blog = blogPosts.find((bp) => {
    if (bp.id === id) {
      return true;
    }

    return false;
  });

  if (blog) {
    return res.json(blog);
  }

  return res
    .status(404) // Means NOT FOUND
    .json({ message: "The blog with that id was not found" });
});
```

Högst upp i koden kan vi se att vi plockar ut path-parametern från req-objektet via params. Det är ett objekt som express skapar till oss och kopplar på, på req-objektet. En path-variabel är en dynamisk paramterar och fungerar som en placeholder tills att ett request kommer in och matchas mot denna endpoint. Express kommer parsa det som står på `/:id`-platsen och lägga in det i params-objektet med samma namn.

När vi har id, så använder vi `find()` för att hitta motsvarande blogpost i arrayn och sen skicka tillbaks den i ett response.

`find()` är en arraymetod som loopar igenom arrayen som den är kallad på och kö en callbackfunktion på varje element. Callback-funktionens syfte är att returnera `true` eller `false` för att se om elementet som den itererar över är det elementet vi letar efter eller inte. Är det så så returneras elementet, annars blir det undefined.

Det som är bra med find, är att den returnerar just undefined om den inte hittar någon matchning i array. Detta gör att vi enkelt kan göra en if-check på den och välja att svara med någon typ av felkod som beskriver vad felet här. I det här fallet så var det: `The blog with that id was not found.`.

### POST

För att göra en post så måste vi skapa en endpoint som anropar en specifik metod som hanterar just postförfrågningar. Det kan se ut så här:

```js
app.post("/blog-posts", (req, res) => {});
```

Parametrarna till post-metoden är samma som förut, en endpoint och en callback som i sin tur ger oss tillgång till `request`- och `response`-objektet.

Det som separerar en POST mot en GET är att en POST nästan alltid kommer att inkludera ett body-objekt i request-objektet.

```js
app.post("/blog-posts", (req, res) => {
  const body = req.body;
});
```

Body-objektet måste innehålla fullständing information om den nya resursen vi vill skapa, i det här fallet en blogpost. Dock så behövs id inte inkluderas eftersom det brukar oftast skapas av databasen eller servern beroende på. Så vårt fall med en blogpost så kommer body endast innehålla ett objekt med ett `content`-attribute.

Så det första man bör göra är att validera body, så all infomration där i är korrekt. I vårt falla hoppar vi över det men vi lägger till en kommentar som en påminnelse.

```js
app.post("/blog-posts", (req, res) => {
  const body = req.body;

  // Valideringskod här, är någon data inte korrekt så bör man returnera ett 400-svar. BAD REQUEST.

//  Till exempel på bad request-svar:
  return res
    .status(400)
    .json({
      message: "The body contains malformed information".
    })
});
```

Men vi antar att allt är korrekt så vi skippar valideringen. Vi har heller inte någon databas så stegen som vi ska göra är:

1. Skapa ett nytt blogpost-objekt.
2. Skapa ett nytt id och lägg in det i det nya blogpost-objektet, samt content från bodyn.
3. Pusha _(eller unshifta)_ på det nya objektet på blogposts-arrayen

```js
app.post("/blog-posts", (req, res) => {
  const body = req.body;
  const content = body.content;
  const newId = blogPosts.length + 1;

  const newBlogPost = {
    id: newId,
    content,
  };

  blogPosts.unshift(newBlogPost);

  return res.status(201).json({ message: "The new blogPost was created" });
});
```

Testing this in postman with no body works just fines. We get the expected error code in return since we are missing the body.

In order to add the body postman we go to the body tab, we check the raw option and then we choose JSON as the data format. Then we just add our body in postman and click send.

This won't work and that is because we are missing a "configuration" in our server. We need to add the following code to our index.js:

```js
app.use(express.json());
```

Denna kodrad kommer att koppla på den inkluderade body-objektet på request-objektet så vi kan använda oss utav den i vår serverkod. Bodyn kommer bli tillgänglig så här:

```js
const body = req.body;
```

När vi har lagt till denna kodrad så kan vi skicka vår post-request igen och det bör funka, vi bör få tillbaka 201 CREATED och ett meddelande som säger att det gick bra.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### PUT

Put ska användas för att uppdatera befintliga resurser på servern. Den är väldigt snarlik en POST, för vi använder ett body-objekt igen men vi behöver lite mer information, vi behöver nämligen veta exakt vilken blogpost vi ska uppdatera, alltså vi behöver också ett id till blogposten.

```js
app.put("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
});
```

Vi har två värden att ta hänsyn till här. Både id som kommer ifrån path-variabeln och body som kommer från request-objektet. Vi gör en destructuring för att det är nice, one-liners for the win!

Men vi måste validera vår body, i alla fall kolla att den faktiskt finns.

```js
app.put("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: "The body is missing." });
  }
});
```

Nästa steg är att leta upp den blogposten som matchar det id som kom in genom path-variablen. Här kan vi återanvända logik från vår tidigare **GET /blog-posts/:id**-enpoint.

```js
app.put("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: "The body is missing." });
  }

  const blog = blogPosts.find((bp) => bp.id === id);
});
```

Logiken ovan är hämtat från tidigare endpoint MEN vi har kompirmerad den lite. Vi har tagit bort måsvingarna och if-checken och ersatt med ett villkor bara. Gör så här med en arrow funktion så betyder det at det som kommer direkt efter själva pilen är det som kommer att retuneras från callbacken.

Variablen "blog" kommer efter att "find()" har körts klart antingen vara en blogpost, eller undefined. Detta kan vi använda i en if-check för att eventuellt skicka tillbaka ett NOT FOUND-svar.

```js
app.put("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: "The body is missing." });
  }

  const blog = blogPosts.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "The blog with that id was not found" });
  }

  blog.content = content;

  return res.json(blog);
});
```

Då är vår put-request klar med enklare validering och felhantering.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### DELETE

Sist men inte minst. Vi måste kunna ta bort resurser också från servern.

Vi skapar vår delete-endpoint.

```js
app.delete("/blog-posts/:id", (req, res) => {});
```

Vi återanvänder samma url som getById och put. Vi behöver göra liknande validering också. I alla fall en validering så att vi inte försöker ta bort något som inte existerar.

```js
app.delete("/blog-posts/:id", (req, res) => {
  const { id } = req.params;

  const blog = blogPosts.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "The blog with that id was not found" });
  }
});
```

Vi återanvänder samma logik igen som tidigare, när vi kollar om en blogpost faktiskt finns eller inte.

Men det vi ska göra om den finns är att plocka bort den. Och dett görs enklasts med filtermetoden.

Det kommer alltså att se ut så här:

```js
app.delete("/blog-posts/:id", (req, res) => {
  const { id } = req.params;

  const blog = blogPosts.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "The blog with that id was not found" });
  }

  blogPosts = blogPosts.filter((bp) => bp.id !== id);
});
```

Filtermetoden här går igenom alla blogposter och kollar om dess id är skiljt från id som kommer ifrån path-variabeln. Är bp.id och id inte skiljt från varandra så kommer filter returnera falsk vilket gör att den blogposten filtreras bort helt enkelt.

När detta är gjort så kan vi retunerar status 200 och något bra meddelande.

```js
app.delete("/blog-posts/:id", (req, res) => {
  const { id } = req.params;

  const blog = blogPosts.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "The blog with that id was not found" });
  }

  blogPosts = blogPosts.filter((bp) => bp.id !== id);

  return res.json({ message: "The blogpost was removed successfully" });
});
```

Då har vi ett fungerade RESTful API men de vanligast operatioinerna som man förväntas kunna göra i ett API.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

## Vi lägger till en databas

Den databasen vi ska lägga till är givetvis en SQLite-databas. Men för att den databasen ska kunna prata med vår server så behöver vi ett npm-paket som helt enkelt integrerar SQLite med vår express-server. Paketet heter `better-sqlite3`.

Första stegen är ju såklart att skapa databasen i SQLite Studio och lägga själva databasfilen i samma map som vårt projekt. Skapa även de tabellerna, och kolumnerna som krävs. Än så länge är det bara en tabell i form av `posts` med kolumnerna `post_id` och `content`.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### Installera

Kommando för att installera är:

`npm install better-sqlite3`

När det är gjort kan vi se att det har skett lite tillägg i `package.json` och `package-lock.json`. Precis som det ska. Dessa två filer håller helt enkelt koll på alla paket och alla filer som installeras med npm.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### Integrera better-sqlite3 med vår server

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

Det första vi måste göra är att importera in det i vårt projekt. Görs med detta kommando:

```js
const Database = require("better-sqlite3");
```

Detta importerar in klassen som vi måste använda oss utav för att skapa kontakten med databsen. Eftersom det är en klass så är namnkonventionen `PascalCase`, alltså stor bokstav i början och stor bokstav för varje "nytt" ord.

För att skapa kontakten så gör vi detta:

```js
const db = new Database("blog.db");
```

Sen kör vi igång vår server.

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)

### POST till sqlite

För att städa upp vår kod och göra den lite mer modulär så vill vi börja dela upp det i lite olika filer, Vi skapar först en fil som heter `blog.controller.js`, som då ska hantera alla våra requests. Så requestet hamnar på vår server, vår `index.js` matchar den mot någon av endpointsen och endpointen i sn tur anropar en funktion i vår `blog.controller.js`. Då får vi logiken lite separerad i olika filer.

