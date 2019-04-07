#feedbacker
Herzlich Willkommen zum Quellcode unseres Prototypen für das HCI-Fach im SS2018 aus dem AI-Master. Um die Webapplikation zum laufen zu bekommen, müssen sowohl Node.js und MongoDB eingerichtet sein.

##Voraussetzungen
1. Node.js inklusive NPM
2. MongoDB

##Quickstart
1. In MongoDB eine neue Datenbank anlegen. Es werden die Collections "groups" und "states" benötigt.
2. Den Connection-String in der models/mdl_generics.js-Datei austauschen. Falls der Datenbank-Name von "feedbacker" abweicht, auch diesen ändern.
3. Über die Console/Terminal in den Ordner wechseln.
4. "npm install" und "npm start" ausführen.
5. Erreichbar unter "http://localhost:3003".