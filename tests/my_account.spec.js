
import { test } from "@playwright/test"
import { MyAccountPage } from "../page_objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"

test("My account using cookies injection and mocking network request", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    //console.warn({loginToken})

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),

        })

    })

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate((loginTokenInsideBrowserCode) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    } , [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()

}) 