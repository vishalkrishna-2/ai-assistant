# Aleroh G-AI - AWS Bedrock Integration

A modern AI chat application with AWS Bedrock integration, file upload capabilities, and a beautiful dark-themed interface.

## Features

- 🤖 **AWS Bedrock Integration** - Powered by Claude 3 Haiku
- 💬 **Multi-chat Support** - Separate conversation threads
- 📁 **File Upload** - Upload and preview files
- 🎨 **Dark Theme** - Modern, professional UI
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔄 **Real-time Chat** - Instant AI responses

## Prerequisites

- Node.js (v16 or higher)
- AWS Account with Bedrock access
- AWS CLI configured

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Credentials

Create a `.env` file in the root directory:

```env
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
PORT=3000
```

### 3. AWS Bedrock Access

Ensure your AWS account has access to Bedrock and the Claude model:
- Go to AWS Bedrock console
- Request access to `anthropic.claude-3-haiku-20240307-v1:0`
- Wait for approval (usually instant)

### 4. Run Locally

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The application will be available at: http://localhost:3000

## API Endpoints

- `POST /api/bedrock` - Send messages to AWS Bedrock
- `GET /api/health` - Health check endpoint

## Deployment

### AWS S3 + CloudFront (Frontend Only)
1. Upload `index.html` to S3 bucket
2. Enable static website hosting
3. Create CloudFront distribution
4. Configure custom domain (optional)

### AWS Lambda + API Gateway (Full Stack)
1. Deploy backend to Lambda
2. Create API Gateway
3. Update frontend API endpoint
4. Deploy frontend to S3/CloudFront

### AWS ECS/Fargate (Full Stack)
1. Containerize the application
2. Deploy to ECS with load balancer
3. Configure auto-scaling

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS Access Key | Required |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Key | Required |
| `AWS_REGION` | AWS Region | `us-east-1` |
| `PORT` | Server Port | `3000` |

## Security

- Use IAM roles with minimal Bedrock permissions
- Enable CORS appropriately
- Use environment variables for sensitive data
- Consider API Gateway for additional security

## Cost Optimization

- Monitor Bedrock usage with CloudWatch
- Set up billing alerts
- Choose appropriate model tiers
- Implement request caching if needed

## Troubleshooting

### Common Issues

1. **AWS Credentials Error**
   - Verify AWS CLI configuration
   - Check environment variables
   - Ensure Bedrock access is granted

2. **CORS Errors**
   - Check browser console for CORS issues
   - Verify API endpoint configuration

3. **Model Access Denied**
   - Request access to Claude model in Bedrock console
   - Wait for approval

## License

MIT License - see LICENSE file for details
