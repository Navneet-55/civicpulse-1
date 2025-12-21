# Quick Start Guide

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:4000`

## Testing the API

### Test Simulation Endpoint

Using curl:
```bash
curl -X POST http://localhost:4000/api/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "{\"title\":\"Downtown Zoning Reform\",\"description\":\"Test policy\",\"location\":\"Austin, TX\",\"demographics\":[\"Senior Citizens\",\"Low Income\"],\"date\":\"2024-01-01\"}",
    "userId": "test-user"
  }'
```

### Test History Endpoint

```bash
curl http://localhost:4000/api/history
```

### Test Health Check

```bash
curl http://localhost:4000/health
```

## Integration with Frontend

The frontend is already configured to connect to `http://localhost:4000/api`. Just start both:

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev` (from root directory)

The frontend will automatically use the backend API when available.


