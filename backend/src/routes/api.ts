import { Router, Request, Response } from 'express';
import { PolicyData, SimulateRequest, SimulateResponse, HistoryItem } from '../types';
import { generateSimulationResponse } from '../services/simulation';
import { addHistoryItem, getHistoryItems } from '../services/history';

const router = Router();

// POST /api/simulate
router.post('/simulate', async (req: Request, res: Response) => {
  try {
    const body: SimulateRequest = req.body;
    
    if (!body.prompt) {
      return res.status(400).json({ error: 'Missing prompt field' });
    }

    // Parse the policy data from the prompt string
    let policyData: PolicyData;
    try {
      policyData = JSON.parse(body.prompt);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON in prompt field' });
    }

    // Validate required fields
    if (!policyData.title || !policyData.location || !policyData.demographics) {
      return res.status(400).json({ error: 'Missing required policy fields: title, location, demographics' });
    }

    // Generate simulation response
    const simulationResponse = generateSimulationResponse(policyData);

    // Store in history
    const historyItem = addHistoryItem({
      prompt: body.prompt,
      result: JSON.stringify(simulationResponse),
      userId: body.userId || 'anonymous'
    });

    // Return the result as expected by frontend
    const response: SimulateResponse = {
      result: JSON.stringify(simulationResponse)
    };

    res.json(response);
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ error: 'Internal server error during simulation' });
  }
});

// GET /api/history
router.get('/history', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const history = getHistoryItems(userId);
    res.json(history);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Internal server error fetching history' });
  }
});

export default router;


