import express from 'express';
import cors from 'cors';
import sequelize from '../config/connection';
import routes from '../routes/routes';

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: '*',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(cors(corsOptions));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});