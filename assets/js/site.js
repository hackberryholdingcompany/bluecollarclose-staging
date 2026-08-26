(function () {
  var STORAGE_KEY = "bcc-landing-theme";

  function getTheme() {
    try {
      var t = localStorage.getItem(STORAGE_KEY);
      if (t === "light" || t === "dark") return t;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0D1116" : "#022E57");
  }

  // Theme buttons
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
    });
  });

  // Mobile nav
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMobile = document.querySelector("[data-nav-mobile]");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var open = navMobile.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Early access forms — relayed to the site inbox via FormSubmit (no backend)
  var EARLY_ACCESS_ENDPOINT = "https://formsubmit.co/ajax/bluecollarclose@gmail.com";
  document.querySelectorAll("[data-early-access-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var payload = {};
      fd.forEach(function (v, k) {
        payload[k] = v;
      });
      payload._subject = "Early access — " + (payload.path || "signup");
      payload._template = "table";
      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      fetch(EARLY_ACCESS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("relay " + res.status);
          form.classList.add("hidden");
          var success = form.parentElement.querySelector("[data-form-success]");
          if (success) success.classList.add("show");
        })
        .catch(function () {
          // Relay unreachable via fetch — plain POST fallback (FormSubmit's own page)
          form.submit();
        });
    });
  });

  // ROI calculator — industry math shape only, no BCC claims
  var job = document.getElementById("calc-job");
  var leads = document.getElementById("calc-leads");
  var rate = document.getElementById("calc-rate");
  var out = document.getElementById("calc-out");
  var outDetail = document.getElementById("calc-detail");

  function money(n) {
    return n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  function runCalc() {
    if (!job || !leads || !rate || !out) return;
    var j = parseFloat(job.value) || 0;
    var l = parseFloat(leads.value) || 0;
    var r = parseFloat(rate.value) || 0;
    // One more close per week ≈ 52 closes/year × average job
    var weeklyCloseValue = j * 52;
    // One point of close rate on monthly leads: (leads * 12) * 0.01 * job
    var onePoint = l * 12 * 0.01 * j;
    out.textContent = money(weeklyCloseValue);
    if (outDetail) {
      outDetail.textContent =
        "One more close a week at your average job ≈ " +
        money(weeklyCloseValue) +
        "/year. One point of close rate on " +
        l +
        " leads/month at " +
        money(j) +
        " ≈ " +
        money(onePoint) +
        "/year from the same lead volume (industry math shape — not a BCC claim).";
    }
  }

  [job, leads, rate].forEach(function (el) {
    if (el) el.addEventListener("input", runCalc);
  });
  runCalc();

  // Demo video: branded cover card until play is pressed
  var videoCover = document.querySelector("[data-video-cover]");
  var demoVideo = document.querySelector("[data-demo-video]");
  if (videoCover && demoVideo) {
    videoCover.addEventListener("click", function () {
      videoCover.classList.add("hidden");
      demoVideo.play();
    });
  }

  // Ensure theme is applied if script runs after paint without head script
  setTheme(getTheme());
})();
