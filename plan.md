# Development Plan

## Parts

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

## Tasks

- [x] 1. set up api to openai. Consider the fact that i might change the model to use, better wrap it when touching the other part of the code.
- [x] 2. make a simple ui for keyboard input and show the result on the screen.
- [ ] 3. add language selection. For now I can just just choose the top 10 most used languages in the world.

## Future

- security:
  - change environment variables to a more secure way. https://docs.expo.dev/guides/environment-variables/
- input:
  - every text change trigger a translation looks unstable and weird?
  - multiline
  - submit button, on besides on the return key
  - when empty result, the openai api will return weird result
  - the translation for the last input should be removed when the user is typing a new entry.
- translation:
  - too slow, maybe because I am using a vpn?
