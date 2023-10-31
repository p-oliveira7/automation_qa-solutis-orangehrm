# language: en

Feature: Personal Information Management
  Background: realizar o login
    Given que o login é realizado com sucesso

  @Positivo @smokeTest
  Scenario: Adiciona um novo colaborador
    Given que acesso a área PIM
    And acesso a área Adicionar Colaborador
    When preencho o formulário Novo Colaborador com dados válidos
    Then devo ser capaz de validar os detalhes do Colaborador
    
  @Positivo @smokeTest
  Scenario: Procura um Colaborador
    Given que um novo Colaborador é cadastrado com sucesso
    When pesquiso pelo Colaborador
    Then devo ser capaz de validar os dados do Colaborador na tabela
