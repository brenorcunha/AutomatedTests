import { $, browser, expect } from '@wdio/globals'
import "assert";

describe('Testes de login no Healing', () => {
    for (let i = 0; i < 1; i++) {
        it(`Execução ${i}: Deve logar, verificar alguns componentes, redimensionar e deslogar`, async () => {
            await browser.url('/users/login/')
            await browser.setWindowSize(723, 781)
            await $('[name="username"]').setValue('brenorc')
            await $('[name="password"]').setValue('Breno@123')
            await $('.btn-success').click()
            
            const greetingText = $('//p/span')
            await greetingText.waitForExist({timeout: 10000})
            const texto = await greetingText.getText()
            await expect(texto).toContain('brenorc')

            const scheduleButton = $('.card-medicos:nth-child(3) > .btn')
            await scheduleButton.click()

            await $('=Healing').click()
            await $('.navbar-toggler-icon').click()
            await $('=Logout').click()
        })
    }
    it('Teste de login sem inserção de dados', async() => {
        await browser.url('/users/login')
        await $('[name="username"]').isDisplayed()
        await $('[name="password"]').isDisplayed()
        
        await $('.btn-success').click()
        const alert = $('.alert-danger')
        const text = alert.getText()
        await expect(text).toContain('An authentication error ocurred. Check user and password.')
    });
    it(`Teste inserindo apenas usuário`, async() =>{
        await browser.url('/users/login')
        await $('[name="username"]').setValue('brenorc')
        await $('[name="password"]').isDisplayed()
        
        await $('.btn-success').click()
        const alert = $('.alert-danger')
        await alert.waitForExist({ timeout: 5000 })
        await expect(alert).toBeDisplayed()
        const text = alert.getText()
        await expect(text).toContain('An authentication error ocurred. Check user and password.')
    })
    it('Teste inserindo apenas senha', async() => {
        await browser.url('/users/login/')
        await $('[name="username"]').isDisplayed()
        await $('[name="password"]').setValue('Breno@123')

        await $('.btn-success').click()
        const alert = $('.alert-danger')
        await alert.waitForExist({ timeout: 5000 })
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('An authentication error ocurred. Check user and password.')
    });
    it('Teste inserindo usuário inexistente', async() => {
        await browser.url('/users/login/')
        await $('[name="username"]').setValue('andreal')
        await $('[name="password"]').setValue('123456')
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await alert.waitForExist({ timeout: 5000 })
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('An authentication error ocurred. Check user and password.')
    });
    it('Teste inserindo senha incorreta', async() => {
        await browser.url('/users/login/')
        await $('[name="username"]').setValue('brenorc')
        await $('[name="password"]').setValue('123456')
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await alert.waitForExist({ timeout: 5000 })
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('An authentication error ocurred. Check user and password.')
    });

    it('Teste de cadastro sem inserção de dados', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click()
        await $('[name="password"]').isDisplayed()
        await $('[name="password_confirm"]').isDisplayed()
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The username must have at least, 6 digits')
    });
    it('Teste de tentativa de cadastro com inserção de senha apenas', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click()
        await $('[name="password"]').setValue('123456')
        await $('[name="password_confirm"]').setValue('123456')
        await $('.btn-success').click()
        
        const alert = $('.alert-danger')
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The username must have at least, 6 digits')
    });
    it('Teste de tentativa de cadastro com inserção de senhas divergentes', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click();
        await $('[name="username"]').setValue('carlall')
        await $('[name="email"]').setValue('carlall@email.com')
        await $('[name="password"]').setValue('12345')
        await $('[name="password_confirm"]').setValue('123456')
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The passwords did not MATCH!')
    });
    it('Teste de tentativa de cadastro com inserção de e-mail e senha apenas', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click()
        await $('[name="email"]').setValue('carlall@email.com')
        await $('[name="password"]').setValue('123456')
        await $('[name="password_confirm"]').setValue('123456')
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The username must have at least, 6 digits')
    });
    it('Teste de tentativa de cadastro com inserção de e-mail inválido', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click()
        await $('[name="username"]').setValue('carlall')
        await $('[name="email"]').setValue('email.com')
        await $('[name="password"]').setValue('123456')
        await $('[name="password_confirm"]').setValue('123456')
        $('.btn-success').click()
        
        const alert = $('.alert-danger')
        await alert.waitForExist({timeout: 5000})
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The e-mail is invalid!')
    });
    it('Teste de tentativa de cadastro com inserção de username inválido-5 dígitos', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click()
        await $('[name="username"]').setValue('carla')
        await $('[name="email"]').setValue('carlall@email.com')
        await $('[name="password"]').setValue('123456')
        await $('[name="password_confirm"]').setValue('123456')
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The username must have at least, 6 digits')
    });
    it('Teste de tentativa de cadastro com inserção de username inválido-Começa com numero', async() => {
        await browser.url('https://brenorcunha.pythonanywhere.com')
        await $('//a[contains(text(),"I don\'t have an account.")]').click()
        await $('[name="username"]').setValue('6carla')
        await $('[name="email"]').setValue('carlall@email.com')
        await $('[name="password"]').setValue('123456')
        await $('[name="password_confirm"]').setValue('123456')
        await $('.btn-success').click()

        const alert = $('.alert-danger')
        await expect(alert).toBeDisplayed()
        const text = await alert.getText()
        await expect(text).toContain('The username must start with a letter!')
    });
})

/* 
describe('WebdriverIO Component Testing', () => {
    it('should be able to render to the DOM and assert', async () => {
        const component = document.createElement('button')
        component.innerHTML = 'Hello World!'
        document.body.appendChild(component)

        await expect($('aria/Hello World!')).toBePresent()
        component.remove()
        await expect($('aria/Hello World!')).not.toBePresent()
    })
}) */
