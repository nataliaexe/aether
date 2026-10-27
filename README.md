# Æther — MVP

Experiência web local de neuroarte para um desafio de impacto em saúde mental. A galeria
apresenta três estudos generativos originais feitos no navegador; a pessoa também pode
escolher, se quiser, uma sensação e ver a composição interativa mudar. A escolha não é
interpretada como dado clínico, não é armazenada e pode ser ignorada.

## Executar

Não há dependências de build:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000`.

## Dados e atribuição

A demonstração usa como referência o **ArtEmis**, um conjunto de 455 mil atribuições de
emoção e explicações humanas relacionadas a 80 mil obras visuais da WikiArt. O MVP não redistribui imagens nem textos do conjunto: usa apenas as categorias afetivas
como inspiração. As três peças da galeria são composições originais deste protótipo.

- [Site e descrição oficial do ArtEmis](https://artemisdataset.org/)
- Achlioptas et al., [ArtEmis: Affective Language for Visual Art, CVPR 2021](https://openaccess.thecvf.com/content/CVPR2021/papers/Achlioptas_ArtEmis_Affective_Language_for_Visual_Art_CVPR_2021_paper.pdf)

Consulte os termos do dataset e os direitos das obras na fonte original antes de
redistribuir dados, imagens ou textos. O ArtEmis registra reações de participantes a
obras; não é um dataset de EEG, diagnóstico ou desfechos de saúde mental.

## IA e limites do protótipo

A versão atual demonstra a interação e a arte generativa com regras visuais explicáveis.
Ela **não executa um modelo de IA** nem determina o que alguém está sentindo. Uma etapa
futura pode testar curadoria assistida por IA com o ArtEmis, mantendo as respostas
subjetivas, identificando incertezas e sem transformar emoções em diagnósticos.

Esta experiência artística não é terapia, diagnóstico nem substituto de apoio
profissional. Participar e escolher uma sensação é opcional.
