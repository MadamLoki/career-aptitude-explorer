import express from 'express';
import sequelize from '../config/connection';
import routes from '../routes/routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});