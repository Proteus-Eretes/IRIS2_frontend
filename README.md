# IRIS 2 frontend

Deze applicatie is gemaakt met [Nuxt 3](https://v3.nuxtjs.org). Nuxt 3 is nog steeds in bèta, dus het is niet altijd stabiel en ook zijn sommige dependencies nog niet geoptimaliseerd voor Nuxt 3 (zie issue #1).
Hieronder heb ik meer uitleg over verschillende bestanden en dingen die belangrijk zijn voor de applicatie. In elke map heb ik ook een `README.md` bestand gezet voor meer uitleg.

## Commands

Gebruik deze commands voor deployment:

### Setup

De eerste keer moeten alle dependencies worden geïnstalleerd:

```bash
yarn install
```

### Development

Dit command start een development server op [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

### Production

Om de applicatie te bouwen voor productie gebruik je dit command:

```bash
yarn build
```

> Bekijk hier de [documentation voor deployment](https://v3.nuxtjs.org/docs/deployment).

### Nuxt update

Om Nuxt 3 te updaten (en dat is goed om vaak te doen terwijl het nog in bèta is) gebruik je dit command:

```bash
npx nuxi upgrade
```

## Extensions

Dit is een lijst met extensies die heel handig zijn voor deze applicatie.

-   Visual Studio Code
    -   [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    -   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    -   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    -   [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
    -   [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)
    -   [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
    -   [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
    -   [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) + enable [Take Over Mode](https://v3.nuxtjs.org/getting-started/introduction/)
    -   [Vue Peek](https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek)
-   Chrome/Firefox
    -   [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
    -   [VisBug](https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc)
    -   [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

## Packages

Sommige van de dependencies die ik heb gebruikt zijn misschien minder bekend, dus daarom leg ik hier wat meer uit. Ik heb zo weinig mogelijk obscure dependencies gebruikt om ervoor te zorgen dat alles goed samen werkt.

### @vueuse

VueUse is een bibliotheek met [composables](https://v3.nuxtjs.org/docs/directory-structure/composables/) voor Vue/Nuxt 3. Dit maakt werken met bijvoorbeeld locatie, local storage, knippen en plakken, logic, etc. veel makkelijker want je krijgt reactive variabelen (variabelen die updaten in Vue als de waarde ook verandert) en/of handige functies.

Kortom, er is echt heel erg veel wat je met deze bibliotheek kan doen en het is heel erg handig.

Documentatie: [vueuse.org](https://vueuse.org/guide/)

### @headlessui/vue

Dit is een bibliotheek met componenten zonder stijl. Hierdoor werkt het goed samen met TailwindCSS (het is ook gemaakt door de makers van TailwindCSS). Er zijn niet veel componenten, maar het maakt het wel makkelijker om een dialog of transition te maken.

Een andere reden waarom ik het heb gebruikt is omdat ik in de layout veel gebruik heb gemaakt van [tailwindui.com](https://tailwindui.com/). Dit is een plek waar je ontwerpen kunt vinden die gemaakt zijn in TailwindCSS. Het zorgde ervoor dat het een stuk minder tijd kostte om de layout te doen, al heb ik ook nog veel dingen aan moeten passen. Zij gebruiken ook de componenten van HeadlessUI.

Alternatieven voor HeadlessUI zijn [PrimeVue](https://primefaces.org/primevue/showcase/#/) of [Vuetensils](https://vuetensils.stegosource.com/Introduction.html).

Voor documentatie: [headlessui.dev](https://headlessui.dev/)

### phosphor-vue

Dit zijn de icoontjes. Ik heb gekozen voor deze bibliotheek, want het is open-source, het werkt makkelijk samen met Vue/Figma en er zijn veel opties.

Website met documentatie en lijst van icoontjs: [phosphoricons.com](https://phosphoricons.com/)

### pinia

Een alternatief voor Vuex, maar deze werkt beter met Nuxt en Vue 3. Een voorbeeld is het gebruik van [composables](https://v3.nuxtjs.org/docs/directory-structure/composables/) (bijvoorbeeld `useStore()` of `useRouter()`). Dit is een 'nieuwe' manier van schrijven in Vue waardoor alles in de `setup` staat en het meer voelt als normale Javascript. Dit wordt/is de standaard in Vue 3. Daarnaast werkt pinia ook veel beter met SSR, [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) en TypeScript.
De bedenker van Vue heeft trouwens ook net bekend gemaakt dat Pinia nu de standaard is voor Vue 3 (en dus ook Nuxt 3) ipv Vuex.

Voor documentatie: [pinia.vuejs.org](https://pinia.vuejs.org/)

### tailwindcss

Waarschijnlijk hebben jullie er al wel van gehoord, maar TailwindCSS is een manier om CSS in de HTML markup te schrijven. Hierdoor zit je niet met ids, classes en verschillende bestanden te werken. Daarnaast is het ook heel makkelijk om consistentie in kleuren en groottes te krijgen. De configuratie voor TailwindCSS staat in [tailwind.config.js](tailwind.config.js). Daar kun je kleuren aanpassen of speciale waardes voor CSS aanmaken. Kijk hiervoor naar de documentatie van TailwindCSS. Een paar extra classes voor dingen die vaak terugkomen staan in [assets/css/tailwind.css](assets/css/tailwind.css).

Voor documentatie: [tailwindcss.com](https://tailwindcss.com/)

## Recommendations

-   Zoals ik al eerder zei zijn nog niet alle [modules](https://modules.nuxtjs.org/) geüpdate voor Nuxt 3. Deze modules kunnen handig zijn of al gebruikte dependencies vervangen voor makkelijkere samenwerking met Nuxt, dus hier zijn een paar voorbeelden van modules die misschien kunnen worden toegevoegd als ze klaar zijn:
    -   [PWA](https://pwa.nuxtjs.org/) zodat de applicatie ook als PWA gebruikt kan worden op mobiele devices.
    -   [i18n](https://i18n.nuxtjs.org/) voor makkelijke vertalingen voor het geval dat de applicatie ook vertaald moet worden. [@intlify/nuxt3](https://github.com/intlify/nuxt3) kan ook een interessante optie zijn.
    -   [validate](https://github.com/lewyuburi/nuxt-validate) is een module voor de package [vee-validate](https://github.com/logaretm/vee-validate). Hiermee kun je forms valideren en ervoor zorgen dat inputs goed zijn en ook kun je betere feedback geven aan gebruikers.
    -   [FormKit](https://formkit.com/) is een goed alternatief voor `validate` en daar worden formulieren ook misschien makkelijker van. Het kostte nu te veel tijd om het te implementeren voor mij (en het is ook nog niet stabiel), maar het heeft veel potentie.
    -   [dayjs](https://github.com/nuxt-community/dayjs-module) is een module voor de dependency die ik al gebruikt heb; [dayjs](https://day.js.org/en/).
    -   [tailwindcss](https://tailwindcss.nuxtjs.org/) is de module voor de dependency TailwindCSS.
    -   [gtm](https://github.com/nuxt-community/gtm-module) is een module voor de Google Tags Manager. Ik dacht dat ik dat ook in de oude IRIS zag en dus is deze module handig als jullie dit later nog willen toevoegen.
    -   Om notificaties te laten zien gebruik ik nu het [Toast.vue](components/Toast.vue) component, maar de module [toast](https://github.com/nuxt-community/community-modules/tree/master/packages/toast) zou dat misschien een stuk flexibeler en makkelijker maken.
-   Om de applicatie toegankelijker te maken is het wellicht handig om meer aandacht te besteden aan `accessibility`. Bijvoorbeeld het toevoegen van labels voor screen readers, etc. Door componenten van [PrimeVue](https://primefaces.org/primevue/showcase/#/) of [Vuetensils](https://vuetensils.stegosource.com/Introduction.html) te gebruiken is dit makkelijker. Ik heb voor nu veel in standaard HTML gemaakt, omdat dat makkelijker is en op zich voldoet, maar voor optimalisatie is dat uiteindelijk misschien goed om naar te kijken.
