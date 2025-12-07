// Načítanie zoznamu kamier z cameras.json a vykreslenie do mriežky
document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.getElementById("cameraGrid");

  fetch("cameras.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Nepodarilo sa načítať cameras.json");
      }
      return res.json();
    })
    .then((data) => {
      const cameras = (data && data.cameras) || [];

      if (!cameras.length) {
        gridEl.innerHTML =
          "<p style='color:white;text-align:center;padding:2rem;'>V cameras.json nie sú definované žiadne kamery.</p>";
        return;
      }

      // Vezmeme maximálne 4 kamery (2x2)
      cameras.slice(0, 4).forEach((cam) => {
        const tile = document.createElement("div");
        tile.className = "camera-tile";

        const iframe = document.createElement("iframe");
        iframe.src = cam.embedUrl || "";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        tile.appendChild(iframe);

        const info = document.createElement("div");
        info.className = "camera-info";

        const nameSpan = document.createElement("span");
        nameSpan.className = "camera-name";
        nameSpan.textContent = cam.name || "Neznáma kamera";

        info.appendChild(nameSpan);


        tile.appendChild(info);
        gridEl.appendChild(tile);
      });
    })
    .catch((err) => {
      console.error(err);
      gridEl.innerHTML =
        "<p style='color:white;text-align:center;padding:2rem;'>Chyba pri načítaní zoznamu kamier. Skontroluj cameras.json.</p>";
    });

  // Fullscreen tlačidlo – prepnutie celej stránky
  const fsBtn = document.getElementById("fullscreenToggle");
  fsBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      // zapnúť fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      // vypnúť fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });
});
