# StackOverflow API

## About 🕹️

An API made for you to share your programming questions and get help from colleagues

## Documentation 🧾

### Create your user

```
POST /users
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 200: Success
```

#### What you will receive from this route

```jsx
[
    {
        token: uuid,
    },
];
```

---

### Create a question

```
POST /questions
```

#### Expected body

```jsx
{
  question: String, at least 10 characters, maximum 220 characters
  userToken: String, is the token given on creating a user
  tags: String, at least 2 characters, maximum 220 characters
}
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 401: You have not sent your token or your token is invalid
- 404: The user was not found
- 200: Success
```

#### What you will receive from this route

```jsx
[
    {
        id: questionId,
    },
];
```

---

### Answer a question

```
POST /questions/:questionId
```

#### Expected body

```jsx
{
  answer: String, at least 10 characters, maximum 220 characters
}
```

#### Possible response status

```bash
- 400: You have sent a invalid body
- 401: You have not sent your token or your token is invalid
- 400: The question is already answered
- 404: The question was not found
- 200: Success
```

---

### Get a question

```
GET /questions/questionId
```

#### Possible response status

```bash
- 400: Invalid
- 404: Question not found
- 200: Success
```

#### What you will receive from this route

```jsx
{
  "question": question,
  "student": studentName,
  "class": studentClass
  "tags": tags,
  "answered": Boolean,
  "submitAt": submitionDate,
  ...
  "answeredAt": answerDate,
  "answeredBy": answerUserToken,
  "asnwer": asnwer,
}
```

---

### Get all unanswered questions

```
GET /questions
```

#### What you will receive from this route

```jsx
[
  {
    "question": question,
    "student": studentName,
    "class": studentClass
    "tags": tags,
    "answered": Boolean,
    "submitAt": submitionDate,
  },
]
```

---

## How to run in your machine 🖥️

```
git clone https://github.com/victordurco/full-stack-overflow-developer
```

```
cd full-stack-overflow-developer
```

```
npm i --force
```

Create a .env.dev file and fill it using your environment variables following the example at .env.example file</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE your_db_name
```

```
\c your_db_name
```

Copy everything in the DATABASE.sql file and paste on the terminal</br>
You can not exit the postgres admin, and run

```
npm start
```

</br>

<br>

## 🧰 Tech Stack

<p align="center">
<img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="postgres" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img alt="nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img alt="expressjs" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
</p>

<br>
