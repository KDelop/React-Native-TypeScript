# Athleticus App

## What is this?
This is the base Athleticus React-Native app. This repo only contains code pertaining to the UI portion of Athleticus. Server code is located in [`athleticus-server`](https://github.com/gregermendle/athleticus-server).


## Installation

For iOS development, ensure that XCode and XCode Commandline tools are installed.

`nvm` is a great tool for managing Node versions. Follow the instructions for installing `nvm` [here](https://github.com/nvm-sh/nvm)

Currently we are using Node 10 for both the app and server. Run the following to install the latest LTS version of Node 10 and npm.

```
nvm install 10 --lts
```

Install `react-native-cli` by running the following:

```
npm i -g react-native-cli
```

Install cocoapods using homebrew:

```
brew install cocoapods
```
Install node modules
```
npm i
```

Then install cocoapods by running the following:
```
cd ios
pod install
```

If `pod install` fails, ensure XCode is up-to-date

## Running

To run the app using the iOS simulator run the following command.

```
react-native run-ios
```

Use the `--simulator` option to define which phone generation you would like to use. Ie. `--simulator="iPhone 8"`

Once the simulator is running, you can then start the packaging server by running:

```
npm start
```

## Connecting to the Server

Set the IP address your `athleticus-server` is running at in `config.json`... Ie. `localhost:3000` if you're running the `athleticus-server` locally.

```
{
  "apiUri": "http://localhost:3000"
}

```

## Deploying to a device

You can deploy the Athleticus to an iPhone by opening the `ios/athleticus.xcodeproj` in XCode and pressing the play button in the top left corner of XCode. Ensure your device is the selected target for deployment.
