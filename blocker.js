// Function to detect and block third-party cookies
function blockThirdPartyCookies() {
    // Override the document.cookie property
    Object.defineProperty(document, 'cookie', {
        get: function() {
            return '';
        },
        set: function(value) {
            // Parse the cookie being set
            const cookieDetails = parseCookie(value);
            
            // Check if it's a third-party cookie
            if (isThirdPartyCookie(cookieDetails.domain)) {
                console.log('Blocked third-party cookie:', value);
                return '';
            }
            
            // Allow first-party cookies
            return this._cookie = value;
        },
        configurable: true
    });
}

// Helper function to parse cookie string
function parseCookie(cookieStr) {
    const parts = cookieStr.split(';');
    const cookieObj = {};
    
    parts.forEach(part => {
        const [key, value] = part.trim().split('=');
        if (key.toLowerCase() === 'domain') {
            cookieObj.domain = value;
        }
    });
    
    return cookieObj;
}

// Helper function to check if cookie is third-party
function isThirdPartyCookie(cookieDomain) {
    if (!cookieDomain) return false;
    
    // Get current domain
    const currentDomain = window.location.hostname;
    
    // Remove leading dot if present
    cookieDomain = cookieDomain.replace(/^\./, '');
    
    // Check if cookie domain matches current domain or is a subdomain
    return !(currentDomain === cookieDomain || 
             currentDomain.endsWith('.' + cookieDomain));
}

// Function to handle localStorage and sessionStorage
function blockThirdPartyStorage() {
    // Override localStorage methods
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        if (isThirdPartyContext()) {
            console.log('Blocked third-party localStorage access:', key);
            return;
        }
        originalSetItem.apply(this, arguments);
    };
    
    // Override sessionStorage methods
    const originalSessionSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
        if (isThirdPartyContext()) {
            console.log('Blocked third-party sessionStorage access:', key);
            return;
        }
        originalSessionSetItem.apply(this, arguments);
    };
}

// Helper function to check if current context is third-party
function isThirdPartyContext() {
    try {
        return window.top !== window.self;
    } catch (e) {
        // If we can't access window.top, we're likely in a third-party context
        return true;
    }
}

// Initialize blocking
function initializeCookieBlocking() {
    blockThirdPartyCookies();
    blockThirdPartyStorage();
    console.log('Third-party cookie and storage blocking initialized');
}

// Run when the script loads
initializeCookieBlocking();
