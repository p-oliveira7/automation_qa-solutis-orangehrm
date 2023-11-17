# Cypress - OrageHRM

Projeto de automação de testes End-to-End (E2E) utilizando Cypress, Cucumber, Gherkin e outras ferramentas para o site OrangeHRM.

## Ferramentas Utilizadas

| Ferramenta | Descrição | Versão |
|------------|-----------|--------|
| [Cypress](https://www.npmjs.com/package/cypress) | Automação de testes de interface do usuário | ![Cypress Version](https://img.shields.io/badge/cypress-v13.3.1-brightgreen) |
| [cypress-file-upload](https://www.npmjs.com/package/cypress-file-upload) | Facilita o upload de arquivos durante os testes | ![cypress-file-upload Version](https://img.shields.io/badge/cypress--file--upload-v5.0.8-brightgreen) |
| [faker-br](https://www.npmjs.com/package/faker-br) | Geração de dados falsos | ![faker-br Version](https://img.shields.io/badge/faker--br-v0.4.1-brightgreen) |
| [cypress-cucumber-preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor) | Integração do Cucumber com o Cypress | ![cypress-cucumber-preprocessor Version](https://img.shields.io/badge/cypress--cucumber--preprocessor-v4.3.1-brightgreen) |
| [dotenv](https://www.npmjs.com/package/dotenv) | Carregamento de variáveis de ambiente | ![dotenv Version](https://img.shields.io/badge/dotenv-v16.3.1-brightgreen) |
| [multiple-cucumber-html-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter) | Geração de relatórios HTML | ![multiple-cucumber-html-reporter Version](https://img.shields.io/badge/multiple--cucumber--html--reporter-v3.5.0-brightgreen) |
| [cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters) | Geração de relatórios múltiplos | ![cypress-multi-reporters Version](https://img.shields.io/badge/cypress--multi--reporters-v1.6.3-brightgreen) |

## Estrutura de Pastas
Este projeto segue uma estrutura organizada de pastas dentro do diretório `cypress`:

- **features**: Contém os arquivos de especificação Gherkin para os testes.
- **fixtures**: Armazena dados de teste ou massa de dados para serem utilizados nos testes.
- **page**: Contém classes responsáveis pelos métodos com a lógica de teste, organizadas por funcionalidade.
  - **loginPage.js**: Classe com métodos relacionados ao login.
  - **pimPage.js**: Classe com métodos relacionados ao PIM (Personal Information Management).
- **elements**: Armazena módulos ou classes que representam elementos específicos da interface.
  - **loginElements.js**: Módulo com elementos relacionados ao login.
  - **pimElements.js**: Módulo com elementos relacionados ao PIM.

## Tutorial: Configurando e Executando Testes

### Pré-requisitos
1. [VSCode](https://code.visualstudio.com/)
2. [Node.js](https://nodejs.org/)

## Configuração

### Clonar o Repositório
```bash
git clone https://github.com/p-oliveira7/automation_qa-solutis-orangehrm.git
cd automation_qa-solutis-orangehrm
```
### Instalar Dependências
```bash
npm i
```
# Scripts
### Executar os Testes
- Abra o Cypress (modo interativo):
```bash
npx cypress open
```
### Executar os testes em modo headless e gerar o relatório:

```bash
npx cypress run
```
### Gerar Relatório

```bash
npm run report:merge
npm run report:generate
```
## Testes

Os testes deste projeto estão escritos em Gherkin, uma linguagem que permite descrever o comportamento do software de forma fácil de entender. Abaixo, você encontra exemplos de cenários de teste para as funcionalidades de login e gerenciamento de informações pessoais:

### Login no site da OrangeHRM
```gherkin
Feature: Login no site da OrangeRhm

  @Positivo @smokeTest
  Scenario: Login com sucesso
    Given acesso a pagina de login
    When realizo o login com dados válidos
    Then login é realizado com sucesso

  @Negativo
  Scenario Outline: Login sem sucesso: <testDecription>
    Given acesso a pagina de login
    When realizo login com "<login>" e "<senha>"
    Then alerta de dados incorretos é exibido
    Examples:
      | testDecription  | login | senha |
      | Senha incorreta | Admin | 123   |
      | Login incorreto | 123   | 123   |

  @Negativo
  Scenario Outline: Login sem sucesso: <testDecription>
    Given acesso a pagina de login
    When realizo login com "<login>" e "<senha>"
    Then alerta de "<testDecription>" é exibido com sucesso
    Examples:
      | testDecription                | login | senha |
      | não preenchimento do username |       | 123   |
      | não preenchimento da senha    | 123   |       |

```
### Personal Information Management
```gherkin
Feature: Personal Information Management

  Background: Realizar o login
    Given que o login é realizado com sucesso

  @Positivo @smokeTest
  Scenario: Adiciona um novo colaborador
    Given que acesso a área PIM
    And acesso a área Adicionar Colaborador
    When preencho o formulário Novo Colaborador com dados válidos
    Then os detalhes do Colaborador devem ser exibidos corretamente
    
  @Positivo @smokeTest
  Scenario: Procura um Colaborador
    Given que um novo Colaborador é cadastrado com sucesso
    When pesquiso pelo Colaborador
    Then os detalhes do Colaborador devem ser exibidos corretamente na tabela

  @Positivo @smokeTest
  Scenario: Validar listagem de colaboradores
    When acesso o menu de colaboradores
    Then colaboradores são listados com sucesso
```
## Relatório de Testes

O relatório de testes está configurado para ser gerado automaticamente pelo GitHub Actions e publicado no GitHub Pages. Para visualizar os relatórios, acesse a seguinte URL:

[Relatório de Testes](https://p-oliveira7.github.io/automation_qa-solutis-orangehrm/)

