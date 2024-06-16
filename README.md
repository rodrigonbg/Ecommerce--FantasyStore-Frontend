# Fantasy-Store E-Commerce

Fantasy-Store es un proyecto de comercio electrónico basado en React que proporciona una plataforma básica para mostrar productos, permitir que los usuarios se registren, agreguen productos al carrito de compras y realicen pedidos ficticios. Tanto los productos como los usuarios registrados, así como las compras ficticias realizadas por ellos, se almacenan en Firebase.

## Tabla de Contenidos

1. [Tecnologías Utilizadas](#tecnologías-utilizadas)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Instalación](#instalación)
    - [Requisitos Previos](#requisitos-previos)
    - [Instrucciones de Instalación](#instrucciones-de-instalación)
4. [Configuración de Firebase](#configuración-de-firebase)
    - [Pasos para Configurar Firebase](#para-utilizar-firebase-en-esta-aplicación-sigue-estos-pasos)
5. [Contribuciones](#contribuciones)
6. [Licencia](#licencia)

## Tecnologías Utilizadas
- React
- React Router
- Firebase
- Bootstrap

## Descripción del Proyecto

Fantasy-Store está diseñado para ofrecer a los usuarios una experiencia de compra fluida. Ofrece las siguientes características:

- Registro de usuarios
- Visualización de una lista de productos disponibles
- Agregar productos al carrito de compras
- Ver y modificar el carrito de compras
- Realizar un pedido

## Instalación

### Requisitos Previos
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:
- [Node.js](https://nodejs.org/): Asegúrate de tener Node.js instalado en tu computadora.

### Para Instalar y Ejecutar la Aplicación en tu Máquina Local, Sigue Estos Pasos:
1. Clona el repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto.
3. Ejecuta el comando `npm install` para instalar las dependencias.
4. Ejecuta el comando `npm run start` para iniciar la aplicación.
5. Abre [http://localhost:3000/](http://localhost:3000/) en tu navegador web preferido.

## Configuración de Firebase

### Para Utilizar Firebase en esta Aplicación, Sigue Estos Pasos:
1. Crea una cuenta en Firebase y configura un nuevo proyecto.
2. En la sección "Autenticación" de Firebase, habilita el proveedor de autenticación por correo electrónico y contraseña.
3. En la sección "Firestore" de Firebase, crea una nueva base de datos y configura las reglas de seguridad para permitir acceso de lectura/escritura solo a usuarios autenticados.
4. En la sección "Configuración del proyecto" de Firebase, haz clic en "Agregar app" y sigue las instrucciones para agregar una nueva aplicación web.
5. Copia las credenciales de Firebase y configura las variables de entorno en el archivo `.env` de tu proyecto.

## Contribuciones
¡Agradecemos las contribuciones a Fantasy-Store! Para contribuir, sigue estos pasos:
1. Haz un fork del repositorio en GitHub.
2. Clona tu repositorio bifurcado en tu máquina local.
3. Crea una nueva rama para tu función o corrección de errores.
4. Realiza tus cambios y haz commit.
5. Sube tus cambios a tu repositorio bifurcado.
6. Crea una solicitud de extracción para enviar tus cambios para su revisión.

## Licencia
Este proyecto está bajo la Licencia MIT. Puedes encontrar más información en el archivo [LICENSE](LICENSE).# Front---FantasyStore
