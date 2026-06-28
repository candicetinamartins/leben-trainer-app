# iOS Deployment

This app now has a Capacitor iOS wrapper in `ios/` that uses the same built web app from `dist/`.

## App Identity

- App name: `Leben in Deutschland Trainer`
- Bundle ID: `com.candicetinamartins.lebenindeutschlandtrainer`
- Web build folder: `dist`
- Capacitor config: `capacitor.config.json`

## Windows Steps

Run these before copying the project to a Mac:

```bash
npm install
npm run ios:sync
```

## Mac Steps

1. Copy the full `C:\Projects\lidphoneapp` folder to the Mac.
2. Install Xcode 26 or newer.
3. Install CocoaPods if needed:

```bash
sudo gem install cocoapods
```

4. From the project folder:

```bash
npm install
npm run ios:sync
cd ios/App
pod install
open App.xcworkspace
```

5. In Xcode:
   - Select the `App` project.
   - Set the Apple Developer Team under Signing & Capabilities.
   - Confirm the Bundle Identifier is `com.candicetinamartins.lebenindeutschlandtrainer`.
   - Set Version and Build.
   - Test on an iPhone or simulator.
   - Use Product > Archive.
   - In Organizer, choose Distribute App and upload to App Store Connect.

## App Store Connect

1. Create the app in App Store Connect with the same Bundle ID.
2. Upload the build from Xcode.
3. After processing, use TestFlight for tester review.
4. Complete the store listing, privacy answers, age rating, screenshots, and review information.

## Ads Note

The current iOS wrapper does not include the native Google Mobile Ads SDK yet. The app can be tested and submitted without iOS AdMob, or native iOS AdMob can be added later with an iOS AdMob app ID and ad unit ID.
