(() => {
  const config = window.SONTIMO_TV_CONFIG || {};
  const channelId = String(config.channelId || "").trim();
  const validChannel = /^UC[\w-]{22}$/.test(channelId);

  const player = document.getElementById("player");
  const setup = document.getElementById("setup");
  const liveBadge = document.getElementById("liveBadge");
  const liveDot = document.getElementById("liveDot");
  const nowTitle = document.getElementById("nowTitle");
  const youtubeLink = document.getElementById("youtubeLink");
  const reloadButton = document.getElementById("reloadButton");
  const fullscreenButton = document.getElementById("fullscreenButton");
  const screen = document.getElementById("screen");
  const toast = document.getElementById("toast");

  let toastTimer = 0;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("visible");
    }, 1800);
  }

  function embedUrl(cacheBust = false) {
    const params = new URLSearchParams({
      channel: channelId,
      autoplay: "1",
      mute: "0",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
    });

    if (cacheBust) params.set("t", String(Date.now()));

    return `https://www.youtube.com/embed/live_stream?${params.toString()}`;
  }

  function channelUrl() {
    if (config.channelUrl) return config.channelUrl;
    return `https://www.youtube.com/channel/${channelId}/live`;
  }

  function reload() {
    if (!validChannel) return;
    player.src = embedUrl(true);
    showToast("Yayın yenilendi");
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const request = screen.requestFullscreen?.();
      if (request?.catch) request.catch(() => undefined);
    } else {
      void document.exitFullscreen?.();
    }
  }

  if (validChannel) {
    player.src = embedUrl();
    player.classList.remove("hidden");
    setup.classList.add("hidden");
    youtubeLink.href = channelUrl();
    nowTitle.textContent = config.channelTitle || "Sontimo TV";
    liveBadge.classList.remove("hidden");
    liveDot.classList.remove("hidden");
  } else {
    youtubeLink.href = "https://www.youtube.com";
    nowTitle.textContent = "Kanal ayarlanmadı";
    liveBadge.classList.add("hidden");
    liveDot.classList.add("hidden");
    setup.classList.remove("hidden");
  }

  reloadButton.addEventListener("click", reload);
  fullscreenButton.addEventListener("click", toggleFullscreen);

  document.addEventListener("keydown", (event) => {
    if (event.target instanceof HTMLInputElement) return;

    if (event.key.toLowerCase() === "r") reload();
    if (event.key.toLowerCase() === "f") toggleFullscreen();
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.title = document.fullscreenElement
      ? "Tam ekrandan çık (F)"
      : "Tam ekran (F)";
  });
})();
