import pandas as pd

df = pd.read_csv("bounties.csv")

df["bounty"] = pd.to_numeric(df["bounty"], errors="coerce") # como csv não tem tipo, transformamos em numeric. se não for número, será substituído como NaN

bounty_por_tripulacao = (
    df.groupby("tripulacao")["bounty"].sum().reset_index().sort_values(by="bounty", ascending=False))

bounty_medio = df["bounty"].mean()

capitaes_perigosos = (df.groupby("capitao")["bounty"].sum().reset_index().sort_values(by="bounty", ascending=False))

top_piratas = (df.sort_values(by="bounty", ascending=False).head(3)[["pirata", "bounty"]])

print("Total de bounty por tripulação:")
print(bounty_por_tripulacao, "\n")

print(f"Bounty médio por pirata: {bounty_medio:,.0f} berries\n")

print("Capitães mais perigosos:")
print(capitaes_perigosos, "\n")

print("Top 3 piratas com maior bounty:")
print(top_piratas)
