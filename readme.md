#### WEBSERVICE API - CURSO ESPECIALIZA TI

STATUS CODE

2** (success)
  - 200 => OK
  - 201 => CREATED
  - 204 => NO CONTENT (NÃO RETORNA UM CONTEÚDO)
3** (redirect)
  - 304 => NOT MODIFIED
4** (client error)
  - 400 => BAD REQUEST
  - 401 => UNAUTHORIZED (ACESSO NÃO AUTORIZADO)
  - 403 => FORBIDDEN (USADO EM ACL)
  - 404 => NOT FOUND (PÁGINA NÃO ENCONTRADA)
  - 410 => GONE (RECURSO FOI RETIRADO)
  - 422 => VALIDATION (ERROS DE VALIDAÇÃO)
5** (server error)
  - 500 => INTERNAL SERVER ERROR
  - 503 => SERVICE UNAVAILABLE (SERVIÇO NÃO ESTÁ DISPONÍVEL - MANUTENÇÃO)
  
CORS (CROSS-ORIGIN RESOURCE SHARING)
  - CONTROLAR PERMISSÕES DE REQUISIÇÃO
  - HEADERS
  
TRATAMENTO DE ERROS
  - INTERCEPTAR ERROS E EXCEÇÕES (App\Exceptions\Handler.php)
  
MIDDLEWARES - FILTROS DE ACESSO
  - TOTAL DE REQUISIÇÃO / TEMPO (LIMITAÇÃO DE REQUISIÇÃO POR TEMPO)
  
#### ALGUNS ASSUNTOS IMPORTANTES

- CORS
- TRATAMENTO DE EXCESSÃO
- TRADUÇÃO COM ATRIBUTOS NAS VALIDAÇÕES
- VERSIONAMENTO DE APIs
- UPLOAD DE ARQUIVOS






  



