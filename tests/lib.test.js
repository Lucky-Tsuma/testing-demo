const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')

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

describe('applyDiscount', () => {
    it('Should apply  10% discount if customer has more than 10 points', () => {

        db.getCustomerSync = function (customerId) {
            console.log('Reading fake customer(applyDiscount')
            return { id: customerId, points: 20 }
        }

        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})

// Interaction testng here. Also, a better appraoch using jest mock functions.
describe('notifyCustomer', () => {
    it('Should send an email to the customer', () => {

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
        mail.send = jest.fn()

        lib.notifyCustomer({ customerId: 1 })

        expect(mail.send).toHaveBeenCalled()
        expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)
    })
})

