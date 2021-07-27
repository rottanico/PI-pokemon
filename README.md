

# Individual Project -  PokeApi

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


## Elementos del proyecto:


- [ ]  Barra de navegacion: botones para poder cambiar el ordenamiento de los pokemones( por nombre o por fuerza ), botones para filtrar por pokemon creado o existente.
- [ ]  Home: renderiza cartas de pokemones que incluyen una foto, nombre, tipo de pokemon ( agua, fuego, fantasma, etc) y un boton para acceder a mas detalle del pokemon.
- [ ]  Detalle del Pokemon seleccionado: incluye todos los datos del pokemon ( fuerza, altura, peso, imagen, defenza, rapidez, tipo, etc )
- [ ]  Formulario de creacion: Crea un pokemon con sus respectivos datos ( detaller del pokemon ) y lo almacena en la base de datos

## Tecnologías utilizadas:

- [ ] React 
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres





# Opcion para desarrolladores: 

## Comenzando

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. Al


## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `pokemon`



## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons



#### Frontend

__Ruta principal__: contiene los siguientes items
- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Área donde se verá el listado de pokemons. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /pokemons` 
- [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons


__Ruta de detalle de Pokemon__: contiene los siguientes items
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad)
- [ ] Altura y peso

__Ruta de creación__: contiene los siguientes items
- [ ] Un formulario __controlado__ con los campos mencionados en el detalle del pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de pokemon
- [ ] Botón/Opción para crear un nuevo pokemon

#### Base de datos


la base de datos contiene las siguientes entidades:

- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) 
  - Nombre 
  - Vida
  - Fuerza
  - Defensa
  - Velocidad
  - Altura
  - Peso
- [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es muchos a muchos ya que un pokemon puede pertenecer a más de un tipo y, a su vez, un tipo puede incluir a muchos pokemons.

#### Backend


servidor en Node/Express con las siguientes rutas:


- [ ] __GET /pokemons__:
  - Obtener un listado de los primeros 12 pokemons desde pokeapi
- [ ] __GET /pokemons/{idPokemon}__:
  - Obtener el detalle de un pokemon en particular
  - Funciona tanto para un ID de un pokemon creado como para uno existente
- [ ] __GET /pokemons?name="..."__:
  - Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
  - Si no existe ningún pokemon devuelve un mensaje adecuado
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos
- [ ] __GET /types__:
  - Obtener todos los tipos de pokemons posibles


#### Testing
- [ ] Testeo de un componente
- [ ] Testeo de una ruta 
- [ ] Testeo de un modelo
