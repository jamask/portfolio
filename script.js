// expansion panel -----------------------//

let coll = document.querySelector('.collapsible');

coll.addEventListener('click', function() {
  this.classList.toggle('open');
  let content = this.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
});

let desc = document.querySelectorAll('.show-hide-desc');
let isHide = true;

for (let i = 0; i < desc.length; i++) {
  desc[i].addEventListener('click', function() {
    let content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
    if (isHide) {
      this.textContent = 'hide description';
      isHide = false;
    } else {
      this.textContent = 'show description';
      isHide = true;
    }
  });
}

// carousel -----------------------//

let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);


// show/hide projects -----------------------//


let isProjectOpen = false;
let projects = document.querySelectorAll('.project-image');
let isDesktop = true;

projects[0].addEventListener('click', function () {
	isProjectOpen = true;
	document.querySelector('.yalow').style.display = 'block';
	document.querySelector('#back').style.display = 'inline-block';
	if (document.body.clientWidth>640) {
		document.querySelector('#type').style.display = 'inline-block';
	}
});

projects[1].addEventListener('click', function () {
	isProjectOpen = true;
	document.querySelector('.rdp').style.display = 'block';
	document.querySelector('#back').style.display = 'inline-block';
	if (document.body.clientWidth>640) {
		document.querySelector('#type').style.display = 'inline-block';
	}
});

document.querySelector('#back').addEventListener('click', function () {
	document.querySelector('.yalow').style.display = 'none';
	document.querySelector('.rdp').style.display = 'none';
	document.querySelectorAll('.btn').forEach((e) => e.style.display = 'none');
	isDesktop = true;
}, false);

document.querySelector('#type').addEventListener('click', function () {
	if (isDesktop) {
		document.querySelector('.yalow').style.width = '640px';
		document.querySelector('.rdp').style.width = '640px';
		document.querySelector('.wrapper').style.display = 'none';
		document.body.style.backgroundColor = '#666666';
		document.querySelector('#type').textContent = 'Desktop';
		isDesktop = false;
	} else {
		document.querySelector('.yalow').style.width = '100%';
		document.querySelector('.rdp').style.width = '100%';
		document.querySelector('.wrapper').style.display = 'block';
		document.body.style.backgroundColor = '#ffffff';
		document.querySelector('#type').textContent = 'Mobile';
		isDesktop = true;
	}
});

// touch -------------------//

projects[0].addEventListener('touchstart', function () {
	isProjectOpen = true;
	document.querySelector('.yalow').style.display = 'block';
	document.querySelector('#back').style.display = 'inline-block';
	if (document.body.clientWidth>640) {
		document.querySelector('#type').style.display = 'inline-block';
	}
});

projects[1].addEventListener('touchstart', function () {
	isProjectOpen = true;
	document.querySelector('.rdp').style.display = 'block';
	document.querySelector('#back').style.display = 'inline-block';
	if (document.body.clientWidth>640) {
		document.querySelector('#type').style.display = 'inline-block';
	}
});

document.querySelector('#back').addEventListener('touchstart', function () {
	document.querySelector('.yalow').style.display = 'none';
	document.querySelector('.rdp').style.display = 'none';
	document.querySelectorAll('.btn').forEach((e) => e.style.display = 'none');
	isDesktop = true;
}, false);

document.querySelector('#type').addEventListener('touchstart', function () {
	if (isDesktop) {
		document.querySelector('.yalow').style.width = '640px';
		document.querySelector('.rdp').style.width = '640px';
		document.querySelector('.wrapper').style.display = 'none';
		document.body.style.backgroundColor = '#666666';
		document.querySelector('#type').textContent = 'Desktop';
		isDesktop = false;
	} else {
		document.querySelector('.yalow').style.width = '100%';
		document.querySelector('.rdp').style.width = '100%';
		document.querySelector('.wrapper').style.display = 'block';
		document.body.style.backgroundColor = '#ffffff';
		document.querySelector('#type').textContent = 'Mobile';
		isDesktop = true;
	}
});
