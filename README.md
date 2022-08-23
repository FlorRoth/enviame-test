# Backend Test Envíame

La siguiente prueba requiere realizar el diseño y desarrollo de un microservicio de marketplace ecommerce.

El proyecto está enfocado en los aspectos operacionales de un proceso de marketplace ecommerce típico, por lo tanto **debes descartar procesos relacionados a pago y facturación**.

### Requerimientos técnicos

- Deberás elegir entre uno de los siguientes lenguajes + frameworks para desarrollar tu solución:
  - Python + Flask
  - NodeJS + Express
- Deberás utilizar Docker / docker-compose para proveer una aplicación Dockerizada.
- La API desarrollada deberá considerar algún mecanismo de autenticación como: API Key, Bearer Token, Basic Auth, OAuth.

Si no estás familiarizado con Docker, hemos compartido un template para Python y NodeJS, el que ha sido estructurado siguiendo los principios definidos por [Clean Architecture](https://www.google.com/search?q=clean+architecture). Te alentamos a que uses la plantilla provista y te recompensaremos con puntos adicionales por las siguientes dos razones:

- Leer y entender el código escrito por otro desarrollador es una habilidad necesaria y que valoramos.
- Es deseable la comprensión de los principios de Clean Architecture.

La plantilla proporciona bases de datos MySQL, Firestore y Redis listas para usar. Siéntente libre de usar cualquiera de estas herramientas o cualquier combinación de ellas.

### Plazo

Debes entregar la prueba en 72 horas (3 días).

### Antes de comenzar

Entrega un **repositorio privado de GitHub** con tu código y agrega a los siguientes usuarios como colaboradores: **@rolivagon @rsebjara @vmolina-enviame @vham @rcarrascop @DixonOrtiz**.

No te olvides de incluir en tu repositorio:

- Un microservicio dockerizado. Los archivos **Dockerfile y docker-compose.yml** son necesarios y requeridos.
- Una **colección de Postman o archivo req.http** con requests de ejemplo para probar todos los endpoints de tu microservicio.
- Un archivo de variables de ambiente **(no ignorar el archivo .env)** con todos sus valores necesarios para ejecutar tu servicio sin mayor problema.
- Un archivo README.md con las instrucciones sobre cómo ejecutar tu servicio en nuestros ambientes locales, además de otra información que consideres relevante para facilitar nuestra revisión.
- Un método para poblar automáticamente la base de datos con datos de prueba.

Por favor, antes de entregar tu prueba, asegúrate de probar tu servicio en un ambiente limpio desde el inicio. Con esto te asegurarás de probar en similares condiciones que las que tendrá nuestro equipo Dev para revisar tu prueba. **Si no podemos ejecutar tu servicio, tu prueba será descartada inmediatamente**.

Dado que se trata de una prueba de backend, concéntrate en entregar una API donde podamos probar todas las funcionalidades requeridas (he aquí la importancia de la colección de Postman o http.req). **No es necesario que desarrolles ninguna vista de frontend, ya que tampoco serán evaluadas**.

En caso de cualquier pregunta técnica, [contáctanos aquí](mailto:tech-test@enviame.io).

Una vez comenzada la revisión de tu prueba podríamos enviarte algunas preguntas. por lo que apreciaremos tus respuestas oportunas.

### Requerimiento

1. Desarrolle un microservicio (ms, de ahora en adelante) de marketplace ecommerce basándose en el siguiente modelo ![image](backend%20test%20model.drawio.png).
2. En el sistema deben existir las siguientes entidades:
   - usuarios: USER
   - productos: PRODUCT
   - categorías de productos: CATEGORY
   - transacciones de compra: TRANSACTION
3. En el sistema se deben implementar las siguientes reglas de negocio:
   - Un USER puede ser comprador (BUYER) y/o vendedor (SELLER).
   - Un USER es SELLER si al menos tiene un producto asociado.
   - Un USER es BUYER si al menos tiene una transacción de compra de producto.
   - Un producto siempre pertenece a una categoría y a un usuario (quien lo pone a la venta).
   - Un producto no puede estar en más de una categoría.
   - Una transacción siempre requiere a un usuario comprador y uno o más productos comprados.
   - Un producto tiene una cantidad de unidades, las que se van descontando en la medida en que las unidades son compradas. Una vez que su cantidad llega a cero, el producto cambia su status a inactivo. Sólo se pueden comprar productos activos, y un producto estará activo si existen unidades disponibles de él.
   - En el caso de una transacción cancelada, se debe restituir el stock del producto.
4. Desarrolle una API que implemente:
   - CRUD de USER, PRODUCT, CATEGORY y TRANSACTION.
   - Listado de USER por tipo (BUYER y SELLER).
   - Listado de TRANSACTION por tipo de USER.
   - Listado de CATEGORY relacionados con un BUYER USER.

### Aspectos a evaluar

Como se mencionó antes, es importante que escribas un archivo README.md con toda las instrucciones necesarias para ejecutar tu servicio, y una colección de Postman o un archivo req.http con ejemplos e instrucciones para probar tu API adecuadamente. **Si el README.md está incompleto y/o no proporcionas una colección de Postman o archivo req.http no podremos probar tu servicio, y por tanto no podremos evaluar tu prueba**.

- Funcionalidad (45 pts)
- Documentación (7 pts)
  - README.md
  - Colección de Postman o archivo req.http
- Estilo de programación (6 pts)
- Uso apropiado de respuestas HTTP (4 pts)
- Manejo adecuado de errores y excepciones (4 pts)
- Uso apropiado del template de Clean Architecture (4 pts)

### Aspectos que serán ignorados

- Diseño visual de la solución (frontend).
- Despliegue de la solución (despliegues en Heroku, Linode, AWS o similares no suman puntos).
