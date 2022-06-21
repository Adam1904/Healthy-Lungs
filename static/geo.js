$( document ).ready(function() {
    (() => {
        const message = document.querySelector('#message');

        // check if the Geolocation API is supported
        if (!navigator.geolocation) {
            message.textContent = `Your browser doesn't support Geolocation`;
            message.classList.add('error');
            return;
        }

        // handle click event
        const btn = document.querySelector('#button-location');
        btn.addEventListener('click', function () {
            // get the current position
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        });


        // handle success case
        function onSuccess(position) {
            const {
                latitude,
                longitude
            } = position.coords;

            message.classList.add('success');
            message.textContent = `Your location: (${latitude},${longitude})`;
        }

        // handle error case
        function onError() {
            message.classList.add('error');
            message.textContent = `Failed to get your location!`;
            if(error.code == 1) {
				message.textContent = "You've decided not to share your position, but it's OK. We won't ask you again.";
			} else if(error.code == 2) {
				message.textContent = "The network is down or the positioning service can't be reached.";
			} else if(error.code == 3) {
				message.textContent = "The attempt timed out before it could get the location data.";
			} else {
				message.textContent = "Geolocation failed due to unknown error.";
			}
        }
    })();
});

$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/",
    data: message,
    success: function (data) {
      alert("DONE!")
    },
    dataType: "json"
  });