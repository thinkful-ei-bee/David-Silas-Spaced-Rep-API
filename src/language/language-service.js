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

  updateLanguage(db, id, obj) {
    return db
      .from ('language')
      .where({ id })
      .update({
        head: obj.head,
        total_score: obj.total_score
      });
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

  getFirstWord(db, languageId) {
    return db
      .from('word')
      .select('word.*')
      //.join('language', 'language.id', '=', 'word.language_id')
      .join('language', 'language.head', '=', 'word.id')
      //.where('word.id', '=', db.raw('language.head'))
      .where({ 'language_id': languageId });

  },

  getWordFromId(db, id) {
    return db 
      .from('word')
      .select('*')
      .where({ id });
  },

  updateWord(db, id, updates) {
    return db
      .from('word')
      .where({ id })
      .update(updates)
  }
}

module.exports = LanguageService


