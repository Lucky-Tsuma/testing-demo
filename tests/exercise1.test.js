const lib = require('../exercise1')

describe('fizzbuzz', () => {
    it('Input not divisible by 3, 5 || 3 && 5 should return input', () => {
        const result = lib.fizzBuzz(1)
        expect(result).toBe(1)
    })

    it('Input divisible by 3 && 5 should return FizzBuzz', () => {
        const result = lib.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })

    it('Input divisible only by 3 return Fizz', () => {
        const result = lib.fizzBuzz(3)
        expect(result).toBe('Fizz')
    })

    it('Input divisible only by 3 return Buzz', () => {
        const result = lib.fizzBuzz(5)
        expect(result).toBe('Buzz')
    })

    it('Input which is not a number should throw an Error', () => {
        
        expect(() => { lib.fizzBuzz(null) }).toThrow()
        expect(() => { lib.fizzBuzz(undefined) }).toThrow()
        expect(() => { lib.fizzBuzz("string") }).toThrow()
        expect(() => { lib.fizzBuzz({}) }).toThrow()
    })
})