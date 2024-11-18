# 2024-11-18 Bygga server med REST.

<details>
<summary>Innehåll</summary>

- [Rest](#rest)
  - [Grundkoncepten](#grundkoncepten-i-rest)
  - [Viktiga egenskaper](#viktiga-egenskaper-i-rest)
  - [Sammanfattning](#sammanfattning)

</details>

## REST

### Grundkoncepten i REST

### Viktiga egenskaper i REST

### Sammanfattning

[URI vs URN vs URL](https://medium.com/@abhirup.acharya009/uri-vs-urn-vs-url-key-distinctions-explained-dec8e02ebd18)

## Postman

Postman är ett verktyg som används för att testa och skicka förfrågningar till API:er. När du bygger en server med Express kan du använda Postman för att kontrollera om dina endpoints fungerar som förväntat. Istället för att skriva egen frontend-kod eller använda en webbläsare för att testa API-anrop, låter Postman dig skapa och skicka HTTP-förfrågningar (som GET, POST, PUT och DELETE) direkt.

Med Postman kan du:

- Skapa och spara olika förfrågningar.
- Ange parametrar, headers och data för dina förfrågningar.
- Få tydliga svar från servern, inklusive statuskoder och svarsinnehåll.

Exempel: Om du har en Express-server med en `GET /users`-route kan du använda Postman för att skicka en `GET`-förfrågan till `http://localhost:3000/users` och se svaret från servern. Det gör det enkelt att se till att din server fungerar som du förväntar dig!

Länk för att ladda ner postman finner ni här: [Postman Download](https://www.postman.com/downloads/)

## Bygga server efter REST
