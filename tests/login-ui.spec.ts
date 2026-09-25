import {test,expect} from '@playwright/test';
test.use({launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}});
test('login modal opens, accepts phone, asks OTP and restores focus',async({page})=>{
 await page.goto('http://127.0.0.1:3000');
 const trigger=page.getByRole('button',{name:'Login / Profile'});await trigger.click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await dialog.getByRole('button',{name:'Continue',exact:true}).click();await expect(dialog.getByRole('alert')).toBeVisible();
 await dialog.getByLabel('Mobile number').fill('9876543210');await dialog.getByRole('button',{name:'Continue',exact:true}).click();
 await expect(dialog.getByLabel('6-digit OTP')).toBeFocused();await dialog.getByLabel('6-digit OTP').fill('123456');await dialog.getByRole('button',{name:'Verify OTP'}).click();await expect(dialog.getByRole('status')).toContainText('not connected');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();
 await trigger.click();await expect(dialog.getByLabel('Mobile number')).toHaveValue('');
 await page.setViewportSize({width:320,height:700});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await dialog.getByRole('button',{name:'Close login'}).click();await expect(dialog).not.toBeVisible();
 await page.goto('http://127.0.0.1:3000/login');await expect(dialog).toBeVisible();
});
