import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import indexRoutes from "./routes/index.routes.js";


const app = express();

app.use(express.json());

app.use('/api', productosRoutes);
app.use(indexRoutes);

app.use((req, res, next)=>{
  res.status(404).json({
    message: 'Endpoint not Found'
  })
});

export default app;