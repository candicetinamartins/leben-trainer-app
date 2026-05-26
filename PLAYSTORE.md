# Play Store Release Notes

This repository now includes a native Android WebView wrapper in `android/` that packages the built web app from `android/app/src/main/assets/www`.

## What is ready

- Android package name: `com.candicetinamartins.lebenindeutschlandtrainer`
- `compileSdk` and `targetSdk`: 35
- Local WebView loading from `file:///android_asset/www/index.html`
- JavaScript and localStorage enabled for the trainer UI
- Network access limited to HTTPS
- AdSense is disabled inside the Android wrapper.
- Native AdMob banner support is enabled with Google test IDs.
- The web build still supports AdSense on the hosted website, but only after user consent.

## Android Ads

The Android app uses native AdMob, not website AdSense.

Current production IDs:

- App ID: `ca-app-pub-3677433573599533~7409223904`
- Banner ad unit: `ca-app-pub-3677433573599533/1773753842`

For local ad testing, use a test device in AdMob or temporarily switch back to Google's sample ad unit IDs. Do not repeatedly click or test real ads on your own device.

## Build Steps

1. Install Android Studio with Android SDK Platform 35 and JDK 17.
2. Run the web asset build:

```powershell
npm run build
```

3. Open the `android/` folder in Android Studio.
4. Let Android Studio sync Gradle.
5. Create an upload keystore and copy `android/signing.properties.example` to `android/signing.properties`.
6. Fill in the real keystore values in `android/signing.properties`.
7. Build the release app bundle:

```powershell
cd android
gradle bundleRelease
```

The release bundle will be written under `android/app/build/outputs/bundle/release/`.

## Play Console Checklist

- Upload the signed `.aab`.
- Complete App Content:
  - Privacy Policy URL
  - Data Safety form
  - Ads declaration
  - Content rating
  - Target audience
  - News/government/education declarations if prompted
- Add store listing:
  - App name
  - Short description
  - Full description
  - App icon
  - Feature graphic
  - Phone screenshots
- Mark the app as containing ads in Play Console and update Data Safety accordingly.
