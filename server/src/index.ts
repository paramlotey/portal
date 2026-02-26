import express, { Request, Response, NextFunction } from "express";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Socket, Server } from "socket.io";
import http from "http";
import pool from "./config/db";
import profileRoute from './modules/profile/profile.routes'
import authRoute from './modules/auth/user/user.routes'
import errorHandler from "./middleware/errorrMiddleware";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Client connected: ", socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected : ", socket.id);
  });
});

const swaggerConfig = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Test Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/**/*.ts"], // ✅ FIX
});

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected successfully:", result.rows[0]);
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/api',profileRoute)
app.use('/api',authRoute)

// Routes

/**
 * @openapi
 * /start:
 *   get:
 *     tags:
 *      - Start
 *     summary: Start check
 *     responses:
 *       200:
 *         description: Server is started
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

/**
 * @openapi
 * /ui:
 *   get:
 *     tags:
 *      - ui
 *     summary: Start ui
 *     responses:
 *       200:
 *         description: ui is started
 */
app.get("/ui", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *      - Health
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});



// Error handling middleware
app.use(errorHandler);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
