// src/stripe/StripeConfig.js

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Pb2FvRs6tJ2YQKupyrYUjYaXvCYARJlVqZNYAljAgGZ1rO2JM6vw8ZVGPk6IqF6dcdjdiY5EBztV19dqfKzJ3IW00zXb2YtpE"
);

export default stripePromise;
