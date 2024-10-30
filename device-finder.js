
    // Function to detect OS
    function detectOS() {
        const userAgent = navigator.userAgent.toUpperCase();
        const platform = navigator.platform.toUpperCase();

        if (platform.includes('MAC') || userAgent.includes('MAC')) {
            document.body.classList.add('is-mac');
        } else if (platform.includes('WIN') || userAgent.includes('WINDOWS')) {
            document.body.classList.add('is-windows');
        } else if (platform.includes('LINUX') || userAgent.includes('LINUX')) {
            document.body.classList.add('is-linux');
        } else if (userAgent.includes('ANDROID')) {
            document.body.classList.add('is-android');
        } else if (userAgent.includes('IPHONE') || userAgent.includes('IPAD') || userAgent.includes('IPOD') || userAgent.includes('IOS')) {
            document.body.classList.add('is-ios');
        }
    }

    // Function to detect device type
    function detectDeviceType() {
        const userAgent = navigator.userAgent.toUpperCase();
        if (/MOBILE/.test(userAgent)) {
            document.body.classList.add('is-mobile');
        } else if (/TABLET/.test(userAgent) || (userAgent.includes('IPAD'))) {
            document.body.classList.add('is-tablet');
        } else {
            document.body.classList.add('is-desktop');
        }
    }

    // Function to detect browser
    function detectBrowser() {
        const userAgent = navigator.userAgent.toUpperCase();
        if (userAgent.includes('CHROME') && !userAgent.includes('EDGE')) {
            document.body.classList.add('is-chrome');
        } else if (userAgent.includes('FIREFOX')) {
            document.body.classList.add('is-firefox');
        } else if (userAgent.includes('SAFARI') && !userAgent.includes('CHROME')) {
            document.body.classList.add('is-safari');
        }
    }

    // Function to detect screen size
    function detectScreenSize() {
        const width = window.innerWidth;
        document.body.classList.remove('screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl');

        if (width < 576) {
            document.body.classList.add('screen-xs');
        } else if (width >= 576 && width < 768) {
            document.body.classList.add('screen-sm');
        } else if (width >= 768 && width < 992) {
            document.body.classList.add('screen-md');
        } else if (width >= 992 && width < 1200) {
            document.body.classList.add('screen-lg');
        } else if (width >= 1200) {
            document.body.classList.add('screen-xl');
        }
    }

    // Run all detection functions
    detectOS();
    detectDeviceType();
    detectBrowser();
    detectScreenSize();

    // Update screen size class on window resize
    window.addEventListener('resize', detectScreenSize);
