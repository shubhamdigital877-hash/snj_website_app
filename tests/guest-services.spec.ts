import {test,expect} from '@playwright/test';
test.use({launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}});
test('guest services have separate reloadable pages with honest states',async({page})=>{
 await page.goto('http://127.0.0.1:3000/login');await expect(page.getByLabel('Mobile number')).toBeVisible();
 await page.goto('http://127.0.0.1:3000/profile');await expect(page).toHaveURL(/profile$/);await page.reload();await expect(page.locator('main')).toContainText('Personal details');
 await page.goto('http://127.0.0.1:3000/my-bookings');await expect(page.locator('main')).toContainText('Booking lookup opens at launch');
 await page.goto('http://127.0.0.1:3000/offers');await page.getByRole('button',{name:'Vrindavan',exact:true}).click();await expect(page.getByRole('status')).toContainText('No offers published yet in Vrindavan');
 await page.locator('main').getByRole('link',{name:'Explore our properties'}).click();await expect(page).toHaveURL(/properties$/);
 const response=await page.goto('http://127.0.0.1:3000/properties/not-a-property');expect(response?.status()).toBe(404);
});