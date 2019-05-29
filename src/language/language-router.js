const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();
const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    let word = await LanguageService.getFirstWord(
      req.app.get('db'),
      req.user.id
    );

    let score = await LanguageService.getTotalScore(
      req.app.get('db'),
      req.user.id
    );
    
    word = word[0];
    score = score[0];

    const obj = {
        nextWord: word.original,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count,
        totalScore: Number(score.totalscore)
    };

    return res.status(200).json(obj);
  });

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    const body = req.body;
    if (!body.guess) {
      return res.status(400).send({error: `Missing 'guess' in request body`});
    }
    const obj = {};

    let word = await LanguageService.getFirstWord(
      req.app.get('db'),
      req.user.id
    );
    word = word[0];
    console.log(word);
    obj.isCorrect = word.translation === body.guess;
    obj.answer = word.translation;
    
    // if guess is correct: double memory value and add 1 to correct count
    if (obj.isCorrect) {
      word.memory_value *= 2;
      word.correct_count += 1;
    } else { 
      // if guess is incorrect: set memory value to 1 and add 1 to incorrect count
      word.memory_value = 1;
      word.incorrect_count += 1;
    }

    const newHead = word.next;
    
    for (let i = 0; i < word.memory_value; i++) {
      let nextWord = await LanguageService
    }

    // move item back M places
    // follow next M times
    // set next to next of word at that position
    // set next of word at that position to the word that is being moved
    // set head to point to original next
    // get the values for new head and add them to obj

    return res.status(200).send(obj);
  })

module.exports = languageRouter
