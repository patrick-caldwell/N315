var TREEFROG_SERVICE = (function() {
  document.addEventListener("DOMContentLoaded", function() {
    try {
      let app = firebase.app();
      let features = ["auth", "database", "messaging", "storage"].filter(
        feature => typeof app[feature] === "function"
      ); //
      //document.getElementById("load");
    } catch (e) {
      console.error(e);
    }
  });

  var _db;

  var _initFirebase = function() {
    firebase
      .auth()
      .signInAnonymously()
      .then(function(result) {
        console.log("connected");
        _db = firebase.firestore();
        //_addContact();
      });
  };

  var _addContact = function() {
    let data = { fName: "Sarah", lName: "Jones" };

    _db
      .collection("contacts")
      .add(data)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        //_saveData();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  var _saveData = function(pageData) {
    _db
      .collection("pages")
      .add(pageData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        _saveData();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    // _db
    //   .collection("pages")
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       // clone template row and append to table body
    //       //var tr = tempTr.clone();
    //       //tr.data("id", doc.id);
    //       console.log("id", doc.id);
    //       var id = doc.id;
    //       var data = doc.data(); // set cell values from Contact data
    //       console.log("data", data);
    //     });
    //   });
  };

  var _checkMainNavName = function(mainNavName, callback) {
    var pages = _db.collection("pages");
    pages
      .get()
      .then(function(querySnapshot) {
        console.log("got someting ", querySnapshot.empty);
        if (querySnapshot.empty) {
          callback(mainNavName);
        } else {
          let query = pages.where("name", "==", mainNavName);
          console.log("not empty ", query);
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    // _db
    //   .collection("pages")
    //   .where("navName", "==", mainNavName)
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       console.log("got something", doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  var _getAddMainNav = function(navName) {
    let container = `<h1>Add Main Nav</h1><p>Now you have your navigation set now you can create your content. Below you will see your navigation name and a text editor. Create your content in the text editor and then click on “Save Page Info”. Once you have done that click on “PREVIEW SITE” to see what your web page looks like.</p><h4>nav > ${navName} </h4><div id="editor"></div><button id="savePage">Save Page</button><div id="ql-preview"></div>  `;

    return container;
  };

  var _getGetStartedContent = function() {
    let contentStr = `<h1>Treefrog CMS</h1><p>This is the screen where you will create your navigation and page content.</p><p>First, you will need to create a main navigation. Once you have created a main navigation you can create a sub-navigation if you would like to.</p><p>Once you create either a nav or sub-nav a text editor will pop up and you will be allowed to create your page content.</p>`;

    return contentStr;
  };

  var _getCreateNavButtons = function() {
    let buttonString = `<span id="createMainNav" class="btn btn-dark">Create Main Nav</span><span class="btn btn-dark">Create Sub Nav</span>`;

    return buttonString;
  };

  var _getHomeContent = function() {
    let homeContent = `<h1>Welcome to the Treefrog CMS</h1>
    <p>
      Here you will create your content for your webpages. You won't be able
      to create all page elements but only the content for the page.
    </p>

    <p>
      You must first create the navigation. Once you have the navigation
      created you can add page content and publish the page. You can even
      add sub navigation as well.
    </p>

    <p>
      Your fist step is to click on the Add Navigation link and add your
      first navigation link.
    </p>`;

    return homeContent;
  };

  var _getHomeStartButton = function() {
    let startBtn = `<span class="btn btn-dark get-started">Get Started</span>`;

    return startBtn;
  };

  return {
    getAddMainNav: _getAddMainNav,
    getGetStartedContent: _getGetStartedContent,
    getCreateNavButtons: _getCreateNavButtons,
    getHomeContent: _getHomeContent,
    getHomeStartButton: _getHomeStartButton,
    initFirebase: _initFirebase,
    checkMainNavName: _checkMainNavName,
    saveData: _saveData
  };
})();
