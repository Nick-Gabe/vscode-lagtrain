# Video Generation Flags
To use the flags below, you should place them this way:
```
npm start video.mp4 -- --<name>=value
```
You can place one or combine multiple flags, if you're placing multiple, just add another `--<name>=value` with a space after the last one.
### Here's an example:
```
npm start -- --fps=1 --scale=0.1 --palette=myPalette --timer=false
```

Those are the flags you can use and their default values:
| Flag | Default | Description |
|--- |--- |--- |
| fps | 15 | How many frames should be run per second |
| scale | 0.3 | The size of the result, based on original video size |
| timer | true | If the countdown before the video should appear |
| palette | default | What text palette should be used, [click here for details](/docs/palette.md) |
