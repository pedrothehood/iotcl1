# showsensordata
```# gauge-Darstellung, Absichern durch php-Code!    openui5 Link zur Hauptbibliothek ,View1.view.xmlRadialMicroChart size="L" ,    ``` 
Du bist ein Experte für OpenUI5 und SAP Fiori Entwicklung. 
Befolge strikt diese Coding-Standards:
- Nutze immer das asynchrone Modul-Laden (sap.ui.define).
- Verwende moderne asynchrone APIs (z.B. getService, nicht getComponent).
- Controller-Methoden sollten JSDoc-Kommentare enthalten.
- XML-Views müssen Stable IDs verwenden.
- Nutze das neue 'sap/ui/core/mvc/Controller'-Modell.
- Datenzugriffe immer auf REST-Services (PHP), die eine API zur Verfügung stellen 
- Keine Ausgabe mit Testdaten
- Programm mit dem openui5-Framework erstellen.
- namespace ist showsensordata , er soll in allen Programmobjekten und Dateien so benannt werden.
- Die Ordner- und Dateistruktur existiert bereits, fülle die Dateien direkt mit dem Code.
- Dateien mit dem richtigen Namen benennen.


Erstelle auch eine entsprechende i18n/i18n.properties Datei und referenziere diese in manifest.json
Erstelle folgende Dateien:
App.controller.js
View1.controller.js
css/style.css, mit Referenz auf manifest.json
i18n/i18n.properties mit Referenz auf manifest.json
model/models.js
view/App.view.xml
view/View1.view.xml
Component.js
manifest.json

Erstelle eine openui5-Applikation, die Sensordaten ausliest.

Zuoberst gibt es ein Eingabefeld, in dem der Sensor eingegeben werden kann, die sensorid. Nach Eingabe der Sensorid Ausgabe aller Temperaturdaten dieses Sensors.
Ein Button sendet die Anfrage an folgenden Webservice, der die Daten im Json-Format zurückgibt.
Lese die Daten von folgendem Rest-Service und verbinde ihn korrekt mit der App.
http://localhost/projekte-01/iotph1/getsdata.php?api_key=tP3434AATdasd444&sensor_id=<sensorid>

Lies die Sensordaten über obigen Rest-Service aus und zwar die zuletzt gemessene Temperatur (reading_time max) zuerst.

Gauge-Anzeige: Eine kreisförmige Gauge, die die aktuelle Temperatur darstellt (Farbe ändert sich je nach Temperatur).
Nutze für die Erstellung der Gauge das Element  RadialMicroChart. Dafür musst Du in der View die Bibliothek sap.suite.ui.microchart einbinden.
Der Wert der Temperatur-Anzeige soll von 10 - 40 Grad gehen, wobei 0-10 Grad Rot,33-40 Grad Rot, 11-18 Grad Gelb,25-32 Grad Gelb, und 19-24 Grad Grün anzuzeigen sind, Grösse des Gauge "L".

Es soll eine Tabelle mit den Sensordaten, absteigend nach Datum - Zeit(reading_time) sortiert dargestellt werden mit den Spalten Temperatur(value1),Luftfeuchtigkeit(value2) und Datum-Zeit(reading_time).
Die Spalten müssen die Bezeichnung "Temperatur","Luftfeuchtigkeit" und "Datum" beinhalten.

Die Tabelle Sensorid gibt die Felder sensorid und bezeichnung zurück. Diese beiden Felder sollen den Titel der Tabelle bilden. 
Die Tabelle Sensor gibt die eigentlichen Messdaten als Zeitreihe zurück:
Die Felder sind sensorid, value1(Temperatur), value2(Luftfeuchtigkeit) und reading_time(Zeit). Die Darstellung in der Tabelle soll nach reading_time absteigend erfolgen. 
