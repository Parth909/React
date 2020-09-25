# React
This is a simple **MERN** stack application

This is the [link](https://www.google.com)

#### After designing the backend used the following in the ### root of devconnector folder
For the react app
> npx create-react-app client 

#### After that use the following in the ### client folder
>npm i axios react-router-dom react-redux redux-thunk moment react-moment
>npm i redux-devtools-extension

#### Delete the git repo init by react in client folder 
##### What is the use of 2 repos huh !
>delete the **.gitignore & Readme.md** then
>cmd - `rm -rf .git` - delete git completely

#### In the package.json of the client folder
**Creating a proxy so that when making requests we won't have to use the full url** like
> `axios.get(http://localhost:5000/api/profile)`
**instead do it directly** like
> `axios.get(/api/profile)`

:warning:
#### Encountered one error that request can't be made to port 5000 instead going to port 3000
> In order for the proxy to work need to restart the server
> use the following in client/package.json
```javascript
"proxy":"localhost:5000"
// instead of "proxy":"http://localhost:5000"
```

:tada: :fireworks:
