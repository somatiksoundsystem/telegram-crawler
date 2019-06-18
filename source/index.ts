import * as express from 'express';

const app = express();

app.get(`/`, (req, res) => {
    res.send(`Hello world!`);
});

app.listen(8080, () => console.log(`Server is started at http://localhost:8080`));
