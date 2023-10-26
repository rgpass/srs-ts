# srs-ts

This library aims to lower the bar of complexity surrounding Spaced Repetition Software (SRS) by providing an open-source npm package written in TypeScript.

# Algorithms

## Leitner System

The Leitner System is the simplest to understand. For explanation, let's use three boxes.

1. Flashcards you don't know at all
2. Flashcards you know, but sometimes forget
3. Flashcards you have mastered

When you first learn something, all your flashcards will be in Box 1. These are the ones that need to be reviewed daily. When you gain more confidence, you'll move flashcards to Box 2, which will be reviewed every 3 days. And similarly, when you feel like you've mastered a flashcard, you move it to Box 3 and review it once every 30 days.

If you get one wrong, even if it's one you thought you mastered, you put it all the way back to Box 1.

When using physical flashcards, you may have 3-5 boxes. But the granularity starts to be outweighed by the management of the flashcards and keeping track of when to review the flashcards from each box.

With software, we can customize the number of "boxes" (called "levels") and the intervals.

## Chessable's MoveTrainer

This is the simplest one, as it only considers two inputs:

- `lastCorrectAt` -- The date and time it was last answered correctly
- `prevLevel` -- The level the user was previously at, ranging from 0 (has never gotten it correct) to 8

When a user gets a correct answer, the level increments by 1. If they get an incorrect answer, it resets completely.

See [their documentation](https://chessable.stonly.com/kb/guide/en/how-does-the-spaced-repetition-scheduling-work-b6A4HAXont/Steps/198511) for more info.
