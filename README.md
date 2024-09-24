WEATHER APP
This is a simple weather application that provides weather information for a given location by utilizing third-party APIs. It uses the OpenCage API to retrieve location coordinates and the OpenMeteo API to fetch weather data for that location.

FEATURES
-Get weather updates based on location coordinates.
-Fetch real-time weather data using the OpenMeteo API.
-Easily configure server settings and API keys.

TECHNOLOGIES USED
-Node.js
-Express.js
-OpenCage API (for location geocoding)
-OpenMeteo API (for weather data)

INSTALLATION
1. Clone the repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install dependencies:
npm i express axios opencage-api-client dotenv

3. Create an OpenCage API Key:
-Visit OpenCage API to create an account and generate your API key.

4. Add your OpenCage API key to the environment:
-In the project root, create a .env file with the following content:
API_KEY = your_api_key_here

5. Set your server port (optional):
-You can customize the port your server runs on by editing the server.js file. By default, the server runs on port 3000.

USAGE
1. Run the server:
npm start

2. The application will be available at http://localhost:3000

3. Use the app to fetch weather data by entering the location of your choice.

API INTEGRATION
OpenCage API
-The application uses OpenCage to convert location names into geographic coordinates (latitude and longitude). You will need to sign up for OpenCage and obtain your API key to use this feature.

OpenMeteo API
-Once the coordinates are obtained from OpenCage, the OpenMeteo API is used to get weather data for that location.



