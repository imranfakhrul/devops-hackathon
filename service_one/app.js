import express from "express";
import axios from "axios";
import { trace, context, propagation } from "@opentelemetry/api";
import configureOpenTelemetry from "./tracing.js"; // Assuming `tracing.js` is the correct file name and extension


const app = express();
const PORT = 4005

const tracerProvider = configureOpenTelemetry("start");

app.use((req, res, next) => {
    const tracer = tracerProvider.getTracer("service-one-tracer");
    const span = tracer.startSpan("service-one");
  
    // Add custom attributes or log additional information if needed
    span.setAttribute("user", "user made");
  
    // Pass the span to the request object for use in the route handler
    context.with(trace.setSpan(context.active(), span), () => {
      next();
    });
  });

app.get('/feed', async (req, res) => {
    // create traceid
    const parentSpan = trace.getSpan(context.active());
    // create parent span
    try{
        // need user info
        // const response = await fetch('http://localhost:4007/')
        // const data = await response.json()

        // if (parentSpan) {
        //     parentSpan.setAttribute("user.id", user.id);
        //     parentSpan.setAttribute("user.name", user.name);
        //   }

           // Call the /validateuser endpoint on apptwo before sending the user data
    // Ensure the context is propagated with the outgoing request
    const validateResponse = await context.with(
        trace.setSpan(context.active(), parentSpan),
        async () => {
          // Prepare headers for context injection
          const carrier = {};
          propagation.inject(context.active(), carrier);
  
          // Make the HTTP request with the injected context in headers
          return axios.get("http://localhost:4700/validateuser", {
            headers: carrier,
          });
        }
      );

      console.log("Validation response:", validateResponse.data); // Log or use the response as needed

        // Send the user data as a JSON response
        res.json({mess:"server one 4500"});


    }catch(error){
        if (parentSpan) {
            parentSpan.recordException(error);
          }
          res.status(500).send(error.message);
    }finally{
        if (parentSpan) {
            parentSpan.end();
          }
    }
    

    
});

app.get('/',(req,res) =>{
    // Access the parent span from the request's context
    const parentSpan = trace.getSpan(context.active());
    res.json({mess:"hello ismail"})

    try{
        res.json({mes:'parent span'})
        if(parentSpan){
            parentSpan.setAttribute('msg','done')
        }
    }catch(error){

    }finally{

    }

})

app.listen(PORT, ()=>{
    console.log(`listening to post${PORT}`);
});