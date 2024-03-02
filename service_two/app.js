import express from "express";
import mongoose from 'mongoose';
import configureOpenTelemetry from "./tracing.js";


// Configure OpenTelemetry
configureOpenTelemetry("validate");

import { trace, context, propagation } from "@opentelemetry/api";

const app = express();
const PORT = 4007;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});

app.get("/validateuser", (req, res) => {
    const ctx = propagation.extract(context.active(), req.headers); // Extract context from incoming request headers
    const tracer = trace.getTracer("service-one-tracer");
    console.log("Incoming request headers:", req.headers);
    console.log(
      "Extracted span from context:",
      trace.getSpan(ctx)?.spanContext()
    ); // Retrieve span from extracted context
  
    const span = tracer.startSpan(
      "validate-user",
      {
        attributes: { "http.method": "GET", "http.url": req.url },
      },
      ctx
    );
    span.end();
    res.json({ success: true });
});

// API endpoint to check MongoDB
app.get('/check-mongo', (req, res) => {
    res.send('MongoDB is connected');
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});






app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
