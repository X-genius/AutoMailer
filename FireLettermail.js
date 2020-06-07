require("chromedriver");
let key = require("selenium-webdriver");
let fs = require("fs");

let credentialFile = process.argv[2];
let DATA = fs.readFileSync("Intern.txt");

let bld = new key.Builder();
let driver = bld.forBrowser("chrome").build();
driver.manage().window().maximize();

(async function() {
try
{
    
    let data = await fs.promises.readFile(credentialFile , "utf-8");
    let credential = JSON.parse(data);
    let url = credential.url;
    let email = credential.email;
    let pwd = credential.pwd;
    let participant = credential.participant;
    let sub = credential.Subject;
    let GoingUrl = await driver.get(url);
    await GoingUrl;
    await driver.manage().setTimeouts({
       implicit : 10000,
       pageLoad : 10000
    })
    let emailEnter = await driver.findElement(key.By.css("#identifierId"));
    await emailEnter.sendKeys(email);
    let EmailNextBtn = await driver.findElement(key.By.css(".CwaK9 .RveJvd.snByac"));
    await EmailNextBtn.click();
    let pwdEnter = await driver.findElement(key.By.css(".Xb9hP input[type='password']"));
    await pwdEnter.sendKeys(pwd);
    let pwdNextBtn = await driver.findElement(key.By.css("#passwordNext"));
    await pwdNextBtn.click();
    let ComposeBtn = await driver.findElement(key.By.css(".T-I.J-J5-Ji.T-I-KE.L3"));
    await ComposeBtn.click();
    let Receipt = await driver.findElement(key.By.css(".fX.aXjCH table tbody tr td.eV .oj textarea"));
    await Receipt.sendKeys(participant);
    //await Receipt.sendKeys(key.Key.ENTER);
    let Subject = await driver.findElement(key.By.css(".aoD.az6 input[placeholder='Subject']"));
    await Subject.sendKeys(sub);
    await Subject.sendKeys(key.Key.ENTER);
    let TextArea = await driver.findElement(key.By.css("div[aria-label='Message Body']"));
    await TextArea.sendKeys(DATA + "");
    let SendBtn = await driver.findElement(key.By.css(".T-I.J-J5-Ji.aoO.v7.T-I-atl.L3"));
    await SendBtn.click();
}

catch(err){
    console.log(err);
}
})();