// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
	requestAnimFrame(animate);
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	if (mCurrentIndex >= mImages.length) {
		mCurrentIndex = 0;
	} else {
		console.log('Error')
	}
	if (mCurrentIndex < 0) {
		mCurrentIndex.length() = mImages.img[-1];
	}

	let photoElement = document.getElementById('photo')
	photoElement.src = mImages[mCurrentIndex].img

	let location = document.getElementsByClassName('location')[0];
	let description = document.getElementsByClassName('description')[0];
	let date = document.getElementsByClassName('date')[0];


	location.innerHTML = "Location: " + mImages[mCurrentIndex].location;
	description.innerHTML = "Description: " + mImages[mCurrentIndex].description;
	date.innerHTML = "Date: " + mImages[mCurrentIndex].date;
	mLastFrameTime = 0;
	mCurrentIndex += 1;

	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: extras.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'extras.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function (e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready(function () {

	// This initially hides the photos' metadata information
	// $('.details').eq(0).hide();
	fetchJSON();

});

window.addEventListener('load', function () {

	console.log('window loaded');

}, false);


class GalleryImage {
	constructor(location, description, date, image) {
		this.location = location;
		this.description = description;
		this.date = date;
		this.img = image;
	}
}

// Create a new GalleryImage() for each one
// Assign the location, description, date, and img for each object 
// Example:     new GalleryImage(theLocation, theDescription, theDate, theImage)




function fetchJSON() {
	mRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status >= 200) {
			var mJson = JSON.parse(mRequest.responseText);
			console.log(mJson)
			for (let image of mJson.images) {
				new GalleryImage(image.imgLocation, image.description, image.date, image.imgPath)
				let galleryImage = new GalleryImage(image.imgLocation, image.description, image.date, image.imgPath);
				mImages.push(galleryImage)
			}
		} else {
			console.log("We connected to the server, but it returned on error.");
		}

	}
	mRequest.open("GET", mUrl)
	mRequest.send()
}




$(document).ready(function () {

	$(".moreIndicator").on("click", function () {
		if ($(".moreIndicator").hasClass("rot90")) {
			$(".moreIndicator").removeClass('rot90').addClass("rot270")
		} else {
			$(".moreIndicator").removeClass("rot270").addClass("rot90")
		}
		$('.details').slideToggle();
	});
	
	$("#prevPhoto").on("click", function () {
		mCurrentIndex = mCurrentIndex - 2;
		swapPhoto()
	});
	$("#nextPhoto").on("click", function () {
		mCurrentIndex++
		swapPhoto()
	});
	$('#nextPhoto').position({
		of: '#nav',
		my: 'right',
		at: 'right'
	});
});

function iterateJSON(mJson) {
	for (var x = 0; x < mJson.images.length; x++) {
		mImages[x].location = mJson.images[x].imgLocation;
		mImages[x].date = mJson.images[x].date;
		mImages[x].img = mJson.images[x].imgPath;
		mImages[x] = new galleryImage();
		mImages[x].description = mJson.images[x].description;
		
	}
}