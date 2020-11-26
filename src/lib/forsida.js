//kallar í videos.json dataið
function getData(callback) {
  fetch('/videos.json')
    .then(function (res) {
      return res.json()
    })
    .then(data => {
      callback(data);
    })
    .catch(console.log)
}

//kallar á gögn þegar html (document) hefur loadast
window.onload = function () {
  getData(function (gögn) {
    const gridElement = document.getElementById('theGrid');

    console.log('Gögn', gögn);

    //loopar og finnur title í categories
    for (let i = 0; i < gögn.categories.length; i++) {
      const category = gögn.categories[i];
      const videoIDs = category.videos;
      const categoryVideos = gögn.videos.filter(video => videoIDs.includes(video.id));

      const categoryElement = document.createElement('section');
      categoryElement.setAttribute('class', category.title.toLowerCase().replace(' ', '_'));

      const categoryTitle = document.createElement('h2');
      categoryTitle.innerText= category.title;

      categoryElement.appendChild(categoryTitle);

      const videosElement = document.createElement('div');
      videosElement.setAttribute('class', 'row');

      //loopar í gegnum categories til að finna video
      for (let j = 0; j < categoryVideos.length; j++) {
        const video = categoryVideos[j];

        const videoElement = document.createElement('div');
        videoElement.setAttribute('class', 'col col-4 col-md-10');

        //setur poster þar sem þau eiga að vera
        const videoImage = document.createElement('a');
        videoImage.setAttribute('class', 'video_image')
        videoImage.setAttribute('href', '/video.html?id=' + video.id)
        const videoImageImg = document.createElement('img');
        videoImageImg.setAttribute('src', video.poster);
        videoImage.appendChild(videoImageImg);

        videoElement.appendChild(videoImage);

        const bottomCard = document.createElement('div');
        bottomCard.setAttribute('class', 'bottom_card');

        //setur videotitle þar sem þeir eiga að vera
        const videoTitle = document.createElement('p');
        videoTitle.setAttribute('class', 'video_title');
        videoTitle.innerHTML = video.title;
        bottomCard.appendChild(videoTitle);

        const detailElement = document.createElement('p');

        //dagsetningar:)
        const videoDate = new Date(video.created);
        const hoursSince = ((new Date()).getTime() - videoDate.getTime()) / 1000 / 60 / 60;
        const daysSince = hoursSince / 24
        const monthsSince = daysSince / 30;
        if (monthsSince >= 1) {
          detailElement.innerHTML = `Fyrir ${parseInt(monthsSince)} mánuðum síðan`;
        } else if (daysSince >= 1) {
          detailElement.innerHTML = `Fyrir ${parseInt(daysSince)} dögum síðan`;
        } else {
          detailElement.innerHTML = `Fyrir ${parseInt(hoursSince)} klukkustundum síðan

          `;
        }

        bottomCard.appendChild(detailElement);

        videoElement.appendChild(bottomCard);

        videosElement.appendChild(videoElement);

      }
      //setur hr á milli categories
      categoryElement.appendChild(videosElement);

      const hr = document.createElement('hr');
      hr.setAttribute('class', 'col-10');
      categoryElement.appendChild(hr);

      gridElement.appendChild(categoryElement);
    }
  });
}
