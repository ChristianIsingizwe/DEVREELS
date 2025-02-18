import config from './config/config'
import express from 'express'
import videoRoutes from './routes/videoRoutes'

const app = express()
app.use(express.json())
app.use('/api/videos', videoRoutes)

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});