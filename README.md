## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## JSON databse server

Run `npm run liveserver` for a events.json file live server, On successfull booking the the no.of tickets get updated in realtime, navigate to `http://localhost:3000/` for this json server.

## NOTE 
As per the application requirements given, it was requested to get the events related data from a local JSON file through http crud operations, I tried using a live `"json-server"``(https://www.npmjs.com/package/json-server)`, but stackblitz is not allowing to run both frontend and dbserver in same container application url. So instead of using a live json-server, I am using `"HttpClient-get"`  and  `"localStorage API"` to read and write the data in the application