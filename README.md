# Apollo - Express - PostgreSQL backend server

### PostgreSQL is an open source relational database

##### You'll have to install that manually, here are some tutorials:

https://www.postgresqltutorial.com/install-postgresql/ (windows)

https://www.postgresqltutorial.com/install-postgresql-linux/ (linux)

# Getting started

`git clone https://github.com/Nekuin/rayha-graphql-server.git`

`cd rayha-graphql-server`

`npm install`

`touch .env `

## .env file

After setting up your database and databse user, fill out the environment variables

```
PORT=3001
DATABASE=mydatabase
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
```

Start the server in a development environment easily with

`npm run dev`

# Example queries (playground mode)

```
# get all raiders
query all {
  raiders {
    name
    class
    spec
  }
}

# insert a raider
mutation add {
  addRaider(name: "Räystö", class: "Druid", spec: "Restoration") {
    name
    class
    spec
  }
}

# get a raider by name
query one {
  raider(name: "Nekuin") {
    name
    class
    spec
  }
}
```
