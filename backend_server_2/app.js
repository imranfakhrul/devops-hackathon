const express = require('express');
const { context, setSpan, SpanKind, trace } = require('@opentelemetry/api');

// Get a tracer for the second server
const tracer2 = trace.getTracer('example-tracer-web-2');

const app = express();

app.post('/backend_server_2', (req, res) => {
  const span = tracer2.startSpan('Backend Server 2 POST', {
    kind: SpanKind.SERVER // server-side span
  });

  // You can access the current span's context to get the trace ID
  const traceId = trace.getSpan(context.active()).context().traceId;

  // Add the trace ID to the span as an attribute
  span.setAttribute('traceId', traceId);

  console.log('Received request from Backend Server 1');

  // End the span
  span.end();

  res.json({
    message: "Hello from server 2"
  });
});

app.listen(4001, () => {
  console.log('Backend Server 2 listening on port 4001');
});