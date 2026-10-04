import { test, expect } from '@playwright/test';
import {parse} from "csv-parse/sync"
import fs from "fs"
import path from "path"
import {LoginPage} from "../page/loginPage"
import { WelcomePage } from '../page/welcomePage';
import { LeadPage } from '../page/leadPage';
import { faker, Faker } from '@faker-js/faker';

test('create lead', async ({ page }) => {
   
  const data:any = parse(fs.readFileSync(path.join(__dirname, "../data/loginTestData.csv")),{columns:true});
  console.log(data)
  const login = new LoginPage(page)
  await login.lanuchBrowser();
  await login.enterCredentials(data[0].Username, data[0].Password);
  await login.clickLogin();

  // Welcome page
  const wp = new WelcomePage(page)
  wp.clickCRM();

  // Lead Page
  const leadData:any = parse(fs.readFileSync(path.join(__dirname,"../data/leadTestData.csv")),{columns:true})
  const lp = new LeadPage(page)
  await lp.clickLeadTab()
  await lp.clickCreateLead()
  const company = faker.company.name(); 
  await lp.fillLeadDetails(company, faker.person.firstName(), faker.person.lastName())
  await lp.selectSource(leadData[0].SourceDropdown)
  await lp.marketingCampaign(leadData[0].Marketing)
  console.log("Marketing campaign option count ", await lp.getCountMarketingCampaign())
  await lp.printAllValueMarketingCampaign();
  await lp.selectIndustry(2);
  await lp.preferredCurrency(leadData[0].Currency)
  await lp.selectCountry(leadData[0].Country)
  await lp.selectState(leadData[0].State)
  await lp.getStateCount();
  await lp.printAllValueStateValue();
  await lp.createLeadButton();
  // 
});


