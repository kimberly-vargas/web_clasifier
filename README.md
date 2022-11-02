## `Web Scraping - JavaScript`

<p align="center">
  <a href="https://github.com/jonathan20dev/"><img src="https://user-images.githubusercontent.com/61482376/199384913-f2f8fa29-a289-4109-96bb-7022e1d76243.png" alt="react native chat" width="50%" /></a>
</p>

</br>

=========== Descripcion del proyecto ===========

Aplicación creada para el curso de Sistemas Operativos - TEC

Esta aplicación es un clasificador de páginas web basado en el teorema de Bayes


> 
> **Kimberly** Vargas, **Jonathan** Mendoza y **Johan** Zamora

</br>

<img align="right" src="https://user-images.githubusercontent.com/84600029/199262467-30e51cfd-6a10-484a-b30a-0bf3d34ab6fd.png?auto=format,enhance" width="30%"/>

## Frontend
```
Descripción Frontend

Se consume el Endpoints: localhost:3001/urls
Se almacena en variables de estados [React.useState]
Se usa el método filter para dividir los resultados según las categorías: 
['Bloqueo', "Vestimenta", "Tecnología", "Sin Categoría"]

Los resultados se muestran con gráficas
 - PieChart: Gráfica en forma de Pie.
 - BarChart: Gráfica de barra.

 Extra:

 - Se implementa un estado para
   saber cuando el usuario quiere
   ver más páginas [Mostrar más] o
   Si solo quiere ver el 'Top 5'.


```


<img align="right" src="https://user-images.githubusercontent.com/84600029/199267556-fcda7f69-6884-4951-9ca0-e90786c2876e.png?auto=format,enhance" width="30%" />

## Backend
```
WEB SCRAPING
Se utilizó puppeteer, esta es una librería de node que 
utiliza Chrome Devtools Protocol (CDP), esta es una API
que permite gestionar instancias de los navegadores 
Chrome mediante connecciones con sockets

- Se toma una url
- Se abre una instancia de un browser
- Se abre una instancia de una página en ese browser
- Se dirige la página hacia la url
- Se espera por los selectores
- Se obtienen los elementos de html de esos selectores
- Se extrae el contenido de texto en esos elementos


MULTICORE
Se utilizaron los worker threads, esta es una característica
de Node, que permite correr código de javascript en paralelo
usando hilos, haciéndolo más rápido y eficiente.

¿Cómo se aplicó?
- Se dividen de forma equitativa las urls entre la cantidad 
  de CPUs -1 (-1 porque el 1 está reservado para el hilo 
  principal de javascript)

- Primer nivel de concurrencia: se envía un mensaje a un 
  worker para que cree un hilo por cada chunk y este los 
  ejecuta de forma paralela
  
- Segundo nivel de concurrencia: en cada hilo se divide el
  chunk asignado en tres partes y manda un mensaje a un
  segundo worker para que cree un sub-hilo por cada sub-chunk
  y ejecute en hilos aparte el scraping de la web.

```

## Bayes
```
El teorema de Bayes expresa la probabilidad de que ocurra un suceso A, teniendo en cuenta la información de otro
suceso ocurrido B. Este es súper útil para realizar clasificaciones con mayor índice de confianza
puesto que nos da una probabilidad condicionada. 

¿Cómo se aplicó?
Este bayes se aplica para 2 categorías:
Tecnología: 302 palabras
Ropa: 182

- Se obtienen todas las palabras de la categoria 1 y 2
- Se calcula la probabilidad previa para cada categoria: cantidad de palabras en una categoria / total de palabras de esa categoria
- Se calcula la cantidad de incidencias por categoria: recorre toda la lista de palabras encontradas en una url y se obtienen
  la cantidad de incidencias para cada categoria
- Se calcula la probabilidad de las incidencias: cantidad de incidencias en una categoria / total de palabras de esa categoria 
- Se calcula la probabilidad total por categoria: probabilidad previa de una categoria * probalidad de incidencias de esa categoria

Para dar un resultado se comparan ambas categorias y se escoge la que tenga una probabilidad mayor

```


## Screenshots de la app

  Gráficos                 |   Top 5 páginas        |
:-------------------------:|:-------------------------:|
![](https://user-images.githubusercontent.com/84600029/199262997-7de6f72b-b59b-4f6a-8f12-97249a015b24.PNG?raw=true)|![](https://user-images.githubusercontent.com/84600029/199263114-caaa363e-431b-4685-af59-e1bd5f9ab34a.PNG?raw=true)|!


  Botón["Mostrar más detalles"]                |   Endpoint                 |
:-------------------------:|:-------------------------:|
![](https://user-images.githubusercontent.com/84600029/199263361-8e3f4f3f-24b6-4518-9cbf-1d5c4cbd5287.PNG?raw=true)|![](https://user-images.githubusercontent.com/84600029/199262796-86b6d862-5130-4b3e-b8fd-70d5f346d9b7.PNG?raw=true)|!


  Inicio Backend              |   Fin Backend     |
:-------------------------:|:-------------------------:|
![](https://user-images.githubusercontent.com/84600029/199262705-654b1a52-87c9-4496-8ec2-1e39dd548269.PNG?raw=true)|![](https://user-images.githubusercontent.com/84600029/199268834-15511b9a-6ee5-436f-8268-63d8170a098d.PNG?raw=true)|!


## Instalación

### Clonar el repositorio

`git clone https://github.com/kimberly-vargas/web_clasifier.git`

### Correr Backend

`src [web_clasifier\backend]> npm i`

`src [web_clasifier\backend]> node index`

### Correr Frontend

`<src [web_clasifier\frontend]> npm i`

`<src [web_clasifier\frontend]> npm start`


## Autores 👍✨

| <img src="https://media-exp1.licdn.com/dms/image/C5603AQFIcEFL-NSfqA/profile-displayphoto-shrink_800_800/0/1627255607401?e=1669852800&v=beta&t=voVrrkA8xxrczDIkoYV21BwMfLU3z4yRKtKf17SBVZs" alt="Kimberly" width="200px" />  | <img src="https://avatars.githubusercontent.com/u/84600029?v=4" alt="Jonathan" width="200px" />  | <img src="https://media-exp1.licdn.com/dms/image/D4D35AQE_BKqRDHxSBg/profile-framedphoto-shrink_400_400/0/1633406292921?e=1667923200&v=beta&t=y2rgAINXgJGyerwizvXQqJ5lvgNSDJ_WGoFpSEU5pDo" alt="Johan" width="200px" />  |
| :------------: | :------------: | :------------: |
|  *Kimberly Vargas* | *Jonathan Mendoza*  | *Johan Zamora*  |
