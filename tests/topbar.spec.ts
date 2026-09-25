import {test,expect} from '@playwright/test';
test.use({launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}});
test('destination hover opens internal pages and top bar links navigate',async({page})=>{
 await page.goto('http://127.0.0.1:3000');await page.getByRole('button',{name:'Explore destinations',exact:true}).hover();await expect(page.locator('#destination-menu')).toBeVisible();
 await page.locator('#destination-menu').getByRole('link',{name:/Vrindavan/}).click();await expect(page).toHaveURL(/city=Vrindavan/);await expect(page.locator('.property-card')).toHaveCount(1);
 await page.getByRole('link',{name:'My Bookings',exact:true}).click();await expect(page).toHaveURL(/my-bookings/);
 await page.getByRole('link',{name:'Download app',exact:true}).click();await expect(page).toHaveURL(/download-app/);await expect(page.locator('main')).toContainText('Coming soon');
 await page.getByRole('link',{name:'Plan a celebration',exact:true}).click();await expect(page).toHaveURL(/weddings-events/);
 await page.getByRole('button',{name:'Explore destinations',exact:true}).click();await page.keyboard.press('Escape');await expect(page.locator('#destination-menu')).toHaveCount(0);
});