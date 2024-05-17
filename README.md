# ChallengeBackendJelou

#### 1. You're building a high-throughput API for a cryptocurrency trading platform. For this platform, time is extremely important because microseconds count when processing high-volume trade orders. For communicating with the API, you want to choose the verb that is fastest for read-only operations.
**What verb should you choose for retrieving trade orders with the API server?**

SELECT ONLY ONE

- **a. GET** 
- b. UPDATE
- c. DELETE
- d. POST

El método GET es el más rápido para obtener información desde el servidor, ya que el resto de métodos como UPDATE, DELETE, POST se utilizan normalmente para operaciones en donde se va a afectar a recursos del servidor. Además, el método GET ofrece la posibilidad de almacenar sus resultados en caché y también tiene menos sobrecarga de datos, ya que se envían sus datos en la URL como parámetros lo que hace que se requiera menos tiempo y recursos, en comparación a los otros métodos HTTP que envían los datos en el cuerpo de la solicitud.



#### 2. You work for a Customer Relationship Management (CRM) company. The company's clients gain CRM access through a RESTful API. The CRM allows clients to add contact information for customers, prospects, and related persons (e.g., virtual assistants or marketing directors). You want to choose an appropriate API request path so clients can easily retrieve information for a single contact while also being flexible for future software changes.

**Which of the following API paths should you use?**

SELECT ONLY ONE

- a. /customers/{customer_id}
- **b. /contacts/{contact_id}**
- c. /contacts/{contact_type}/all
- d. /customers/all

La ruta ideal sería */contacts/{contact_id}* ya que de esta forma al tener */contacts/* no se está especificando ningún tipo de contacto, por lo tanto podría ser cualquier de ellos (customers, prospects, and related persons) o incluso algún nuevo tipo de contacto que surja a futuro, y también,  al proporcionar el id del contacto en la ruta, se está accediendo un contacto único. En cambio con las otras alternativas se esta especificando el tipo de contacto como es el caso de customers y también se están obteniendo todos con */all*, cuando solo es necesario obtener uno.


#### 3. You work for a large social media network, and you've been tasked witherror handling for the API. You're trying to decide on an appropriate errorcode for authentication failures based on non-existent users and incorrect passwords. You want to balance security against brute force attacks with providing descriptive and true error codes.

**Which HTTP error code(s) should you use to keep the system secure and still report that an error occurred?**


SELECT ONLY ONE

- a. 404 if the user doesn't exist, and 403 if the password is wrong.
- **b. 403 if the user doesn't exist, and 401 if the password is wrong.**
- c. 500 if the user doesn't exist or if the password is wrong.
- d. 401 if the user doesn't exist or if the password is wrong.

La opción mas factible seria la b. ya que al utilizar el código de error 403 (Forbidden) cuando el usuario no existe es apropiado, ya que indica que el servidor entiende la solicitud, pero no la autoriza. De esta forma no se le revela a quien está intentando acceder si el problema está relacionado con la clave o con la existencia del usuario, priorizando así la seguridad. En cambio, si la contraseña es incorrecta, es correcto presentar un código 401, indicando claramente el erro de credenciales para el usuario que está intentando ingresar.



#### 4. You're writing documentation for requesting information about a given user in your system. Your system uses UUIDS (universally unique identifiers) as user identifiers. In your documentation, you want to show an example. 

**True or false: You should put a fake UUID into the example code (instead of just the text "UUID") as a placeholder.**

SELECT ONLY ONE
- **a. TRUE**
- b. FALSE

Lo mejor seria escribir directamente un UUID fake, de esta forma se tiene un ejemplo claro de como es exactamente un UUID para de esta forma evitar confusiones, haciendo mas precisa la documentación.


#### 5. You're building code to handle errors issued from a remote API server. The response may or may not have an error. 

**How much work should your method, handleErrors(response), handle?**

SELECT ONLY ONE

- **a. Check for the presence of an error. If it exists, then set a class property to the error.**
- b. Check for the presence of an error. If it exists, throw an exception with the error.
- c. Check for the presence of an error. If it exists, set a class property to the error, then throw an exception.


La opción a. sería una solución viable si una vez que se verifica si hay error y se establece una propiedad con el error, se retorna esa respuesta, ya que de esta forma estoy retornando la respuesta de lo que sucedió describiendo el error, sin la necesidad de lanzar una excepción que puede ser más costosa en términos de rendimiento y recursos.


#### 6. You have two classes: a database driver and an email driver. Both classes need to set errors so that your front-end interface displays any errors that transpire on your platform.

**Which way should you implement this error handling?**

SELECT ONLY ONE
- a. Write the error handling the same way in both classes, but keep it to one line of code.
- **b. Make a trait to handle errors so it'll collect errors in any class that uses it.**
- c. Make a driver-based error provider to handle errors in all classes that can issue errors.

La opción más adecuada sería la b. Ya que al crear un trait para manejar errores, se puede recopilar errores en cualquier clase que lo utilice, facilitando la reutilización del código y mantiene una estructura adecuada.


#### 7. You need to name the private method in your class that handles loopingthrough eCommerce products to collect and parse data. That data gets stored in an array and set as a class property. 

**Which of the following should you use to name your method?**

SELECT ONLY ONE

- a. loopThroughProductsAndParseData()
- b. loopProductsAndParse()
- **c. parseDataForProducts()**
- d. parseDataForProductsAndSetArray()

La opción correcta sería la c. parseDataForProducts(). Indica claramente que el método se encarga de analizar los productos y no se extiende demasiado en la longitud del nombre.


#### 8. There are multiple places in your codebase that need to access the database. To access the database, you need to supply credentials. You want to balance security with useability. 

**What strategy should you use to store and access these credentials?**

SELECT ONLY ONE

- a. Put them in the code that connects to the database for each place that needs database access.
- b. Put them in a configuration file, then include that file in the code everywhere that needs to access the database.
- c. Put the credentials into a configuration file, then load them with a database service provider.
- **d. Put them in a .env file, load data from it into a configuration system, then request the credentials from a database service provider.**

La mejor opción sería la d. Ya que de esta forma se prioriza la seguridad al evitar que las credenciales se incluyan directamente en el código y también, al cargar las credenciales desde un proveedor de servicios de base de datos, se facilita la gestión y actualización de las mismas.



## Scenario Analysis
#### Question: Given a distributed system that experiences latencies and occasional failures in one of its microservices, how would you optimize it? Describe your approach to identifying the problem, possible solutions, and how you would ensure high availability and resilience


Con la finalidad de identificar el problema que origina latencia y fallos ocasionales en uno de los microservicios, se pueden seguir las siguientes acciones:
- Implementar un sistema de monitoreo para rastrear métricas importantes como es el caso de los tiempos de respuesta, errores y la saturación de recursos por cada microservicio.
- Revisar y analizar los logs de los microservicios, para identificar el por qué surgen determinados errores.
- Realizar pruebas de carga y estrés para evaluar como responde el sistema ante un alto tráfico de peticiones.

Como parte de las posibles soluciones ante esta problemática y que permitan a la vez garantizar una alta disponibilidad y resiliencia se pueden considerar los siguientes aspectos:
- Optimizar el código del microservicio, mejorando las consultas a la base de datos e implementando paralelismo y concurrencia en la medida de lo posible, además eliminar código que sea innecesario.
- Implementar un balanceador de carga para distribuir el tráfico entrante entre diferentes instancias del microservicio en cuestión, evitando que sola una instancia se sobrecargue en picos altos de tráfico.
- Implementar un mecanismo de caché para almacenar respuestas a consultas habituales, reduciendo la carga en el microservicio, para ello se puede utilizar Redis como motor de base de datos, el cual almacena datos en memoria, siendo ideal para usarlo como cache en microservicios.
- Ajustar la configuración de la infraestructura para mejorar la escalabilidad o implementar estrategias de tolerancia a fallos, como la implementación de respaldos y redundancia en diferentes partes del sistema.
- Configurar alertas automáticas que se activen cuando las métricas de rendimiento superan ciertos niveles previamente establecidos, permitiendo una respuesta rápida a los problemas.
