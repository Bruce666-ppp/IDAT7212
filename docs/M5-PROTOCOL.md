# KneeUp × M5 Serial Bridge — v0, UNTESTED

The protocol and `firmware/m5_voice_bridge.ino` are design examples, **not tested together on physical M5 hardware**. The web implementation is the Voice Assistant × M5 Bridge section in `js/views/assist.js`.

## Transport

Web Serial, 115200 baud, 8N1; UTF-8 lines ending in `\n`. Open `apps.html#/assist` → Voice Assistant × M5 Bridge → Connect M5 (Serial). Unsupported browsers hide the controls and display a message.

## Downlink: website → M5

```text
ASSIST:33;SCENE:stairs;FATIGUE:47\n
```

| Field | Meaning | Values |
| --- | --- | --- |
| ASSIST | Rate-limited engine output | Integer 0–50 (%) |
| SCENE | Activity key | flat / standup / uphill / stairs / downhill |
| FATIGUE | Fatigue index including game contribution | Integer 0–100 |

Send at most once per second, only when content changes.

## Uplink: M5 → website

| Line | Meaning | Website action |
| --- | --- | --- |
| BTN:A | Single press | Speak current assistance using browser speech synthesis |
| BTN:B | Double press within 400 ms | Cycle flat → standup → uphill → stairs → downhill |
| Other lines | Debug echo | Display in panel log |

## Firmware example

`firmware/m5_voice_bridge.ino` calls `Serial.begin(115200)`, echoes received status as `RX> ...`, flashes a blue LED and uses a 400 ms button window. Example pins `LED_BLUE=27` and `BTN_PIN=39` must be checked for the actual board before flashing.

## BLE relationship

The M5 link is a display/button bridge. Brace telemetry uses the separate NUS interface in `js/ai/ble-source.js`: service `6e400001-b5a3-f393-e0a9-e50e24dcca9e`, newline-delimited JSON notifications such as:

```json
{"kneeAngleL":96.5,"kneeAngleR":98.1,"pressure":0.42,"ts":12345}
```

The two channels are independent. BLE disconnect falls back to simulated input. This describes interface code, not verified physical integration.
