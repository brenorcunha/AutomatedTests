import { $, browser, expect } from '@wdio/globals'
import "assert";

describe('Testes de login no Healing', () => {
    for (let i = 0; i < 1; i++) {
        it(`Execução ${i}: Deve logar, verificar alguns componentes, redimensionar e deslogar`, async () => {
            await browser.url('/users/login/')
            await browser.setWindowSize(723, 781)
            const usernameInput = $('[name="username"]')
            await usernameInput.click()
            await usernameInput.setValue('brenorc')

            const inputPassword = $('[name="password"]')
            await inputPassword.setValue('Breno@123')

            expect(await inputPassword).toBeEnabled()
            
            const loginButton = $('.btn-success')
            expect(await loginButton).toBeDisplayed();
            await loginButton.click()
            
            const greetingText = $('//p/span')
            await greetingText.waitForExist({timeout: 20000})
            const texto = await greetingText.getText()
            await expect(texto).toContain('brenorc')

            const scheduleButton = $('.card-medicos:nth-child(3) > .btn')
            await scheduleButton.click()

            await $('=Healing').click()
            await $('.navbar-toggler-icon').click()
            await $('=Logout').click()
        })
        it('Teste de login sem inserção de dados', async() => {
            await browser.url('/users/login')
            const usernameInput = $('[name="username"]')
            const inputPassword = $('[name="password"]')
            await expect(usernameInput).toBeEnabled();
            await expect(inputPassword).toBeEnabled();

            const loginButton = $('.btn-success')
            expect(await loginButton).toBeDisplayed();
            await loginButton.click()
            const alert = $('.alert-danger')
            const text = alert.getText()
            await expect(text).toContain('An authentication error ocurred. Check user and password.')
        });
        it(`Teste inserindo apenas usuário`, async() =>{
            await browser.url('/users/login')
            const usernameInput = $('[name="username"]')
            const inputPassword = $('[name="password"]')
            await expect(usernameInput).toBeEnabled();
            await expect(inputPassword).toBeEnabled();
            await usernameInput.setValue('brenorc')

            const loginButton = $('.btn-success')
            expect(await loginButton).toBeDisplayed();
            await loginButton.click()
            const alert = $('.alert-danger')
            await alert.waitForExist({ timeout: 5000 })
            await expect(alert).toBeDisplayed()
            const text = alert.getText()
            await expect(text).toContain('An authentication error ocurred. Check user and password.')
        })
        it('Teste inserindo apenas senha', async() => {
            await browser.url('/users/login/')
            const usernameInput = $('[name="username"]')
            const inputPassword = $('[name="password"]')
            await expect(usernameInput).toBeEnabled();
            await expect(inputPassword).toBeEnabled();
            await inputPassword.setValue('Breno@123')

            const loginButton = $('.btn-success')
            expect(await loginButton).toBeDisplayed();
            await loginButton.click()
            const alert = $('.alert-danger')
            await alert.waitForExist({ timeout: 5000 })
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('An authentication error ocurred. Check user and password.')
        });
        it('Teste inserindo usuário inexistente', async() => {
            await browser.url('/users/login/')
            const usernameInput = $('[name="username"]')
            const inputPassword = $('[name="password"]')
            const loginButton = $('.btn-success')
            await expect(usernameInput).toBeEnabled();
            await expect(inputPassword).toBeEnabled();
            await usernameInput.setValue('andreall')
            await inputPassword.setValue('1234')

            await expect(loginButton).toBeDisplayed();
            await loginButton.click()
            const alert = $('.alert-danger')
            await alert.waitForExist({ timeout: 5000 })
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('An authentication error ocurred. Check user and password.')

        });
        it('Teste inserindo senha incorreta', async() => {
            await browser.url('/users/login/')
            const usernameInput = $('[name="username"]')
            const inputPassword = $('[name="password"]')
            const loginButton = $('.btn-success')

            await expect(usernameInput).toBeEnabled()
            await expect(inputPassword).toBeEnabled()
            await usernameInput.setValue('brenorc')
            await inputPassword.setValue('1234')

            await expect(loginButton).toBeDisplayed()
            await loginButton.click()
            const alert = $('.alert-danger')
            await alert.waitForExist({ timeout: 5000 })
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('An authentication error ocurred. Check user and password.')
        });

        it('Teste de cadastro sem inserção de dados', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The username must have at least, 6 digits')
        });
        it('Teste de tentativa de cadastro com inserção de senha apenas', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await inputPassword.setValue('123456')
            await inputPasswordConfirm.setValue('123456')
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The username must have at least, 6 digits')
        });
        it('Teste de tentativa de cadastro com inserção de senhas divergentes', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const usernameInput = $('[name="username"]')
            const emailInput = $('[name="email"]')
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await usernameInput.setValue('carlall')
            await emailInput.setValue('carlall@email.com')
            await inputPassword.setValue('12345')
            await inputPasswordConfirm.setValue('123456')
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The passwords did not MATCH!')
        });
        it('Teste de tentativa de cadastro com inserção de e-mail e senha apenas', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const usernameInput = $('[name="username"]')
            const emailInput = $('[name="email"]')
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await emailInput.setValue('carlall@email.com')
            await inputPassword.setValue('123456')
            await inputPasswordConfirm.setValue('123456')
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The username must have at least, 6 digits')
        });
        it('Teste de tentativa de cadastro com inserção de e-mail inválido', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const usernameInput = $('[name="username"]')
            const emailInput = $('[name="email"]')
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await usernameInput.setValue('carlall')
            await emailInput.setValue('carlallemailcom')
            await inputPassword.setValue('123456')
            await inputPasswordConfirm.setValue('123456')
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The e-mail is invalid!')
        });
        it('Teste de tentativa de cadastro com inserção de username inválido-5 dígitos', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const usernameInput = $('[name="username"]')
            const emailInput = $('[name="email"]')
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await usernameInput.setValue('carla')
            await emailInput.setValue('carlall@mail.com')
            await inputPassword.setValue('123456')
            await inputPasswordConfirm.setValue('123456')
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The username must have at least, 6 digits')
        });
        it('Teste de tentativa de cadastro com inserção de username inválido-Começa com numero', async() => {
            await browser.url('/users/register')
            const registerLink = $('.btn-dark-color-outline')
            await expect(registerLink).toContain("I don't have an account.")
            await registerLink.click()
            const usernameInput = $('[name="username"]')
            const emailInput = $('[name="email"]')
            const inputPassword = $('[name="password"]')
            const inputPasswordConfirm = $('[name="password_confirm"]')
            const registerButton = $('.btn-success')
            await expect(registerButton).toBeDisplayed()
            await usernameInput.setValue('6carla')
            await emailInput.setValue('carlallemailcom')
            await inputPassword.setValue('123456')
            await inputPasswordConfirm.setValue('123456')
            await registerButton.click()

            const alert = $('.alert-danger')
            await alert.waitForExist({timeout: 5000})
            await expect(alert).toBeDisplayed()
            const text = await alert.getText()
            await expect(text).toContain('The username must start with a letter!')
        });
    }
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
