# 🤖 VSCode Lagtrain

This software converts videos into text animations with a lot of configurable options, such as fps, resolution and characters.

If you want to check their execution, here's an example of this code in action: [Youtube - Vscode Lagtrain](https://www.youtube.com/watch?v=ap5izsovrSo)

<hr>

[![image](https://user-images.githubusercontent.com/42651514/216833095-5809c6e7-24db-4819-9a20-1ebdee78f096.png)](https://www.youtube.com/watch?v=ap5izsovrSo)

## Guide of how to use it
1. You should pick your .mp4 video and place it inside the `/assets` folder
2. Execute the command `npm start <videoName>.mp4`, it will run using default values.
  > If you want to customize fps, scale, palette and stuff [click here and check the parameters guide](/docs/params.md)
3. It will start extracting the frames and generating them in Ascii

  > ![ezgif com-gif-maker(1)](https://user-images.githubusercontent.com/42651514/216835291-d8bdfe66-8e57-45d8-943a-5dcb6ba8879e.gif)
4. After generating them, a countdown will appear, and the file `render-result.txt` will be available at the root of your project, click it and enjoy the video playing!