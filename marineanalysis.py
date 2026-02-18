#%%
import pandas as pd

df = pd.read_csv("bounties.csv")

df["bounty"] = pd.to_numeric(df["bounty"], errors="coerce") # como csv não tem tipo, transformamos em numeric. se não for número, será substituído como NaN

bounty_por_tripulacao = df.groupby("tripulacao")["bounty"].sum().reset_index().sort_values(by="bounty", ascending=False)

bounty_medio = df["bounty"].mean()

capitaes_perigosos = df.groupby("capitao")["bounty"].sum().reset_index().sort_values(by="bounty", ascending=False)

top_piratas = df.sort_values(by="bounty", ascending=False).head(3)[["pirata", "bounty"]]

#aqui, eu estou atualizando e adicionando um filtro pois eu expandi o csv e agora tem personagens onde não sabemos onde eles se encontram atualmente!! 

filtro_desconhecido = (df["ilha"] != "Desconhecido")
perigo_por_ilha = df[filtro_desconhecido].groupby("ilha")["bounty"].sum().reset_index().sort_values(by="bounty", ascending=False)



ilha_mais_perigosa = perigo_por_ilha.iloc[0] #navegando no df usando iloc para acessar a primeira posição (que no caso, é a ilha mais perigosa para a marinha!)

print("Foco de perigo por ilha:")
print(perigo_por_ilha, "\n")


print("Ilha com maior foco de perigo:")
print(perigo_por_ilha.head(1), "\n")

print("Total de bounty por tripulação:")
print(bounty_por_tripulacao, "\n")

print(f"Bounty médio por pirata: {bounty_medio:,.0f} berries\n")

print("Capitães mais perigosos:")
print(capitaes_perigosos, "\n")

print("Top 3 piratas com maior bounty:")
print(top_piratas)


# ----- Adicionando mais alguns pedidos do Almirante!! (V2 do projeto)

# 1 - Mostrar (pela coluna observações): Quais são os piores (em top 5) Imperadores? (Claro, em questão do bounty!)
# 2 - Quem é o Ex-Shichibukai que mais está trazendo problemas?
# 3 - Média e Variância do bounty dos Ex-Shichibukai's
# 4 - Quem está com o estado atual de "morto?"? Precisamos ir atrás deles o mais breve possível!!

# %%
#1

filtro_imperadores = df["observacoes"].str.contains("Imperador") #utilizando str.contains pois é um jeito mais "clean" de ver se é um imperador (yonkou)
top5_imperadores = df[filtro_imperadores].sort_values(by="bounty", ascending=False).head(5).reset_index().drop(columns=["index"])



# %%
#1.1

#Só brincando com gráficos (extra) :p

import matplotlib.pyplot as plt

imperadores = df[filtro_imperadores].sort_values("bounty", ascending=False)

plt.bar(imperadores["pirata"], imperadores["bounty"] / 1e9)
plt.xlabel("Imperadores")
plt.ylabel("Bounty (bilhões)")
plt.grid(True)
plt.show()

# %%
# 2

filtro_exShichibukai = df["observacoes"].str.contains("Ex-Shichibukai")

topExShichibukai = df[filtro_exShichibukai].sort_values(by="bounty", ascending=False).reset_index().drop(columns=["index"])
top1ExShichibukai = topExShichibukai.head(1)

# %%
# 3

import numpy as np
#top_shichibukai é um dataframe.
mediaExShichibukai = topExShichibukai["bounty"].mean()
varianciaExShichibukai = float(np.var(topExShichibukai["bounty"])) # ta em np.float, transformei para float

# %%

# 4

filtroMorto = df["status_historia"] == "Morto?"
Mortos = df[filtroMorto].sort_values(by="bounty", ascending=False, ignore_index=True)


#Bõnus: num gráfico, onde estes piratas "mortos" se encontram junto dos piratas mais perigosos que ainda estão vivos (em relação ao bounty)? //obs: var Mortos são os TOP mortos em relação ao bounty, o mesmo serve para a var Vivos 
#vou trabalhar com concat e depois sort_values

filtroVivo = df["status_historia"] == "Vivo"
Vivos = df[filtroVivo].sort_values(by="bounty", ascending=False, ignore_index=True)

PerigososVivosSupostosMortos = pd.concat([Vivos, Mortos]).sort_values(by="bounty", ascending=False, ignore_index=True)
PerigososVivosSupostosMortos.head(10)



import matplotlib.pyplot as plt

plt.bar(PerigososVivosSupostosMortos["pirata"].head(10), PerigososVivosSupostosMortos["bounty"].head(10) / 1e9)
plt.xlabel("Piratas!")
plt.ylabel("Bounty (bilhões)")
plt.title("Gráfico: Piratas vivos e mortos.")
plt.grid(True)
plt.tight_layout()
plt.show()


print(f"Top 5 imperadores:")
print(top5_imperadores)


print("Ex-Shichibukai mais perigoso:")
print(top1ExShichibukai, "\n")


print(f"Média de bounty de Ex-Shichibukai:")
print(mediaExShichibukai, "\n")
print("Variância de bounty entre os Ex-Shichibukai:")
print(varianciaExShichibukai, "\n")


print("Piratas Mortos:")
print(Mortos, "\n")

