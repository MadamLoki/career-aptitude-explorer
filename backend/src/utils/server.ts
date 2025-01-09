import express from 'express';
import cors from 'cors';
import sequelize from '../config/connection';
import routes from '../api/routes/routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Add CORS middleware first
app.use(cors({
    origin: 'https://api.adzuna.com/v1/api' 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Start server only after DB connection
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});