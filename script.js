(function () {
  var D = window.SITE, $ = function (s) { return document.querySelector(s); };
  var ARROW = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5"/></svg>';
  var k = 0, ALL = [], BIZ = [];
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function rise(e) { e.classList.add("rise"); e.style.setProperty("--i", Math.min(k++, 12)); return e; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function go(it) {
    if (/^mailto:/.test(it.url)) location.href = it.url;
    else window.open(it.url, "_blank", "noopener,noreferrer");
  }

  function card(item, group, withImage) {
    var link = !!item.url, c = rise(el(link ? "a" : "div", "card" + (link ? "" : " static") + (item.live ? " is-live" : "")));
    if (link) {
      c.href = item.url; c.target = "_blank"; c.rel = "noopener noreferrer"; c.setAttribute("aria-label", item.name + " (opens in a new tab)");
      var entry = { label: item.name, note: item.description || "", url: item.url, group: group };
      ALL.push(entry); if (group === "business") BIZ.push(entry);
    }
    if (withImage && item.image) {
      var shot = el("div", "shot"), img = new Image();
      img.src = item.image; img.alt = ""; img.loading = "lazy"; img.decoding = "async";
      img.style.objectPosition = item.imagePosition || "50% 50%";
      img.onerror = function () { img.remove(); };
      shot.appendChild(img);
      if (link) shot.appendChild(el("span", "idx", pad(BIZ.length)));
      c.appendChild(shot);
    }
    var body = el("div", "body"), name = el("div", "name");
    name.appendChild(el("span", "", item.name));
    if (link) name.insertAdjacentHTML("beforeend", ARROW);
    body.appendChild(name);
    if (item.description) body.appendChild(el("p", "desc", item.description));
    var tags = el("div", "tags");
    if (item.status) {
      var t = el("span", "tag" + (item.live ? " live" : ""));
      if (item.live) t.appendChild(el("i", "dot"));
      t.appendChild(document.createTextNode(item.status)); tags.appendChild(t);
    }
    if (item.category) tags.appendChild(el("span", "tag", item.category));
    if (tags.children.length) body.appendChild(tags);
    c.appendChild(body);
    return c;
  }

  var biz = $("#biz");
  D.businesses.forEach(function (b) { biz.appendChild(card(b, "business", true)); });
  biz.appendChild(rise(el("div", "card empty", D.placeholder)));
  $("#c-biz").textContent = pad(D.businesses.length) + " active";
  var br = $("#brandList");
  D.brands.forEach(function (b) { br.appendChild(card(b, "brand", !!b.image)); });
  $("#c-brands").textContent = pad(D.brands.length);

  var rows = $("#rows");
  D.contact.forEach(function (r) {
    var a = rise(el("a", "row")); a.href = r.url;
    if (/^https?:/.test(r.url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.appendChild(el("span", "", r.label)); a.appendChild(el("span", "v", r.value));
    rows.appendChild(a);
    ALL.push({ label: r.label, note: r.value, url: r.url, group: "contact" });
  });
  $("#yr").textContent = new Date().getFullYear();

  /* cursor spotlight */
  document.querySelectorAll("a.card,.row").forEach(function (a) {
    a.addEventListener("pointermove", function (e) {
      var r = a.getBoundingClientRect();
      a.style.setProperty("--x", e.clientX - r.left + "px"); a.style.setProperty("--y", e.clientY - r.top + "px");
    });
  });

  /* theme + menu */
  var root = document.documentElement;
  $("#theme").addEventListener("click", function () {
    var next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    $('meta[name="theme-color"]').content = next === "light" ? "#fafafa" : "#0a0a0a";
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  var burger = $("#burger"), menu = $("#menu");
  function setMenu(o) { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); }
  burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });

  /* command palette */
  var pal = $("#pal"), q = $("#q"), res = $("#res"), cur = [], act = 0;
  function draw() {
    var v = q.value.trim().toLowerCase();
    cur = ALL.filter(function (l) { return (l.label + " " + l.note + " " + l.group).toLowerCase().indexOf(v) > -1; });
    act = Math.min(act, Math.max(cur.length - 1, 0));
    res.textContent = "";
    if (!cur.length) { res.appendChild(el("li", "none", "No matches")); return; }
    cur.forEach(function (l, i) {
      var li = el("li", i === act ? "on" : ""), s = el("span", "", l.label);
      li.setAttribute("role", "option"); li.dataset.k = i;
      if (l.note) s.appendChild(el("small", "", l.note));
      li.appendChild(s); li.appendChild(el("span", "grp", l.group)); res.appendChild(li);
    });
    var on = res.querySelector(".on"); if (on) on.scrollIntoView({ block: "nearest" });
  }
  function openPal() { q.value = ""; act = 0; draw(); pal.showModal(); q.focus(); }
  $("#open").addEventListener("click", openPal);
  q.addEventListener("input", function () { act = 0; draw(); });
  q.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); act = Math.min(act + 1, cur.length - 1); draw(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); act = Math.max(act - 1, 0); draw(); }
    else if (e.key === "Enter" && cur[act]) { go(cur[act]); pal.close(); }
  });
  res.addEventListener("click", function (e) { var li = e.target.closest("li[data-k]"); if (li) { go(cur[+li.dataset.k]); pal.close(); } });
  pal.addEventListener("click", function (e) { if (e.target === pal) pal.close(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
    if (pal.open || e.altKey || e.shiftKey) return;
    var t = e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA") return;
    if (e.key === "/" || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) { e.preventDefault(); openPal(); return; }
    if (!e.metaKey && !e.ctrlKey && /^[1-9]$/.test(e.key) && BIZ[e.key - 1]) go(BIZ[e.key - 1]);
  });
})();
