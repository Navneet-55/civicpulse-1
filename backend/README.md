# CivicPulse Backend API

Backend server for the CivicPulse Human Impact Assessment Tool.

## Features

- **Simulation API**: Generates empathy-based impact assessments for policy proposals
- **History API**: Stores and retrieves simulation history
- **RESTful endpoints**: Clean API design with proper error handling

## Installation

```bash
cd backend
npm install
```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## Production

Build and run:

```bash
npm run build
npm start
```

## API Endpoints

### POST `/api/simulate`

Runs a simulation for a policy proposal.

**Request Body:**
```json
{
  "prompt": "{\"title\":\"Policy Title\",\"description\":\"...\",\"location\":\"City, State\",\"demographics\":[\"Senior Citizens\",\"Low Income\"],\"date\":\"...\"}",
  "userId": "user-123"
}
```

**Response:**
```json
{
  "result": "{\"score\":42,\"personas\":[...],\"analysis\":\"...\"}"
}
```

### GET `/api/history`

Retrieves simulation history.

**Query Parameters:**
- `userId` (optional): Filter by user ID

**Response:**
```json
[
  {
    "id": "hist-...",
    "prompt": "...",
    "result": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "userId": "user-123"
  }
]
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Architecture

- **Express.js**: Web framework
- **TypeScript**: Type safety
- **In-memory storage**: History stored in memory (can be upgraded to database)
- **Modular design**: Separated routes, services, and types

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication & authorization
- Rate limiting
- Caching layer
- AI/ML integration for more sophisticated simulations


