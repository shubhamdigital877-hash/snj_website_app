import {test,expect} from '@playwright/test';
test.use({launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}});
test('hover dropdown, page navigation, full underline and mobile access',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:3000');
 const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});
 await nav.getByRole('link',{name:'Our properties',exact:true}).hover();
 await expect(page.locator('#property-dropdown')).toBeVisible();
 await page.locator('#property-dropdown').getByRole('link',{name:/SNJ Taj Grand/}).click();
 await expect(page).toHaveURL(/properties\/snj-taj-grand$/);await expect(page.getByRole('heading',{level:1})).toHaveText('SNJ Taj Grand');
 await nav.getByRole('link',{name:'Offers',exact:true}).click();await expect(page).toHaveURL(/\/offers$/);
 await expect(nav.getByRole('link',{name:'Offers',exact:true}).locator('svg')).toHaveCount(0);
 const underline=await nav.getByRole('link',{name:'Offers',exact:true}).evaluate(el=>({width:el.getBoundingClientRect().width,line:parseFloat(getComputedStyle(el,'::after').width)}));expect(Math.abs(underline.width-underline.line)).toBeLessThan(1);
 await expect(page.getByRole('link',{name:'Login / Profile',exact:true})).toBeVisible();
 const adjacent=await page.locator('.login-book-group').evaluate(el=>[...el.children].map(e=>e.textContent?.trim()));expect(adjacent).toEqual(['Login','Book a stay']);
 await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.locator('header a[href*="maps"]')).toHaveCount(0);
 await page.screenshot({path:'test-results/header-pages-desktop.png',animations:'disabled'});
 for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Our properties',exact:true}).click();await expect(page).toHaveURL(/\/properties$/);await expect(page.locator('#mobile-nav')).toHaveCount(0);
 await page.getByRole('searchbox').fill('Vrindavan');await expect(page.locator('.property-card')).toHaveCount(1);
 await page.getByRole('link',{name:'Login / Profile',exact:true}).click();await expect(page).toHaveURL(/\/login$/);
 await page.screenshot({path:'test-results/header-pages-mobile.png',animations:'disabled'});
});