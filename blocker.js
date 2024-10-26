// Tracking Blocker Script
(function() {
    // List of domains to block
    const blockedDomains = [
        'www.google-analytics.com',
        'analytics.google.com',
        'www.googleadservices.com',
        'googleads.g.doubleclick.net',
        'www.google.co.in',
        'px.ads.linkedin.com',
        'platform.linkedin.com'
    ];

    // List of cookie names to block
    const blockedCookies = [
        // Google cookies
        '__Secure-3PSID',
        '__Secure-3PAPISID',
        'NID',
        '_ga',
        '_gid',
        '_gat',
        // LinkedIn cookies
        'bscookie',
        'li_sugr',
        'bcookie',
        'UserMatchHistory',
        'AnalyticsSyncHistory',
        'lidc'
    ];

    // Function to block network requests
    function blockTrackers() {
        const originalXHR = window.XMLHttpRequest;
        const originalFetch = window.fetch;
        const originalSendBeacon = navigator.sendBeacon;

        // Override XMLHttpRequest
        window.XMLHttpRequest = function() {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;

            xhr.open = function(method, url) {
                if (shouldBlockRequest(url)) {
                    throw new Error('Request blocked by tracking protection');
                }
                return originalOpen.apply(this, arguments);
            };

            return xhr;
        };

        // Override fetch
        window.fetch = function(resource, init) {
            if (typeof resource === 'string' && shouldBlockRequest(resource)) {
                return new Promise((resolve, reject) => {
                    reject(new Error('Request blocked by tracking protection'));
                });
            }
            return originalFetch.apply(this, arguments);
        };

        // Override sendBeacon
        navigator.sendBeacon = function(url, data) {
            if (shouldBlockRequest(url)) {
                return false;
            }
            return originalSendBeacon.apply(navigator, arguments);
        };
    }

    // Function to check if a request should be blocked
    function shouldBlockRequest(url) {
        try {
            const urlObj = new URL(url);
            return blockedDomains.some(domain => urlObj.hostname.includes(domain));
        } catch (e) {
            return false;
        }
    }

    // Function to remove existing cookies
    function removeCookies() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const cookieName = cookie.split('=')[0].trim();
            if (blockedCookies.includes(cookieName)) {
                // Remove cookie for current domain
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
                // Remove cookie for all subdomains
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
            }
        }
    }

    // Function to prevent script loading
    function blockScriptLoading() {
        const originalCreateElement = document.createElement;
        
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(document, tagName);
            
            if (tagName.toLowerCase() === 'script') {
                const originalSetAttribute = element.setAttribute;
                element.setAttribute = function(name, value) {
                    if (name === 'src' && shouldBlockRequest(value)) {
                        console.log('Blocked script loading:', value);
                        return;
                    }
                    return originalSetAttribute.call(this, name, value);
                };
            }
            
            return element;
        };
    }

    // Initialize all blocking functions
    function init() {
        blockTrackers();
        blockScriptLoading();
        removeCookies();

        // Periodically remove cookies
        setInterval(removeCookies, 1000);

        // Block Google Analytics specifically
        window['ga-disable-*'] = true;
        window['google_tag_manager'] = undefined;
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
