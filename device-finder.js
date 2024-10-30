// Function to detect devices and add classes
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    const body = document.body;

    // OS Detection
    if (userAgent.indexOf('windows') > -1) body.classList.add('is-windows');
    if (userAgent.indexOf('mac') > -1) body.classList.add('is-mac');
    if (userAgent.indexOf('linux') > -1) body.classList.add('is-linux');
    if (userAgent.indexOf('android') > -1) body.classList.add('is-android');
    if (userAgent.indexOf('iphone') > -1 || 
        userAgent.indexOf('ipad') > -1 || 
        userAgent.indexOf('ipod') > -1) body.classList.add('is-ios');

    // Device Type Detection
    const isMobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(userAgent);
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i
        .test(userAgent);

    if (isMobile) body.classList.add('is-mobile');
    if (isTablet) body.classList.add('is-tablet');
    if (!isMobile && !isTablet) body.classList.add('is-desktop');

    // Browser Detection
    const isEdge = userAgent.indexOf('edg') > -1;
    if (userAgent.indexOf('chrome') > -1 && !isEdge) body.classList.add('is-chrome');
    if (userAgent.indexOf('firefox') > -1) body.classList.add('is-firefox');
    if (userAgent.indexOf('safari') > -1 && !isEdge) body.classList.add('is-safari');
    if (isEdge) body.classList.add('is-edge');
    if (userAgent.indexOf('op') > -1) body.classList.add('is-opera');
    if (userAgent.indexOf('trident') > -1) body.classList.add('is-ie');

    // Screen Size Detection
    const width = window.innerWidth;
    if (width < 576) body.classList.add('screen-xs');
    else if (width < 768) body.classList.add('screen-sm');
    else if (width < 992) body.classList.add('screen-md');
    else if (width < 1200) body.classList.add('screen-lg');
    else body.classList.add('screen-xl');

    // Log device information to console
    console.log('Device Information:', {
        userAgent: userAgent,
        platform: platform,
        deviceType: isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop',
        screenWidth: width,
        screenHeight: window.innerHeight
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', detectDevice);

// Update on window resize
window.addEventListener('resize', detectDevice);
