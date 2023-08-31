import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        
        this.discountCode = this.page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = this.page.locator('[data-qa="discount-code-input"]')   
        this.submitDiscountButton = this.page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage = this.page.locator('[data-qa="discount-active-message"]')
        this.totalWithDiscountValue = this.page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = this.page.locator('[data-qa="total-value"]')
        this.creditCardOwner = this.page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = this.page.locator('[data-qa="credit-card-number"]')
        this.validUntil = this.page.locator('[data-qa="valid-until"]')
        this.creditCardCvc = this.page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = this.page.locator('[data-qa="pay-button"]')

    }
    activateDiscount = async () => {
        await this.discountCode.waitFor()
        await this.totalValue.waitFor
        const code = await this.discountCode.innerText()
        await this.discountCodeInput.waitFor
        // Option 1
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)
       
        // Option 2
        // await this.discountCodeInput.focus()
        // await this.page.keyboard.type(code, { delay: 1000 })
        // expect(await this.discountCodeInput.inputValue()).toBe(code)

        //checking Visible
        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        expect(await this.totalWithDiscountValue.isVisible()).toBe(false)

        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await this.discountActiveMessage.waitFor()

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueTextString = totalValueText.replace("$", "")
        const totalValueTextNumber = parseInt(totalValueTextString, 10)
        
        await this.totalWithDiscountValue.waitFor()
        const totalWithDiscountValueText = await this.totalWithDiscountValue.innerText()
        const totalWithDiscountValueTextString = totalWithDiscountValueText.replace("$", "")
        const totalWithDiscountValueTextNumber = parseInt(totalWithDiscountValueTextString, 10)
        // console.warn(totalValueTextNumber)
        // console.warn(totalWithDiscountValueTextNumber)
        expect(totalValueTextNumber).toBeGreaterThan(totalWithDiscountValueTextNumber)
    }
    
    fillDetails = async (creditCardDetailsData) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(creditCardDetailsData.creditCardOwner)
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(creditCardDetailsData.creditCardNumber)
        await this.validUntil.waitFor()
        await this.validUntil.fill(creditCardDetailsData.validUntil)
        await this.creditCardCvc.waitFor()
        await this.creditCardCvc.fill(creditCardDetailsData.creditCardCvc)
    }
   
    continueToThankYouForShoping = async () => {
        await this.payButton.waitFor
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }
    
}
