const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getTotalScore(db, userId) {
    return db
      .from('word')
      .select(db.raw('SUM(word.correct_count) as totalScore'))
      .where({'language.user_id': userId })
      .join('language', 'language.id', '=', 'word.language_id')
  },

  getFirstWord(db, userId) {
    return db
      .from('word')
      .select('*')
      .join('language', 'language.id', '=', 'word.language_id')
      .where('word.id', '=', db.raw('language.head'))
      .andWhere({ 'language.user_id': userId });

  }
}

module.exports = LanguageService


//  .select('original', 'correct_count', 'incorrect_count', 'language_id')