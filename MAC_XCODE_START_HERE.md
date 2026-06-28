# Mac / Xcode Start Here

Open this package on the Mac that has Xcode installed.

## First-Time Setup

```bash
cd lidphoneapp-ios-xcode
npm install
npm run ios:sync
cd ios/App
pod install
open App.xcworkspace
```

If `pod install` says CocoaPods is missing:

```bash
sudo gem install cocoapods
```

## Xcode Steps

1. Open `ios/App/App.xcworkspace`, not `App.xcodeproj`.
2. In the left sidebar, click the `App` project.
3. Select the `App` target.
4. Go to `Signing & Capabilities`.
5. Select your Apple Developer Team.
6. Confirm the Bundle Identifier:

```text
com.candicetinamartins.lebenindeutschlandtrainer
```

7. Set Version to `1.0.0` or your next public version.
8. Set Build to `1` for the first iOS upload.
9. Choose an iPhone simulator or connected iPhone and press Run.
10. When it works, choose `Any iOS Device (arm64)` as the destination.
11. Use `Product > Archive`.
12. In Organizer, click `Distribute App`.
13. Choose App Store Connect upload.

## App Store Connect

Create the app using the same Bundle Identifier:

```text
com.candicetinamartins.lebenindeutschlandtrainer
```

Use TestFlight first before submitting to full App Review.

## Google Ads on iPhone

Google ads are allowed in iPhone apps, but the right path is AdMob with the Google Mobile Ads SDK for iOS.

This package disables the website-style AdSense ad slots inside the Capacitor iPhone build. That is intentional for the first TestFlight build. Add native iOS AdMob later using an iOS AdMob app ID and iOS ad unit ID.
