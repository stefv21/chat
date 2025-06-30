Chat App

A simple React Native chat application built with Expo. This project demonstrates a basic start screen (enter name + choose background color) and a chat screen placeholder, showcasing cross-platform native UI components.

Why Native vs. Web?

Native apps (iOS & Android) render true UI components (View, Text, TextInput, etc.) rather than HTML elements, providing better performance and access to device APIs.

Web apps run in a browser and use HTML/CSS/JS.

This chat app uses React Native + Expo to maintain one codebase for both platforms.

Prerequisites

Node.js (v16.19.0)

npm or yarn

Expo CLI (local via npx expo)

Expo Go app on your device, or Android Studio / Xcode Simulator

Getting Started

Clone the repository

git clone https://github.com/stefv21/chat.git
cd chat-app

Install dependencies

npm install
# or
yarn install

Start the Expo server

npx expo start --clear

Run on device or emulator

Physical device: Scan the QR code in the Metro Bundler with Expo Go.

Android Emulator: Press a in the terminal.

iOS Simulator: Press i in the terminal (macOS only).

Project Structure

chat-app/
├── App.js           # Navigation setup (Start & Chat)
├── index.js         # Expo entry point
├── components/
│   ├── Start.js     # Start screen (name + color picker)
│   └── Chat.js      # Chat screen placeholder
├── assets/
│   └── bgImage.png  # Background image for start screen
└── README.md        # This file

Core Dependencies

react-native & expo

@react-navigation/native & @react-navigation/native-stack

No additional native modules are required for this exercise.

Usage

Enter your name on the start screen.

Choose a background color.

Tap Start Chatting to navigate to the chat screen.

Observe your name in the header and the selected background color.

Recording a Demo

Android Emulator: Extended Controls → Screen record → Start → Demo → Stop → Save .mp4.

iOS Simulator: File > Record Screen → Demo → Click Stop Recording → Saves .mov to Desktop.

Physical iPhone (Expo Go):

Open Control Center (swipe down from top-right corner).

Tap the Screen Recording button (circle inside a circle).

Navigate through your app: enter name, choose color, tap Start Chatting, view chat screen.

Return to Control Center and tap the red record icon to stop; the video is saved to your Photos app

Trim to ~20–30s using QuickTime (macOS) or Photos app (Windows).

License

This project is released under the MIT License.

