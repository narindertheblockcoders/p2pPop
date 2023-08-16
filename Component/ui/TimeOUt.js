import { useEffect } from "react";

const TIMEOUT = 900000;
export default function TIMEOUTFN() {
  useEffect(() => {
    let lastInteraction = new Date().getTime();
    localStorage.setItem("lastInteraction", lastInteraction);
    // checkTimeout();
    // Set the time the user last interacted with the app

    // Function to check if the user has timed out
    function checkTimeout() {
      const now = new Date().getTime();
      const elapsedTime = now - lastInteraction;
      if (elapsedTime > TIMEOUT) {
        // Log out the user
        window.localStorage.clear();
        window.location.href = "/";
      } else {
        // Reset the timeout check
        setTimeout(checkTimeout, TIMEOUT - elapsedTime);
      }
    }

    // Add event listeners to track user interaction
    document.addEventListener("mousemove", function () {
      lastInteraction = new Date().getTime();
      localStorage.setItem("lastInteraction", lastInteraction);
    });

    document.addEventListener("keypress", function () {
      lastInteraction = new Date().getTime();
      localStorage.setItem("lastInteraction", lastInteraction);
    });

    // Start the timeout check
    setTimeout(checkTimeout, TIMEOUT);
  }, []);
}

// Set the timeout for 1 minute (60000 milliseconds)
