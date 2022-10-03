# MSG

Download [Expo](https://docs.expo.dev/get-started/installation/)

NOTE: by default Expo uses Yarn. Go install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) if you don't have it

Also make sure you have `npx` installed 


## The main part you came for


```
npm install -g npx
```


```
npm install --global expo-cli 

# check it 
expo whoami

# if you don't have an expo account
expo register

# If you already have an Expo account
expo login
```

Cool, now that you're set up with Expo, just run 

```
#install deps
expo install OR yarn install 

then...
npx pod install 
```

`expo install` will install all of your packages in `package.json` and then link the respective packages for Android. iOS requires one more step though, which is to link the packages to their respective pods. 
Note: `npx pod install` can be replaced with `pod install`, but requires you to be inside `/iOS` directory


Finally, start up iphone simulator or android studio and run the respective script: 
```
expo run:ios

OR 

expo run:android
```




