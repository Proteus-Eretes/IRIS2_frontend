# Models

Deze map heeft alle types die gebruikt worden door Typescript voor bijvoorbeeld code completion en ook om te kijken of code wel klopt. Verder geeft het ook een overzicht van alle dingen die worden opgevraagd en wat voor soort informatie het is.

## Overzicht van de bestanden

### block.model.ts

| Type        | Beschrijving                                                                                            |
| :---------- | :------------------------------------------------------------------------------------------------------ |
| Block       | De type met de meest belangrijkste informatie van een Block. Dit wordt als eerste geladen.              |
| BlockDetail | De type met extra informatie over een Block. Dit wordt geladen als een gebruiker extra informatie wilt. |
| BlockAction | Een type met de informatie over verschillende acties voor een Block. Dit hangt af van toestemmingen.    |
| BlockStatus | Een enum met de verschillende statussen van een Block.                                                  |

### club.model.ts

| Type       | Beschrijving                                                                                           |
| :--------- | :----------------------------------------------------------------------------------------------------- |
| Club       | De type met de meest belangrijkste informatie van een Club. Dit wordt als eerste geladen.              |
| ClubDetail | De type met extra informatie over een Club. Dit wordt geladen als een gebruiker extra informatie wilt. |
| Contact    | Een type voor de informatie van een Contact.                                                           |

-   Crew
-   DisplayStatus
-   Event
-   Regatta
-   Result
-   Round
-   RouteItem
-   Rower
-   User
