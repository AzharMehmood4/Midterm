# Coffee Shop App 

This is a **React Native app** built using **React Native CLI**. It's a simple coffee shop app where you can check the menu and see what’s available. Perfect for practicing your mobile app skills!

## Project Structure

```
Midterm/
├── backend/   # Node.js + Express backend (server, APIs, database)
└── frontend/  # React Native mobile app
```

---

## Getting Started

> **Note:** Make sure your environment is set up for React Native development. Follow the official [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) if you haven't done it yet.

---

## Step 1: Run the Backend

Navigate to your backend folder and start the server:

```sh
cd Midterm/backend
node server.js
```

This will start your backend server (APIs, database connection, etc.).

---

## Step 2: Run the Frontend (React Native App)

### Start Metro (JavaScript bundler)

Open a new terminal and run:

```sh
cd Midterm/frontend
npx react-native start
```

Metro will start and bundle your JavaScript code.

---

### Run the Android App

In a separate terminal (while Metro is running), run:

```sh
npx react-native run-android
```

Your app will build and launch on the Android Emulator or connected device.

---

## Step 3: Explore the App

* Open `App.tsx` in `Midterm/frontend` to make changes.
* Check the coffee shop menu. ☕️
* Fast Refresh will automatically update the app as you save changes.

> For Android, double-press **R** to reload.
> For iOS Simulator, press **R** to reload.

---

## Learn More

* [React Native Docs](https://reactnative.dev/docs/getting-started) – Learn about building apps.
* [Integration Guide](https://reactnative.dev/docs/integration-with-existing-apps) – If you want to add this to an existing app.
* [Metro Bundler](https://facebook.github.io/metro/) – Learn more about the JavaScript bundler.

---

## Troubleshooting

If you face errors while running the app or Metro, check the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

---

### Congratulations! 🎉

You now have a working **Coffee Shop React Native App** using React Native CLI. Enjoy exploring the menu and building features!
