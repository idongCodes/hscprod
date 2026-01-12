#!/bin/bash

# Send deployment email to client
echo "📧 Sending deployment update to client..."

curl -X POST http://localhost:3000/api/deployment-email \
  -H "Content-Type: application/json" \
  -d '{"type": "testimonialSystem"}'

echo "✅ Email sent successfully!"
