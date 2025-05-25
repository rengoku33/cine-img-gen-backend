# imageify - text to image generator
* built using react frontend and node backend (typescript on both sides)
• utilizes starryai API for image generation
• 

## backend setup
This is the backend code, you need to separately install frontend from here: https://github.com/rengoku33/cine-img-gen-frontend
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/rengoku33/cine-img-gen-backend.git
   cd cine-img-gen-backend
   npm i
   ```
2. register at starryai and fetch the API Key, https://api.starryai.com/dashboard
3. Create .env in root directory
   ```bash
   STARRYAI_API_KEY=your_api_key
   ```
4. Run the app
   ```bash
   npm run dev
   ```
