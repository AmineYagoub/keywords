import keywords from './../index.js'
import assert from 'assert'

describe('Keywords', function () {
  const langParams = ['es', 'de', '', null, 0, false]
  langParams.forEach(param => {
    it('should thrown error when language is not supported', function () {
      try {
        keywords('string tot test', { lang: param }).toArray()
      } catch (err) {
        assert(err instanceof Error)
        assert.strictEqual(err.message, 'Language must be one of: "arabic, english, french"')
      }
    })
  })

  const strArgs = [
    [1, 2],
    1,
    null,
    true,
    false,
    ' '
  ]
  strArgs.forEach(arg => {
    it('should return an empty array for Invalid string arg', () => {
      assert.strictEqual(keywords(arg).toArray().length, 0)
    })
  })

  const nonAlphaArgs = [
    { args: 'admin@myapp.com', expected: ['admin', 'myapp'] },
    { args: '<div id="fixtures" style="display: none; visibility: hidden;">mocha Test</div>', expected: ['mocha', 'Test'] },
    { args: '<div>mocha <b>Test</b></div>', expected: ['mocha', 'Test'] }
  ]
  nonAlphaArgs.forEach(({ args, expected }) => {
    it('it should remove any non AlphaNum chars', () => {
      assert.deepStrictEqual(keywords(args).toArray(), expected)
    })
  })

  const stopWordsArgs = [
    { str: 'an associated behind', lang: 'en' },
    { str: "aujourd'hui doit être etant", lang: 'fr' },
    { str: 'ان إنه انه أنه إلا أين', lang: 'ar' }
  ]
  stopWordsArgs.forEach(({ str, lang }) => {
    it('should return an empty array for a string that only contains stop words', () => {
      assert.deepStrictEqual(keywords(str, { lang }).toArray(), [])
    })
  })

  const str1 = 'With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!'
  const lowerCaseArgs = [
    {
      toLower: false,
      expected: ['Meta', 'Tags', 'edit', 'experiment', 'content', 'preview', 'webpage', 'Google', 'Facebook', 'Twitter']
    },
    {
      toLower: true,
      expected: ['meta', 'tags', 'edit', 'experiment', 'content', 'preview', 'webpage', 'google', 'facebook', 'twitter']
    }
  ]
  lowerCaseArgs.forEach(({ toLower, expected }) => {
    const opt = { lang: 'en', toLower }
    it("should return an array of 'keywords' with and without changing the case of the words", () => {
      assert.deepStrictEqual(keywords(str1, opt).toArray(), expected)
    })
  })

  const str2 = 'With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Google, Google and more!'
  const uniqueArgs = [
    {
      unique: false,
      expected: ['Meta', 'Tags', 'edit', 'experiment', 'content', 'preview', 'webpage', 'Google', 'Google', 'Google']
    },
    {
      unique: true,
      expected: ['Meta', 'Tags', 'edit', 'experiment', 'content', 'preview', 'webpage', 'Google']
    }
  ]
  uniqueArgs.forEach(({ unique, expected }) => {
    const opt = { lang: 'en', unique }
    it("should return unique and non unique array of 'keywords'", () => {
      assert.deepStrictEqual(keywords(str2, opt).toArray(), expected)
    })
  })

  const str3 = 'With Meta Tags you can edit Meta and experiment with your Meta Tags then preview how your webpage will look on Google, Google, Google and more!'
  const duplicateStrArgs = [
    {
      onlyDuplicate: false,
      unique: false,
      expected: ['Meta', 'Tags', 'edit', 'Meta', 'experiment', 'Meta', 'Tags', 'preview', 'webpage', 'Google', 'Google', 'Google']
    },
    {
      onlyDuplicate: true,
      unique: false,
      expected: ['Meta', 'Meta', 'Meta', 'Tags', 'Tags', 'Google', 'Google', 'Google']
    },
    {
      onlyDuplicate: true,
      unique: true,
      expected: ['Meta', 'Tags', 'Google']
    }
  ]
  duplicateStrArgs.forEach(({ onlyDuplicate, unique, expected }) => {
    const opt = { lang: 'en', onlyDuplicate, unique }
    it("should return only duplicated 'keywords'", () => {
      assert.deepStrictEqual(keywords(str3, opt).toArray(), expected)
    })
  })

  const str4 = 'With Meta Tags And since 2020 you can edit 3 Meta and experiment with it!'
  const digitsArgs = [
    {
      unique: true,
      digits: true,
      expected: ['Meta', 'Tags', '2020', 'edit', '3', 'experiment']
    },
    {
      unique: true,
      digits: false,
      expected: ['Meta', 'Tags', 'edit', 'experiment']
    }
  ]
  digitsArgs.forEach(({ unique, digits, expected }) => {
    const opt = { lang: 'en', unique, digits }
    it("should include digits in the list of 'keywords'", () => {
      assert.deepStrictEqual(keywords(str4, opt).toArray(), expected)
    })
  })

  const lengthArgs = [
    {
      length: null,
      expected: ['Meta', 'Tags', 'edit', 'experiment', 'content', 'preview', 'webpage', 'Google', 'Facebook', 'Twitter']
    },
    {
      length: 5,
      expected: ['Meta', 'Tags', 'edit', 'experiment', 'content']
    },
    {
      length: 1,
      expected: ['Meta']
    }
  ]
  lengthArgs.forEach(({ length, expected }) => {
    const opt = { lang: 'en', length }
    it("should return an array of 'keywords' with specified length", () => {
      assert.deepStrictEqual(keywords(str1, opt).toArray(), expected)
    })
  })
})
