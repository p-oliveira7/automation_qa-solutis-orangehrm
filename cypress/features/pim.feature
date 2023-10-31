# language: en

Feature: PIM
  Background:
    Given O usuário está logado

  Scenario: Adiciona um novo colaborador
    Given que acesso a área PIM
    And acesso a área Adicionar Colaborador
    When preencho o formulário Novo Colaborador com dados válidos
    Then devo ser capaz de validar os detalhes do Colaborador

  Scenario: Procura um Colaborador
    Given que acesso a área PIM
    When procuro por um Colaborador
    Then devo ser capaz de validar os dados do Colaborador na tabela
