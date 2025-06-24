// // document.addEventListener("DOMContentLoaded", function () {
// //   console.log("DOM fully loaded");
// //   loadLikedSongs(); // Call the function only after DOM is ready
// // });
// document.addEventListener("DOMContentLoaded", () => {
//   updateNavbar();
//   loadPlaylists();
//   loadSongs().then(() => {
//     loadLikedSongs();
//     if (window.location.pathname.includes("liked_songs.html")) {
//       showLikedSongs();
//     }
//   });
// });

// // Initialize variables
// let songIndex = 0;
// let audioElement = new Audio();
// let masterPlay = document.getElementById("masterPlay");
// let myProgressBar = document.getElementById("myProgressBar");
// let masterSongName = document.getElementById("masterSongName");
// let cov = document.getElementById("cov");
// let songItemContainer = document.getElementById("songItemContainer");

// let songs = [];

// console.log("On page load, likedSongs:", localStorage.getItem("likedSongs"));

// // Load songs from backend
// async function loadSongs() {
//   try {
//     let response = await fetch("http://localhost:5000/api/songs");
//     songs = await response.json();

//     songItemContainer.innerHTML = ""; // Clear previous items

//     songs.forEach((song, i) => {
//       let songItem = document.createElement("div");
//       songItem.classList.add("songItem");

//       songItem.innerHTML = `
//     <span class="covandplay">
//         <img src="${song.cover}" alt="${song.title}">
//         <i id="${i}" class="songItemPlay fa-solid fa-play"></i>
//     </span>
//     <span class="songName">${song.title}</span>
//     <span class="songListPlay">
//         <i id="like-${i}" class="likeButton fa-regular fa-heart" style="color:rgb(160, 160, 160); cursor: pointer;"></i>
//     </span>
// `;

//       songItemContainer.appendChild(songItem);
//     });

//     attachEventListeners();
//   } catch (error) {
//     console.error("Error fetching songs:", error);
//   }
// }

// // STARTING HERE
// // window.onload = function () {
// //   updateNavbar();
// //   loadPlaylists();
// //   loadSongs().then(() => {
// //     loadLikedSongs(); // Load liked songs after songs are loaded
// //     if (window.location.pathname.includes("liked_songs.html")) {
// //       showLikedSongs();
// //     }
// //   });
// // };
// document.addEventListener("DOMContentLoaded", () => {
//   updateNavbar();
//   loadPlaylists();
//   loadSongs().then(() => {
//     loadLikedSongs();
//     if (window.location.pathname.includes("liked_songs.html")) {
//       showLikedSongs();
//     }
//   });
// });

// // Function to toggle like status of a song
// function toggleLike(songId) {
//   let userEmail = localStorage.getItem("username");
//   if (!userEmail) {
//     alert("Please log in to like songs!");
//     return;
//   }

//   // Ensure songId is treated as a string
//   songId = String(songId);

//   let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
//   let likedSongs = userLikes[userEmail] || [];

//   // Normalize all stored liked IDs as strings
//   likedSongs = likedSongs.map(String);

//   let likeButton = document.getElementById(`like-${songId}`);
//   console.log(`Before toggle - User: ${userEmail}, Liked Songs:`, likedSongs);

//   if (likedSongs.includes(songId)) {
//     likedSongs = likedSongs.filter((id) => id !== songId);
//     likeButton?.classList.replace("fa-solid", "fa-regular");
//     console.log(`Song ${songId} removed from liked list.`);
//   } else {
//     likedSongs.push(songId);
//     likeButton?.classList.replace("fa-regular", "fa-solid");
//     console.log(`Song ${songId} added to liked list.`);
//   }

//   userLikes[userEmail] = likedSongs;
//   localStorage.setItem("likedSongs", JSON.stringify(userLikes));

//   console.log(
//     `After toggle - User: ${userEmail}, Liked Songs:`,
//     JSON.parse(localStorage.getItem("likedSongs"))
//   );

//   if (window.location.pathname.includes("liked_songs.html")) {
//     showLikedSongs();
//   }
// }

// // function toggleLike(songId) {
// //   let userEmail = localStorage.getItem("username");
// //   if (!userEmail) {
// //     alert("Please log in to like songs!");
// //     return;
// //   }

// //   let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
// //   let likedSongs = userLikes[userEmail] || [];
// //   let likeButton = document.getElementById(`like-${songId}`);
// //   console.log(`Before toggle - User: ${userEmail}, Liked Songs:`, likedSongs);

// //   if (likedSongs.includes(songId)) {
// //     likedSongs = likedSongs.filter((id) => id !== songId);
// //     likeButton?.classList.replace("fa-solid", "fa-regular");
// //     console.log(`Song ${songId} removed from liked list.`);
// //   } else {
// //     likedSongs.push(songId);
// //     likeButton?.classList.replace("fa-regular", "fa-solid");
// //     console.log(`Song ${songId} added to liked list.`);
// //   }

// //   userLikes[userEmail] = likedSongs;
// //   localStorage.setItem("likedSongs", JSON.stringify(userLikes));

// //   console.log(
// //     `After toggle - User: ${userEmail}, Liked Songs:`,
// //     JSON.parse(localStorage.getItem("likedSongs"))
// //   );

// //   if (window.location.pathname.includes("liked_songs.html")) {
// //     showLikedSongs();
// //   }
// // }

// // Load liked songs when the page loads
// function loadLikedSongs() {
//   let userEmail = localStorage.getItem("username");
//   if (!userEmail) return;

//   let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
//   let likedSongs = userLikes[userEmail] || [];

//   console.log("Loading liked songs for", userEmail, ":", likedSongs); // Debugging log

//   likedSongs.forEach((songId) => {
//     let likeButton = document.getElementById(`like-${songId}`);
//     if (likeButton) {
//       console.log("Marking song as liked:", songId); // Debugging log
//       likeButton.classList.replace("fa-regular", "fa-solid");
//     } else {
//       console.warn("Like button not found for songId:", songId); // Warning if button is missing
//     }
//   });
// }

// // Function to display liked songs on the liked songs page
// function showLikedSongs() {
//   let userEmail = localStorage.getItem("username");
//   if (!userEmail) {
//     alert("Please log in to view your liked songs!");
//     return;
//   }

//   let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
//   let likedSongIds = userLikes[userEmail] || [];
//   let likedSongs = songs.filter((song) =>
//     likedSongIds.includes(song.id.toString())
//   );

//   let songItemContainer = document.getElementById("songItemContainer");
//   songItemContainer.innerHTML = "";

//   likedSongs.forEach((song) => {
//     let songItem = document.createElement("div");
//     songItem.classList.add("songItem");
//     songItem.innerHTML = `
//       <span class="covandplay">
//           <img src="${song.cover}" alt="${song.title}">
//           <i id="${song.id}" class="songItemPlay fa-solid fa-play"></i>
//       </span>
//       <span class="songName">${song.title}</span>
//       <span class="songListPlay">
//           <i id="like-${song.id}" class="likeButton fa-solid fa-heart" style="color: red; cursor: pointer;"></i>
//       </span>
//     `;
//     songItemContainer.appendChild(songItem);
//   });

//   attachEventListeners();
// }

// // Function to attach event listeners for playing songs and liking them
// function attachEventListeners() {
//   document.querySelectorAll(".songItemPlay").forEach((element) => {
//     element.addEventListener("click", (e) => {
//       let clickedId = parseInt(e.target.id);
//       if (isNaN(clickedId) || !songs[clickedId]) return;

//       if (songIndex === clickedId && !audioElement.paused) {
//         audioElement.pause();
//         e.target.classList.replace("fa-pause", "fa-play");
//         masterPlay.classList.replace("fa-pause", "fa-play");
//       } else {
//         makeAllPlays();
//         songIndex = clickedId;
//         audioElement.src = songs[songIndex].audioUrl;
//         masterSongName.innerText = songs[songIndex].title;
//         cov.src = songs[songIndex].cover;

//         audioElement.currentTime = 0;
//         audioElement.play();

//         e.target.classList.replace("fa-play", "fa-pause");
//         masterPlay.classList.replace("fa-play", "fa-pause");
//       }
//     });
//   });

//   document.querySelectorAll(".likeButton").forEach((element) => {
//     element.addEventListener("click", (e) => {
//       let songId = e.target.id.replace("like-", "");
//       toggleLike(songId);
//     });
//   });
// }

// // Function to load playlists in the navbar
// function loadPlaylists() {
//   let playlistsContainer = document.getElementById("playlistsContainer");
//   playlistsContainer.innerHTML = `
//     <div class="playlistItem" onclick="showLikedSongs()"> Liked Songs</div>
//   `;
// }

// // Ensure everything is loaded properly when the DOM is ready
// // document.addEventListener("DOMContentLoaded", () => {
// //   loadSongs().then(() => {
// //     loadLikedSongs();
// //     if (window.location.pathname.includes("liked_songs.html")) {
// //       showLikedSongs();
// //     }
// //   });
// // });

// // Play/Pause Button
// masterPlay.addEventListener("click", () => {
//   if (audioElement.paused || audioElement.currentTime <= 0) {
//     audioElement.play();
//     masterPlay.classList.remove("fa-play");
//     masterPlay.classList.add("fa-pause");
//     updatePlayButton(songIndex);
//   } else {
//     audioElement.pause();
//     masterPlay.classList.remove("fa-pause");
//     masterPlay.classList.add("fa-play");
//     makeAllPlays();
//   }
// });

// // Update Progress Bar
// audioElement.addEventListener("timeupdate", () => {
//   if (audioElement.duration) {
//     // Ensure duration is available
//     let progress = (audioElement.currentTime / audioElement.duration) * 100;
//     myProgressBar.value = progress;
//   }
// });

// myProgressBar.addEventListener("change", () => {
//   if (audioElement.duration) {
//     audioElement.currentTime =
//       (myProgressBar.value * audioElement.duration) / 100;
//   }
// });

// // Next & Previous Buttons
// document.getElementById("next").addEventListener("click", () => {
//   songIndex = (songIndex + 1) % songs.length;
//   playSong(songIndex);
// });

// document.getElementById("previous").addEventListener("click", () => {
//   songIndex = (songIndex - 1 + songs.length) % songs.length;
//   playSong(songIndex);
// });

// // Play a song
// function playSong(index) {
//   makeAllPlays();
//   audioElement.src = songs[index].audioUrl;
//   masterSongName.innerText = songs[index].title;
//   cov.src = songs[index].cover;

//   audioElement.load(); // Ensures metadata is refreshed before playing
//   audioElement.currentTime = 0;

//   audioElement.addEventListener(
//     "loadedmetadata",
//     () => {
//       audioElement.play();
//       myProgressBar.value = 0; // Ensure progress starts from 0
//       masterPlay.classList.remove("fa-play");
//       masterPlay.classList.add("fa-pause");
//       updatePlayButton(index);
//     },
//     { once: true }
//   );
// }

// // Reset all play buttons
// function makeAllPlays() {
//   document.querySelectorAll(".songItemPlay").forEach((el) => {
//     el.classList.remove("fa-pause");
//     el.classList.add("fa-play");
//   });
// }

// // Update play button for current song
// function updatePlayButton(index) {
//   let playButton = document.getElementById(index);
//   if (playButton) {
//     playButton.classList.remove("fa-play");
//     playButton.classList.add("fa-pause");
//   }
// }

// // Load songs when page loads
// // loadSongs();

// //login logic

// // Show Login Popup
// function showLoginPopup() {
//   document.getElementById("loginPopup").style.display = "flex";
// }

// // Close Login Popup
// function closeLoginPopup() {
//   document.getElementById("loginPopup").style.display = "none";
// }

// // Handle Login Request
// async function handleLogin() {
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;

//   try {
//     let response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     let data = await response.json();
//     console.log("Server Response:", data);

//     if (response.ok) {
//       alert("Login successful!");
//       closeLoginPopup();

//       // Store authentication token and username
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.username);

//       updateNavbar(); // Update the navbar dynamically
//     } else {
//       document.getElementById("loginError").style.display = "block";
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//   }
// }

// // Update navbar based on login status
// function updateNavbar() {
//   let token = localStorage.getItem("token");
//   let username = localStorage.getItem("username");

//   if (token && username) {
//     document.getElementById("loginNav").style.display = "none"; // Hide Login
//     document.getElementById("userDropdown").style.display = "block"; // Show Username
//     document.getElementById("usernameDisplay").innerText = username; // Set Username
//   } else {
//     document.getElementById("loginNav").style.display = "block"; // Show Login
//     document.getElementById("userDropdown").style.display = "none"; // Hide Username Dropdown
//   }
// }

// // Logout functionality
// function logout() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
//   alert("Logged out successfully!");

//   updateNavbar(); // Refresh navbar
//   window.location.href = "index.html"; // Redirect to homepage
// }

// // Toggle dropdown menu
// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("usernameDisplay")
//     .addEventListener("click", function () {
//       let dropdown = document.getElementById("dropdownMenu");
//       dropdown.style.display =
//         dropdown.style.display === "block" ? "none" : "block";
//     });
// });

console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded triggered");
  console.log("Current pathname:", window.location.pathname);
});

// Initialize variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let cov = document.getElementById("cov");
let songItemContainer =
  document.getElementById("songItemContainer") ||
  document.getElementById("likedSongsContainer");

let songs = [];

console.log("On page load, likedSongs:", localStorage.getItem("likedSongs"));

// Load songs from backend
async function loadSongs() {
  try {
    let response = await fetch("http://localhost:5000/api/songs");
    songs = await response.json();
    console.log("Fetched songs:", songs);

    songItemContainer.innerHTML = ""; // Clear previous items

    //     songs.forEach((song, i) => {
    //       let songItem = document.createElement("div");
    //       songItem.classList.add("songItem");

    //       songItem.innerHTML = `
    //     <span class="covandplay">
    //         <img src="${song.cover}" alt="${song.title}">
    //         <i id="${i}" class="songItemPlay fa-solid fa-play"></i>
    //     </span>
    //     <span class="songName">${song.title}</span>
    //     <span class="songListPlay">
    //         <i id="like-${i}" class="likeButton fa-regular fa-heart" style="color:rgb(160, 160, 160); cursor: pointer;"></i>
    //     </span>
    // `;

    //       songItemContainer.appendChild(songItem);
    //     });
    if (!window.location.pathname.includes("liked_songs.html")) {
      songs.forEach((song, i) => {
        let songItem = document.createElement("div");
        songItem.classList.add("songItem");

        songItem.innerHTML = `
          <span class="covandplay">
              <img src="${song.cover}" alt="${song.title}">
              <i id="${i}" class="songItemPlay fa-solid fa-play"></i>
          </span>
          <span class="songName">${song.title}</span>
          <span class="songListPlay">
              <i id="like-${i}" class="likeButton fa-regular fa-heart" style="color:rgb(160, 160, 160); cursor: pointer;"></i>
          </span>
        `;

        songItemContainer.appendChild(songItem);
      });
    }

    attachEventListeners();
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

// STARTING HERE
// document.addEventListener("DOMContentLoaded", () => {
//   updateNavbar();
//   loadPlaylists();
//   loadSongs().then(() => {
//     loadLikedSongs();
//     if (window.location.pathname.includes("liked_songs.html")) {
//       showLikedSongs();
//     }
//   });
// });

// Function to toggle like status of a song
function toggleLike(songId) {
  let userEmail = localStorage.getItem("username");
  if (!userEmail) {
    alert("Please log in to like songs!");
    return;
  }

  // Ensure songId is treated as a string
  songId = String(songId);

  let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
  let likedSongs = userLikes[userEmail] || [];

  // Normalize all stored liked IDs as strings
  likedSongs = likedSongs.map(String);

  let likeButton = document.getElementById(`like-${songId}`);
  console.log(`Before toggle - User: ${userEmail}, Liked Songs:`, likedSongs);

  if (likedSongs.includes(songId)) {
    likedSongs = likedSongs.filter((id) => id !== songId);
    likeButton?.classList.replace("fa-solid", "fa-regular");
    console.log(`Song ${songId} removed from liked list.`);
  } else {
    likedSongs.push(songId);
    likeButton?.classList.replace("fa-regular", "fa-solid");
    console.log(`Song ${songId} added to liked list.`);
  }

  userLikes[userEmail] = likedSongs;
  localStorage.setItem("likedSongs", JSON.stringify(userLikes));

  console.log(
    `After toggle - User: ${userEmail}, Liked Songs:`,
    JSON.parse(localStorage.getItem("likedSongs"))
  );

  if (window.location.pathname.includes("liked_songs.html")) {
    console.log("Current pathname:", window.location.pathname);
    showLikedSongs();
  }
}

// Load liked songs when the page loads
function loadLikedSongs() {
  let userEmail = localStorage.getItem("username");
  if (!userEmail) return;

  let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
  let likedSongs = userLikes[userEmail] || [];

  console.log("Loading liked songs for", userEmail, ":", likedSongs); // Debugging log

  likedSongs.forEach((songId) => {
    let likeButton = document.getElementById(`like-${songId}`);
    if (likeButton) {
      console.log("Marking song as liked:", songId); // Debugging log
      likeButton.classList.replace("fa-regular", "fa-solid");
    } else {
      console.warn("Like button not found for songId:", songId); // Warning if button is missing
    }
  });
}

// Function to display liked songs on the liked songs page
function showLikedSongs() {
  console.log("Running showLikedSongs()");

  let userEmail = localStorage.getItem("username");
  if (!userEmail) {
    alert("Please log in to view your liked songs!");
    return;
  }

  let userLikes = JSON.parse(localStorage.getItem("likedSongs")) || {};
  let likedSongIds = userLikes[userEmail] || [];
  let likedSongs = songs.filter((song) =>
    likedSongIds.includes(song.id.toString())
  );

  let songItemContainer = document.getElementById("likedSongsContainer");
  songItemContainer.innerHTML = "";

  likedSongs.forEach((song) => {
    let songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerHTML = `
      <span class="covandplay">
          <img src="${song.cover}" alt="${song.title}">
          <i id="${song.id}" class="songItemPlay fa-solid fa-play"></i>
      </span>
      <span class="songName">${song.title}</span>
      <span class="songListPlay">
          <i id="like-${song.id}" class="likeButton fa-solid fa-heart" style="color: red; cursor: pointer;"></i>
      </span>
    `;
    songItemContainer.appendChild(songItem);
  });

  attachEventListeners();
}

// Function to attach event listeners for playing songs and liking them
function attachEventListeners() {
  document.querySelectorAll(".songItemPlay").forEach((element) => {
    element.addEventListener("click", (e) => {
      let clickedId = parseInt(e.target.id);
      if (isNaN(clickedId) || !songs[clickedId]) return;

      if (songIndex === clickedId && !audioElement.paused) {
        audioElement.pause();
        e.target.classList.replace("fa-pause", "fa-play");
        masterPlay.classList.replace("fa-pause", "fa-play");
      } else {
        makeAllPlays();
        songIndex = clickedId;
        audioElement.src = songs[songIndex].audioUrl;
        masterSongName.innerText = songs[songIndex].title;
        cov.src = songs[songIndex].cover;

        audioElement.currentTime = 0;
        audioElement.play();

        e.target.classList.replace("fa-play", "fa-pause");
        masterPlay.classList.replace("fa-play", "fa-pause");
      }
    });
  });

  document.querySelectorAll(".likeButton").forEach((element) => {
    element.addEventListener("click", (e) => {
      let songId = e.target.id.replace("like-", "");
      toggleLike(songId);
    });
  });
}

// Function to load playlists in the navbar
function loadPlaylists() {
  let playlistsContainer = document.getElementById("playlistsContainer");
  playlistsContainer.innerHTML = `
    <div class="playlistItem" onclick="showLikedSongs()"> Liked Songs</div>
  `;
}

// Play/Pause Button
if (masterPlay) {
  masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      updatePlayButton(songIndex);
    } else {
      audioElement.pause();
      masterPlay.classList.remove("fa-pause");
      masterPlay.classList.add("fa-play");
      makeAllPlays();
    }
  });
} else {
  console.warn("⚠️ masterPlay button not found in DOM");
}

// masterPlay.addEventListener("click", () => {
//   if (audioElement.paused || audioElement.currentTime <= 0) {
//     audioElement.play();
//     masterPlay.classList.remove("fa-play");
//     masterPlay.classList.add("fa-pause");
//     updatePlayButton(songIndex);
//   } else {
//     audioElement.pause();
//     masterPlay.classList.remove("fa-pause");
//     masterPlay.classList.add("fa-play");
//     makeAllPlays();
//   }
// });

// Update Progress Bar
audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    // Ensure duration is available
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
  }
});

myProgressBar.addEventListener("change", () => {
  if (audioElement.duration) {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
  }
});

// Next & Previous Buttons
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

// Play a song
function playSong(index) {
  makeAllPlays();
  audioElement.src = songs[index].audioUrl;
  masterSongName.innerText = songs[index].title;
  cov.src = songs[index].cover;

  audioElement.load(); // Ensures metadata is refreshed before playing
  audioElement.currentTime = 0;

  audioElement.addEventListener(
    "loadedmetadata",
    () => {
      audioElement.play();
      myProgressBar.value = 0; // Ensure progress starts from 0
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      updatePlayButton(index);
    },
    { once: true }
  );
}

// Reset all play buttons
function makeAllPlays() {
  document.querySelectorAll(".songItemPlay").forEach((el) => {
    el.classList.remove("fa-pause");
    el.classList.add("fa-play");
  });
}

// Update play button for current song
function updatePlayButton(index) {
  let playButton = document.getElementById(index);
  if (playButton) {
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  }
}

//login logic

// Show Login Popup
function showLoginPopup() {
  document.getElementById("loginPopup").style.display = "flex";
}

// Close Login Popup
function closeLoginPopup() {
  document.getElementById("loginPopup").style.display = "none";
}

// Handle Login Request
async function handleLogin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data = await response.json();
    console.log("Server Response:", data);

    if (response.ok) {
      alert("Login successful!");
      closeLoginPopup();

      // Store authentication token and username
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      updateNavbar(); // Update the navbar dynamically
    } else {
      document.getElementById("loginError").style.display = "block";
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// Update navbar based on login status
function updateNavbar() {
  let token = localStorage.getItem("token");
  let username = localStorage.getItem("username");

  if (token && username) {
    document.getElementById("loginNav").style.display = "none"; // Hide Login
    document.getElementById("userDropdown").style.display = "block"; // Show Username
    document.getElementById("usernameDisplay").innerText = username; // Set Username
  } else {
    document.getElementById("loginNav").style.display = "block"; // Show Login
    document.getElementById("userDropdown").style.display = "none"; // Hide Username Dropdown
  }
}

// Logout functionality
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  alert("Logged out successfully!");

  updateNavbar(); // Refresh navbar
  window.location.href = "index.html"; // Redirect to homepage
}

// Toggle dropdown menu
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("usernameDisplay")
    .addEventListener("click", function () {
      let dropdown = document.getElementById("dropdownMenu");
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
});

document.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  loadSongs().then(() => {
    loadLikedSongs();
    if (window.location.pathname.includes("liked_songs.html")) {
      console.log("Current pathname:", window.location.pathname);

      showLikedSongs();
    }
  });
});
