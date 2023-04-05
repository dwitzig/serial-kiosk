# serial-kiosk

Based on https://github.com/ogra1/electron-kiosk-wayland with (attempted) serial port access

## Quick start

1. build `snapcraft --use-lxd`
2. install `snap install --dangerous *.snap`
3. connect

```
snap connect serial-kiosk:wayland
snap connect serial-kiosk:hardware-observe
snap connect serial-kiosk:raw-usb
snap connect serial-kiosk:serial-port snapd:ft232rusbuart
```

4. start `snap start serial-kiosk`
5. set url `snap set serial-kiosk url=https://webserial.io`

## TODO:

- deploy to snap store
- electron install / run instructions
- snap install / run instructions
- auto connect
