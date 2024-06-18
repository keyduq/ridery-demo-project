# Proyecto API demo para la Gestión de flota de vehículos.

Este proyecto utiliza Node.js, Express.js y MongoDB para crear una API REST que permite gestionar una flota de vehículos con autenticación JWT Bearer.

## Requisitos

- Node.js >= 20
- MongoDB >= 4.4
- npm >= 6.14
- Este proyecto usa bcrypt (usado para el hash de password del usuario) que depende de node-gyp para compilarse, en caso de correrlo en Windows, se debe tener instalado Python 2.7+ y Visual Studio 2015 o superior, o utilizar WSL con Ubuntu e instalar la dependencia con el comando `sudo apt install build-essential`.

## Configuración del proyecto

1. Clonar el repositorio
2. Instalar las dependencias:
    ```bash
    npm install
    ```
3. Copia el archivo `.env.example` a `.env`, coloca un string random en `JWT_SECRET` y modifica las otras variables de ser necesario, el archivo quedaria como:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/vehiculos
    JWT_SECRET=un_string_random
    JWT_EXPIRES_IN=1d
    ```
4. Ejecuta el seed para colocar un usuario de ejemplo con el comando:
    ```bash
    npm run seed
    ```
5. Inicia el servidor:
    ```bash
    npm start
    ```

## Endpoints

### Iniciar sesión para obtener JTW token

- URL: `/api/login`
- Método: `POST`
- Body:
  ```json
  {
    "username": "ridery",
    "password": "ridery"
  }
  ```

### Crear un vehículo

- URL: `/api/vehiculos`
- Método: `POST`
- Headers:
  - `Authorization: Bearer {JWT token}`
- Body:
  ```json
  {
    "marca": "Chevrolet",
    "modelo": "Aveo",
    "anio": 2018
  }

### Obtener vehículos

- URL: `/api/vehiculos`
- Método: `GET`
- Headers:
  - `Authorization: Bearer {JWT token}`

### Obtener vehículos por flota

- URL: `/api/vehiculos/:flota`
- Método: `GET`
- Headers:
  - `Authorization: Bearer {JWT Token}`

## Unit Tests

Las tests unitarias validan si el api funciona correctamente y si cumple la condición especificada en el documento de requerimientos. Para correr las pruebas se debe ejecutar el comando:

```bash
npm test
```

## Notas

- La API cuenta con un middleware de autenticación que verifica el JWT token en cada request.
- Por defecto el JWT token expira en 1 día, esto se puede modificar en el archivo `.env`.
