// OS Detection Functions
function isWindows() {
    return navigator.platform.toUpperCase().indexOf('WIN') >= 0 ||
           navigator.userAgent.toUpperCase().indexOf('WIN') >= 0;
}

function isMac() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
           navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
}

function isLinux() {
    return navigator.platform.toUpperCase().indexOf('LINUX') >= 0 ||
           navigator.userAgent.toUpperCase().indexOf('LINUX') >= 0;
}

function isAndroid() {
    return navigator.userAgent.toUpperCase().indexOf('ANDROID') >= 0;
}

function isIOS() {
    return ['IPHONE', 'IPAD', 'IPOD'].some(device => 
        navigator.platform.toUpperCase().indexOf(device) >= 0 ||
        navigator.userAgent.toUpperCase().indexOf(device) >= 0
    );
}

// Device Type Detection Functions
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);
}

function isTablet() {
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i
        .test(navigator.userAgent);
}

function isDesktop() {
    return !isMobile() && !isTablet();
}

// Browser Detection Functions
function isChrome() {
    return navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0 && !isEdge();
}

function isFirefox() {
    return navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0;
}

function isSafari() {
    return navigator.userAgent.toUpperCase().indexOf('SAFARI') >= 0 && !isChrome();
}

function isEdge() {
    return navigator.userAgent.toUpperCase().indexOf('EDG') >= 0;
}

function isOpera() {
    return navigator.userAgent.toUpperCase().indexOf('OP') >= 0;
}

function isIE() {
    return navigator.userAgent.toUpperCase().indexOf('TRIDENT') >= 0;
}

// Screen Size Function
function getScreenSize() {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
}

// Apply classes based on device detection
if (isWindows()) document.body.classList.add('is-windows');
if (isMac()) document.body.classList.add('is-mac');
if (isLinux()) document.body.classList.add('is-linux');
if (isAndroid()) document.body.classList.add('is-android');
if (isIOS()) document.body.classList.add('is-ios');

if (isMobile()) document.body.classList.add('is-mobile');
if (isTablet()) document.body.classList.add('is-tablet');
if (isDesktop()) document.body.classList.add('is-desktop');

if (isChrome()) document.body.classList.add('is-chrome');
if (isFirefox()) document.body.classList.add('is-firefox');
if (isSafari()) document.body.classList.add('is-safari');
if (isEdge()) document.body.classList.add('is-edge');
if (isOpera()) document.body.classList.add('is-opera');
if (isIE()) document.body.classList.add('is-ie');

document.body.classList.add(`screen-${getScreenSize()}`);
