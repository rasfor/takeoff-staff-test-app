# Node version 18.5.0

# Запуск приложения

## Сначала необходимо запустить json server

### `json-server db.json -m ./node_modules/json-server-auth`

Перед его запуском необходимо выполнить
`npm install` 
`npm install -D json-server json-server-auth`

Сервер запустится по адресу http://localhost:3000

## Далее создаем новый терминал и запускаем само приложение

С помощью 

### `yarn start`

или

### `npm start`

Приложение запустится по адресу http://localhost:3001

## Затем отобразится страничка входа

Если вы захотите сразу перейти к странице контакты в адресной строке необходимо ввести http://localhost:3001/contacts
Но без авторизации вас редиректнет на страницу логина

Для входа в личный кабинет используйте следующие данные:

### `логин: test@mail.ru пароль: test`

Далее перед вами отобразится страница контактов, вы можете удалять/добавлять/редактировать их





