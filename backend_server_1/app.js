const express = require('express');
const app = express();
const axios = require('axios');
const { context, setSpan, SpanKind, trace } = require('@opentelemetry/api');

// Get a tracer for the first server
const tracer = trace.getTracer('example-tracer-web');

app.get('/trigger', async(req, res) => {
  const span = tracer.startSpan('Backend Server 1 GET', {
    kind: SpanKind.SERVER // server-side span
  });

  // You can access the current span's context to get the trace ID
  const traceId = trace.getSpan(context.active()).context().traceId;

  // Add the trace ID to the span as an attribute
  span.setAttribute('traceId', traceId);

  try{
    const r = await axios.post('http://localhost:4001/backend_server_2');
    res.json(r.data)
  } catch (error){
    console.error('Error making request to Backend Server 2:', error);
    res.status(500).send('Error making Backend Server 2');
  }

  // End the span
  span.end();
});

app.listen(4000, ()=>{
  console.log("listening to post 4000");
});