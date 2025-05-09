// player1.js
document.getElementById("searchBtn").addEventListener("click", () => {
    const artist = document.getElementById("artistInput").value;
    if (artist) {
      window.location.href = `/Sophomore_Sem2_Project5/player2.html?artist=${encodeURIComponent(artist)}`;
    }
  });
  