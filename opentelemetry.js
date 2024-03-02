const { context, setSpan, SpanKind, trace } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const mysql = require('mysql');
const connection = mysql.createConnection({ /* your connection settings */ });


app.get('/insert', (req, res) => {
  const span = tracer.startSpan('MySQL INSERT', { kind: SpanKind.CLIENT });
  context.with(setSpan(context.active(), span), () => {
    connection.query('INSERT INTO your_table SET ?', { /* your data */ }, (error, results, fields) => {
      if (error) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        span.end();
        throw error;
      }
      // Do something with results and fields...
      span.end();
      res.send('Insert successful!');
    });
  });
});

// Initialize a provider
const provider = new NodeTracerProvider();

// Configure span processor to send spans to the exporter
const exporter = new JaegerExporter({
  serviceName: 'your-service-name'
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Register the provider with the API to enable global configuration
provider.register();

// Register required instrumentations
registerInstrumentations({
  instrumentations: [
    '@opentelemetry/instrumentation-http',
    '@opentelemetry/instrumentation-express',
    '@opentelemetry/instrumentation-redis',
    'mongodb-instrumentation-package' // replace with actual package name
  ],
});

// Get a tracer
const tracer = trace.getTracer('example-tracer-web');

// Your application code - express server, redis client, mysql connection etc.
// Here's an example of how you can create a span and add a trace ID
app.get('/', (req, res) => {
  const span = tracer.startSpan('main route', {
    kind: SpanKind.SERVER // server-side span
  });

  // You can access the current span's context to get the trace ID
  const traceId = trace.getSpan(context.active()).context().traceId;

  // Add the trace ID to the span as an attribute
  span.setAttribute('traceId', traceId);

  // Do some work...

  // End the span
  span.end();

  res.send('Hello, World!');
});

// For the second server, you would repeat the process with a different service name
const provider2 = new NodeTracerProvider();
const exporter2 = new JaegerExporter({
  serviceName: 'your-second-service-name'
});
provider2.addSpanProcessor(new SimpleSpanProcessor(exporter2));
provider2.register();

// Get a tracer for the second server
const tracer2 = trace.getTracer('example-tracer-web-2');

// Set up the second server's routes similarly to the first
app2.get('/', (req, res) => {
  const span = tracer2.startSpan('main route', {
    kind: SpanKind.SERVER // server-side span
  });

  // You can access the current span's context to get the trace ID
  const traceId = trace.getSpan(context.active()).context().traceId;

  // Add the trace ID to the span as an attribute
  span.setAttribute('traceId', traceId);

  // Do some work...

  // End the span
  span.end();

  res.send('Hello, World!');
});