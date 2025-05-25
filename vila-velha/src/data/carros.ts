const estoqueLoja = [
  {
    modelo: "Chevrolet Bel Air",
    ano: 1954,
    descricao: "Luxo sobre rodas com presença imponente.",
    descricaoDetalhada:
      "O Chevrolet Bel Air 1954 representa a elegância da era de ouro americana. Com detalhes cromados, amplo espaço interno e um desempenho suave, é símbolo do glamour e sofisticação da década de 50.",
    preco: 185579,
    imagem: "/imagens/ChevroletBelAir.jpg",
    estoque: 1,
    slug: "chevrolet-bel-air",
    seloDilvan: true,
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Volkswagen Fusca",
    ano: 1951,
    descricao: "Luxo sobre rodas com presença imponente.",
    descricaoDetalhada:
      "O Fusca 1951 é uma peça rara com design arredondado e mecânica simples. Um ícone da durabilidade e economia que marcou gerações em todo o mundo.",
    preco: 181671,
    imagem: "/imagens/VolkswagenFusca.jpg",
    estoque: 9,
    slug: "volkswagen-fusca",
    seloDilvan: true,
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Ford Mustang",
    ano: 1973,
    descricao: "Uma verdadeira relíquia sobre rodas.",
    descricaoDetalhada:
      "O Ford Mustang 1973 é o símbolo definitivo da liberdade americana. Seu estilo musculoso e o som do motor V8 cativam entusiastas até hoje.",
    preco: 131992,
    imagem: "/imagens/FordMustang.jpg",
    estoque: 9,
    slug: "ford-mustang",
    seloDilvan: true,
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Cadillac Eldorado",
    ano: 1976,
    descricao: "Estilo marcante e história nas pistas.",
    descricaoDetalhada:
      "O Cadillac Eldorado 1976 oferece o máximo em luxo automotivo. Com tração dianteira e linhas elegantes, era referência de status nos anos 70.",
    preco: 110645,
    imagem: "/imagens/CadillacEldorado.jpg",
    estoque: 3,
    slug: "cadillac-eldorado",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Opala SS",
    ano: 1979,
    descricao: "Visual agressivo e motor potente.",
    descricaoDetalhada:
      "O Opala SS 1979 é um clássico brasileiro de performance. Seu motor forte e visual esportivo conquistaram fãs das pistas às ruas.",
    preco: 68640,
    imagem: "/imagens/OpalaSS.jpg",
    estoque: 3,
    slug: "opala-ss",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Plymouth Barracuda",
    ano: 1974,
    descricao: "Estilo marcante e história nas pistas.",
    descricaoDetalhada:
      "O Plymouth Barracuda 1974 é um muscle car raro e agressivo. Seu design ousado e performance bruta o tornaram um ícone da rebeldia automotiva.",
    preco: 213793,
    imagem: "/imagens/PlymouthBarracuda.jpg",
    estoque: 0,
    slug: "plymouth-barracuda",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Dodge Charger R/T",
    ano: 1950,
    descricao: "Design esportivo e alma brasileira.",
    descricaoDetalhada:
      "O Dodge Charger R/T 1950 é sinônimo de potência. Seu motor V8 e carroceria robusta marcaram presença nas ruas com estilo e autoridade.",
    preco: 296451,
    imagem: "/imagens/DodgeChargerRT.jpg",
    estoque: 6,
    slug: "dodge-charger-rt",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Chevrolet Camaro Z28",
    ano: 1966,
    descricao: "Uma verdadeira relíquia sobre rodas.",
    descricaoDetalhada:
      "O Camaro Z28 1966 foi feito para velocidade. Com visual agressivo e desempenho de pista, é um dos esportivos mais desejados da Chevrolet.",
    preco: 94797,
    imagem: "/imagens/ChevroletCamaroZ28.jpg",
    estoque: 9,
    slug: "chevrolet-camaro-z28",
    audio: "/audio/motor-75615.mp3",
  },
  {
    modelo: "Mercedes-Benz 300SL",
    ano: 1952,
    descricao: "Design esportivo e alma brasileira.",
    descricaoDetalhada:
      "O Mercedes-Benz 300SL 1952 é uma obra-prima de engenharia. Suas portas estilo 'asa de gaivota' e tecnologia avançada o colocam entre os maiores clássicos da história.",
    preco: 113158,
    imagem: "/imagens/Mercedes-Benz300SL.jpg",
    estoque: 3,
    slug: "mercedes-benz-300sl",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Fiat 147",
    ano: 1953,
    descricao: "Uma verdadeira relíquia sobre rodas.",
    descricaoDetalhada:
      "O Fiat 147 1953 foi pioneiro em economia e simplicidade. Com seu porte compacto e mecânica confiável, conquistou os brasileiros como um dos primeiros carros acessíveis.",
    preco: 76059,
    imagem: "/imagens/Fiat147.jpg",
    estoque: 10,
    slug: "fiat-147",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Ford Maverick",
    ano: 1973,
    descricao: "Símbolo de elegância e potência vintage.",
    descricaoDetalhada:
      "O Ford Maverick 1973 é um clássico do design esportivo. Sua frente agressiva e motor potente marcaram época nas ruas brasileiras com uma estética imponente.",
    preco: 156508,
    imagem: "/imagens/FordMaverick.jpg",
    estoque: 3,
    slug: "ford-maverick",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Chevrolet Impala",
    ano: 1971,
    descricao: "Compacto, simpático e cheio de histórias.",
    descricaoDetalhada:
      "O Chevrolet Impala 1971 é um sedan espaçoso, com linhas suaves e conforto excepcional. Um dos favoritos entre os carros de luxo da década.",
    preco: 143071,
    imagem: "/imagens/ChevroletImpala.jpg",
    estoque: 6,
    slug: "chevrolet-impala",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Toyota Bandeirante",
    ano: 1955,
    descricao: "Estilo marcante e história nas pistas.",
    descricaoDetalhada:
      "O Toyota Bandeirante 1955 é sinônimo de resistência e off-road. Utilizado em terrenos difíceis por décadas, tornou-se um símbolo de robustez no Brasil.",
    preco: 119026,
    imagem: "/imagens/ToyotaBandeirante.jpg",
    estoque: 2,
    slug: "toyota-bandeirante",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Jeep Willys",
    ano: 1954,
    descricao: "Força, elegância e espírito de liberdade americana.",
    descricaoDetalhada:
      "O Jeep Willys 1954, derivado da versão militar, é uma lenda da tração 4x4. Seu visual rústico e desempenho em trilhas o tornaram um clássico do off-road.",
    preco: 187798,
    imagem: "/imagens/JeepWillys.jpg",
    estoque: 1,
    slug: "jeep-willys",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Karmann Ghia",
    ano: 1952,
    descricao: "Força, elegância e espírito de liberdade americana.",
    descricaoDetalhada:
      "O Karmann Ghia 1952 une o charme europeu ao motor Volkswagen. Seu design curvilíneo e interior requintado o consagraram como um carro desejado e exclusivo.",
    preco: 187617,
    imagem: "/imagens/KarmannGhia.jpg",
    estoque: 5,
    slug: "karmann-ghia",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Alfa Romeo Spider",
    ano: 1965,
    descricao: "Design esportivo e alma brasileira.",
    descricaoDetalhada:
      "O Alfa Romeo Spider 1965 é puro estilo italiano. Conversível e elegante, oferece uma experiência de direção refinada e esportiva, ideal para entusiastas de carros clássicos.",
    preco: 185472,
    imagem: "/imagens/AlfaRomeoSpider.jpg",
    estoque: 0,
    slug: "alfa-romeo-spider",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Peugeot 504",
    ano: 1967,
    descricao: "Símbolo de elegância e potência vintage.",
    descricaoDetalhada:
      "O Peugeot 504 1967 destaca-se pelo conforto e estabilidade. Reconhecido por sua suspensão macia e confiabilidade, fez história em diversos mercados mundiais.",
    preco: 248619,
    imagem: "/imagens/Peugeot504.jpg",
    estoque: 12,
    slug: "peugeot-504",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "BMW 2002",
    ano: 1972,
    descricao: "Símbolo de elegância e potência vintage.",
    descricaoDetalhada:
      "O BMW 2002 1972 é um dos primeiros esportivos compactos de luxo. Ágil, potente e bem construído, foi precursor da série 3 e ícone da engenharia alemã.",
    preco: 156976,
    imagem: "/imagens/BMW2002.jpg",
    estoque: 2,
    slug: "bmw-2002",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Renault Dauphine",
    ano: 1968,
    descricao: "Luxo sobre rodas com presença imponente.",
    descricaoDetalhada:
      "O Renault Dauphine 1968 era leve e estiloso, com motor traseiro e boa economia de combustível. Um compacto francês que marcou época com sua suavidade ao dirigir.",
    preco: 219762,
    imagem: "/imagens/RenaultDauphine.jpg",
    estoque: 5,
    slug: "renault-dauphine",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Citroën DS",
    ano: 1953,
    descricao: "Símbolo de elegância e potência vintage.",
    descricaoDetalhada:
      "O Citroën DS 1953 revolucionou o mercado com sua suspensão hidropneumática e design futurista. Considerado um dos carros mais inovadores do século XX.",
    preco: 120120,
    imagem: "/imagens/CitroënDS.jpg",
    estoque: 6,
    slug: "citroën-ds",
    audio: "/audio/motor-75615.mp3"
  },
  {
    modelo: "Puma GT",
    ano: 1961,
    descricao: "Conservado com originalidade de fábrica.",
    descricaoDetalhada:
      "O Puma GT 1961 possui carroceria em fibra e design esportivo brasileiro. Leve, rápido e com linhas aerodinâmicas, é símbolo da criatividade nacional sobre rodas.",
    preco: 260776,
    imagem: "/imagens/PumaGT.jpg",
    estoque: 4,
    slug: "puma-gt",
    audio: "/audio/motor-75615.mp3"
  }
];

export default estoqueLoja;
