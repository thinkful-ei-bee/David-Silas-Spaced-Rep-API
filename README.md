# Spaced repetition API!

This is the server side for the spaced repetition project by David Bolin and Silas Hallahan. Primary documentation and instructions for installation for local development may be found at the [repo for the client](https://github.com/thinkful-ei-bee/David-Silas-Spaced-Rep). 

## API Documentation

### POST /api/auth/token

This route is for login. Requires a body with "username" and "password." Returns the key "authToken" with a jwt token as its value if login succeeds. Otherwise it returns 400 "error" with a description of the problem.

### PUT /api/auth/token

Returns a refreshed jwt under "authToken."

### GET /api/language

Returns data for the current user. Returns "language" with keys of "id", "name," "total_score", "user_id", and "head." The name is the name of the language, "head" points to the head of the linked list of words for the user to practice. Total score is the number of correct answers the user has made.

Also returns "words" with a list of the users words, each having the keys "id", "original," "translation," "memory_value", "correct_count", "incorrect_count", "language_id", and "next."

"Memory value" is used to ensure that words that have been answered correctly multiple times are tested less frequently, while the correct and incorrect counts are the number of times the user has guessed correctly or incorrectly. "Next" points to the next word on the linked list.

### GET /api/language/head

Returns data for the next word with which to test the user. Contains the keys:

nextWord: the untranslated word,
wordCorrectCount: number of correct answers for this word
wordIncorrectCount: number of incorrect answers for this word
totalScore: user's total correct answers for all words

### POST /api/language/guess

Requires a body with "guess" and the user's guess for the translation of the word returned by the above request to the head endpoint.

Returns "answer" with the correct translation of the word and "isCorrect", a Boolean representing whether or not the guess was correct. Also returns the same four keys as the get request to /api/language/head, but note that these represent the following word, not the current word; the "wordCorrectCount" will be for the word to be presented next, not the word that was just guessed. If the client wishes to immediately update the correct count for the word just guessed, it needs to do that based on "isCorrect."

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
