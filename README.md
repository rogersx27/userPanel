# Proyecto de Servidor Local con JS y SQLite

Este proyecto es una aplicación de renderizado del lado del servidor (Server Side Rendering - SSR) construida completamente en JavaScript. La aplicación crea un servidor local que se ejecuta en el puerto `3005` y maneja múltiples rutas. Utiliza una base de datos SQLite para el almacenamiento de datos y emplea Bun como gestor de paquetes.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas](#rutas)
- [Logger](#logger)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Licencia](#licencia)

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/rogersx27/userPanel.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd userPanel
    ```

3. Instala las dependencias utilizando Bun o Node:

    ```bash
    bun install
    ```
    ```bash
    node install
    ```

## Uso

Para iniciar el servidor, simplemente ejecuta el siguiente comando:

```bash
bun run dev
```
```bash
node run dev
```

## Rutas

El proyecto maneja las siguientes rutas:

- GET /health - Verifica el estado de salud del servidor.
- GET /notFound - Ruta para manejar páginas no encontradas (404).
- GET /login - Muestra la página de inicio de sesión.
- GET / - Redirige al inicio de sesión.
- GET /register - Muestra la página de registro.
- POST /signIn - Procesa la autenticación de usuario.
- POST /forgotPassword - Procesa la solicitud de recuperación de contraseña.
- GET /dashboard - Muestra el dashboard del usuario autenticado.
- GET /signUp - Procesa el registro del usuario
- POST /createEvent - Procesa la creación de un nuevo evento.

## Logger

Este proyecto incluye un sistema de logging que registra la actividad del servidor, así como cualquier error que ocurra durante la ejecución. Los logs se almacenan en el archivo logs/server.log.

##### El logger captura detalles como:

- Fecha y hora de cada solicitud.
- Método HTTP y ruta solicitada.
- Mensajes de error detallados en caso de fallos.
- Información relevante para la depuración y el monitoreo del servidor.
- Puedes revisar el archivo de logs para monitorear el comportamiento del servidor y diagnosticar problemas.

##  Tecnologías Utilizadas
1. JavaScript: Lenguaje principal del proyecto.
2. SQLite: Base de datos utilizada para el almacenamiento de datos.
3. Bun: Gestor de paquetes utilizado para manejar las dependencias.
4. dotenv: Para manejar variables de entorno.
5. sqlite3: Librería utilizada para interactuar con la base de datos SQLite

# Estructura del Proyecto
```lua
userPanel/
│
├── database/
│   ├── databaseServices/
│   │   ├── insert.js
│   │   ├── select.js
│   │   └── database.js
│   └── my_database.db
│
├── logs/
│   └── server.log
│
├── node_modules/
│   └── (módulos instalados por Bun)
│
├── public/
│   ├── css/
│   │   └── dashboardStyles.css
│   ├── js/
│   │   └── dashboardScript.js
│   └── pages/
│       ├── dashboard.html
│       ├── forgotPassword.html
│       ├── login.html
│       └── register.html
│
├── routes/
│   ├── createEvent.js
│   ├── dashboard.js
│   ├── forgotPassword.js
│   ├── health.js
│   ├── index.js
│   ├── login.js
│   ├── notFound.js
│   ├── register.js
│   ├── signIn.js
│   └── signUp.js
│
├── utils/
│   ├── helpers.js
│   └── logger.js
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```
