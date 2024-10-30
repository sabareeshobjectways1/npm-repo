// Create a comprehensive device detection utility
const DeviceDetector = {
    // Initialize detection
    init: function() {
        this.userAgent = navigator.userAgent.toLowerCase();
        this.platform = navigator.platform.toLowerCase();
        this.applyClasses();
    },

    // Operating System Detection
    isWindows: function() {
        return this.userAgent.indexOf('windows') > -1;
    },

    isMac: function() {
        return this.userAgent.indexOf('mac') > -1;
    },

    isLinux: function() {
        return this.userAgent.indexOf('linux') > -1;
    },

    isAndroid: function() {
        return this.userAgent.indexOf('android') > -1;
    },

    isIOS: function() {
        return ['iphone', 'ipad', 'ipod'].some(device => 
            this.userAgent.indexOf(device) > -1);
    },

    // Device Type Detection
    isMobile: function() {
        return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(this.userAgent);
    },

    isTablet: function() {
        return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i
            .test(this.userAgent);
    },

    isDesktop: function() {
        return !this.isMobile() && !this.isTablet();
    },

    // Browser Detection
    isChrome: function() {
        return this.userAgent.indexOf('chrome') > -1 && !this.isEdge();
    },

    isFirefox: function() {
        return this.userAgent.indexOf('firefox') > -1;
    },

    isSafari: function() {
        return this.userAgent.indexOf('safari') > -1 && !this.isChrome();
    },

    isEdge: function() {
        return this.userAgent.indexOf('edg') > -1;
    },

    isOpera: function() {
        return this.userAgent.indexOf('op') > -1;
    },

    isIE: function() {
        return this.userAgent.indexOf('trident') > -1;
    },

    // Screen Size Detection
    getScreenSize: function() {
        const width = window.innerWidth;
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        return 'xl';
    },

    // Apply all detected classes to body
    applyClasses: function() {
        const classes = [];

        // OS Classes
        if (this.isWindows()) classes.push('is-windows');
        if (this.isMac()) classes.push('is-mac');
        if (this.isLinux()) classes.push('is-linux');
        if (this.isAndroid()) classes.push('is-android');
        if (this.isIOS()) classes.push('is-ios');

        // Device Type Classes
        if (this.isMobile()) classes.push('is-mobile');
        if (this.isTablet()) classes.push('is-tablet');
        if (this.isDesktop()) classes.push('is-desktop');

        // Browser Classes
        if (this.isChrome()) classes.push('is-chrome');
        if (this.isFirefox()) classes.push('is-firefox');
        if (this.isSafari()) classes.push('is-safari');
        if (this.isEdge()) classes.push('is-edge');
        if (this.isOpera()) classes.push('is-opera');
        if (this.isIE()) classes.push('is-ie');

        // Screen Size Class
        classes.push(`screen-${this.getScreenSize()}`);

        // Apply all classes to body
        document.body.classList.add(...classes);

        // Add data attributes for more specific styling
        document.documentElement.setAttribute('data-device-type', 
            this.isMobile() ? 'mobile' : this.isTablet() ? 'tablet' : 'desktop');
        document.documentElement.setAttribute('data-os', 
            this.isWindows() ? 'windows' : 
            this.isMac() ? 'mac' : 
            this.isLinux() ? 'linux' : 
            this.isAndroid() ? 'android' : 
            this.isIOS() ? 'ios' : 'unknown');
    },

    // Get detailed device info
    getDeviceInfo: function() {
        return {
            userAgent: this.userAgent,
            platform: this.platform,
            deviceType: this.isMobile() ? 'Mobile' : this.isTablet() ? 'Tablet' : 'Desktop',
            operatingSystem: this.isWindows() ? 'Windows' : 
                           this.isMac() ? 'MacOS' : 
                           this.isLinux() ? 'Linux' : 
                           this.isAndroid() ? 'Android' : 
                           this.isIOS() ? 'iOS' : 'Unknown',
            browser: this.isChrome() ? 'Chrome' : 
                    this.isFirefox() ? 'Firefox' : 
                    this.isSafari() ? 'Safari' : 
                    this.isEdge() ? 'Edge' : 
                    this.isOpera() ? 'Opera' : 
                    this.isIE() ? 'Internet Explorer' : 'Unknown',
            screenSize: this.getScreenSize(),
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1
        };
    }
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    DeviceDetector.init();
    
    // Log device info to console (optional)
    console.log('Device Information:', DeviceDetector.getDeviceInfo());
});

// Update classes on resize (optional)
window.addEventListener('resize', () => {
    DeviceDetector.applyClasses();
});
