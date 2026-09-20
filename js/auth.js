/* Query Bench - Firebase Authentication */
(function () {
  "use strict";

  var firebaseConfig = {
    apiKey: "AIzaSyA4OQcxwiOFY5HwtTBhzkQ93Hh1oLvQrAk",
    authDomain: "sql-practice-12fcc.firebaseapp.com",
    projectId: "sql-practice-12fcc",
    storageBucket: "sql-practice-12fcc.firebasestorage.app",
    messagingSenderId: "191666286963",
    appId: "1:191666286963:web:df15c2d37f4f5901665506",
    measurementId: "G-K1RM8KN8XD"
  };

  if (!window.firebase) {
    console.error("Firebase SDK failed to load.");
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  var auth = firebase.auth();
  var isLoginPage = /\/login\.html$/i.test(window.location.pathname);

  window.QueryBenchAuth = {
    auth: auth,
    currentUser: null,

    signIn: function (email, password) {
      return auth.signInWithEmailAndPassword(email, password);
    },

    signUp: function (email, password, displayName) {
      return auth.createUserWithEmailAndPassword(email, password)
        .then(function (result) {
          if (displayName && result.user) {
            return result.user.updateProfile({
              displayName: displayName
            }).then(function () {
              return result;
            });
          }

          return result;
        });
    },

    signInWithGoogle: function () {
      var provider = new firebase.auth.GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account"
      });

      return auth.signInWithPopup(provider);
    },

    resetPassword: function (email) {
      return auth.sendPasswordResetEmail(email);
    },

    signOut: function () {
      return auth.signOut();
    },

    friendlyError: function (error) {
      var code = error && error.code ? error.code : "";

      var map = {
        "auth/invalid-email":
          "Please enter a valid email address.",

        "auth/missing-password":
          "Please enter your password.",

        "auth/weak-password":
          "Password should be at least 6 characters.",

        "auth/email-already-in-use":
          "An account already exists with this email.",

        "auth/user-not-found":
          "No account was found with this email.",

        "auth/wrong-password":
          "Incorrect password. Please try again.",

        "auth/invalid-credential":
          "Incorrect email or password.",

        "auth/popup-closed-by-user":
          "Google sign-in was cancelled.",

        "auth/popup-blocked":
          "Your browser blocked the Google sign-in popup.",

        "auth/account-exists-with-different-credential":
          "This email is already registered with another sign-in method.",

        "auth/too-many-requests":
          "Too many attempts. Please wait and try again.",

        "auth/network-request-failed":
          "Network error. Check your internet connection."
      };

      return map[code] ||
        (error && error.message
          ? error.message
          : "Authentication failed. Please try again.");
    }
  };

  auth.onAuthStateChanged(function (user) {

    window.QueryBenchAuth.currentUser = user || null;

    if (isLoginPage) {
      document.documentElement.classList.add("auth-ready");
      return;
    }

    if (!user) {
      window.location.replace("login.html");
      return;
    }

    var emailEl = document.getElementById("auth-user-email");

    if (emailEl) {
      var label = user.displayName || user.email || "Signed in";

      emailEl.textContent = label;
      emailEl.title = user.email || label;
    }

    document.body.classList.remove("auth-pending");

    document.documentElement.classList.add("auth-ready");

    window.dispatchEvent(
      new CustomEvent(
        "querybench-auth-ready",
        {
          detail: user
        }
      )
    );
  });

})();