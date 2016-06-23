# Create project with RAML prototype

This is a prototype for creating a project in Advanced REST Client using RAML language.

## How to use?

First checkout and enter the project:

```
git clone https://github.com/jarrodek/arc-prototype.git
cd arc-prototype/create-project
```

Then download dependencies:

1) install [node.js](https://nodejs.org/)
2) install bower globally (requires administrator rights):
```
sudo npm install bower -g
```
3) Install project's dependencies
```
npm install
bower install
```

Finally enter page `chrome://extensions/` in Chrome. Check `Developer mode` option (if not checked) and press `Load unpacked extension`. Navigate to `arc-prototype/create-project/app` and load the project. The app will appear in the list of installed apps as **ARC proto - add project**.
Launch the app and try the prototype.
