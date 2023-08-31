
import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) {
        this.page = page
        
        this.goToRegisterButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    goToRegister = async () => {
        await this.goToRegisterButton.waitFor()
        await this.goToRegisterButton.click()
        await expect(this.page).toHaveURL(/\/signup/, {timeout: 3000})
        
    }
}