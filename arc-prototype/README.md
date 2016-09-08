# Create project with RAML prototype

This is a prototype of the Advanced REST Client (redesign 2016).

## How to use?

First checkout and enter the project:

```
git clone https://github.com/jarrodek/arc-prototype.git
cd arc-prototype/arc-prototype
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

### Chrome app version
Finally enter page `chrome://extensions/` in Chrome. Check `Developer mode` option (if not checked) and press `Load unpacked extension`. Navigate to `arc-prototype/create-project/app` and load the project. The app will appear in the list of installed apps as **ARC prototype**.
Launch the app and try the prototype.

### Browser's version
Since the prototype don't uses any Chrome specific API it can run in regular browser.

For simplicity install Polymer CLI (globally, require root privileges):
```
sudo npm install polymer -g
```
Go to the `app/`` directory and run the server:
```
cd app
polymer serve
```

There will be an error associated with lack of bower.json file but it doesn't matter in this case. The prototype is running at http://localhost:8080.
