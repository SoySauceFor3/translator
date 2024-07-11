# Development Plan

## Parts to implement

- translate module
- input
  - keyboard
  - camera
  - microphone
- output
  - confirmation text
  - text
  - audio
- history
- config
  - languages involved
  - switching keyboard automatically?
- guidance UI

## Compontents

Current Translation
Language Selection
History

## Tasks

- [x] 1. set up api to openai. Consider the fact that i might change the model to use, better wrap it when touching the other part of the code.
- [x] 2. make a simple ui for keyboard input and show the result on the screen.
- [x] 3. add language selection. For now I can just just choose the top 10 most used languages in the world.
- [x] 4. add a history.
- [x] 5. add audio for input and output in CurrentTranslation.
- [ ] 6. use icon for audio.
- [ ] 7. make a fake openai api to reduce test cost :-)
- [ ]

## Future

- security:
  - change environment variables to a more secure way. https://docs.expo.dev/guides/environment-variables/
- CurrentTranslation:
  - every text change trigger a translation looks unstable and weird?
  - multiline
  - submit button, on besides on the return key
  - [x] when empty input, the openai api will return weird result
  - the translation for the last input should be removed when the user is typing a new entry.
  - [x] when input language is using the same language as the output language, the translation will be in english instead of the output language.
  - it does not translate everything when the language is mixed. "hello 呀 我的 paper 今天 due" translates to "你好呀 我的 paper 今天 due“ instead of "你好呀 我的论文今天截止"
  - seems that the "Promise.all" to send history to other components is not work as expected. It should wait for ALL async processes. However, it seems to resolve before, for example, the audio to be ready (so during this period, the audio button in the CurrentTranslation is disabled, but the history is updated, and the audio button for the corresponding entry does not play any sound).
- translation:
  - too slow, maybe because I am using a vpn?
