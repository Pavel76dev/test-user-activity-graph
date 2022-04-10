- Приложение развернуто по адресу http://www.test-rr1.na4u.ru/

- Установка зависимостей
```
yarn
```
- Фронтенд может работать самостоятельно
```
yarn run start-react
```
```
http://localhost:3000/
```
- Для полноценного запуска необходимо настроить БД '\constants\index.js'
- Структура таблицы:
- id (Первичный,	int(10),	AUTO_INCREMENT)
- date_registration	(timestamp)
- date_last_activity	(timestamp)
- Собрать фронт
```
yarn run build
```
- Запустить node js
```
yarn start
```
```
http://localhost:3000/
```