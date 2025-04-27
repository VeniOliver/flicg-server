# pit-cnpj-be

Back-End de API para consultar dados de CNPJ (Cadastro Nacional da Pessoa Jurídica) diretamente da Receita Federal.

Essa API é resultado do PIT Atividade da disciplina Projeto Integrador Transdisciplinar em Engenharia de Software II do curso de Bacharelado em Engenharia de Software da Universidade Cruzeiro do Sul.

Um demonstração com implementação dos serviços dessa API está disponível [aqui](https://pit-cnpj.venith.com.br)

O Front-end dessa solução está disponível [aqui](https://github.com/VeniOliver/pit-cnpj-fe)

A documentação está disponível [aqui](https://github.com/VeniOliver/pit-cnpj-be/tree/735d75d4ce6fa588b14e0a6ed08f5c967c49eafa/docs)

## Dados do aluno
- **Nome**: VENILSON PEREIRA DE OLIVEIRA
- **RGM**: 31237444
- **Semestre**: 2024.2

## Vídeo de demonstração

[![Demonstração](https://img.youtube.com/vi/fy1dzJDhMRo/0.jpg)](https://www.youtube.com/watch?v=fy1dzJDhMRo)

## Funcionalidades

1. **Consultar CNPJ**:
   - A API permite acessar informações públicas sobre uma empresa fornecendo seu número de CNPJ.

2. **Integração com a Receita Federal do Brasil**:
   - As consultas são realizadas diretamente no site oficial da Receita Federal, garantindo dados confiáveis e atualizados.

3. **Retorno do Captcha para o Usuário**:
   - A API retorna o captcha exigido pela Receita Federal para que o usuário o resolva e prossiga com a consulta.

4. **Restrição de Acesso por API Key**:
   - O acesso à API é restrito e controlado por meio de chaves de autenticação (**API Keys**).
   - **Como funciona**:
     - O cliente deve enviar a chave no cabeçalho da requisição:
       ```http
       Authorization: Bearer <x-api-key>
       ```
     - A API valida a chave antes de processar qualquer operação.

5. **Suporte a CORS**:
   - A API possui configurações de **Cross-Origin Resource Sharing (CORS)**, controlando o acesso entre domínios.
   - **Configuração**:
     - Apenas domínios autorizados podem consumir os endpoints da API, reforçando a segurança contra acessos não autorizados.

## Endpoints

- **Endpoint**: https://pit-cnpj-6a154954b78f.herokuapp.com

### 1. **Consultar CNPJ na base da dados da API**
- **Método**: `GET`
- **Rota**: `/cnpj/:cnpj`
- **Descrição**: Esta rota permite consultar se o cnpj já existe na base de dados da API.
- **Parâmetros**:
  - `cnpj` (obrigatório): O número do CNPJ a ser consultado. Deve ser fornecido sem formatação (ex: `41381074673865`).
- **Resposta**: Retorna um objeto JSON com informações sobre a empresa, como nome, endereço, natureza jurídica, situação cadastral, etc. Caso o CNPJ não esteja registrado na base de dados da API é retornado os dados para gerar o captcha do lado do cliente.

**Exemplo de retorno com erro**:

```json
{
  "code": "",
  "message": "CNPJ Inválido"
}
```

**Exemplo de retorno com dados para gerar o captcha**:

```json
{
  "captcha": "6eab04db-6005-4b5b-ae15-788080bac6c1",
}
```
O código acima deve ser utilizado no lado do cliente como parâmetro `siteKey` do HCaptcha conforme [Developer Guide HCaptcha](https://docs.hcaptcha.com/)

**Exemplo de retorno com dados do CNPJ**:

```json
{
  "registration_number": 56237002000153,
  "opening_date": "02/08/2024",
  "company_name": "HET PESQUISAS E MARKETING LTDA",
  "trade_name": "HET INTELIGENCIA EM PESQUISAS",
  "size": "ME",
  "main_activity": "73.20-3-00 - Pesquisas de mercado e de opinião pública (Dispensada *)",
  "secondary_activities": [
    "62.04-0-00 - Consultoria em tecnologia da informação (Dispensada *)",
    "73.19-0-03 - Marketing direto (Dispensada *)",
    "82.11-3-00 - Serviços combinados de escritório e apoio administrativo (Dispensada *)"
  ],
  "legal_nature": "206-2 - Sociedade Empresária Limitada",
  "street": "R ADNALVINO DIAS DE DEUS",
  "number": "457",
  "complement": "********",
  "zip_code": "44.820-035",
  "neighborhood": "OLIVEIRA",
  "city": "CAPIM GROSSO",
  "state": "BA",
  "email": "HETPESQUISA@GMAIL.COM",
  "phone": "(74) 9137-1403",
  "responsible_entity": "*****",
  "status": "ATIVA",
  "status_date": "02/08/2024",
  "status_reason": "",
  "special_status": "********",
  "special_status_date": "********",
  "logs": [
    {
      "timestamp": "2024-12-01T17:57:49.050Z",
      "action": "create"
    }
  ],
  "_id": "674ca39d411bcd8a95eb02f4",
  "__v": 0
} 
```

### 2. **Consultar CNPJ na Receita Federal**
- **Método**: `POST`
- **Rota**: `/cnpj/rfb`
- **Descrição**: Esta rota permite consultar um cnpj na base de dados da Receita Federal.
- **Parâmetros**:
  - `registration_number` (obrigatório): O número do CNPJ a ser consultado. Deve ser fornecido sem formatação (ex: `41381074673865`).
  - `captcha_response` (obrigatório): O token do captcha resolvido do lado do cliente.
- **Resposta**: Retorna um objeto JSON com informações sobre a empresa, como nome, endereço, natureza jurídica, situação cadastral, etc.

**Exemplo de retorno com erro**:

```json
{
  "code": "",
  "message": "CNPJ Inválido"
}
```

**Exemplo de retorno com dados do CNPJ**:

```json
{
  "registration_number": 56237002000153,
  "opening_date": "02/08/2024",
  "company_name": "HET PESQUISAS E MARKETING LTDA",
  "trade_name": "HET INTELIGENCIA EM PESQUISAS",
  "size": "ME",
  "main_activity": "73.20-3-00 - Pesquisas de mercado e de opinião pública (Dispensada *)",
  "secondary_activities": [
    "62.04-0-00 - Consultoria em tecnologia da informação (Dispensada *)",
    "73.19-0-03 - Marketing direto (Dispensada *)",
    "82.11-3-00 - Serviços combinados de escritório e apoio administrativo (Dispensada *)"
  ],
  "legal_nature": "206-2 - Sociedade Empresária Limitada",
  "street": "R ADNALVINO DIAS DE DEUS",
  "number": "457",
  "complement": "********",
  "zip_code": "44.820-035",
  "neighborhood": "OLIVEIRA",
  "city": "CAPIM GROSSO",
  "state": "BA",
  "email": "HETPESQUISA@GMAIL.COM",
  "phone": "(74) 9137-1403",
  "responsible_entity": "*****",
  "status": "ATIVA",
  "status_date": "02/08/2024",
  "status_reason": "",
  "special_status": "********",
  "special_status_date": "********",
  "logs": [
    {
      "timestamp": "2024-12-01T17:57:49.050Z",
      "action": "create"
    }
  ],
  "_id": "674ca39d411bcd8a95eb02f4",
  "__v": 0
} 
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

A Licença MIT permite que qualquer pessoa faça praticamente qualquer coisa com o código, incluindo copiá-lo, modificá-lo, distribuí-lo e usá-lo em projetos privados, desde que forneçam o aviso de copyright e a renúncia de responsabilidade da licença em todas as cópias ou partes substanciais do software.

Para mais detalhes sobre a Licença MIT, consulte o [site oficial](https://opensource.org/licenses/MIT).



