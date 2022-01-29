# Components

Hier zijn alle losse componenten te vinden. Ik heb een paar standaard componenten gemaakt zoals [Table.vue](Table.vue), [EditorSlideOver.vue](EditorSlideOver.vue) en [Toast.vue](Toast.vue). Ook de map [sliding](sliding/) heeft standaard componenten voor de sliding panels (de panelen die schuiven als je dieper een crew of event, etc. ingaat).

In de mappen voor de verschillende onderwerpen zoals [blocks](blocks/), [crews](crews/), etc. staan ook vaak bestanden genaamd `EditorSlideOver.vue` of `SlidingPanel.vue`. Dit is zo omdat bijvoorbeeld de `SlidingPanel` van een `Crew` op de pagina `crews` en ook op de pagina `blocks` wordt gebruikt. Om ervoor te zorgen dat ook de inhoud van de standaard component op een centrale plek staat heb ik die hier gezet. Ik hoop dat het zo duidelijk is.

Nuxt 3 importeert deze componenten automatisch en de namen hangen dan af van de naam van de map waar ze in staan. Bijvoorbeeld de [EditorSlideOver.vue](crews/EditorSlideOver.vue) in de map [crews](crews/) heet als auto-import `CrewsEditorSlideOver`. Je kunt deze (en andere) auto-imports vinden in de map [.nuxt](../.nuxt/) die wordt gegenereerd door Nuxt 3 bij het runnen van de dev server.
[Plugins](../plugins/) en [composables](../composables/) maken ook vaak gebruik van auto-imports en daarom zie je wel vaker in bestanden dat imports weg worden gelaten.
