import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid"
import { ProductsPage } from "../page_objects/ProductsPage.js"
import { Navigation } from "../page_objects/Navigation.js"
import { Checkout } from "../page_objects/Checkout.js"
import { LoginPage } from "../page_objects/LoginPage.js"
import { RegisterPage} from "../page_objects/RegisterPage.js"
import { DeliveryDetails } from "../page_objects/DeliveryDetails.js"
import { deliveryDetails as userAddress } from "../data/deliveryDetails.js"
import { PaymentPage } from "../page_objects/PaymentPage.js"
import { creditCardDetailsData } from "../data/creditCardDetailsData.js"
test("new user full end to end test journey", async ({page}) => {

    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    const navigation = new Navigation(page) 
    await navigation.goToCheckout() 

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const loginpage = new LoginPage(page)
    await loginpage.goToRegister()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillDetails(creditCardDetailsData)
    await paymentPage.continueToThankYouForShoping()
})