import { expect } from "@playwright/test"
export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveDetailsButton = page.locator('[data-qa="save-address-button"]')
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]') 
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })

    }
    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postCode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        await this.countryDropdown.waitFor()
        // select option from dropdown
        await this.countryDropdown.selectOption(userAddress.country)    
    }
    saveDetails = async () => {
        //counting objects
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveDetailsButton.waitFor()
        await this.saveDetailsButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()
        //compare text with input
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
       
        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
       
        await this.savedAddressPostCode.first().waitFor()
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())
       
        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
       
        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
        
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    }
}