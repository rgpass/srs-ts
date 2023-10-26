# srs-ts

This library aims to lower the bar of complexity surrounding Spaced Repetition Software (SRS) by providing an open-source npm package written in TypeScript.

# Algorithms

## Chessable's MoveTrainer

This is the simplest one, as it only considers two inputs:

- `lastCorrectAt` -- The date and time it was last answered correctly
- `prevLevel` -- The level the user was previously at, ranging from 0 (has never gotten it correct) to 8

When a user gets a correct answer, the level increments by 1. If they get an incorrect answer, it resets completely.

See [their documentation](https://chessable.stonly.com/kb/guide/en/how-does-the-spaced-repetition-scheduling-work-b6A4HAXont/Steps/198511) for more info.
