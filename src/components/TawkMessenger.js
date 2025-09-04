import { useEffect } from "react";

const TawkMessenger = () => {
  useEffect(() => {
    
    if (document.getElementById("tawk-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.id = "tawk-script";
      s1.async = true;
      s1.src = "https://embed.tawk.to/68a59800727c171927b34e48/1j33djh0d";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);

      window.Tawk_API.onLoad = function () {
      window.Tawk_API.addEvent('custom-greeting', {
        message: "Hi 👋 What type of photographer are you looking for? (Wedding / Event / Fashion)"
      });
    };
    })();
  }, []);

  return null; 
};

export default TawkMessenger;
