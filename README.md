## Project Installation Requirements
- **step-1. Cloning this project. "https://github.com/abdullahalshahin/user-subscription-system.git"
- **step-2. Open this project on Code editor like Visual Studio Code.
- **step-3. Open the Terminal and run this command step by step...

## Run Backend
- **Open Terminal
```
cd server
npm install
cp .env.example .env
npm run dev
```

## Mail Configuration
- ** You have to change in .nev file. like:
```
MAIL_USERNAME=info@example.com
MAIL_PASSWORD=123456
```

## Run Frontend
- ** After Run Backend then you need set Backend or API URL to client/src/AppRoutes.js BASE_URL
- **Open Terminal
```
cd client
npm install
npm start
```
