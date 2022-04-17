# Models

Deze map heeft alle models die gebruikt worden door Typescript voor bijvoorbeeld code completion en ook om te kijken of code wel klopt.
Hieronder een overzicht van alle bestand en dus ook de verschillende modellen, enums of functies.

## [block.ts](block.ts)

| Type                | Beschrijving                                                                     |
| :------------------ | :------------------------------------------------------------------------------- |
| Block               | Type met de informatie van een `Block`.                                          |
| NewBlock            | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuw `Block`. |
| BlockStatus         | Enum met de verschillende statussen van een `Block`.                             |
| getBlockStatusLabel | Functie voor de label van een `BlockStatus`                                      |

## [club.ts](club.ts)

| Type       | Beschrijving                                                                                          |
| :--------- | :---------------------------------------------------------------------------------------------------- |
| Club       | Type met de meest belangrijkste informatie van een `Club`. Dit wordt als eerste geladen.              |
| ClubDetail | Type met extra informatie over een `Club`. Dit wordt geladen als een gebruiker extra informatie wilt. |
| Contact    | Type voor de informatie van een `Contact`. Dit wordt gebruikt in `ClubDetail`.                        |

## [crew.ts](crew.ts)

| Type                     | Beschrijving                                                                                          |
| :----------------------- | :---------------------------------------------------------------------------------------------------- |
| Crew                     | Type met de meest belangrijkste informatie van een `Crew`.                                            |
| CrewDetail               | Type met extra informatie over een `Crew`.                                                            |
| NewCrew                  | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuw `Crew`.                       |
| Team                     | Type met de meest belangrijkste informatie van een `Team`. Een `Team` is een instance van een `Crew`. |
| TeamDetail               | Type met extra informatie over een `Team`.                                                            |
| NewTeam                  | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuw `Team`.                       |
| Fine                     | Type voor de informatie van een `Fine`.                                                               |
| CrewStatus               | Enum met de verschillende statussen van een `Crew`.                                                   |
| getCrewStatusLabel       | Functie voor de label van een `CrewStatus`                                                            |
| TeamResultStatus         | Enum met de verschillende statussen van een `TeamResultStatus`.                                       |
| getTeamResultStatusLabel | Functie voor de label van een `TeamResultStatus`                                                      |

## [event.ts](event.ts)

| Type                      | Beschrijving                                                                                             |
| :------------------------ | :------------------------------------------------------------------------------------------------------- |
| Event                     | Type met de meest belangrijkste informatie van een `Event`.                                              |
| EventDetail               | Type met extra informatie over een `Event`.                                                              |
| NewEvent                  | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuw `Event`.                         |
| Field                     | Type met de meest belangrijkste informatie van een `Field`. Een `Field` is een instance van een `Event`. |
| FieldDetail               | Type met extra informatie over een `Field`.                                                              |
| NewField                  | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuw `Field`.                         |
| EventStatus               | Enum met de verschillende statussen van een `Event`.                                                     |
| getEventStatusLabel       | Functie voor de label van een `EventStatus`                                                              |
| TeamResultStatus          | Enum met de verschillende statussen van een `FieldResultStatus`.                                         |
| getFieldResultStatusLabel | Functie voor de label van een `FieldResultStatus`                                                        |

## [export.ts](export.ts)

==TODO==

## [location.ts](location.ts)

| Type                 | Beschrijving                                        |
| :------------------- | :-------------------------------------------------- |
| Location             | Type met de informatie van een `Location`.          |
| LocationType         | Enum met de verschillende types van een `Location`. |
| getLocationTypeLabel | Functie voor de label van een `LocationType`        |

## [regatta.ts](regatta.ts)

| Type                | Beschrijving                                                                        |
| :------------------ | :---------------------------------------------------------------------------------- |
| Regatta             | Type met de informatie van een `Regatta`.                                           |
| RegattaDetail       | Type met extra informatie over een `Regatta`.                                       |
| NewRegatta          | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuwe `Regatta`. |
| LotterySettings     | Type met de informatie van de `LotterySettings`.                                    |
| RegattaType         | Enum met de verschillende types van een `Regatta`.                                  |
| getRegattaTypeLabel | Functie voor de label van een `RegattaType`                                         |

## [result.ts](result.ts)

| Type         | Beschrijving                                          |
| :----------- | :---------------------------------------------------- |
| Result       | Type met de informatie van een `Result`.              |
| Time         | Type met de informatie van een `Time`.                |
| ResultStatus | Enum met de verschillende statussen van een `Result`. |
| TimeStatus   | Enum met de verschillende statussen van een `Time`.   |

## [round.ts](round.ts)

| Type  | Beschrijving                            |
| :---- | :-------------------------------------- |
| Round | Type met de informatie van een `Round`. |

## [route-item.ts](route-item.ts)

| Type      | Beschrijving                                                                                                                      |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| RouteItem | Type met de informatie van een `RouteItem`. Dit wordt in de [SideBarItem.vue](../components/navigation/SideBarItem.vue) gebruikt. |

## [rower.ts](rower.ts)

| Type              | Beschrijving                                                                      |
| :---------------- | :-------------------------------------------------------------------------------- |
| Rower             | Type met de meest belangrijkste informatie van een `Rower`.                       |
| RowerDetail       | Type met extra informatie over een `Rower`.                                       |
| NewRower          | Type met alle informatie voor het aanmaken (of aanpassen) van een nieuwe `Rower`. |
| Gender            | Enum met de verschillende waarden van `Gender`.                                   |
| getGenderLabel    | Functie voor de label van `Gender`                                                |
| RowerRole         | Enum met de verschillende rollen van een `Rower`.                                 |
| getRowerRoleLabel | Functie voor de label van een `RowerRole`                                         |

## [slide-over-state.ts](slide-over-state.ts)

| Type           | Beschrijving                                                                                       |
| :------------- | :------------------------------------------------------------------------------------------------- |
| SlideOverState | Enum met de verschillende states voor de [EditorSlideOver.vue](../components/EditorSlideOver.vue). |

## [table.ts](table.ts)

| Type               | Beschrijving                                                                                                                   |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| TableAction        | Type met de informatie van een `TableAction`. Dit wordt in de [Table.vue](../components/navigation/Table.vue) gebruikt.        |
| TableHeader        | Type met de informatie van een `TableHeader`. Dit wordt in de [Table.vue](../components/navigation/Table.vue) gebruikt.        |
| TableSortDirection | Type met de informatie van een `TableSortDirection`. Dit wordt in de [Table.vue](../components/navigation/Table.vue) gebruikt. |

## [toast.ts](toast.ts)

| Type        | Beschrijving                                                                                                            |
| :---------- | :---------------------------------------------------------------------------------------------------------------------- |
| Toast       | Type met de informatie van een `Toast`. Dit wordt in de [Toast.vue](../components/navigation/Toast.vue) gebruikt.       |
| ToastButton | Type met de informatie van een `ToastButton`. Dit wordt in de [Toast.vue](../components/navigation/Toast.vue) gebruikt. |
| ToastType   | Enum met de verschillende types van een `Toast`.                                                                        |

## [user.ts](user.ts)

==TODO==

| Type     | Beschrijving                                     |
| :------- | :----------------------------------------------- |
| User     | Type met de informatie van een `User`.           |
| UserRole | Enum met de verschillende rollen van een `User`. |
