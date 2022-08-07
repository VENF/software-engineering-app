# software Engineering Project 

## Division de secciones en el proyecto :
- **App :** Contiene todo el sitema.
- **App/src :** Logica de servidor
- **App/client :** Contiene todo el cliente

## Requisitos de instalacion
- **Node.js** - version mas reciente
- **Mongodb client** - version mas reciente
- **git** - version mas reciente

## Antes de iniciar el proyecto
**Ejecutar:**
> npm run inst


-> instala todas las dependencias tanto del servidor como del cliente.

**Crear variables de entorno:**
> copy .env.example / .env

- 1 Copiar las variables de entorno presentes en el archivo .env.example.
- 2 Crear un archivo en el directorio raiz con el nombre **.env**
- 3 Pegar las variables de **.env.example** en **.env**

## Ejecutar en modo desarrollo:
- **Mongo client** -> mongod
- **En el cliente :** -> npm run start
- **en el servidor** -> npm run dev

## Endpoints disponibles
- **User :**
    - > [get] - user/check
    - > [get] - user/:id
    - > [post] - user/signup
    - > [post] - user/singin
- **Shopping cart :**
    - > [get] - /car/products
    - > [put] - /cart/add
    - > [put] - /cart/remove
- **Manga :**
    - > [get] - manga/:title/:category?
- **Home :**
    - > [get] - /home/dashboard    