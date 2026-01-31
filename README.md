# ⚓️ MarineData ⚓️


Neste projeto, assumimos o papel de Analista de Dados da Marinha, responsável por monitorar atividades de piratas a partir de registros armazenados em um arquivo CSV.

O objetivo é transformar dados brutos em informações estratégicas que auxiliem a tomada de decisão, simulando um cenário real de empresa onde gestores solicitam métricas claras, consolidadas e confiáveis.

Os dados analisados contêm informações sobre piratas, suas tripulações, capitães, valores de bounty (recompensa) e ilhas onde foram registrados.


---

# Objetivos da Análise

A partir do conjunto de dados, o gestor (Comandante da marinha!) solicitou as seguintes análises:

Quantificar o total de berries movimentado por cada tripulação

Calcular o bounty médio por pirata

Identificar quais capitães representam maior risco (maior soma de bounty)

Gerar um resumo geral para relatório executivo


Essas solicitações são típicas do dia a dia de um analista de dados em empresas orientadas por métricas.


---

# O que é um KPI?

KPI (Key Performance Indicator) é um Indicador-Chave de Desempenho.

Ele serve para medir, de forma objetiva, se uma área, processo ou negócio está atingindo seus objetivos.

Neste projeto, alguns exemplos de KPIs são:

Bounty médio por pirata

Total de bounty por tripulação

Ranking de capitães por risco


KPIs não são apenas números; eles precisam ser relevantes, mensuráveis e acionáveis, ou seja, devem ajudar na tomada de decisão.


---

# O que é agregação de dados?

Agregação é o processo de resumir dados detalhados em informações consolidadas.

Em vez de analisar pirata por pirata individualmente, agregamos os dados para responder perguntas como:

Qual é o total de bounty de uma tripulação?

Qual é a média de bounty dos piratas?

Qual capitão concentra mais risco?


No pandas, a agregação é comumente feita usando:

groupby() para agrupar dados e funções como sum(), mean(), count() para calcular métricas


Esse tipo de operação é extremamente comum em ambientes corporativos.


---

# Fonte de Dados

Os dados utilizados estão armazenados em um arquivo CSV (bounties.csv), simulando uma extração direta de um sistema operacional.

Cada linha representa um pirata registrado pela Marinha, com as seguintes colunas:

pirata: nome do pirata

tripulacao: nome da tripulação

capitao: capitão responsável

bounty: valor da recompensa em berries

ilha: local do registro



---

# Principais Análises Realizadas

1. Total de bounty por tripulação

Essa análise permite identificar quais grupos de piratas representam maior ameaça coletiva.

O resultado é um ranking de tripulações ordenado pelo total de berries movimentado.


---

2. Bounty médio por pirata

Esse KPI fornece uma visão geral do nível médio de periculosidade dos piratas analisados.

É uma métrica simples, mas muito usada em relatórios executivos para contextualizar os dados.


---

3. Capitães mais perigosos

Ao agregar o bounty por capitão, conseguimos identificar quais líderes concentram maior risco.

Essa análise é útil para priorização de recursos e ações estratégicas.


---

4. Resumo geral

A combinação dessas análises gera uma visão consolidada que pode ser utilizada em apresentações, relatórios ou dashboards.

O foco não está apenas no código, mas na interpretação dos dados.


---

# Tecnologias Utilizadas

Python e Pandas


---

# Objetivo Educacional

Este projeto foi desenvolvido com foco em:

Simular tarefas reais de um Analista de Dados

Demonstrar uso prático de pandas em análises corporativas

Reforçar conceitos fundamentais como KPIs, agregações e leitura de dados


---

# Próximos Passos Possíveis

Criação de gráficos para visualização dos KPIs (No momento, quero aprender PowerBI para visualização de dados)

Exportação dos resultados para novos arquivos CSV

Construção de um dashboard

Adição de novas ilhas ou períodos de análise



---

Este repositório prioriza clareza, organização e mentalidade analítica, refletindo o que é esperado no ambiente profissional (No caso, num ambiente da marinha do One Piece! 👒).
