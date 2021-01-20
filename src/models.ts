export class GDPRCoOvConfig {
    public constructor(
        public wrapperElemId: string,
        public overlayElemId: string,
        public cookieValidInDays: number,
        public iframeSettings: IframeSettings,
    ) {}
}

export class IframeSettings {
    public constructor(public width: string, public height: string, public frameBorder: string, public src: string) {}
}
