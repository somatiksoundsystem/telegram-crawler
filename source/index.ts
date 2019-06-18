import * as express from 'express';

const app = express();

app.get(`/`, (req, res) => {
    res.send(`Hello world!`);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is started at http://localhost:${port}`));
