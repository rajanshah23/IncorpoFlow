const app = require("./src/app");

function createServer(){
    const port = process.env.PORT 

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }); 
}

createServer();