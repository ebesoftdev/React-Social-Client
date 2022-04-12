const profanityFilter = {
  wordBank: ['darn', 'dang', 'freak', 'badonkadonk'],
  filter: function (string: string) {
    // if string contains word from wordBank, return false. Otherwise return true.
    string = string.toLowerCase();
    
    for (let i = 0; i < this.wordBank.length; i++) {
      if (string.includes(this.wordBank[i]))
        return false;
    }

    return true;
  }
}

export default profanityFilter;