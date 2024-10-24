# frontend-pokeapi2

Este proyecto consiste en una poke api pensada para manejar listas con gran cantidad de data. 

## Técnicas

He preparado una animación cautivadora para el loader, ¡espero que la disfrutes!

- Para evitar sobrecargar el DOM con tantos elementos en la lista, implementé un infinite scroll. 
- También añadí una búsqueda optimizada con debouncing para que encuentres lo que necesitas sin esfuerzo. 
- Para la búsqueda singular prepare una solicitud optimista pensando en que el usuario entrara a la nueva vista ya con los datos descargados.


## tecnologías. 

- Vue por excelencia es el corazón del proyecto. 
- Vue router nos permite implementar una SPA no es obligatoria pero considero que es un estándar en la industria y por ello la he implementado.
- Pinia, en mi opinión, es la mejor opción para gestión de estado. Su arquitectura flexible permite crear stores modulares que pueden ser interconectados. Como se realizó en este proyecto.
- TypeScript es esencial en proyectos de gran escala. Facilita el mantenimiento y escalabilidad del código, ofreciendo eficiencia a largo plazo al evitar errores en tiempo de ejecución y mejorar el autocompletado, al limitar las posibles inconsistencias.
- vitest y su ecosistema. Muy similar a jest y con la misma sensibles para implementar test.  



## Comandos

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Test

```sh
npm run test:unit
```
