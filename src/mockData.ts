import { SiteContent } from './types.ts';

export const INITIAL_CONTENT: SiteContent = {
  heroTitle: "LACIF UFF",
  heroSubtitle: "Ciência, investigação e conhecimento aplicados à justiça.",
  mission: "Promover ensino, pesquisa e extensão nas Ciências Forenses através da integração acadêmica, científica e tecnológica.",
  vision: "Ser referência universitária em Ciências Forenses, investigação científica e divulgação acadêmica.",
  values: [
    "Ética Inabalável",
    "Rigor Científico",
    "Inovação Tecnológica",
    "Responsabilidade Social",
    "Compromisso Acadêmico",
    "Trabalho em Equipe",
    "Valorização da Ciência"
  ],
  historyText: "A Liga Acadêmica de Ciências Forenses da Universidade Federal Fluminense (LACIF UFF) nasceu da paixão e do anseio de estudantes e docentes em aprofundar os estudos em uma das áreas mais fascinantes e cruciais para a sociedade: a perícia criminal e a busca científica pela verdade. Fundada com o propósito de integrar diferentes saberes — da química à genética, do direito aos sistemas inteligentes de computação —, a liga rapidamente expandiu o seu escopo acadêmico.\n\nA LACIF UFF consolidou-se como um polo de excelência em ensino, pesquisa e extensão. Nossos membros participam de debates essenciais sobre a validade probatória, desenvolvem trabalhos acadêmicos de ponta, coordenam simulações de locais de crime de alto realismo e colaboram com peritos criminais oficiais da Polícia Civil, da Polícia Federal e de institutos de criminalística renomados. Aqui, moldamos as mentes investigativas e científicas do futuro.",
  historyImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
  
  directors: [
    {
      id: "1",
      name: "Ana Bianca Espíndola",
      role: "Presidente",
      department: "Farmácia",
      bio: "Entusiasta de Toxicologia e Análise Química de Substâncias de Interesse Forense. Coordena os projetos de extensão da LACIF.",
      instagram: "https://instagram.com/",
      lattes: "http://lattes.cnpq.br/",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Marco Oliveira",
      role: "Coordenador",
      department: "Professor Doutor",
      bio: "Especialista em métodos analíticos instrumentais aplicados à investigação pericial e pesquisa acadêmica.",
      instagram: "https://instagram.com/",
      lattes: "http://lattes.cnpq.br/",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Maryana Oliveira",
      role: "Vice-presidente",
      department: "Ciências Biológicas",
      bio: "Focada em Genética Forense e Entomologia Criminal. Responsável pela estruturação científica dos testes e simpósios.",
      instagram: "https://instagram.com/",
      lattes: "http://lattes.cnpq.br/",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "Wagner Pacheco",
      role: "Vice-coordenador",
      department: "Professor Adjunto",
      bio: "Docente de toxicologia ambiental e forense. Atua no desenvolvimento metodológico de ensaios e suporte institucional.",
      instagram: "https://instagram.com/",
      lattes: "http://lattes.cnpq.br/",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
    }
  ],

  specialties: [
    {
      id: "toxicologia",
      title: "Toxicologia Forense",
      description: "Análise de agentes químicos, toxinas, venenos e álcool em amostras biológicas.",
      detailedDescription: "A Toxicologia Forense utiliza os métodos analíticos da química e farmacologia para auxiliar investigações jurídicas envolvendo envenenamentos, abuso de drogas, dopagem esportiva ou acidentes de trânsito sob efeito de substâncias psicoativas.",
      image: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Espectrometria de Massas", "Cromatografia Gasosa", "Análise de Tecidos e Sangue"]
    },
    {
      id: "quimica",
      title: "Química Forense",
      description: "Exame de matrizes químicas, explosivos, substâncias adulteradas e acelerantes de incêndio.",
      detailedDescription: "Atua na caracterização de substâncias ilícitas apreendidas, na detecção de aditivos químicos em infrações tributárias, falsificação de obras de arte e análise detalhada de resíduos de fumo e disparos.",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Teste de Reagentes de Plímeros", "Fluorescência de Raio-X", "Quimiluminescência"]
    },
    {
      id: "dna",
      title: "DNA Forense",
      description: "Identificação biológica inequívoca por meio de perfis genéticos de DNA.",
      detailedDescription: "A Genética Forense revolucionou os sistemas jurídicos globais. Utilizando mínimos fragmentos de cabelo, saliva ou sangue, cria perfis genéticos únicos para identificar réus em infrações, estabelecer paternidades ou mapear corpos não identificados.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Análise de PCR STR", "Mapeamento Mitocondrial", "Sequenciamento de Nova Geração"]
    },
    {
      id: "balistica",
      title: "Balística Forense",
      description: "Investigação física de projéteis, armas de fogo, estojos e trajetória de tiro.",
      detailedDescription: "Estuda os fenômenos que ocorrem desde o acionamento do gatilho até o impacto do projétil no alvo. Através de microcomparação balística microscópica de estrias, o cientista consegue vincular de forma inquestionável um projétil a uma arma específica.",
      image: "https://images.unsplash.com/photo-1595152230535-043c9e117a6d?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Microcomparador de Estiras", "Análise de Trajetória e Perfil", "Identificação de Resíduos de Disparo (GSR)"]
    },
    {
      id: "papiloscopia",
      title: "Papiloscopia",
      description: "Identificação pelas impressões digitais, palmares ou plantares deixadas no crime.",
      detailedDescription: "A ciência dos relevos cutâneos é um dos métodos mais robustos e antigos de identificação de suspeitos. Usando pós magnéticos, luzes ultravioletas ou reagentes de vapor de cianoacrilato, as digitais latentes são reveladas e comparadas em bancos públicos.",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Cianoacrilato em Vácuo", "Fórmula Cristológica de Vucetich", "AFIS (Bancos Biométricos Digitais)"]
    },
    {
      id: "medicina",
      title: "Medicina Legal",
      description: "Análise médica de traumas, necropsias para estabelecer causa mortis e cronotanatognose.",
      detailedDescription: "Funde os conhecimentos médicos com as necessidades judiciais. Inclui necropsias, determinação da hora exata do óbito (cronotanatognose) e exames de corpo de delito para documentação precisa de lesões físicas em vítimas sobreviventes.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Amostragem de Tanato-Química", "Entomologia Cadavérica", "Tomografia Computadorizada Forense"]
    },
    {
      id: "antropologia",
      title: "Antropologia Forense",
      description: "Estudo de ossadas humanas para estimar idade, gênero, estatura e sinais patológicos.",
      detailedDescription: "Identificação de remanescentes humanos esqueletizados em sepulturas clandestinas ou desastres em massa. Auxilia na estimativa da ancestralidade, gênero e ancestralidade cronológica a partir do exame pélvico e craniano e marcas de traumas ósseos perimortem.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Análise Pubiana e Craniometria", "Simulação de Reconstrução Facial 3D", "Radiologia Comparativa"]
    },
    {
      id: "computacao",
      title: "Computação Forense",
      description: "Investigação cibernética, recuperação de dados voláteis, arquivos criptografados e cibercrimes.",
      detailedDescription: "Preservação e análise forense de mídias de armazenamento digital, redes e comunicações. A computação forense trabalha reconstruindo caminhos de rede, quebrando assinaturas criptografadas e identificando autoria de ataques virtuais.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Imagem Forense de Bit-Stream", "Análise de Logs de Backdoor", "Recuperação de Arquivos Corrompidos"]
    },
    {
      id: "investigacao",
      title: "Investigação Criminal",
      description: "Coordenação estratégica de evidências, depoimentos e análise comportamental.",
      detailedDescription: "Amalgama dados materiais com padrões de comportamento humano (criminal profiling) no local de uma infração. Estabelece sequências factuais lógicas baseadas em vestígios e teorias científicas para reconstruir com exatidão o fato.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Criminologia Comportamental", "Preservação de Isolamento Primário", "Cadeia de Custódia Legal"]
    }
  ],

  vocationalQuestions: [
    {
      id: "q1",
      question: "Diante de um local de crime isolado, o que desperta mais a sua atenção de imediato?",
      options: [
        { text: "Copos ou seringas suspeitas com resíduos de fluidos desconhecidos.", pointsFor: "toxicologia" },
        { text: "Marcas avermelhadas que parecem sangue em uma peça de vestuário.", pointsFor: "dna" },
        { text: "A marca de impacto circular de um disparo e cápsulas de metal deflagradas no chão.", pointsFor: "balistica" },
        { text: "Pegadas no piso arenoso ou uma marca sutil de gordura no trinco da janela.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q2",
      question: "Qual ferramenta clássica ou técnica de laboratório você gostaria de dominar primeiro?",
      options: [
        { text: "Cromatografia e espectrometria de massas e infusões para testar venenos.", pointsFor: "toxicologia" },
        { text: "Amplificação de genes e extração de DNA de raízes de cabelo com centrífuga.", pointsFor: "dna" },
        { text: "Câmera de alta velocidade para registrar dinâmica de fluidos e trajetórias balísticas.", pointsFor: "balistica" },
        { text: "Estação de imagem biométrica digital rápida indexando minúcias de pele.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q3",
      question: "Seu maior ponto forte na hora de resolver impasses no dia a dia é:",
      options: [
        { text: "Persistência analitímica, adoro ler diagramas moleculares e fórmulas complexas.", pointsFor: "quimica" },
        { text: "Habilidades com computadores, segurança de sistemas e detecção de fraudes digitais.", pointsFor: "computacao" },
        { text: "Paciência e atenção extrema aos mínimos detalhes físicos e orgânicos humanos.", pointsFor: "medicina" },
        { text: "Raciocínio metodológico, dedutivo e observação dos hábitos dos outros.", pointsFor: "investigacao" }
      ]
    },
    {
      id: "q4",
      question: "Você ficaria mais confortável em lidar profissionalmente com:",
      options: [
        { text: "Fórmulas químicas, reagentes e pós coloridos para detectar falsificação de drogas.", pointsFor: "quimica" },
        { text: "Vasculhar servidores escondidos, códigos criptografados e metadados de arquivos deletados.", pointsFor: "computacao" },
        { text: "Anatomia humana clínica, lesões físicas, ossos antigos e traumatismos.", pointsFor: "medicina" },
        { text: "Entrevistas com testemunhas e a análise integrada de depoimentos e vestígios.", pointsFor: "investigacao" }
      ]
    },
    {
      id: "q5",
      question: "Qual desses mitos das séries tipo 'CSI' mais incomoda o seu senso prático?",
      options: [
        { text: "Fazer análises bioquímicas completas sem controle de qualidade e calibração de máquina.", pointsFor: "toxicologia" },
        { text: "Identificar o DNA de alguém em apenas cinco segundos usando uma tela 3D cheia de cores.", pointsFor: "dna" },
        { text: "Atirar em um cadeado de aço e ele explodir sem resíduos de metal ou deformidade estrutural.", pointsFor: "balistica" },
        { text: "Achar uma impressão digital perfeita em qualquer tipo de superfície sem pó revelador.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q6",
      question: "Como você se vê atuando ativamente nas Forças de Segurança ou Órgãos de Justiça?",
      options: [
        { text: "Em um laboratório estadual isolado de altíssima segurança, de jaleco branco executando espectroscopia.", pointsFor: "quimica" },
        { text: "Uma sala de controle cibernética, descriptografando logs de ransowares de criminosos globais.", pointsFor: "computacao" },
        { text: "Laudando causas de óbito ou examinando fraturas craniométricas complexas em necrotérios.", pointsFor: "medicina" },
        { text: "Visitando diretamente as cenas de crimes e organizando os lacres de cadeia de custódia.", pointsFor: "investigacao" }
      ]
    },
    {
      id: "q7",
      question: "Selecione a atividade extracurricular que mais te atrairia em um congresso forense:",
      options: [
        { text: "Workshop de detecção de venenos e entorpecentes em copos descartados.", pointsFor: "toxicologia" },
        { text: "Prática em gel de eletroforese para perfil de matches de paternidade.", pointsFor: "dna" },
        { text: "Software de mapeamento tridimensional de projéteis e ricochetes.", pointsFor: "balistica" },
        { text: "Técnicas modernas de revelação de digitais sob temperatura extrema com fumaça.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q8",
      question: "Durante um mistério policial, que detalhe decisivo na mesa de cabeceira você investigaria primeiro?",
      options: [
        { text: "Gotas secas de soro e um composto medicamentoso tarjado sem rótulo clínico.", pointsFor: "toxicologia" },
        { text: "Uma mecha isolada de cabelo loiro presa a uma escova de dentes preta.", pointsFor: "dna" },
        { text: "Um cartucho não deflagrado de calibre .380 caído atrás do criado-mudo.", pointsFor: "balistica" },
        { text: "Manchas imperceptíveis de secreção de suor na tela do celular da vítima.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q9",
      question: "Qual dessas matérias acadêmicas mais despertava o seu apreço no colégio?",
      options: [
        { text: "Química orgânica, hidrocarbonetos, soluções ácidas e misturas complexas.", pointsFor: "quimica" },
        { text: "Informática, lógica de algorítmos ou matemática combinatória.", pointsFor: "computacao" },
        { text: "Biologia humana, filogenia, estrutura celular e fisiologia.", pointsFor: "medicina" },
        { text: "História, ciências sociais, redação jurídica ou psicologia social.", pointsFor: "investigacao" }
      ]
    },
    {
      id: "q10",
      question: "Uma grande falha que você gostaria de corrigir em investigações obsoletas é:",
      options: [
        { text: "Erros de medição na concentração exata de drogas letais no tecido metabólico.", pointsFor: "toxicologia" },
        { text: "Contaminações biológicas por falta de traje hermético dos operadores periciais.", pointsFor: "dna" },
        { text: "Determinar erroneamente a velocidade angular de um tiro por ângulo de desvio visual incorreto.", pointsFor: "balistica" },
        { text: "Falta de banco integrado eletrônico nacional para cruzamento ágil de impressões digitais.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q11",
      question: "Qual cenário hipotético mais desafia o seu cérebro de forma divertida?",
      options: [
        { text: "Saber se uma pílula suspeita se trata de um novo análogo sintético alucinógeno.", pointsFor: "quimica" },
        { text: "Rastrear de onde partiu um e-mail falso anônimo que chantageou autoridades públicas.", pointsFor: "computacao" },
        { text: "Interpretar se o padrão das fraturas de dentes indica uma queda livre ou pancada seca direta.", pointsFor: "medicina" },
        { text: "Reconstruir a cronologia detalhada das 5 horas anteriores de um crime usando filmagens urbanas fragmentadas.", pointsFor: "investigacao" }
      ]
    },
    {
      id: "q12",
      question: "Que característica da perícia criminal você considera mais honrosa e valiosa?",
      options: [
        { text: "Evitar a injustiça de envenenamentos silenciosos ou negligências farmacêuticas.", pointsFor: "toxicologia" },
        { text: "Garantir a certeza biológica irrecusável pelo DNA, inocentando falsos acusados.", pointsFor: "dna" },
        { text: "Identificar cientificamente a arma real que proferiu um tiro para fins de condenação precisa.", pointsFor: "balistica" },
        { text: "Associar o autor diretamente a tocar em objetos cruciais na cena, via biometria.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q13",
      question: "Se você pudesse herdar um grande invento tecnológico da área hoje, teria:",
      options: [
        { text: "Um espectômetro de laboratório portátil do tamanho de um celular para drogas imediatas.", pointsFor: "quimica" },
        { text: "Um decriptador quântico de chaves e discos rígidos corrompidos por criminosos virtuais.", pointsFor: "computacao" },
        { text: "Um scanner portátil de feixe térmico para verificar vasos sanguíneos pós-morte sem cortes.", pointsFor: "medicina" },
        { text: "Um software que une as manchas de sangue suspensas ao vento em trajetórias vetoriais 3D.", pointsFor: "investigacao" }
      ]
    },
    {
      id: "q14",
      question: "Pense na palavra 'VESTÍGIO'. Qual o primeiro sinônimo espontâneo em sua mente?",
      options: [
        { text: "Molécula residual oculta em solventes.", pointsFor: "toxicologia" },
        { text: "Elemento de DNA encapsulado em células.", pointsFor: "dna" },
        { text: "Cartucho metálico de munição expansiva.", pointsFor: "balistica" },
        { text: "Uma crista papilar oleosa em superfícies porosas.", pointsFor: "papiloscopia" }
      ]
    },
    {
      id: "q15",
      question: "Para você, o que torna a ciência aplicada à perícia tão emocionante?",
      options: [
        { text: "A química invisível que revela mistérios imperceptíveis ao olho humano.", pointsFor: "quimica" },
        { text: "O xadrez eletrônico contra cibercriminosos que acham que apagar o histórico os salva.", pointsFor: "computacao" },
        { text: "Interpretar o silêncio do corpo humano e falar legalmente em nome da vítima.", pointsFor: "medicina" },
        { text: "A arte de montar um quebra-cabeça de mil peças em que nada se encaixa à primeira vista.", pointsFor: "investigacao" }
      ]
    }
  ],

  vocationalResults: {
    toxicologia: {
      id: "toxicologia",
      title: "Toxicologia Forense",
      profile: "Perfil Científico Analítico, Observador e Altamente Detalhista.",
      description: "Você possui perfil analítico, observador e científico. Pessoas com esse perfil costumam se interessar por análises laboratoriais, substâncias químicas e investigação de evidências relacionadas a medicamentos, drogas, metabolizações do corpo e venenos silenciosos.",
      image: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?q=80&w=600&auto=format&fit=crop",
      skills: ["Química Analítica Forense", "Espectrometria de Massas", "Farmacologia de Entorpecentes"],
      curiosities: [
        "A Toxicologia Forense foi uma das pioneiras mundiais graças a Mathieu Orfila em 1813.",
        "Metais pesados como arsênio e tálio persistem por décadas em queratina de cabelos de vítimas resgatadas históricos."
      ],
      explanation: "Você se encaixa perfeitamente na ala bioquímica da verdade. Seus métodos requerem paciência em bancadas, pipetas e análises de cromatografia. Você tem grande dedicação à exatidão analítica orgânica."
    },
    quimica: {
      id: "quimica",
      title: "Química Forense",
      profile: "Pesquisador Estrutural, Rígido e Manipulador de Matrizes Moleculares.",
      description: "Seu perfil é voltado ao exame de vestígios químicos diversos. Interessa-se pelo desenvolvimento de ensaios colorimétricos, identificação de drogas sintéticas e anabolizantes novos, análise microscópica de tintas artificiais de documentos adulterados e pós-explosivos.",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?q=80&w=600&auto=format&fit=crop",
      skills: ["Identificação Orgânica", "Microscopia Eletrônica de Varredura (MEV)", "Espectroscopia de Raman"],
      curiosities: [
        "Testes de mudança de cor rápidas na rua por policiais são apenas presuntivos; o laboratório químico executa o teste definitivo.",
        "Tintas de caneta mudam sua composição química ano a ano, permitindo datar se uma assinatura em contrato foi forjada."
      ],
      explanation: "A química forense une os materiais inorgânicos com os segredos fáticos. Você será de fundamental valia para polícias estaduais e federais em laudos contra narcóticos e fraudes fiscais de grande escala."
    },
    dna: {
      id: "dna",
      title: "DNA Forense",
      profile: "Geneticista de Microrregiões, Guardião de Evidências Biológicas.",
      description: "Seu foco reside na biologia molecular pura. Interessa-se pela identificação inequívoca de pessoas biológicas por meio de exames minuciosos de micropartículas de saliva, sêmen, tecidos musculares ou fios de cabelo coletados em locais investigados.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
      skills: ["PCR STR de Locos Combinados", "Mapeamento Genealógico e de Clã", "Sequenciamento Automatizado de DNA"],
      curiosities: [
        "Gêmeos idênticos compartilham o mesmo perfil de DNA genético clássico, mudando apenas em suas impressões digitais!",
        "Um fragmento milimétrico de casca de chiclete mascado décadas atrás pode desvendar um crime arquivado."
      ],
      explanation: "Você adora a exatidão quantitativa probabilística do DNA. Com suas descobertas, a justiça pode apontar sem margem de erro o suspeito do fato ou trazer paz a famílias em buscas de paternidades ou entes queridos."
    },
    balistica: {
      id: "balistica",
      title: "Balística Forense",
      profile: "Físico Balístico, Calculador de Dinâmicas e Trajetórias.",
      description: "Seu forte é a física de propulsão e efeitos de projéteis. Deseja decifrar vestígios de tiros, analisar marcas microscópicas em ranhuras metálicas e determinar de onde, a que distância e com que arma de fogo ocorreu determinado embate tático.",
      image: "https://images.unsplash.com/photo-1595152230535-043c9e117a6d?q=80&w=600&auto=format&fit=crop",
      skills: ["Microcomparador Óptico Balístico", "Física de Balística Interna/Externa", "Estudos de Resíduos de Chumbo e Projéteis"],
      curiosities: [
        "Não existem duas armas que deixem exatamente as mesmas microestrias em uma bala; cada alma de cano é única.",
        "Os cálculos de trajetória do ricochete podem revelar visualmente se um réu agiu por legítima defesa ricocheteada."
      ],
      explanation: "Você usará matemática aplicada, análise macroscópica de metais e microscopia comparativa para ser peça-chave na solução de confrontos balísticos militares, policiais ou civis."
    },
    papiloscopia: {
      id: "papiloscopia",
      title: "Papiloscopia / Biometria Humana",
      profile: "Dactiloscopista Visual, Detalhista de Texturas de Pele.",
      description: "Você ama padrões de formas na pele e identificação biométrica. A papiloscopia atua na busca sistemática por marcas dactilares em diversos tipos de superfícies úmidas ou secas usando pós finos refletores de luz ou reações de calor por cianoacrilato.",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600&auto=format&fit=crop",
      skills: ["Classificação de Cristas de Pele", "Digitalizadores Ópticos Policiais", "Vaporização e Sublimação de Iodo"],
      curiosities: [
        "A papiloscopia de impressões digitais foi desenvolvida no século XIX e até hoje nunca se encontrou duas idênticas.",
        "Koalas possuem impressões digitais tão parecidas com as humanas que poderiam confundir uma equipe inteira de detetives!"
      ],
      explanation: "Sua concentração impecável permite detectar minúcias invisíveis de sulcos e ramificações que dão identidade unívoca a pessoas num piscar de olhos."
    },
    medicina: {
      id: "medicina",
      title: "Medicina Legal / Antropologia",
      profile: "Tanatologista, Investigador da Anatomia e Traumatologia Forense.",
      description: "Seu pilar fundamental reside em desvendar as causas mortis e reconstruir o corpo. Interessa-se pelo entendimento fisiológico e biológico de marcas traumáticas, lesões em tecidos moles e exames de estruturas esqueletizadas identificando perfis médicos.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      skills: ["Patologia Forense Geral", "Antropologia Esquelética", "Cronotanatognose de Rigor e Digestão"],
      curiosities: [
        "Os dentes são a parte mais dura do corpo e sustentam marcas de idade e DNA mesmo sob temperaturas de incêndio extremo.",
        "A entomologia estuda quais famílias de moscas colonizam o cadáver para cravar as horas exatas de sua morte."
      ],
      explanation: "Você se dedica à mais humana e profunda das perícias, ouvindo o que os tecidos e ossadas dizem para garantir a proteção física da população e a elucidação definitiva de fatalidades."
    },
    computacao: {
      id: "computacao",
      title: "Computação Forense",
      profile: "Gênio Digital, Investigador de Cadeias Eletrônicas e Redes.",
      description: "Seu cérebro flui melhor com lógica computacional, decodificações e extração segura de vestígios que residem em memórias virtuais, nuvens de dados, mensagens criptografadas ocultas e computadores invadidos por quadrilhas de fraude na internet.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      skills: ["Aquisição Hermética de Imagens de Disco", "Análise de Cabeçalhos e Hexadecimais", "Rastreabilidade IP de Redes Tor"],
      curiosities: [
        "Instalar softwares normais de cópia em HDs altera metadados vitais de datas, por isso usam-se 'bloqueadores de escrita física'.",
        "A geolocalização oculta de uma foto no Instagram pode revelar onde se encontrava um galpão clandestino remoto."
      ],
      explanation: "Você combaterá o crime moderno que reside atrás das telas. Sua engenhosidade informática e dedetização de vírus corporativos manterá a integridade de dados e localizará criminosos invisíveis no ciberespaço."
    },
    investigacao: {
      id: "investigacao",
      title: "Investigação Criminal / Profiling",
      profile: "Metodologista de Escopo Geral, Analista Comportamental.",
      description: "Seu interesse principal é a visão holística do evento criminal, dedução mútua fática, elucidação lógica e cruzamento integrado de informações humanas e materiais para a remontagem cronológica impecável da verdade.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      skills: ["Preservação de Locais Isolados", "Análise Dinâmica de Cadeia de Custódia", "Reconstrução 3D de Cenas do Fato"],
      curiosities: [
        "Um local de crime mal isolado nos primeiros 10 minutos perde cerca de 80% dos vestígios válidos e úteis de biometria.",
        "O Profiling estuda o modus operandi e assinatura do autor para estreitar a busca de listas volumosas de suspeitos."
      ],
      explanation: "Você é o maestro da ciência jurídica policial. Sabe coordenar peritos especiais, escutar testemunhos com rigor analítico e tecer um laudo de reconstrução fática que convencerá juízes e jurados no tribunal."
    }
  },

  quizQuestions: [
    {
      id: "qq1",
      question: "Qual das seguintes ações é a mais CRÍTICA e prioritária ao adentrar um local de crime primetral?",
      options: [
        "Garantir a total preservação e isolamento físico do local, evitando tocar em qualquer objeto fático.",
        "Procurar imediatamente por digitais usando pó de carbono nos copos.",
        "Fotografar e guardar as armas de fogo no seu próprio bolso da calça.",
        "Entrevistar o primeiro vizinho na rua antes que ele saia do bairro."
      ],
      correctAnswerIndex: 0,
      explanation: "A preservação da integridade ambiental previne contaminação dos vestígios por bactérias humanas adicionais ou destruição mecânica de pós de digitais e manchas de sangue."
    },
    {
      id: "qq2",
      question: "O reagente químico 'Luminol' é famoso por identificar vestígios latentes de qual substância?",
      options: [
        "Fluido de venenos metálicos na pia.",
        "Partículas invisíveis de sangue, reagindo de forma quimiluminescente com o ferro da hemoglobina.",
        "Fios de cabelos sintéticos de perucas.",
        "Marcas de poeira de calçados de borracha."
      ],
      correctAnswerIndex: 1,
      explanation: "O Luminol reage com o elemento férrico presente no grupo heme da hemoglobina sanguínea na presença de um ativador oxidante, gerando brilho de luz azulada fluorescente sob breu total."
    },
    {
      id: "qq3",
      question: "Em computação forense, o que assegura que a cópia de uma mídia digital é IDÊNTICA ao original?",
      options: [
        "Fazer um upload para o Google Drive e verificar o tamanho em bytes.",
        "O cálculo matemático idêntico de soma de verificação por Hash (ex: MD5, SHA-256).",
        "Conferir visualmente o nome de todos os diretórios internos.",
        "Colar a mídia original em um pen drive de mesma marca e cor."
      ],
      correctAnswerIndex: 1,
      explanation: "Qualquer alteração mínima de um único bit no arquivo altera radicalmente a sequência alfanumérica gerada pelo cálculo de Hash garantindo a certificação de não violação da evidência digital."
    },
    {
      id: "qq4",
      question: "O que representa a 'Cadeia de Custódia' no contexto criminal forense brasileiro?",
      options: [
        "A ordem de prisão da comarca judicial do réu.",
        "O processo de documentação sequencial e ininterrupto cronológico de posse de um vestígio criminal desde a coleta até o descarte.",
        "O cabo ou cordão de aço que une o acusado às algemas policiais.",
        "A lista de leis aplicadas para julgar crimes violentos."
      ],
      correctAnswerIndex: 1,
      explanation: "Regulada no Código de Processo Penal, a Cadeia de Custódia serve para garantir a idoneidade, rastreabilidade e integridade química/física do vestígio, evitando manipulações ou adulterações ilícitas."
    },
    {
      id: "qq5",
      question: "Ao analisar a cronotanatognose num corpo, o aparecimento da rigidez muscular cadavérica (rigor mortis) costuma se estabelecer em qual média temporal?",
      options: [
        "Inicia-se entre 2 a 4 horas pós-morte, atingindo maturidade máxima em torno de 8 a 12 horas.",
        "Ocorre instantaneamente nos primeiros doze segundos em todos os músculos.",
        "Leva em média sete dias corridos sob clima frio e temperado.",
        "Ocorre apenas caso haja presença direta de venenos no sangue."
      ],
      correctAnswerIndex: 0,
      explanation: "A falta de ATP muscular pós-morbidade causa o aprisionamento das pontes de actomiosina do corpo. O processo segue um gradiente crânio-caudal clássico regulando exames periciais primários."
    },
    {
      id: "qq6",
      question: "O padrão de estriações ou ranhuras no corpo de um projétil disparado é causado por:",
      options: [
        "O impacto do projétil contra a parede ou solo.",
        "As marcas de usinagem e raiamento em espiral dentro do cano da arma de fogo.",
        "A fricção mecânica do atrito com a pólvora ao queimar.",
        "As ranhuras feitas com lixas de metal manualmente pelo criminoso."
      ],
      correctAnswerIndex: 1,
      explanation: "O cano das armas contém ranhuras helicoidais chamadas 'raias' que conferem giro estabilizador ao projétil. Estas raias entalham marcas singulares micro-estriadas úteis no microscópio criminal comparativo."
    },
    {
      id: "qq7",
      question: "Como se chama a técnica científica de identificação humana através do estudo e indexação das ranhuras e sulcos presentes na palma das mãos?",
      options: [
        "Quiromancia jurídica.",
        "Quiroscopia papilar.",
        "Podoscopia plantar.",
        "Dactiloscopia computada."
      ],
      correctAnswerIndex: 1,
      explanation: "Enquanto a Dactiloscopia estuda as polpas digitais e a Podoscopia as plantas dos pés, a Quiroscopia debruça-se sobre a palma da mão para catalogar cristas papilares dermatoglíficas."
    },
    {
      id: "qq8",
      question: "Que substância de extrema toxicidade (famosa em romances policiais antigos) bloqueia a respiração celular humana ao se ligar ao ferro mitocondrial?",
      options: [
        "Cianeto de Potássio ou Gás Ácido Cianídrico.",
        "Cloreto de Sódio de cozinha.",
        "Água Oxigenada concentrada.",
        "Bicarbonato mineral."
      ],
      correctAnswerIndex: 0,
      explanation: "O cianeto liga-se firmemente à enzima citocromo c oxidase nas mitocôndrias celular, cessando a respiração celular de oxigênio de forma instantânea mesmo com pulmões saturados."
    },
    {
      id: "qq9",
      question: "Qual das seguintes superfícies é classificada como 'não porosa', alterando os reagentes químicos de revelação de digitais?",
      options: [
        "Uma fita de papelão de embalagem postal.",
        "Papel sulfite branco de escritório.",
        "Superfície lisa de vidro de janelas ou metais esmaltados.",
        "Tecidos de algodão cru lavados."
      ],
      correctAnswerIndex: 2,
      explanation: "Superfícies não porosas como vidro e metais lisos requerem pós físicos inertes mecânicos ou vapores de cianoacrilato que se condensam diretamente na umidade/gordura deixada pela pele."
    },
    {
      id: "qq10",
      question: "A Antropologia Forense é de extrema e singular utilidade científica na investigação de:",
      options: [
        "Mensagens criptografadas enviadas pelo navegador Tor.",
        "Grande incêndio, queda de aviação ou sepulturas rasas em floresta onde restam apenas ossos humanos.",
        "Soro de dosagem de medicamentos em crianças.",
        "Comportamento de cobaias em biotério químico controlado."
      ],
      correctAnswerIndex: 1,
      explanation: "Em corpos incinerados, mumificados ou esqueletizados de desastres, as marcas ósseas preservam os únicos mapas antropológicos para estimar o gênero, ancestralidade biológica e idade do cadáver."
    }
  ],

  externalQuizzes: [
    {
      id: "e1",
      title: "Quiz Oficial SENASP - Ministério da Justiça",
      url: "https://seguranca.gov.br/",
      description: "Desafios de doutrina de cadeia de custódia e preservação ambiental de vestígios fáticos."
    },
    {
      id: "e2",
      title: "Criminologia e Necropapiloscopia Avançada",
      url: "https://www.policiacivil.rj.gov.br/",
      description: "Treinamentos simulados de papiloscopia em corpos molhados ou em estágio de decomposição."
    }
  ],

  libraryItems: [
    {
      id: "lib1",
      title: "Tratado de Medicina Legal e Criminologia",
      author: "Genival Veloso de França",
      category: "Livro",
      url: "https://books.google.com.br/books?id=PuxIDwAAQBAJ",
      description: "A obra máxima e seminal de Medicina Legal da América Latina, cobrindo tanatologia, sexologia e asfixiologia criminal.",
      fileSize: "14.2 MB"
    },
    {
      id: "lib2",
      title: "Diretrizes Nacionais de Cadeia de Custódia",
      author: "Secretaria de Segurança Pública",
      category: "Protocolo",
      url: "https://www.gov.br/mj/",
      description: "Protocolos oficiais federais sobre o processamento e lacre físico de substâncias fáticas de locais de crime.",
      fileSize: "3.1 MB"
    },
    {
      id: "lib3",
      title: "Laudo Pericial: DNA e Paternidade Complexa",
      author: "Laboratório de Genética LACIF UFF",
      category: "Estudo de Caso",
      url: "https://example.com/artigo-dna-lacif.pdf",
      description: "Mapeamento genético simulado de parentesco de herança biológica cruzada utilizando loci hipervariáveis.",
      fileSize: "1.8 MB"
    },
    {
      id: "lib4",
      title: "Investigando Cenas de Crime por Espectroscopia de Raman",
      author: "Ana Bianca Espíndola",
      category: "Artigo",
      url: "https://example.com/ramen-investigation.pdf",
      description: "Abordagem moderna e inovadora de identificação portátil não destrutiva de resíduos químicos em superfícies reflexivas.",
      fileSize: "920 KB"
    },
    {
      id: "lib5",
      title: "Forensics and Justice: A Biometric Revolution",
      author: "Nature Genetics Journal",
      category: "Artigo",
      url: "https://www.nature.com/nature",
      description: "Análise prospectiva global do impacto do banco de dados CODIS na resolução de homicídios sem autoria no século XXI.",
      fileSize: "4.5 MB"
    }
  ],

  galleryItems: [
    {
      id: "gal1",
      title: "Simulado Prático Local de Crime",
      date: "Outubro de 2025",
      category: "Treinamento",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      description: "Membros da LACIF UFF isolando área externa com fita zebrada amarela para análise de trajetórias de pegadas e cartuchos."
    },
    {
      id: "gal2",
      title: "Palestra com Perito da Polícia Federal",
      date: "Março de 2026",
      category: "Palestra",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      description: "Apresentação de ferramentas tecnológicas de varredura laser 3D de relevo em investigações de campo fechadas."
    },
    {
      id: "gal3",
      title: "Análise Instrumentar no Laboratório",
      date: "Abril de 2026",
      category: "Laboratório",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop",
      description: "Prática acadêmica com microscópios ópticos binoculares para identificação cromatográfica primária e fibras têxteis."
    },
    {
      id: "gal4",
      title: "Simpósio Fluminense de Ciências Forenses",
      date: "Maio de 2026",
      category: "Congresso",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800&auto=format&fit=crop",
      description: "Pôster de destaque acadêmico abordando mutações e anomalias de DNA mitocondrial em parentescos de quarto grau."
    }
  ],

  faqs: [
    {
      id: "faq1",
      question: "O que é a LACIF UFF?",
      answer: "A LACIF UFF é a Liga Acadêmica de Ciências Forenses da Universidade Federal Fluminense. É uma associação científica sem fins lucrativos, gerida por estudantes sob a supervisão de professores, com foco no estudo técnico, acadêmico e prático de perícias criminais e balísticas."
    },
    {
      id: "faq2",
      question: "Quem pode participar do Processo Seletivo?",
      answer: "Qualquer estudante regularmente matriculado na UFF, independente do curso de origem (Farmácia, Medicina, Biologia, Química, Direito, Engenharia, Computação, etc.), desde que atenda aos requisitos básicos descritos no Edital vigente."
    },
    {
      id: "faq3",
      question: "Onde ocorrem as atividades práticas e palestras?",
      answer: "As reuniões de estudo, seminários e análises laboratoriais ocorrem nos auditórios e laboratórios da faculdade de Farmácia e Medicina da UFF, localizados nos campi de Niterói, RJ."
    },
    {
      id: "faq4",
      question: "A liga emite certificados de participação acadêmica?",
      answer: "Sim! Emitimos declarações e certificados de horas de atividades complementares essenciais para os currículos, tanto para os ligantes oficiais quanto para os participantes externos inscritos em nossos simpósios."
    },
    {
      id: "faq5",
      question: "Qual o foco das pesquisas científicas desenvolvidas?",
      answer: "Desenvolvemos investigações de cunho revisório ou empírico laboratorial sobre novas metodologias cromatográficas, análise química de drogas, segurança de dados em Computação Forense e estudos de marcas em Balísticas."
    },
    {
      id: "faq6",
      question: "A LACIF UFF possui convênios com corporações policiais?",
      answer: "A Liga realiza eventos, convida e recebe peritos da Polícia Civil e Federal para palestras e workshops práticos simulados, promovendo grande networking institucional com os órgãos de segurança oficial do Estado."
    },
    {
      id: "faq7",
      question: "Como funciona a extensão científica promovida pela Liga?",
      answer: "Publicamos posts educativos semanais, participamos de feiras de ciências escolares demonstrando exames de DNA e sangue falso por luminol, ajudando a vulgarizar e democratizar a ciência forense para a sociedade fluminense."
    },
    {
      id: "faq8",
      question: "É cobrada alguma taxa para ser membro?",
      answer: "Não! A nossa liga é gratuita, pública e acadêmica, visando unicamente o desenvolvimento de excelência de nossos estudantes e a divulgação da ciência aplicada."
    },
    {
      id: "faq9",
      question: "A cada quanto tempo ocorrem as simulações práticas de locais de crime?",
      answer: "Realizamos ao menos uma simulação de grande escala por semestre, onde criamos cenários fictícios de mistério investigativo integrando balística, sangue simulado, fitas de custódia e papiloscopia real de campo."
    },
    {
      id: "faq10",
      question: "Como posso entrar em contato rápido com a equipe?",
      answer: "Você pode nos mandar um direct através do Direct do Instagram (@lacifuff.oficial) ou nos enviar uma mensagem diretamente no e-mail ou WhatsApp corporativo dispostos na barra inferior do site."
    }
  ],

  selectiveProcess: {
    editalUrl: "https://example.com/edital_lacif_2026.pdf",
    subscriptionUrl: "https://docs.google.com/forms/",
    requirements: [
      "Ser estudante com vínculo ativo em qualquer curso de graduação da UFF.",
      "Disponibilidade mínima de 4 horas semanais para reuniões acadêmicas e trabalhos em equipe.",
      "Preencher o formulário de pré-inscrição até o prazo limite estipulado.",
      "Aprovação na prova objetiva de conhecimentos forenses básicos e fase de entrevista."
    ],
    schedule: [
      { event: "Lançamento do Edital Oficial", date: "01/06/2026" },
      { event: "Período das Inscrições Online", date: "02/06 a 15/06/2026" },
      { event: "Prova Objetiva de Conceitos Forenses", date: "20/06/2026" },
      { event: "Entrevistas Individuais Online", date: "25/06 a 28/06/2026" },
      { event: "Divulgação dos Resultados Finais", date: "05/07/2026" },
      { event: "Aula Inaugural de Membros", date: "12/07/2026" }
    ]
  },

  contact: {
    instagram: "https://instagram.com/lacifuff",
    tiktok: "https://tiktok.com/@lacifuff",
    youtube: "https://youtube.com/lacifuff",
    whatsapp: "https://wa.me/5521999999999",
    email: "lacif.uff@gmail.com",
    address: "Faculdade de Farmácia, Universidade Federal Fluminense, Campus Valonguinho, Niterói, RJ, CEP 24240-000"
  },
  googleDriveUrl: "https://drive.google.com/drive/folders/1YYeI1Z0A5-XQs0L4jFZtwjTi3juKE1tn?usp=drive_link",
  libraryDriveUrl: "https://drive.google.com/drive/folders/18Px836g0VtCCV10F-mso68N6HuyNuSfy?usp=sharing"
};
