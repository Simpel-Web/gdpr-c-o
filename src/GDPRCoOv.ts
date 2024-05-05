import { GDPRCoOvConfig } from './models';

export class GDPRCoOv {
    private GDPR_COOKE_KEY = 'GDPRCoOv_';
    private isAccepted = false; 

    public constructor(public config: GDPRCoOvConfig) {}

    /**
     * Show iframe and (optionally) save cookie when user accepts the terms within the overlay.
     *
     * @param saveCookie save a cookie to prevent future displaying of the overlay
     */
    public userAccepted(saveCookie: boolean): void {
        if (saveCookie) {
            this.saveCookie();
        }

        this.showIframe();
        this.isAccepted = true;
    }

    /**
     * Initialization that needs to be called after the DOM has been loaded.
     */
    public init(): void {
        if (this.cookieExists()) {
            this.showIframe();
            this.isAccepted = true;
        }
    }

    /**
     * Checks if user has already accepted.
     * @returns state information
     */
    public isAlreadyAccepted(): boolean {
        return this.isAccepted;
    }

    private showIframe(): void {
        const iframe = document.createElement('iframe');

        // apply default attributes
        iframe.setAttribute('aria-hidden', 'false');
        iframe.setAttribute('allowFullScreen', '');

        // apply settings from config
        iframe.style.border = this.config.iframeSettings.frameBorder;
        iframe.setAttribute('width', this.config.iframeSettings.width);
        iframe.setAttribute('height', this.config.iframeSettings.height);
        iframe.setAttribute('frameBorder', this.config.iframeSettings.frameBorder);
        iframe.setAttribute('src', this.config.iframeSettings.src);

        // show iframe in DOM
        this.getWrapper().appendChild(iframe);

        // remove overlay
        this.removeOverlay();
    }

    private removeOverlay(): void {
        const overlay = document.getElementById(this.config.overlayElemId);

        if (!overlay) {
            throw new Error(`Overlay element #${this.config.overlayElemId} does not exist.`);
        }

        overlay.remove();
    }

    private getWrapper(): HTMLElement {
        const wrapper = document.getElementById(this.config.wrapperElemId);

        if (!wrapper) {
            throw new Error(`Provider wrapper element #${this.config.wrapperElemId} does not exist.`);
        }

        return wrapper;
    }

    private saveCookie(): void {
        const date = new Date();

        // Get unix milliseconds at current time plus number of days
        date.setTime(date.getTime() + this.config.cookieValidInDays * 86400000); //24 * 60 * 60 * 1000

        window.document.cookie = `${this.getCookieName()}=1; expires=${date.toUTCString()}; path=/`;
    }

    private cookieExists(): boolean {
        const result = document.cookie.match('(^|;)\\s*' + this.getCookieName() + '\\s*=\\s*([^;]+)');

        return result ? true : false;
    }

    private getCookieName(): string {
        return `${this.GDPR_COOKE_KEY}${this.config.wrapperElemId}`;
    }
}
