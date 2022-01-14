const login = async () => {
  window.location='https://admin.streamduo.com/#/auth';
};

const signup = async () => {
  gtag_report_conversion();
  window.location='https://admin.streamduo.com/#/auth';
};

function contactSubmit(){
  const payload = {
    "dataPayload": {"source": "homepage",
    "name": document.getElementById('subs-name').value,
    "email":document.getElementById('subs-email').value}
  }

  let xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://api.streamduo.com/public/stream/dbc91d49-2998-4d32-8842-cf54c63824ab/record', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("thanks")
      document.getElementById('subs-name').value = '';
      document.getElementById('subs-email').value = '';
      let myModal = new bootstrap.Modal(document.getElementById('thankyou-modal'))
      myModal.show()
    }
  }
  xhr.send(JSON.stringify(payload));
  gtag('event', 'conversion', {'send_to': 'AW-10814868103/kVh7CNqKnIkDEIeV96Qo'});
}

const validCampaigns = ["api", "ftp", "streaming", "backend", "partner"]
const titleValues = {
  'api' : "Host Any Data on an API in Minutes.",
  'ftp' : "Ditch the FTP for Real-Time Data Integration.",
  'streaming': 'Stream Data Between Organizations in Minutes.',
  'backend': 'Backend Data Integration in Minutes.',
  'partner': 'Establish Partnerships with Real-time Data Integration.',
  'other': 'Real-time Data Integration Platform.'
}

const taglineValues = {
  'api' : "StreamDuo is a platform for B2B data integration. Setup a fully managed API in minutes.",
  'ftp' : "StreamDuo is a platform for real-time data exchange. Share data with your partners in real-time, using simple APIs.",
  'streaming': 'StreamDuo is a platform for private data streaming. Stream data with your partners in real-time, using simple APIs.',
  'backend': 'StreamDuo is a platform for backend data integration. Connect with your partners in real-time, using simple APIs.',
  'partner': 'StreamDuo is a platform for real-time data integration. Stream data with your partners using simple APIs.',
  'other': 'Don\'t host another API to connect with your partners. Securely stream data in real-time, using simple APIs.'
}

function getTitle()  {
  return (titleValues[getAd()])
}

function getTagline()  {
  return (taglineValues[getAd()])
}

function getAd() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('src');
  if (validCampaigns.includes(myParam)){
    return myParam;
  }
  return "other"
}

(function () {
  //===== Prealoder

  window.onload = function () {
    window.setTimeout(fadeout, 500);
  };

  function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
  }

  /*=====================================
    Sticky
    ======================================= */
  window.onscroll = function () {
    const header_navbar = document.querySelector(".navbar-area");
    const sticky = header_navbar.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
      logo.src = "assets/img/logo/sketch-dark.svg";
    } else {
      header_navbar.classList.remove("sticky");
      logo.src = "assets/img/logo/sketch-white.svg";
    }

    // show or hide the back-top-top button
    const backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  // for menu scroll
  const pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".page-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".page-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });

  // WOW active
  new WOW().init();

  //Set variable content
  document.getElementById("titleText").innerHTML = getTitle();
  document.getElementById("taglineText").innerHTML = getTagline();
})();
