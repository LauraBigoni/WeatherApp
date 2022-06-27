# <img src="/src/assets/images/weather-app.png" alt="logo-readme" width="40"/> WeatherApp README

A simple Weather App with an Homepage where there are all Italian province showing the actual weather  

<img src="/src/assets/demo/Home-demo.gif" alt="home-demo" width="400" />

and a Province page where there are the weather details for every 3 hour of the day of the  
selected province with the possibility to change the day (Max 5 day forecast) in the dropdown-menu.

<img src="/src/assets/demo/Provincia-demo.gif" alt="provincia-demo" width="400" />

## Setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2, [Angular router](https://angular.io/api/router) and [Bootstrap](https://getbootstrap.com/).

### Api Reference

For this project i used [OpenWeather](https://openweathermap.org/) free API "5 day weather forecast".  

Endpoints used:  
**Required**: lat, lon, appid.  
**Optional**: units(standard, metric and imperial), lang.

### Files 

In this project i included a JSON file with all the Italian provinces, an example is shown below:   
`[
    {
    "city": "Firenze",
    "lat": "43.7714",
    "lng": "11.2542",
    "region": "Toscana"
    }
]`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.   
The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component.  
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/<project-name>` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.  
To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the  
[Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Credits 
MIT License

- [Laura Bigoni](https://github.com/LauraBigoni) Copyright&copy; 2022 

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
