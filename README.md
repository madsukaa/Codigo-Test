<h3>Codigo-Test</h3>

Features
Animated UI Components: Smooth animations and transitions enhance user experience.
Responsive Design: Optimized for various screen sizes and orientations.
Navigation Grid: Circular navigation buttons with intuitive icons and labels.
Info Cards: Access to e-tickets and park hours with drop shadows for depth.
Upcoming Shows: Landscape-oriented showcase of upcoming events with interactive cards.
Notifications: Real-time alerts to keep users informed about important updates.
Banner Integration: Prominent banners to highlight special events or promotions.
Data Management: Loads data from JSON files for easy updates and scalability.
Demo:

https://github.com/user-attachments/assets/7750fdd4-d3ef-4d97-8b70-1099f1394878

Navigation:<br/>
<img src="https://github.com/user-attachments/assets/c7c18cb8-13ac-4df3-81fb-a13f0c0ee439" alt="Alt Text" width="30%"/>
<br/>
Code Management: <br/>
<img src="https://github.com/user-attachments/assets/44e2d551-8499-471d-8d12-3abc8b0fba81" alt="Alt Text" width="30%"/>
<br/>
State Management:<br/>
<img src="https://github.com/user-attachments/assets/69f8a3ac-1e32-4695-8b3c-4d66aaf9b444" alt="Alt Text" width="30%"/>
<br/>
UI Design:<br/>
<img src="https://github.com/user-attachments/assets/431e5759-55fb-4b35-9733-06badb3a8aea" alt="Alt Text" width="30%"/>
<br/>

Add a brief description of what the screenshot shows.

Installation
Follow the steps below to set up and run Codigo-Test on your local machine.

Prerequisites
Node.js: Ensure you have Node.js installed. Download Node.js
npm or Yarn: Package managers for installing dependencies.
React Native CLI: For running the app on simulators or physical devices.
Xcode (macOS only): Required for iOS development.
Android Studio: Required for Android development.
Steps
Clone the Repository

bash
Copy
git clone https://github.com/madsukaa/Codigo-Test.git
cd Codigo-Test
Install Dependencies

Using npm:
```
npm install
```
Or using Yarn:
```
yarn install
```
Link Native Dependencies

Some React Native packages might require linking. Although most are handled automatically, ensure all dependencies are properly linked.

```
npx react-native link
```
Run the Application

iOS
```
npx react-native run-ios
```
Android
```
npx react-native run-android
```
Ensure that you have a simulator/emulator running or a physical device connected.

Usage
Once the app is running on your device or simulator:

Project Structure
Here's an overview of the project's structure to help you navigate the codebase:

```
Codigo-Test/
.
├── app.json
├── assets
│   ├── Ellipse-19.png
│   ├── Group-126.png
│   ├── Group-275.png
│   ├── Group-310.png
│   ├── Group-341.png
│   ├── Group-342-2.png
│   ├── Group-342.png
│   ├── Icons-V2-2.png
│   ├── Icons-V2.png
│   ├── Layer-1.png
│   ├── Leading-icon.png
│   ├── On-2.png
│   ├── On.png
│   ├── adaptive-icon.png
│   ├── alligator-gar.jpg
│   ├── cheese-shark.jpg
│   ├── dive-feeding.jpg
│   ├── favicon.png
│   ├── icon.png
│   ├── image-3.png
│   ├── image1.png
│   ├── sea-fish.jpg
│   └── splash-icon.png
├── babel.config.js
├── index.ts
├── metro.config.js
├── package-lock.json
├── package.json
├── src
│   ├── components
│   │   ├── MovieItem.tsx
│   │   ├── ScreenView.tsx
│   │   ├── form
│   │   │   ├── MForm.tsx
│   │   │   ├── MPicker.tsx
│   │   │   ├── MSwitch.tsx
│   │   │   └── MTextInput.tsx
│   │   └── ui
│   │       ├── MButton.tsx
│   │       ├── MDraggableList.tsx
│   │       ├── MSelectableChips.tsx
│   │       └── MTypography.tsx
│   ├── config
│   │   ├── api
│   │   │   └── tmdbApi.ts
│   │   ├── hook
│   │   │   └── hooks.ts
│   │   ├── middleware
│   │   │   ├── ApiMiddleware.ts
│   │   │   └── Logger.ts
│   │   └── store
│   │       ├── ApiStore.ts
│   │       ├── DataSvc.ts
│   │       ├── Reducer.ts
│   │       ├── favorites.ts
│   │       ├── form.ts
│   │       ├── movies.ts
│   │       └── store.ts
│   ├── data
│   │   ├── Allergies.json
│   │   ├── Concern.json
│   │   ├── Diets.json
│   │   └── UIDesign.json
│   ├── index.tsx
│   ├── navigation
│   │   └── AppNavigator.tsx
│   ├── screens
│   │   ├── NavigationScreen.tsx
│   │   ├── TaskCodeManagement
│   │   │   ├── DetailsScreen.tsx
│   │   │   └── HomeScreen.tsx
│   │   ├── TaskStateManagement
│   │   │   ├── Codigo-Test.code-workspace
│   │   │   ├── MultiStageForm.tsx
│   │   │   ├── StageFive.tsx
│   │   │   ├── StageFour.tsx
│   │   │   ├── StageThree.tsx
│   │   │   └── StageTwo.tsx
│   │   └── TaskUIDesign
│   │       ├── UIDetails.tsx
│   │       └── UIHome.tsx
│   ├── styles
│   │   ├── globalStyles.ts
│   │   └── theme.ts
│   ├── types
│   │   ├── declarations.d.ts
│   │   ├── form.ts
│   │   └── uidesign.ts
│   └── utils
│       └── imageMap.ts
└── tsconfig.json
```

For any inquiries or support, please contact:

Name: Suhaimi Masri
Email: suhaimimasri@sukaa.my
GitHub: @madsukaa
LinkedIn: https://www.linkedin.com/in/suhaimi-masri
