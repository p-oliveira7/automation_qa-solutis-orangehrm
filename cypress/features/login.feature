# language: en

Feature: Login no site da OrangeRhm

    @Positivo @smokeTest
    Scenario: Login com sucesso
        Given acesso a pagina de login
        When realizo o login com dados válidos
        Then login é realizado com sucesso
