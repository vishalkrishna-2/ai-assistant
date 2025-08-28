const express = require('express');
const cors = require('cors');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (index.html)

// Initialize Bedrock client
const bedrockClient = new BedrockRuntimeClient({ 
    region: process.env.AWS_REGION || 'us-east-1' 
});

// API endpoint for Bedrock integration
app.post('/api/bedrock', async (req, res) => {
    try {
        const { message, model = 'anthropic.claude-3-haiku-20240307-v1:0' } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Prepare the request for Claude
        const input = {
            modelId: model,
            contentType: 'application/json',
            body: JSON.stringify({
                anthropic_version: 'bedrock-2023-05-31',
                max_tokens: 1000,
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ]
            })
        };

        const command = new InvokeModelCommand(input);
        const response = await bedrockClient.send(command);
        
        // Parse the response
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        const aiResponse = responseBody.content[0].text;

        res.json({ 
            response: aiResponse,
            model: model
        });

    } catch (error) {
        console.error('Bedrock API Error:', error);
        res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Aleroh G-AI Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/bedrock`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});
