# drd Anamnesis App

## Development

Just follow the usual ionic development flow, including

`ionic serve` or `ionic serve --lab`

## Deployment information

`ionic cap build --prod --release`

Then choose the appropriate platform `ios` or `android`. Finish the build in the development IDE. The manual selection of the platform prevents potentially problematic re-installment of the mobile platforms.

### Android

There should be a managed key by Google in the developer console.

To port the old key, here is the keytool command 

`keytool -list -v -keystore drd.keystore`    
`keytool -keypasswd  -alias drd -keystore drd.keystore`

PEPK export with this command:

`java -jar pepk.jar --keystore=drd.keystore --alias=drd --output=encrypted_private_key_path --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a`

There is a caveat with the current version of the FileOpener cordova plugin. Gradle will show an error, the `FileProvider` class has to be changed to the following in the file shown by gradle in Android Studio.

`android:name="androidx.core.content.FileProvider"`

### iOS

Just check the app signature and update the project settings as suggested.
Compile time documentatino errors from the cordova plugins can be safely ignored.
For new upload to the App Store there needs to be a version bump.

### Web App

The app can be examined via firebase, as described in the configuration file `firebase.json`, if present. To deploy,

```bash
firebase login # if necessary
ionic build --prod --release
firebase deploy
```

which will deploy the `www` directory to the URL [https://app-name.web.app](https://drd-ionic.web.app), where `app-name` is what you specify in the configuration file.
