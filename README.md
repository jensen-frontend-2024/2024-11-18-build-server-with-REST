# 2024-11-18 Bygga server med REST.

<details open>
<summary>Innehåll</summary>

- [Rest](#rest)

  - [Grundkoncepten](#grundkoncepten-i-rest)
  - [Viktiga egenskaper](#viktiga-egenskaper-i-rest)
  - [Sammanfattning](#sammanfattning)

- [Postman](#postman)

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

[Tillbaks till toppen](#2024-11-18-bygga-server-med-rest)
