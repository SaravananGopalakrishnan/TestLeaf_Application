import { Locator } from "@playwright/test";
import { LoginPage } from "./loginPage";

export class LeadPage extends LoginPage{


    async clickLeadTab(){
        const leadTab =  this.page.locator("//a[text()='Leads']")
        await leadTab.click();
    }

    async clickCreateLead(){
        const createLead = this.page.locator("//a[text()='Create Lead']")
        await createLead.click()
    }

    async fillLeadDetails(company:string,fName:string,lName:string){
        const companyName = this.page.locator("#createLeadForm_companyName")
        await companyName.fill(company)
        const firstName = this.page.locator("#createLeadForm_firstName")
        await firstName.fill(fName)
        const lastName = this.page.locator("#createLeadForm_lastName")
        await lastName.fill(lName)
    }

    async createLeadButton(){
        await this.page.locator("[class='smallSubmit']").click()
    }

    async selectSource(visibleText:string){
        const source:Locator = this.page.locator("#createLeadForm_dataSourceId")
        await source.selectOption(visibleText);
    }

    async marketingCampaign(labelText:string){
        const marketing = this.page.locator("#createLeadForm_marketingCampaignId")
        await marketing.selectOption({label:labelText})
    }

    async getCountMarketingCampaign():Promise<number>{
        const count = this.page.locator("#createLeadForm_marketingCampaignId>option")
        return await count.count()
    }

    async printAllValueMarketingCampaign(){
        const valueArray:Locator[]= await this.page.locator("#createLeadForm_marketingCampaignId>option").all()
        for(let i=0; i<valueArray.length; i++){
            console.log("Print the value of marketing campaign ", await valueArray[i].innerText())
        }
    }

    async selectIndustry(index:number){
       const industry =  this.page.locator("#createLeadForm_industryEnumId")
       await industry.selectOption({index:index})
    }

    async preferredCurrency(value:string){
        const currency = this.page.locator("#createLeadForm_currencyUomId")
        await this.page.waitForTimeout(2000)
        console.log("Currency Value ", value)
        await currency.selectOption({value:value})
    }

    async selectCountry(text:string){
        const country = this.page.locator("#createLeadForm_generalCountryGeoId")
        await country.selectOption(text)
    }

    async selectState(value:string){
        const state = this.page.locator("#createLeadForm_generalStateProvinceGeoId")
        await state.selectOption({value:value})
    }

    async getStateCount(){
        const stateCount = this.page.locator("#createLeadForm_generalStateProvinceGeoId>option")
        console.log("State option count ", await stateCount.count())
    }

    async printAllValueStateValue(){
        const valueArray:Locator[]= await this.page.locator("#createLeadForm_generalStateProvinceGeoId>option").all()
        for(let i=0; i<valueArray.length; i++){
            console.log("Print the value of state ", await valueArray[i].innerText())
        }
    }


}