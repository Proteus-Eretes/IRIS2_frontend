# Components

Hier zijn alle losse componenten te vinden. Ik heb een paar standaard componenten gemaakt zoals [Table.vue](table/Table.vue), [SlideOver.vue](SlideOver.vue) en [Toast.vue](Toast.vue). Ook de map [moving](moving/) heeft standaard componenten voor de moving panels (de panelen die schuiven als je dieper een crew of event, etc. ingaat).

Nuxt 3 importeert deze componenten automatisch en de namen hangen dan af van de naam van de map waar ze in staan. Bijvoorbeeld de [Draggable.vue](table/Draggable.vue) in de map [table](table/) heet als auto-import `TableDraggable`. Je kunt deze (en andere) auto-imports vinden in de map [.nuxt](../.nuxt/) die wordt gegenereerd door Nuxt 3 bij het runnen van de dev server.
[Plugins](../plugins/) en [composables](../composables/) maken ook vaak gebruik van auto-imports en daarom zie je wel vaker in bestanden dat imports weg worden gelaten. Dit geldt ook voor third-party modules zoals `nuxt-lodash` of `@vueuse/nuxt`.
