(function () {
  'use strict';

  function getData(callback) {
    fetch('/videos.json').then(function (res) {
      return res.json();
    }).then(function (data) {
      callback(data);
    }).catch(console.log);
  }

  window.onload = function () {
    getData(function (data) {
      var gridElement = document.getElementById('theGrid'); // Loopar og finnur title í categories

      var _loop = function _loop(i) {
        var category = data.categories[i];
        var videoIDs = category.videos;
        var categoryVideos = data.videos.filter(function (video) {
          return videoIDs.includes(video.id);
        });
        var categoryElement = document.createElement('section');
        categoryElement.setAttribute('class', category.title.toLowerCase().replace(' ', '_'));
        var categoryTitle = document.createElement('h2');
        categoryTitle.setAttribute('class', 'offset-col-md-1');
        categoryTitle.innerHTML = category.title;
        categoryElement.appendChild(categoryTitle);
        var videosElement = document.createElement('div');
        videosElement.setAttribute('class', 'row'); // Loopar í gegnum categories til að finna video

        for (var j = 0; j < categoryVideos.length; j++) {
          var video = categoryVideos[j];
          var videoElement = document.createElement('div');
          videoElement.setAttribute('class', 'col col-4 col-md-10 offset-col-md-1'); //setur poster þar sem þau eiga að vera

          var videoImage = document.createElement('a');
          videoImage.setAttribute('class', 'video_image');
          videoImage.setAttribute('href', '/video.html?id=' + video.id);
          var videoImageImg = document.createElement('img');
          videoImageImg.setAttribute('src', video.poster);
          videoImage.appendChild(videoImageImg);
          videoElement.appendChild(videoImage);
          var bottomCard = document.createElement('div');
          bottomCard.setAttribute('class', 'bottom_card'); // Duration

          var videoDuration = document.createElement('p');
          videoDuration.setAttribute('class', 'video_duration col-4');
          var minutes = parseInt(video.duration / 60, 10);
          var seconds = video.duration % 60;

          if (seconds <= 9) {
            videoDuration.innerHTML = "".concat(parseInt(minutes), ":0").concat(parseInt(seconds));
          } else {
            videoDuration.innerHTML = "".concat(parseInt(minutes), ":").concat(parseInt(seconds));
          }

          videoImage.appendChild(videoDuration); // Setur videotitle þar sem þeir eiga að vera

          var videoTitle = document.createElement('p');
          videoTitle.setAttribute('class', 'video_title');
          videoTitle.innerHTML = video.title;
          bottomCard.appendChild(videoTitle);
          var detailElement = document.createElement('p'); // Dagsetningar

          var videoDate = new Date(video.created);
          var hoursSince = (new Date().getTime() - videoDate.getTime()) / 1000 / 60 / 60;
          var daysSince = hoursSince / 24;
          var weekSince = daysSince / 7;
          var monthsSince = daysSince / 30;
          var yearSince = daysSince / 365;

          if (yearSince >= 1) {
            if (yearSince < 2) {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(yearSince), " \xE1ri s\xED\xF0an");
            } else {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(yearSince), " \xE1rum s\xED\xF0an");
            }
          } else if (monthsSince >= 1) {
            if (monthsSince < 2) {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(monthsSince), " m\xE1nu\xF0i s\xED\xF0an");
            } else {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(monthsSince), " m\xE1nu\xF0um s\xED\xF0an");
            }
          } else if (weekSince >= 1) {
            if (weekSince < 2) {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(weekSince), " viku s\xED\xF0an");
            } else {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(weekSince), " vikum s\xED\xF0an");
            }
          } else if (daysSince >= 1) {
            if (daysSince < 2) {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(daysSince), " degi s\xED\xF0an");
            } else {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(daysSince), " d\xF6gum s\xED\xF0an");
            }
          } else if (hoursSince >= 1) {
            if (hoursSince < 2) {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(hoursSince), " klukkustund s\xED\xF0an");
            } else {
              detailElement.innerHTML = "Fyrir ".concat(parseInt(hoursSince), " klukkustundum s\xED\xF0an");
            }
          }

          bottomCard.appendChild(detailElement);
          videoElement.appendChild(bottomCard);
          videosElement.appendChild(videoElement);
        } // Setur hr á milli categories


        categoryElement.appendChild(videosElement);
        var hr = document.createElement('hr');
        hr.setAttribute('class', 'col-10');
        categoryElement.appendChild(hr);
        gridElement.appendChild(categoryElement);
      };

      for (var i = 0; i < data.categories.length; i++) {
        _loop(i);
      }
    });
  };

}());
//# sourceMappingURL=bundle.js.map
