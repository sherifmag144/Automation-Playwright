const { expect } = require("@playwright/test")

exports.ContactForm =
class ContactForm{
constructor(page){
this.page = page
this.nameform = this.page.locator("input[placeholder='Name']")
this.emailform = this.page.locator("input[placeholder='Email']")
this.subjectform = this.page.locator("input[placeholder='Subject']")
this.messageform = this.page.locator("#message")

}

async fillingForm (name,email,subject,message){

    await this.nameform.fill(name);
    await this.emailform.fill(email);
    await this.subjectform.fill(subject);
    await this.messageform.fill(message) ;

}

async uploadfile (uploadfile){
    await this.page.locator("input[name='upload_file']").setInputFiles(uploadfile)
    await this.page.locator("input[value='Submit']").click();
    this.page.on('dialog', async dialog =>{ 
        await dialog.accept()
        const messagesuccess = this.page.locator('.status.alert.alert-success')
        expect.soft(messagesuccess).toContainText("Success! Your details have been submitted successfully")
        await this.page.waitForTimeout (5000) ;

});
}




}