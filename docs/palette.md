# Custom palettes
Creating a "palette" is very simple. Palettes are based on Brightness, so all the videos are checked like they are black and white. This information is then used to identify and map pixels based on how bright they are.

You can create one by going into the [`palettes.json`](/palettes.json) file and adding a new value.

This is the structure you should follow:
```js
{
  // ... other palettes ...
  "paletteName": [
    [<minBrightness>, <maxBrightness>, <character>],
    // You can add more as needed
  ]
}
```
| Field | Description |
|--- |--- |
| minBrightness | Its a number between 0 and 100, it is the minimum brightness for this character to be applied |
| maxBrightness | Its a number between 0 and 100, it is the maximum brightness for this character to be applied |
| character | Its the character that will be applied if the pixel is above the minimum and below the maximum, it can be text, emojis or any ascii character |

Here is an example:

```js
{
  "default": [
    [85, 100, "🟪"],
    [62, 85, "⬜"],
    [0, 62, "⬛"]
  ],
}
```
- Any pixel between 85% and 100% brightness will be a purple square emoji
- Any pixel between 62% and 85% brightness will be a white square emoji
- Any pixel between 0 (black) and 62% brightness will be a black square emoji

### Observation
When using text characters, your font may not be monospace, this means some letters will be bigger than others, just as a W is bigger than an i, so this can make the animation change sizes. The suggestion is to use a monospace font if you're doing it this way.