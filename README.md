# GDPR Compliant Overlay

Library that prevents an iframe from being loaded until the user has explicitly accepted the loading. A typical use case my be the usage of Google Maps.  
To provide a maximum of flexibility you are responsible for the design and content of the alternate overlay. 

## Install

`npm --save gdpr-c-v`

## Configuration

1. Define a `const config:GDPRCoOvConfig`
    ```
    GDPRCoOvConfig:
      Properties:
        - wrapperElemId: ID of the HTML element that contains the overlay
        - overlayElemId: ID of the HTML element that represents the overlay
        - cookieValidInDays: number of days the cookie should be saved
        - iframeSettings: IframeSettings Object
    
    IframeSettings:
      Properties:
        - width: width of iframe
        - height: height of iframe
        - frameBorder: border size of iframe in px
        - src: source of iframe
    ```
2. Create an `const instance = new GDPRCoOv(config)`
3. After `DOM` is loaded run `instance.init()`
4. When user accepts and the iframe should be loaded call `instance.userAccepted(cookieEnabled)` where `cookieEnabled` tells the lib whether to save a cookie for the next `cookieValidInDays` days

## How to use - example

Note: for the sake of simplicity the following example is based on react using typescript.

```js
import { GDPRCoOv, GDPRCoOvConfig, IframeSettings } from "gdpr-c-o"

const ExampleFunctionalComponent = (iframeSrc): JSX.Element => {
    const overlayId = 'overlayId'
    const wrapperId = 'wrapperId'

    // Overlay
    const Overlay = <div id={overlayId}> </div>

    // gdpr-c-o config
    const gdprConfig = new GDPRCoOvConfig(
      wrapperId,
      overlayId,
      30,
      iframSettings
    )
    const iframSettings = new IframeSettings(
      "100%",
      "350",
      "0",
      iframeSrc
    )
    const gdprCoOv = new GDPRCoOv(gdprConfig)

    React.useEffect(() => {
      gdprIframe.init()
    }, [])

    let useCookie = false;

    const checkboxHandler = (e) => {
      useCookie = e.target.checked;
    }

    // hide overlay, show iframe and remember user setting for the future as a cookie
    const userAccepted = () => gdprCoOv.userAccepted(useCookie)

    return (
        <div id={wrapperId}>
            <div id={overlayId}>
              <p>Custom message for the user</p>
              <button type="button" onClick={userAccepted}>Load content anyway</button>
              <input
                      type="checkbox"
                      onChange={checkboxHandler}
                    />
              Remember my setting.
            </div>
        </div>
    )
}

```
