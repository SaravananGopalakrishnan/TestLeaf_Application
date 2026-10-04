import { Page } from "@playwright/test"


export class LoginPage{
    page:Page;

    constructor(page:Page){
        this.page = page
    }

    async lanuchBrowser(){
        await this.page.goto("https://leaftaps.com/opentaps/control/main")
    }

    async enterCredentials(username:string, pass:string){
        const userName = this.page.locator("#username")
        await userName.fill(username)
        const password = this.page.locator("#password")
        await password.fill(pass)
    }

    async clickLogin(){
       const loginButton = this.page.locator('//input[@class="decorativeSubmit"]');
       await loginButton.click();

    }
}