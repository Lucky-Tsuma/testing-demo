const lib = require('../lib')

describe('absolute', () => {
    it('Return positive number for positive input', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    
    it('Return positive number for negative input', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    
    it('Return 0 if input is 0', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
})

describe('greet', () => {
    it('Return greeting message', () => {
        const result = lib.greet('Lucky')
        expect(result).toMatch(/Lucky/)
    })
})

describe('getCurrencies', () => {
    it('Return supported currencies', () => {
        const result = lib.getCurrencies()
        // see documentation -> API Reference -> Expect
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
})

describe('getProduct', () => {
    it('Return product with the given id', () => {
        const result = lib.getProduct(1)
        expect(result).toMatchObject({ id: 1, price: 10 })
        expect(result).toHaveProperty('id', 1)
    })
})

describe('registerUser', () => {
    it('Should throw if username is falsy', () => {
        const args = [null, undefined, "", 0, false, NaN]
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow()
        })
    })

    it('Should return a user object if a valid username is passed', () => {
        const result = lib.registerUser('Lucky')
        expect(result).toMatchObject({ username: 'Lucky' })
        expect(result.id).toBeGreaterThan(0)
    })
})

