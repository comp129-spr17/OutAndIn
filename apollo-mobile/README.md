## How to run
Make sure you have Node and NPM installed

For iOS, you need XCode installed before running the following command.
Instructions for Android will come.

Next, run the following:
```
npm install -g react-native-cli
```

You will only need to install this once.

To run the mobile version, run the following:

### iOS (Can only run on Mac OS)

```
npm install
react-native run-ios
```
### if you run into an error after running the above that says something like

    "Provide a valid path to the desired application bundle. Print: Entry, “:CFBundleIdentifier”, Does Not Exist"

then go to cd ..../apollo-mobile/ios/build on command line
then 

mkdir Build
cd Build
ln -s ../Products
ln -s ../Intermediates 

then run react-native run-ios again
```

### Android (Any operating systems)

```
npm install
react-native run-android
```
