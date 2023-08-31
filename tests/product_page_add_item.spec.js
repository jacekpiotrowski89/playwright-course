import {test, expect} from "@playwright/test"

test.skip("Product page add to Basket", async ({page}) => {
   await page.goto("/");

   const addToBasktetButton = page.locator('[data-qa="product-button"]').first();
   const basketCounter = page.locator('[data-qa="header-basket-count"]');
   

   await addToBasktetButton.waitFor();
   await expect(addToBasktetButton).toHaveText('Add to Basket');
   await expect(basketCounter).toHaveText('0');
   await addToBasktetButton.click();
   await expect(addToBasktetButton).toHaveText('Remove from Basket');
   await expect(basketCounter).toHaveText('1');

   const checkoutButton = page.getByRole('link', { name: 'Checkout' })
   await checkoutButton.waitFor();
   await checkoutButton.click();

   await page.waitForURL('/basket');
   await expect(page).toHaveURL('/basket');
})
