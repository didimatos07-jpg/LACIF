import { SiteContent } from './types.ts';

export const INITIAL_CONTENT: SiteContent = {
  heroTitle: "LACiF UFF",
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
  historyText: "A Liga Acadêmica de Ciências Forenses da Universidade Federal Fluminense (LACiF UFF) nasceu da paixão e do anseio de estudantes e docentes em aprofundar os estudos em uma das áreas mais fascinantes e cruciais para a sociedade: a perícia criminal e a busca científica pela verdade. Fundada com o propósito de integrar diferentes saberes — da química à genética, do direito aos sistemas inteligentes de computação —, a liga rapidamente expandiu o seu escopo acadêmico.\n\nA LACiF UFF consolidou-se como um polo de excelência em ensino, pesquisa e extensão. Nossos membros participam de debates essenciais sobre a validade probatória, desenvolvem trabalhos acadêmicos de ponta, coordenam simulações de locais de crime de alto realismo e colaboram com peritos criminais oficiais da Polícia Civil, da Polícia Federal e de institutos de criminalística renomados. Aqui, moldamos as mentes investigativas e científicas do futuro.",
  historyImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
  
  directors: [
    {
      id: "1",
      name: "Ana Bianca Espíndola",
      role: "Presidente",
      department: "Farmácia",
      bio: "Entusiasta de Toxicologia e Análise Química de Substâncias de Interesse Forense. Coordena os projetos de extensão da LACiF.",
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
      id: "morte_violenta",
      title: "Local de Crime contra a Pessoa (Morte Violenta)",
      description: "Exames perinecroscópicos, preservação e isolamento de locais de homicídios, feminicídios, infanticídios e mortes violentas.",
      detailedDescription: "A disciplina de Local de Crime contra a Pessoa estuda as manifestações físicas e vestígios ecológicos deixados em cenas de mortes violentas. O perito analisa manchas e padrões de respingos de sangue, posição corporal, marcas de arrastamento e traumatismos visíveis prévios à necropsia. O exame perinecroscópico inicial no local guia as linhas investigativas e garante a correta indexação da verdade temporal e espacial do homicídio.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Análise de Padrão de Manchas de Sangue", "Exame Perinecroscópico Fático", "Fotografia Criminal Forense"]
    },
    {
      id: "patrimonio",
      title: "Local de Crime contra o Patrimônio",
      description: "Investigação pericial de furtos, roubos armados, arrombamentos de caixas eletrônicos, danos materiais estruturais e fraudes simuladas.",
      detailedDescription: "Esta vertente concentra-se no levantamento técnico de locais que sofreram violações patrimoniais. O perito analisa os métodos de entrada e superação de obstáculos físicos (fechaduras estouradas, paredes perfuradas, uso de maçaricos e explosivos), buscando vestígios biológicos ou papilares dos autores, além de certificar se houve simulação de crime para recebimento indevido de seguros.",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Análise de Superação de Obstáculos", "Revelação de Impressões Latentes", "Laudo de Avaliação de Danos Físicos"]
    },
    {
      id: "toxicologia",
      title: "Toxicologia Forense",
      description: "Isolamento e análise molecular de agentes químicos, fármacos de prescrição, drogas ilícitas de abuso e venenos biológicos.",
      detailedDescription: "A Toxicologia Forense aplica o rigor analítico da bioquímica e farmacologia para elucidar questões jurídicas urgentes. Envolve a triagem, confirmação e quantificação de venenos, substâncias psicotrópicas ilícitas, fármacos terapêuticos e álcool em matrizes como sangue, urina, fios de cabelo e tecidos post-mortem, guiando investigações de intoxicações acidentais, sobredoses premeditadas e homicídios silenciosos.",
      image: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Espectrometria de Massas (LC-MS/MS)", "Cromatografia Gasosa Computada", "Triagem Toxicológica de Sobredoses"]
    },
    {
      id: "quimica",
      title: "Química Forense",
      description: "Análise de drogas de abuso puras apreendidas, explosivos comerciais, acelerantes de incêndio e adulterações em combustíveis.",
      detailedDescription: "A Química Forense é o ramo responsável pela análise de materiais inorgânicos e sintéticos coletados em ocorrências criminais. Ela atua na descaracterização e identificação molecular de drogas sintéticas extremamente perigosas, mapeamento de acelerantes de incêndios e materiais combustíveis, além da comparação físico-química de vidros, plásticos, tintas automotivas, solos e resíduos pós-explosão em atentados.",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Espectroscopia de Infravermelho (FTIR)", "Fluorescência de Raios-X (XRF)", "Cromatografia em Camada Delgada"]
    },
    {
      id: "genetica",
      title: "Genética Forense",
      description: "Mapeamento e tipificação biológica inequívoca a partir de microvestígios celulares, estudos de paternidade e genealogia criminal.",
      detailedDescription: "A Genética Forense revolucionou a criminologia. Através de quantidade vestigial de material biológico (como sangue, suor, epitélio bucal ou folículos capilares), o geneticista extrai, quantifica e amplifica sequências polimórficas de DNA (STRs e SNPs). Os perfis resultantes são cruzados contra bancos de dados biométricos nacionais de forma a determinar autoria penal indubitável ou estabelecer vínculos de parentesco.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Reação em Cadeia da Polimerase (PCR-STR)", "Sequenciamento de Nova Geração (NGS)", "Analyse Estatística de Probabilidade Genética"]
    },
    {
      id: "engenharia",
      title: "Engenharia Forense",
      description: "Análise estrutural de desabamentos, dinâmica física de colisões de trânsito, falhas industriais e patologias construtivas.",
      detailedDescription: "A Engenharia Forense aplica princípios físicos e mecânicos para investigar acidentes rodoviários, ferroviários e aéreos, além de desabamentos de pontes e edifícios. O engenheiro reconstrói vetorialmente colisões por meio do desgaste da pista, deformaçâo plástica das chapas metálicas, velocidade angular e atrito, gerando laudos precisos e simulações físicas que auxiliam nas decisões do judiciário.",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Cálculo Mecânico de Velocidade e Energia", "Modelagem Estrutural Tridimensional (CAD)", "Laudo de Estabilidade de Obras Civis"]
    },
    {
      id: "informatica",
      title: "Informática Forense",
      description: "Preservação, extração e análise diagnóstica de vestígios em meios digitais, servidores de rede, nuvem e criptomoedas.",
      detailedDescription: "Preservação cautelar, extração metodológica e análise diagnóstica de dados em meio digital. Utilizando bloqueadores de gravação e algoritmos seguros, os peritos em informática extraem metadados ocultos, chaves criptográficas quebradas, registros residuais de rede em servidores virtuais sob ataque e imagens de boot de sistemas afetados por vírus industriais ou invasões cibernéticas.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Aquisição de Bit-Stream Images Seladas", "Análise de Ransomwares e Malware", "Decodificação Hexadecimal de Estruturas de Dados"]
    },
    {
      id: "psicologia",
      title: "Psicologia Forense",
      description: "Análise de sanidade mental de acusados, autópsia psicológica, profiling criminal e avaliação pericial de depoimentos judiciais.",
      detailedDescription: "A Psicologia Forense atua na fascinante interseção entre o comportamento da mente humana e as exigências da lei. O psicólogo perito realiza avaliações clínicas de imputabilidade penal (se o réu possuía discernimento do ato), traça perfis de criminosos em série (criminal profiling), conduz entrevistas diagnósticas especiais com vítimas vulneráveis e ajuda a determinar a credibilidade de depoimentos capitais.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Perfilamento do Comportamento (Profiling)", "Autópsia Psicológica Multidisciplinar", "Avaliação da Credibilidade de Declarações"]
    },
    {
      id: "ambiental",
      title: "Perícia Ambiental",
      description: "Investigação pericial de contaminação de mananciais, poluição industrial de solos, desmatamentos ilegais e crimes de caça biológica.",
      detailedDescription: "Dedicada a apurar violações contra a integridade ecológica do planeta. O perito ambiental monitora lançamentos irregulares de metais pesados em rios, analisa a compactação quimio-física de solos afetados por agrotóxicos proibidos, usa dados satelitais e geoprocessamento para comprovar locais de queima intencional de florestas e avalia o impacto sistêmico em ecossistemas de preservação.",
      image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Geoprocessamento Temporal de Satélites", "Coleta Química de Efluentes Líquidos", "Análise Fitossanitária de Solos Contaminados"]
    },
    {
      id: "contabilidade",
      title: "Contabilidade Forense",
      description: "Investigação de crimes econômico-financeiros, desvios patrimoniais de dinheiro público, lavagem de capitais e auditoria criminal.",
      detailedDescription: "A Contabilidade Forense é o ramo pericial responsável por rastrear transações financeiras fraudulentas, desvios corporativos, sonegação fiscal e lavagem de capitais ocultas sob complexas redes societárias. O perito analisa fluxos monetários digitais, balanços patrimoniais camuflados e livros fiscais, traduzindo crimes de colarinho branco em demonstrativos técnicos irrefutáveis.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Rastreamento Sistêmico de Fluxos Monetários", "Auditoria de Balanços e Demonstrações Financeiras", "Ocultação Patrimonial e Redes Societárias"]
    },
    {
      id: "veterinaria",
      title: "Medicina Veterinária Forense",
      description: "Investigação pericial de maus-tratos, abate e caça ilegal de fauna silvestre, e exames patológico-veterinários de animais.",
      detailedDescription: "Ramo voltado à proteção animal e fiscalização sanitária legal. O perito veterinário elabora diagnósticos de maus-tratos em animais domésticos, investiga mortes intencionais por envenenamento fático animal, atua no rastreamento de contrabando de peles e espécimes silvestres sob proteção legal e realiza necropsias técnicas veterinárias para qualificar a causa mortis em inquéritos policiais.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Patologia e Necropsia de Animais", "Laudo Clínico de Maus-Tratos Silvestres", "Detecção de Envenenamento de Bichos"]
    },
    {
      id: "balistica",
      title: "Balística Forense",
      description: "Estudo mecânico-dinâmico de disparos, trajetórias tridimensionais, características de armas de fogo e efeitos de projéteis.",
      detailedDescription: "Dedicada a decifrar a mecânica e os efeitos físicos de armas de fogo. Abrange a balística interna (ciclo de disparo), externa (trajetória do projétil no ar com cálculos de vento e arrasto) e de efeitos (padrões de impacto, ricochetes e orifícios de entrada/saída). Através de microcomparação microscópica de estrias e resíduos de disparos (GSR), associa projéteis suspeitos diretamente à arma disparadora.",
      image: "https://images.unsplash.com/photo-1595152230535-043c9e117a6d?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Microcomparação Óptica de Projéteis", "Varredura Química de Resíduos (GSR)", "Cálculo e Reconstrução de Trajetórias 3D"]
    },
    {
      id: "documentoscopia",
      title: "Documentoscopia Forense",
      description: "Análise pericial de documentos físicos sob suspeita de adulterações, lavagem química de papel e análise grafotécnica de assinaturas.",
      detailedDescription: "Focada na determinação da autenticidade ou falsidade de documentos, manuscritos, assinaturas e selos de fé pública. Os peritos utilizam fontes de radiação multiespectral, análise microscópica de cruzamento de traços de tintas de caneta e exames grafotécnicos de punho escritor — avaliando ritmo, velocidade, pegada, espaçamento e inclinação da caligrafia em contratos e correspondências misteriosas.",
      image: "https://images.unsplash.com/photo-1455390582262-044c5c27a797?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Perícia Grafotécnica Comparativa de Escrita", "Espectroscopia de Emissão de Pigmentos de Tintas", "Análise de Relevo e Pressão Físico-Mecânica"]
    },
    {
      id: "audio_imagem",
      title: "Áudio e Imagem Forense",
      description: "Análise de autenticidade de vídeos e gravações acústicas, restauração de mídias turvas e biometria vocal de locutores.",
      detailedDescription: "Esta disciplina lida com exames que envolvem o tratamento, preservação e identificação fônica e de vídeo. Os peritos identificam indícios de montagens ou cortes em vídeos residenciais e gravações de segurança, aplicam filtros matemáticos de redução de ruído para elevar vozes sussurradas e executam confrontos vocais por espectrografia de voz eletrônica bidimensional.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Exame Biométrico Vocal / Espectrografia", "Filtros Matemáticos de Restauração de Ruído", "Laudo de Autenticidade de Imagens e Vídeo"]
    },
    {
      id: "reproducao_simulada",
      title: "Reprodução Simulada",
      description: "Modelagem fática espacial e reprodução cinemática tridimensional de crimes coordenando depoimentos de réus e testemunhas.",
      detailedDescription: "Conhecida como reconstituição do crime, é um rito fático em que os peritos coordenam as versões dadas pelas testemunhas, vítimas e acusados diretamente no local dos fatos. Todo o trajeto espacial e temporal do evento é medido tecnicamente, recorrendo hoje a tecnologias GIS e modelagem 3D, certificando se as leis da física apoiam ou contradizem os testemunhos colhidos.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      glowColor: "cyan",
      skills: ["Modelagem de Cenários Espaciais (BIM/3D)", "Análise Cinemática Físico-Dinâmica", "Equacionamento de Distâncias e Ângulos de Tiro"]
    },
    {
      id: "medicina",
      title: "Medicina Legal",
      description: "Necropsias científicas, exames clínico-forenses de traumatologias, sexologia e tanatofisiologia em mortos e sobreviventes.",
      detailedDescription: "União vital entre a ciência médica e o direito. Através da necropsia clínica-forense sistemática, o médico legista examina a sede e a natureza de lesões internas e externas, determinando a causa jurídica e fisiológica do óbito. Em sobreviventes, atua em exames traumatológicos para constatar abusos físicos, envenenamentos mecânicos ou erros de conduta que configurem relevância criminal.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      glowColor: "yellow",
      skills: ["Tanatologia Forense e Autópsias Gerais", "Traumatologia Clínica de Impactos", "Estimativa do Cronograma e Intervalo Post-Mortem"]
    }
  ],

  vocationalQuestions: [
    {
      id: "vq_morte_violenta",
      question: "Diante de um local de crime isolado envolvendo uma pessoa caída, qual vestígio físico você se sente prioritariamente motivado a documentar primeiro?",
      options: [
        { text: "Estudar o espalhamento geométrico, padrão e direção dos respingos de sangue nas paredes.", pointsFor: "morte_violenta" },
        { text: "Buscar marcas de arrombamento, chaves michas ou impressões latentes nos cofres e gavetas.", pointsFor: "patrimonio" },
        { text: "Coletar resíduos de pólvora e estrias do projétil de metal cravado na parede próxima.", pointsFor: "balistica" },
        { text: "Investigar se há medicamentos sem bula na lixeira ou vestígios bioquímicos em copos d'água.", pointsFor: "toxicologia" }
      ]
    },
    {
      id: "vq_patrimonio",
      question: "Qual dessas situações profissionais desafia mais o seu raciocínio lógico no cotidiano?",
      options: [
        { text: "Entender como um invasor conseguiu violar fechaduras complexas, portões elétricos e cofres blindados sem ser visto.", pointsFor: "patrimonio" },
        { text: "Conduzir avaliações psicológicas para entender as motivações internas e o transtorno mental de um réu acusado.", pointsFor: "psicologia" },
        { text: "Rastrear canais de dados eletrônicos criptografados e analisar vírus instalados num servidor invadido.", pointsFor: "informatica" },
        { text: "Investigar desvios de dinheiros corporativos camuflados em balanços contábeis e lavagem de ativos.", pointsFor: "contabilidade" }
      ]
    },
    {
      id: "vq_toxicologia",
      question: "Você tem interesse em analisar substâncias químicas e biológicas para identificar causas de intoxicação?",
      options: [
        { text: "Sim, me atrai enormemente operar espectrometria para identificar fármacos abusados, drogas e compostos envenenados.", pointsFor: "toxicologia" },
        { text: "Prefiro realizar a análise físico-química comparativa das fibras de papel e tintas de caneta para atestar fraudes.", pointsFor: "documentoscopia" },
        { text: "Prefiro examinar corpos e tecidos biológicos humanos em autópsias corporais para descobrir lesões traumáticas de facas.", pointsFor: "medicina" },
        { text: "Prendem mais a minha atenção os crimes ecológicos envolvendo lançamentos pesados industriais em rios fluminenses.", pointsFor: "ambiental" }
      ]
    },
    {
      id: "vq_quimica",
      question: "Se você estivesse em um laboratório forense estadual avançado de alta tecnologia, qual o ensaio químico ideal para sua tese acadêmica?",
      options: [
        { text: "Identificação estrutural molecular de novas drogas sintéticas derivadas de anfetaminas apreendidas em raves.", pointsFor: "quimica" },
        { text: "Análise quantitativa de resíduos de chumbo, antimônio e bário (GSR) coletados de peles de suspeitos de tiro.", pointsFor: "balistica" },
        { text: "Amplificação genética e sequenciamento de perfis de DNA de micro-goticula celular de suor.", pointsFor: "genetica" },
        { text: "Extração de metadados ocultos de arquivos binários corrompidos obtidos de navegadores anônimos de internet.", pointsFor: "informatica" }
      ]
    },
    {
      id: "vq_genetica",
      question: "Que tipo de prova legal, dotada de elevado rigor científico probabilístico, você acha mais irrefutável e respeitável para innocentar réus falsos?",
      options: [
        { text: "O perfil idêntico de DNA extraído de apenas um fio de cabelo ou gotícula invisível de suor na cena.", pointsFor: "genetica" },
        { text: "A análise fatiada da dinâmica balística interna e as estrias incomparáveis deixadas no cano de metal.", pointsFor: "balistica" },
        { text: "O estudo biomecânico espacial e depoimento contraditório rebatido pelas leis da física em reproduções simuladas.", pointsFor: "reproducao_simulada" },
        { text: "A detecção de adulterações fiscais e notas fraudulentas rastreadas pelo extrato de contas de empresas de fachada.", pointsFor: "contabilidade" }
      ]
    },
    {
      id: "vq_engenharia",
      question: "Ao ver a notícia do colapso parcial de um viaduto urbano ou de um acidente complexo automobilístico, seu cérebro busca imediatamente investigar:",
      options: [
        { text: "As leis de transferência de energia e conservação de momentum linear que explicam a fadiga metálica do asfalto.", pointsFor: "engenharia" },
        { text: "A autenticidade de documentos de engenharia assinados, marcas hidráulicas do papel e canetas usadas nas fraudes.", pointsFor: "documentoscopia" },
        { text: "Sinais biológicos de maus-tratos ou intoxicação em animais que pastavam nos entornos da estrutura.", pointsFor: "veterinaria" },
        { text: "Estudar se houve crime cibernético para alterar os semáforos integrados de trânsito da avenida pública.", pointsFor: "informatica" }
      ]
    },
    {
      id: "vq_informatica",
      question: "Você tem afinidade com tecnologia e gostaria de investigar crimes digitais e recuperação de dados?",
      options: [
        { text: "Sim perfeitamente! Ficar horas rastreando logs de invasão criminosa, servidores ocultos, Bitcoins e dados deletados.", pointsFor: "informatica" },
        { text: "Prefiro examinar armas de fogo, estrias metálicas helicoidais e calcular ângulos de trajetórias de tiro de revólver.", pointsFor: "balistica" },
        { text: "Gostaria de aplicar o conhecimento médico-legal especializado na análise direta de cadáveres humanos no IML.", pointsFor: "medicina" },
        { text: "Me sinto motivado a investigar desmatamentos ilegais rastreados por lentes multiespectrais de satélite no Estado.", pointsFor: "ambiental" }
      ]
    },
    {
      id: "vq_psicologia",
      question: "Você gostaria de aplicar conhecimentos psicológicos em investigações criminais e perícias judiciais?",
      options: [
        { text: "Com certeza, traçando perfis comportamentais de delinquentes (profiling) e avaliando declarações de vítimas.", pointsFor: "psicologia" },
        { text: "Não, me atrai mais estudar as marcas do punho e fisionomia da caligrafia de assinaturas em contratos.", pointsFor: "documentoscopia" },
        { text: "Prefiro realizar a análise toxicológica laboratorial de venenos em amostras biológicas de sangue.", pointsFor: "toxicologia" },
        { text: "Prefiro investigar desvios bilionários públicos por sistemas de contabilidade pública e auditorias fiscais.", pointsFor: "contabilidade" }
      ]
    },
    {
      id: "vq_ambiental",
      question: "Você se interessa por investigar crimes relacionados ao meio ambiente e impactos ecológicos?",
      options: [
        { text: "Sim! Rastrear vazamentos tóxicos, despejos ilegais industriais, desmatamentos por GPS e danos aos ecossistemas do Rio.", pointsFor: "ambiental" },
        { text: "Prefiro analisar o comportamento psicológico de agressores ou transtornos psicológicos em litígios criminais.", pointsFor: "psicologia" },
        { text: "Prefiro decodificar sistemas de computadores invadidos e recuperar chaves privadas cripto-digitais furtadas.", pointsFor: "informatica" },
        { text: "Prefiro reconstruir trajetórias de projéteis em cenas de balística fechadas usando scanners a laser.", pointsFor: "balistica" }
      ]
    },
    {
      id: "vq_contabilidade",
      question: "Se você se deparasse com o cofre de uma comissão investigadora sobre desfalques corporativos milionários, qual seria seu instinto de busca?",
      options: [
        { text: "Auditar extratos bancários, comparar planilhas de entrada/saída financeira e desmascarar lavagem eletrônica.", pointsFor: "contabilidade" },
        { text: "Examinar marcas dactilares deixadas no painel digital de senha do cofre usando pós eletrostáticos.", pointsFor: "patrimonio" },
        { text: "Restaurar arquivos excluídos e conversas ocultas de celulares dos diretores da empresa.", pointsFor: "informatica" },
        { text: "Realizar testes químicos rápidos para identificar resíduos de maçarico contra a chapa metálica da porta.", pointsFor: "quimica" }
      ]
    },
    {
      id: "vq_veterinaria",
      question: "Se uma denúncia apontasse maus-tratos generalizados ou caça clandestina predatória de espécies de animais nas serras do Estado, você atuaria focando em:",
      options: [
        { text: "Fazer a necropsia veterinária nos animais apreendidos para qualificar envenenamento fático ou maus-tratos traumáticos.", pointsFor: "veterinaria" },
        { text: "Proceder à avaliação de lesões físicas em seres humanos que presenciaram e combateram os caçadores no local.", pointsFor: "medicina" },
        { text: "Analisar as pegadas, marcas de desgaste mecânico de cercas e pneus de jipes suspeitos no terreno do fato.", pointsFor: "patrimonio" },
        { text: "Rastrear as mensagens de áudio e ligações de rádio interceptadas do grupo por meios de acústica computada.", pointsFor: "audio_imagem" }
      ]
    },
    {
      id: "vq_balistica",
      question: "Você se sente motivado a estudar armas de fogo e trajetórias de projéteis em investigações criminais?",
      options: [
        { text: "Sim, considero focar na mecânica do tiro, mapeamento tridimensional de trajetos de balas e comparação microscópica.", pointsFor: "balistica" },
        { text: "Prefiro operar genotipagem estatística de DNA em laboratórios limpos para determinar identidades periciais.", pointsFor: "genetica" },
        { text: "Gostaria de me especializar em analisar fonicamente gravações telefônicas ameaçadoras e autenticidade de áudios.", pointsFor: "audio_imagem" },
        { text: "Prefiro estudar o histórico social do acusado e traçar seu perfil de temperamento psicossocial.", pointsFor: "psicologia" }
      ]
    },
    {
      id: "vq_documentoscopia",
      question: "Diante de uma carta de testamento polêmica sob disputa de herdeiros bilionários, como você ajudaria o juiz do caso?",
      options: [
        { text: "Elaborando um laudo grafotécnico minucioso do punho escritor e medindo a velocidade e pressão do traço da caneta.", pointsFor: "documentoscopia" },
        { text: "Verificando se as vozes das gravações digitais do falecido confessando a divisão batem com seu padrão de fala biológico.", pointsFor: "audio_imagem" },
        { text: "Analisando bioquimicamente vestígios de venenos na saliva colada no selo físico da carta rasgada.", pointsFor: "toxicologia" },
        { text: "Decodificando os dados e metadados de criação do arquivo de texto do testamento guardado em cartório virtual.", pointsFor: "informatica" }
      ]
    },
    {
      id: "vq_audio_imagem",
      question: "Caso um processo penal crucial dependesse da veracidade de uma gravação telefônica ou vídeo borrado de vigilância, você gostaria de:",
      options: [
        { text: "Restaurar frames, analisar ruídos térmicos de filtros e comparar os formantes da voz do locutor na onda fônica.", pointsFor: "audio_imagem" },
        { text: "Elaborar depoimento com modelagem espacial fática reencenando os movimentos físicos das pessoas envolvidas.", pointsFor: "reproducao_simulada" },
        { text: "Avaliar se as cicatrizes exibidas no vídeo condizem com as lesões laudadas em corpo de delito médico-legal.", pointsFor: "medicina" },
        { text: "Rastrear se a câmera IP que salvou o vídeo foi invadida externamente por manipulação de endereço cibernético.", pointsFor: "informatica" }
      ]
    },
    {
      id: "vq_reproducao_simulada",
      question: "Se um réu alega legítima defesa contra tiro em via pública, mas as testemunhas contam histórias contraditórias, qual o seu instinto pericial?",
      options: [
        { text: "Reconstruir faticamente a dinâmica da cena em um modelo 3D com as versões físicas possíveis, provando sua compatibilidade ou falsidade física.", pointsFor: "reproducao_simulada" },
        { text: "Analizar se há distorções e evidências de montagens de áudio nas ligações que testemunhas fizeram para a polícia.", pointsFor: "audio_imagem" },
        { text: "Obter perfis biológicos de DNA a partir das marcas de dentes deixados em um objeto mordido nas cercanias.", pointsFor: "genetica" },
        { text: "Rastrear os contratos financeiros das partes envolvidas buscando detectar ocultações monetárias e subornos fiscais.", pointsFor: "contabilidade" }
      ]
    },
    {
      id: "vq_medicina",
      question: "Você gostaria de aplicar conhecimentos médicos em investigações criminais e perícias judiciais?",
      options: [
        { text: "Sim! Trabalhar no IML em exames de corpo de delito clínicos e exames detalhados de autópsias e lesões corporais.", pointsFor: "medicina" },
        { text: "Prefiro investigar marcas e lesões traumáticas sofridas exclusivamente por animais domésticos ou silvestres.", pointsFor: "veterinaria" },
        { text: "Prefiro realizar perícia estrutural de colapso de concreto armado de obras civis e resistências mecânicas de asfalto.", pointsFor: "engenharia" },
        { text: "Desejo realizar exames físicos e químicos comparativos de assinaturas fraudadas com técnicas de grafotecnia.", pointsFor: "documentoscopia" }
      ]
    }
  ],

  vocationalResults: {
    morte_violenta: {
      id: "morte_violenta",
      title: "Local de Crime contra a Pessoa (Morte Violenta)",
      profile: "Metodologista de Escopo Geral, Focado em Detalhes Fáticos e Preservação.",
      description: "Você possui um perfil atento, altamente concentrado e resiliente. Interessa-se pela preservação fática e coordenação científica de vestígios em locais de extrema relevância, como homicídios e mortes violentas em geral.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      skills: ["Análise de Respingos de Sangue", "Exame de Perinecropia de Campo", "Cadeia de Custódia Integrada"],
      curiosities: [
        "A posição final dos respingos de sangue nas paredes pode calcular o ângulo e velocidade do impacto físico sofrido.",
        "A fita zebrada isolando a cena do crime é a salvaguarda de mais de 80% das evidências que seriam contaminadas nos primeiros minutos."
      ],
      explanation: "Você se encaixa perfeitamente na ala investigativa e de campo das ciências forenses. Seu olhar clínico registrará detalhes fundamentais que unificam e dão confiabilidade legal aos laudos periciais e inquéritos."
    },
    patrimonio: {
      id: "patrimonio",
      title: "Local de Crime contra o Patrimônio",
      profile: "Investigador Mecânico de Barreiras, Rígido e Atento a Violações Físicas.",
      description: "Seu foco profissional reside na identificação técnica e dedutiva de crimes como furtos qualificados, arrombamentos, roubos organizados de caixas automáticos e danos físicos estruturais intencionais de terceiros.",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600&auto=format&fit=crop",
      skills: ["Análise de Superação de Obstáculos", "Revelação de Impressões Latentes", "Avaliação Econômica de Danos"],
      curiosities: [
        "Marcas de pegadas na derme de poeiras do chão podem revelar a marca do calçado e até estimar a altura do suspeito.",
        "Mais de 15% dos casos patrimoniais de grande porte envolvem simulação planejada para lavagem e recuperação de seguros privados."
      ],
      explanation: "Você adora equacionar processos complexos mecânicos de intrusão e decifrar como e quem superou barreiras físicas. Suas análises serão de valor substancial para seguradoras, bancos e delegacias patrimoniais."
    },
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
    genetica: {
      id: "genetica",
      title: "Genética Forense",
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
    engenharia: {
      id: "engenharia",
      title: "Engenharia Forense",
      profile: "Físico Analítico Estrutural, Rebanhador de Vetores e Impactos Cromáticos.",
      description: "Você possui afinidade com cálculos físicos, mecânicos de estradas e rigores estáticos de edificações. Atuará investigando colapsos de moradias, incêndios acidentais em fábricas, falhas térmicas mecânicas industriais e velocidade veicular em colisões.",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop",
      skills: ["Cálculo Mecânico de Frenagem", "Determinação de Fadiga de Materiais", "Modelagem de Impacto Vetorial"],
      curiosities: [
        "A deformação plástica sofrida pelas chapas metálicas de um carro permite calcular a velocidade exata no milissegundo do choque.",
        "Resistência e flexibilidade do concreto deixam marcas que indicam se a queda estrutural deu-se por vento ou descaso construtivo."
      ],
      explanation: "Você se dedicará a desvendar acidentes estruturais e fatalidades mecânicas complexas que envolvem grandes corporações ou desastres de transporte público, servindo à justiça com precisão de engenharia matemática."
    },
    informatica: {
      id: "informatica",
      title: "Informática Forense",
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
    psicologia: {
      id: "psicologia",
      title: "Psicologia Forense",
      profile: "Terapeuta Antropológico, Profiler Comportamental e Sócio-Analista.",
      description: "Você possui notável inteligência emocional e interesse pelo íntimo da mente humana e do comportamento social. Atuará na estimativa de sanidade mental criminal de criminosos confessionários, perfis sociais de serial killers (profiling) e depoimentos especiais.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      skills: ["Entrevista Cognitiva Avançada", "Profiling Temático Criminal", "Avaliação de Imputabilidade Social"],
      curiosities: [
        "A autópsia psicológica estuda retrospectivamente o diário e depoimentos de alguém falecido para atestar o estado mental presumido do mesmo.",
        "Distorções involuntárias do testemunho humano por falsas memórias são desvendadas por exames linguísticos forenses meticulosos."
      ],
      explanation: "Seu tato interpessoal, sensibilidade psicológica e rigor clínico-penal fornecerão contribuição indispensável a magistrados do direito familiar, adoções e avaliações de periculosidade criminal em presídios federais."
    },
    ambiental: {
      id: "ambiental",
      title: "Perícia Ambiental",
      description: "Investigação pericial de contaminação de mananciais, poluição industrial de solos, desmatamentos ilegais e crimes de caça biológica.",
      profile: "Ecologista Químico de Campo, Geógrafo e Defensor do Equilíbrio Planetário.",
      image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=600&auto=format&fit=crop",
      skills: ["Geoprocessamento Temporal de Satélites", "Coleta Química de Efluentes Líquidos", "Análise Fitossanitária de Solos Contaminados"],
      curiosities: [
        "Variações térmicas vistas por fotos aéreas identificam rios poluídos de vazamentos químicos invisíveis por baixo da copa das árvores.",
        "Vestígios químicos e microscópicos de pesticidas proibidos globalmente nas folhas comprovam a ilicitude do plantio agrícola perante a lei brasileira."
      ],
      explanation: "Você usará ciências ambientais conjugadas à criminalística legal para processar corporações poluidoras e resguardar ecossistemas vulneráveis do Rio de Janeiro e do Brasil."
    },
    contabilidade: {
      id: "contabilidade",
      title: "Contabilidade Forense",
      profile: "Auditor de Estruturas Fiscais, Rastreador Monetário de Sonegações.",
      description: "Sua lógica prospera diante de livros tributários, extratos bancários digitais, transações financeiras suspeitas e ocultações de faturamentos de alto escalão político ou empresarial.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      skills: ["Rastreamento de Fluxo Monetário", "Controle Fiscal Geral Sócio-Empresarial", "Identificação de Redes Corporativas"],
      curiosities: [
        "Al Capone, um dos maiores criminosos mafiosos das Américas, só foi encarcerado devido à perícia contábil de imposto de renda da Receita Federal americana.",
        "Algoritmos contábeis modernos rastreiam fracionamento de envios de Pix fatiados buscando desviar alertas contra branqueamento de capital."
      ],
      explanation: "Você se tornará a muralha contra o crime financeiro e corrupções, provando de forma inquestionável desvios públicos e lavagens de ativos através da ciência dos números patrimoniais empresariais."
    },
    veterinaria: {
      id: "veterinaria",
      title: "Medicina Veterinária Forense",
      profile: "Patologista Veterinário, Patrono de Espécies Silvestres de Campo.",
      description: "Você possui amor pela fauna combinado com espírito científico de bancada. Atuará na certificação clínica ou patológica post-mortem veterinária de abusos físicos, agressões intencionais contra bichos e caçadas predatórias.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop",
      skills: ["Determinação de Causa Mortis de Animais", "Laudo Clínico-Forense Veterinário", "Identificação Genética e Taxonomia de Espécies"],
      curiosities: [
        "A radiografia médica em gansos ou pássaros selvagens caçados ajuda a constatar calibre exato do chumbo do cartucho criminoso.",
        "Exames toxicológicos de órgãos animais revelam iscas envenenadas clandestinas (chumbinho) dadas de má fé."
      ],
      explanation: "Você dará assessoria jurídica indispensável na punição de maus-tratos em animais domésticos e fiscalizações globais de comercializações predatórias e ilegais de biodiversidade nacional."
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
    documentoscopia: {
      id: "documentoscopia",
      title: "Documentoscopia Forense / Grafotecnia",
      profile: "Analista de Autenticidade Gráfica, Detetive de Assinaturas e Fraudes Fiscais.",
      description: "Você possui perfil atento às sutilezas manuscritas, texturas de papéis e assinaturas. A documentoscopia forense analisa contratos suspeitos, falsificações de cédulas de dinheiro e autoria de cartas de extorsão pelo exame grafotécnico.",
      image: "https://images.unsplash.com/photo-1455390582262-044c5c27a797?q=80&w=600&auto=format&fit=crop",
      skills: ["Perícia Grafotécnica de Punho Escritor", "Análise de Radiação Multiespectral de Tintas", "Verificação Física de Pressão de Caneta"],
      curiosities: [
        "A grafotecnia avalia características involuntárias do punho escritor, como o ritmo, velocidade e pressão, tornando a imitação perfeita impossível.",
        "O exame do cruzamento de traços permite determinar qual palavra foi escrita primeiro em um papel fraudado."
      ],
      explanation: "Seu foco excepcional e paciência analítica farão de você um especialista em desmascarar falsários, fraudes de grande escala e assegurar a fé pública em investigações financeiras."
    },
    audio_imagem: {
      id: "audio_imagem",
      title: "Áudio e Imagem Forense",
      profile: "Analista de Sinais de Ondas Fônicas, Detetive Acústico e Visual.",
      description: "Você se entusiasma em decifrar sinais contidos em arquivos acústicos e visuais, filtrando ruídos, localizando indícios de montagens ocultas e atestando a identidade vocal de falantes em gravações de áudio.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800&auto=format&fit=crop",
      skills: ["Confronto Acústico de Formantes Vocais", "Tratamento Algorítmico de Ruído e Eco", "Verificação Física de Pixels Térmicos de Vídeo"],
      curiosities: [
        "A espectrografia de voz transforma as palavras ditas em um mapa visual bidimensional tão único quanto uma impressão digital humana.",
        "Alterações sutis no ruído elétrico de fundo da rede (ENF) de gravação de áudio conseguem apontar em que hora e data exata o registro se deu."
      ],
      explanation: "Sua audição e olhar ultra refinados guiarão investigações em escutas legais autorizadas, ajudando a garantir a fidedignidade material de fotos de vigilância e gravações acústicas criminais."
    },
    reproducao_simulada: {
      id: "reproducao_simulada",
      title: "Reprodução Simulada",
      profile: "Modelador Físico de Dynamics, Arquiteto da Reconstituição Forense.",
      description: "Você adora correlacionar múltiplos relatos, posições corporais e dados fáticos para entender de que forma temporal e mecânica todo o evento do crime ocorreu nos mínimos detalhes físicos.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      skills: ["Reconstrução Virtual 3D de Ambientes", "Exame Comparativo de Compatibilidade Cinemática", "Mapeamento Métrico de Disparos de Campo"],
      curiosities: [
        "Simulações espaciais modernas em realidade virtual do crime ajudam jurados no tribunal a visualizarem o fato de múltiplos ângulos espaciais.",
        "Em reconstituições reais nas ruas do Estado, isolam-se bairros inteiros e medem-se a atenuância de barulho fático noturno de tiros."
      ],
      explanation: "Você se tornará o maestro científico que une laudos individuais soltos de DNA, necropsias e balísticas em um panorama dinâmico unificado, esclarecendo de vez impasses periciais."
    },
    medicina: {
      id: "medicina",
      title: "Medicina Legal / Patologia",
      profile: "Tanatologista, Investigador da Anatomia e Traumatologia Forense.",
      description: "Seu pilar fundamental reside em desvendar as causas mortis e reconstruir o corpo. Interessa-se pelo entendimento fisiológico e biológico de marcas traumáticas, lesões em tecidos moles e exames de estruturas esqueletizadas identificando perfis médicos.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      skills: ["Patologia Forense Geral", "Antropologia Esquelética", "Cronotanatognose de Rigor e Digestão"],
      curiosities: [
        "Os dentes são a parte mais dura do corpo e sustentam marcas de idade e DNA mesmo sob temperaturas de incêndio extremo.",
        "A entomologia estuda quais famílias de moscas colonizam o cadáver para cravar as horas exatas de sua morte."
      ],
      explanation: "Você se dedica à mais humana e profunda das perícias, ouvindo o que os tecidos e ossadas dizem para garantir a proteção física da população e a elucidação definitiva de fatalidades."
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
      author: "Laboratório de Genética LACiF UFF",
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
      description: "Membros da LACiF UFF isolando área externa com fita zebrada amarela para análise de trajetórias de pegadas e cartuchos."
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
      question: "O que é a LACiF UFF?",
      answer: "A LACiF UFF é a Liga Acadêmica de Ciências Forenses da Universidade Federal Fluminense. É uma associação científica sem fins lucrativos, gerida por estudantes sob a supervisão de professores, com foco no estudo técnico, acadêmico e prático de perícias criminais e balísticas."
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
      question: "A LACiF UFF possui convênios com corporações policiais?",
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
    isOpen: true,
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
  academicModules: [
    {
      id: "mod1",
      tag: "Módulo I",
      title: "Aulas & Práticas Acadêmicas",
      description: "Palestras teóricas instrutivas e oficinas semanais focadas em protocolos de vestígios criminais. Nossos ligantes desenvolvem embasamento jurídico e noções profundas de metodologias científicas de toxicologia, química e antropologia legal nos laboratórios da UFF.",
      skills: ["Doutrina Legal", "Oficinas Teóricas"]
    },
    {
      id: "mod2",
      tag: "Módulo II",
      title: "Simulações de Cenas Reais",
      description: "Treinamentos práticos de preservação de local de infração criminal, isolamentos táticos, busca geométrica de projéteis e vestígios biológicos, revelações de digitais por cianoacrilato em laboratório e confecção metodológica de laudos oficiais.",
      skills: ["Cadeia de Custódia", "Coleta de Vestígios"]
    },
    {
      id: "mod3",
      tag: "Módulo III",
      title: "Integração Multidisciplinar",
      description: "Sinergia real entre cursos de Farmácia, Biomedicina, Química, Computação e Direito. Capacitamos ligantes a analisar uma mesma evidência sob múltiplos prismas de saberes, unificando a ciência de laboratório ao rito processual penal brasileiro.",
      skills: ["Diálogo de Áreas", "Estudo Integrado"]
    }
  ],
  academicPillars: [
    {
      id: "pil1",
      title: "Ensino",
      description: "Aulas, cursos livres de criminologia, palestras com peritos federais oficiais, workshops práticos e capacitações frequentes para os membros ligantes."
    },
    {
      id: "pil2",
      title: "Pesquisa",
      description: "Projetos científicos embasados em dados, produção acadêmica de laudos simulados, teses revisórias e acompanhamento de inovações tecnológicas globais de laboratório."
    }
  ],
  escapeRoomConfig: {
    introText: "Durante uma visita ao Laboratório Central de Ciências Forenses da LACIF UFF, o sistema de segurança eletrônica de biossegurança entrou em alerta crítico e bloqueou todas as saídas integradas. Você ficou preso nas instalações e a única forma de obter as chaves de liberação é usar seu conhecimento em perícia e investigação criminal para resolver os enigmas deixados nas mesas de análise biométrica e técnica.",
    pointsPerCorrect: 200,
    pointsPerIncorrect: -50,
    pointsPerRoom: 500,
    pointsPerGame: 2000,
    rooms: [
      {
        id: "room-dna",
        name: "DNA Forense",
        theme: "Laboratório Genético",
        challengeTitle: "Cadeia Molecular",
        challengeDesc: "Um vestígio de sangue foi coletado na maçaneta da porta traseira do laboratório de contenção molecular. Analise o perfil de eletroforese de fragmentos de restrição (marcadores STR) da amostra e compare o alinhamento com o perfil de DNA dos suspeitos sob custódia.",
        question: "Qual suspeito possui o perfil genético idêntico à amostra biológica colhida na cena?",
        options: [
          "Suspeito A: Amostra com STR de 4 e 7 alelos curtos (loci CS1PO)",
          "Suspeito B: Correspondência homotípica total de bandas no gel",
          "Suspeito C: Perfil com deleção alélica estrutural incompatível",
          "Suspeito D: Fração incompatível na banda de peso molecular superior"
        ],
        correctAnswerIndex: 1,
        explanation: "O Suspeito B apresenta exata sobreposição em todas as bandas de alelos moleculares analisados no gel de fluorescência ultravioleta.",
        optionExplanations: [
          "Incorreto. O Suspeito A apresenta divergências críticas na frequência alélica dos locos CS1PO, indicando uma origem biológica distinta daquela colhida na cena.",
          "Correto! O perfil genético STR do Suspeito B corresponde integralmente em todas as bandas com o DNA da amostra por eletroforese em gel.",
          "Incorreto. O Suspeito C exibe falhas técnicas e deleções que anulam a possibilidade de correspondência genotípica com o sangue da porta.",
          "Incorreto. O Suspeito D possui bandas divergentes nos locos de peso molecular superior, descartando qualquer compatibilidade biológica."
        ],
        curiosity: "O DNA forense foi usado pela primeira vez em 1986 na Inglaterra por Sir Alec Jeffreys, permitindo inocentar um rapaz injustamente acusado e capturar o real culpado."
      },
      {
        id: "room-papilo",
        name: "Papiloscopia",
        theme: "Laboratório de Impressões Digitais",
        challengeTitle: "Busca de Minúcias",
        challengeDesc: "Uma impressão digital parcial latente foi revelada usando vaporização química de cianoacrilato no frasco coletor. Mapeie as cristas papilares da cena e faça a triagem dactiloscópica.",
        question: "Qual dos suspeitos apresenta correspondência perfeita de pelo menos 12 pontos característicos?",
        options: [
          "Suspeito A: Configuração de dactilograma com 14 pontos de minúcias coincidentes",
          "Suspeito B: Padrão de arco simples sem delta ou pontos nucleares correspondentes",
          "Suspeito C: Relevo com cicatriz profunda transversal ausente no objeto da cena",
          "Suspeito D: Presilha com núcleo de vetor inverso sem pontos homólogos"
        ],
        correctAnswerIndex: 0,
        explanation: "A impressão do Suspeito A exibe perfeita paridade de minúcias coincidentes incluindo a bifurcação central e delta lateral de orientação.",
        optionExplanations: [
          "Correto! O Suspeito A possui perfeita concordância em 14 minúcias (bifurcações, ilhas e terminações de crista) cumprindo a exigência legal dactiloscópica de identificação.",
          "Incorreto. A ausência de delta no arco do Suspeito B diverge totalmente da estrutura em presilha encontrada no fragmento examinado.",
          "Incorreto. Cicatrizes alteram permanentemente o dactilograma, tornando a amostra do Suspeito C incompatível com o relevo intacto do vestígio.",
          "Incorreto. A inclinação invertida do núcleo do Suspeito D desqualifica qualquer correlação matemática direta no alinhamento de pontos característicos."
        ],
        curiosity: "As impressões digitais se desenvolvem no terceiro mês de gestação intrauterina e são absolutamente únicas para cada indivíduo, inclusive em gêmeos idênticos."
      },
      {
        id: "room-balistica",
        name: "Balística Forense",
        theme: "Laboratório de Armas e Munições",
        challengeTitle: "Raiamento Microscópico",
        challengeDesc: "Um projétil de arma de fogo foi extraído da parede do laboratório. Sob o microscópio de comparação balística, analise as marcações secundárias e o sentido do raiamento.",
        question: "Pelas características geométricas (orientação levógira e 6 estrias regulares), qual arma operada efetuou o disparo?",
        options: [
          "Pistola semiautomática calibre .380 do Suspeito B",
          "Revólver calibre .38 Special com percussor de agulha móvel",
          "Espingarda de cano liso Gauge 12 sem ranhuras de indução",
          "Carabina de repetição por ferrolho de raiamento dextrógiro"
        ],
        correctAnswerIndex: 0,
        explanation: "A pistola .380 do suspeito B possui alma raiada levógira que imprime estriações idênticas no projétil de chumbo examinado.",
        optionExplanations: [
          "Correto! O cano raiado levógiro (à esquerda) da pistola do Suspeito B gera ranhuras com o mesmo ângulo de passo e número de estrias.",
          "Incorreto. O revólver .38 Special possui raiamento dextrógiro (à direita) com ranhura de profundidade distinta e passo descontínuo.",
          "Incorreto. Canos de espingarda Gauge 12 são lisos; não geram estrias longitudinais de indução de rotação nos projéteis.",
          "Incorreto. O raiamento dextrógiro (à direita) inclina as estrias no sentido oposto às marcas encontradas no projétil examinado."
        ],
        curiosity: "Não existem duas armas de fogo no mundo que produzam as exatas mesmas ranhuras e marcas em um projétil disparado, agindo como um código pericial único."
      },
      {
        id: "room-quimica",
        name: "Química Forense",
        theme: "Laboratório Químico",
        challengeTitle: "Cromatografia e Reação",
        challengeDesc: "Uma substância cristalina suspeita foi colhida e submetida a teste colorimétrico preliminar usando reagentes por via úmida. Observe as mudanças de coloração.",
        question: "De acordo com a viragem de cor em tempo real para azul cobalto e pH alcalino fraco (6.5), qual o diagnóstico químico?",
        options: [
          "Cloridrato de Cocaína (Sal Alcaloide)",
          "Heroína de alta pureza molecular",
          "Cafeína desidratada inerte",
          "Açúcar de confeitaria de uso analítico"
        ],
        correctAnswerIndex: 0,
        explanation: "O Reagente de Scott identifica cloridrato de cocaína através da quelação com íons cobalto resultando em coloração azul cobalto.",
        optionExplanations: [
          "Correto! O tiocianato de cobalto (reagente de Scott) reage especificamente formando um sal complexo azul cobalto insolúvel.",
          "Incorreto. A heroína reage produzindo uma coloração púrpura escura com o reagente de Marquis, e não azul sob Scott.",
          "Incorreto. A cafeína é um adulterante comum mas não promove a viragem de cor azul precipitada neste ensaio.",
          "Incorreto. Carboidratos simples de açúcar não reagem com o agente cobaltoso e diluem-se sem precipitado azul."
        ],
        curiosity: "A química forense é capaz de desvendar fraudes, envenenamentos por arsênio e analisar resíduos invisíveis de pólvora (GSR) nas mãos de atiradores."
      },
      {
        id: "room-document",
        name: "Documentoscopia",
        theme: "Laboratório de Documentoscopia",
        challengeTitle: "Laudo Grafotécnico",
        challengeDesc: "A credencial restrita apreendida foi submetida a exames no comparador espectral de vídeo. Analise os traços da assinatura e o alinhamento das fontes sob diferentes espectros.",
        question: "Qual o diagnóstico pericial sobre a veracidade do crachá do suspeito?",
        options: [
          "Documento Legítimo: Apenas desgastado por uso mecânico diário",
          "Documento Fraudulento: Presença de decalque subjacente e papel inerte reativo ao espectro UV"
        ],
        correctAnswerIndex: 1,
        explanation: "O decalque caracterizado por impermanência de velocidade e falta de fluorescência de segurança comprova falsidade material.",
        optionExplanations: [
          "Incorreto. O desgaste do crachá não justifica o decalque detectado sob a assinatura nem o comportamento inerte do papel sob luz UV.",
          "Correto! A análise espectróptica detectou paradas bruscas e marcas de grafite indicando decalque sob a assinatura, além de papel inerte reativo ao espectro UV."
        ],
        curiosity: "A documentoscopia forense estuda moedas, cédulas de Real, selos cartorários e usa luzes espectrais com filtros infravermelhos para ler textos rasurados."
      },
      {
        id: "room-entomologia",
        name: "Entomologia Forense",
        theme: "Laboratório de Insetos",
        challengeTitle: "Estimativa de Cronotanatognose",
        challengeDesc: "Artrópodes e larvas de díptero (mosca) foram recolhidos nos resíduos orgânicos do laboratório. Faça o estudo do estágio de evolução sob temperatura estável de 24°C.",
        question: "Considerando a presença de pupas de Chrysomya e larvas maduras de terceiro instar migratório, qual o intervalo temporal estimado?",
        options: [
          "Intervalo de 24 a 36 horas (Predomínio de ovos recém-postos e larvas de primeiro instar)",
          "Intervalo de 5 a 6 dias (Desenvolvimento de pupas e larvas no término do terceiro estágio)",
          "Intervalo de 3 a 4 semanas (Colonização total de coleópteros saprófagos e restos áridos)"
        ],
        correctAnswerIndex: 1,
        explanation: "Larvas de terceiro estágio maduro e pupas de califorídeos indicam colonização estabelecida há cerca de 5 a 6 dias naquelas condições climatológicas.",
        optionExplanations: [
          "Incorreto. Em apenas 24 a 36 horas não haveria tempo biológico para eclosão de ovos, alimentação laboriosa de instars e pupação.",
          "Correto! O tempo biológico para dípteros colonizarem, passarem pelos instars 1, 2 e 3 e começarem a pupação sob 24°C é de 5 a 6 dias.",
          "Incorreto. Com 3 a 4 semanas, os tecidos moles estariam consumidos com predomínio de besouros necrófagos do ciclo tardio por restos secos."
        ],
        curiosity: "A entomologia forense calcula com precisão matemática o termo térmico acumulado (ADD) considerando a meteorologia local registrada para fixar o momento exato do óbito."
      },
      {
        id: "room-toxicologia",
        name: "Toxicologia Forense",
        theme: "Laboratório de Espectrometria",
        challengeTitle: "Pesquisa de Veneno",
        challengeDesc: "A análise de frações de fluidos de um dos monitores indicou depressão drástica da respiração interna celular. Avalie a fragmentação iônica resultante sob ionização eletrônica no espectrômetro.",
        question: "De acordo com o espectro de massas clássico e o pico característico, qual o agente químico responsável?",
        options: [
          "Metal Pesado (Picos correspondentes ao Arsênio)",
          "Metabólitos farmacológicos de anti-inflamatório em dose terapêutica usual",
          "Concentração simples de etanol moderado sem interferentes metálicos"
        ],
        correctAnswerIndex: 0,
        explanation: "O pico de massa/carga no espectro confirma a presença de arsênio, inibidor enzimático celular letal causador do óbito.",
        optionExplanations: [
          "Correto! O espectro identificou com precisão a assinatura molecular característica e massa atômica de metal pesado tóxico (Arsênio).",
          "Incorreto. Anti-inflamatórios terapêuticos comuns não exibiriam esse pico nem induziriam ao colapso celular agudo.",
          "Incorreto. O álcool de uso doméstico comum apresenta quebras de peso molecular leve, sem compatibilidade com este espectro de fragmentação pesada."
        ],
        curiosity: "O arsênio compete com o fosfato inorgânico no ciclo do ATP, desativando a produção celular de energia química e acumulando-se nas unhas por afinidade de queratina."
      },
      {
        id: "room-antropologia",
        name: "Antropologia Forense",
        theme: "Morgue / Antropologia Física",
        challengeTitle: "Identidade Esquelética",
        challengeDesc: "Vestígios esqueléticos foram recolhidos do encanamento central de descarte metálico. Examine o ângulo do osso coxal e o grau de fechamento de junções epifisárias e cranianas.",
        question: "Considerando uma pelve estreita de ângulo subpúbico menor de 90° e obliteração fibrosa das suturas cranianas sagitais, qual a estimativa do perfil biótico?",
        options: [
          "Indivíduo do sexo masculino com estimativa de idade adulta avançada",
          "Indivíduo do sexo feminino com bacia larga e dentes decíduos infantis",
          "Indivíduo jovem impúbere com ausência de fusão de metáfises distais"
        ],
        correctAnswerIndex: 0,
        explanation: "O ângulo subpúbico estreito (menor de 90°) define o sexo biológico masculino, enquanto a fusão sutural craniana confirma idade madura.",
        optionExplanations: [
          "Correto! A bacia tipicamente estreita de formato androide (menor de 90 graus) combinada à completa calcificação sutural define esqueleto de homem adulto com idade avançada.",
          "Incorreto. A pelve de esqueleto feminino possui abertura larga de ângulo obtuso (maior de 100°) e dentes infantis contradizem suturas fechadas.",
          "Incorreto. A consolidação óssea das suturas cranianas e fechos epifisários é incompatível com indivíduos jovens em crescimento."
        ],
        curiosity: "As suturas do crânio fundem-se em um padrão cronológico bastante regular ao longo dos anos, agindo como um cronômetro biológico pós-vida."
      },
      {
        id: "room-informatica",
        name: "Informatica Forense",
        theme: "Laboratório Cibernético",
        challengeTitle: "Recuperação de Metadados",
        challengeDesc: "Um servidor contendo arquivos sigilosos de relatórios periciais foi invadido. Analise a assinatura criptográfica e os metadados EXIF de uma imagem suspeita de ter sido adulterada.",
        question: "Qual o indício pericial eletrônico irrefutável de adulteração do arquivo de imagem?",
        options: [
          "Alteração do valor Hash original (MD5/SHA-256) e quebra de metadados de geolocalização EXIF",
          "Apenas a alteração simples do nome de exibição do arquivo no sistema operacional",
          "O arquivo manter o mesmo código de hash criptográfico e data de modificação íntegros"
        ],
        correctAnswerIndex: 0,
        explanation: "Uma imagem adulterada muda de valor hash de integridade obrigatoriamente e perde ou altera seus metadados de aquisição.",
        optionExplanations: [
          "Correto! A integridade digital é aferida pelo valor HASH. Qualquer alteração microscópica altera o MD5/SHA-256 e os metadados mostram a adulteração.",
          "Incorreto. Renomear o arquivo é uma alteração simples de sistema de arquivos e não impacta a assinatura criptográfica e bits internos do conteúdo.",
          "Incorreto. Se o hash e tamanho em bytes mantiverem-se estáveis, o arquivo é certificado como íntegro e não adulterado."
        ],
        curiosity: "A computação forense usa funções unidirecionais de hash como SHA-256 para atestar a autenticidade jurídica e garantir a integridade de evidências binárias."
      },
      {
        id: "room-medicina",
        name: "Medicina Legal",
        theme: "Sala de Necropsia",
        challengeTitle: "Fixação de Livores",
        challengeDesc: "Durante o exame de um corpo encontrado em decúbito dorsal (posição de costas), o perito médico legista identificou manchas de hipóstase fortemente fixadas na face ventral.",
        question: "O que essa desconformidade posicional de fixação de livores cadavéricos prova?",
        options: [
          "Que o óbito ocorreu em menos de duas horas e o coração ainda bombeava fluidos",
          "Que o corpo foi fisicamente movimentado ou virado de barriga para cima horas após a morte",
          "Uma típica reação biológica decorrente de óbito por infarto agudo do miocárdio"
        ],
        correctAnswerIndex: 1,
        explanation: "Os livores cadavéricos de hipóstase se fixam permanentemente de 8 a 12 horas após a morte. Se estão do lado oposto à gravidade, o corpo foi rotacionado.",
        optionExplanations: [
          "Incorreto. Nos primeiros minutos os livores são completamente móveis e mutáveis, não estariam fixados na face ventral.",
          "Correto! Os livores depositam-se gravitacionalmente. Se estão na barriga mas o corpo foi achado de costas, isso indica manipulação do corpo após 8-12h da morte.",
          "Incorreto. Livores são puramente fenômenos físicos circulatórios passivos gravíticos comuns a todas as causas mortis mecânicas."
        ],
        curiosity: "O fenômeno do livor mortis e a rigidez cadavérica (rigor mortis) auxiliam no estabelecimento preciso da cronotanatognose (tempo aproximado de morte)."
      },
      {
        id: "room-hematologia",
        name: "Padrão de Respingos",
        theme: "Criminalística de Campo",
        challengeTitle: "Hematologia Reconstrutiva",
        challengeDesc: "Padrões de respingos de sangue foram encontrados no piso do laboratório. O perito precisa aferir a elipse de impacto e sua direção estática temporal.",
        question: "Gotas de sangue longas e elípticas apresentando caudas de projeção voltadas para a direita indicam qual dinâmica?",
        options: [
          "Impacto em ângulo de 95 graus em velocidade nula vertical pura",
          "Impacto de sangue em ângulo agudo com projeção oblíqua da esquerda para a direita",
          "Gotejamento passivo estático sem arraste aerodinâmico visível"
        ],
        correctAnswerIndex: 1,
        explanation: "O formato da elipse indica impacto angular e a cauda direciona a trajetória que o sangue fazia antes do contato.",
        optionExplanations: [
          "Incorreto. Ângulos de 90 graus formam respingos circulares perfeitos sem alongamento ou satélites de projeção.",
          "Correto! O arraste alonga a gota e ejeta uma cauda ou satélite na mesma direção vetorial que aponta para o destino da partícula.",
          "Incorreto. O gotejamento vertical gera gotas redondas fáceis de analisar de acordo com a altura de queda livre."
        ],
        curiosity: "A análise fisionômica das manchas de sangue (BPA) utiliza relações trigonométricas de arcoseno para rastrear a origem tridimensional dos impactos na cena."
      },
      {
        id: "room-odontologia",
        name: "Odontologia Forense",
        theme: "Identificação Humana",
        challengeTitle: "Marcas de Mordida",
        challengeDesc: "Um alimento com uma mordida profunda do autor do crime foi recolhido na pia do laboratório. O perito efetuará análise comparativa da arcada dentária.",
        question: "Qual característica odontológica é capaz de individualizar a marca de mordida e apontar seu autor?",
        options: [
          "Espaçamento interdentário, dentes desalinhados, anomalias e DNA das células de saliva",
          "Somente o formato geral do arco maxilar que é comum a toda a população humana",
          "A contagem simples de dentes molares que não participam da mordida frontal"
        ],
        correctAnswerIndex: 0,
        explanation: "Anomalias de posição de dentes (rotações, dentes encavalados, desgastes) criam padrões exclusivos junto ao material genético salivar.",
        optionExplanations: [
          "Correto! Giroversões, diastemas e ausências criam uma 'impressão digital dentária' única, selada pelo perfil genético da saliva deixada no local.",
          "Incorreto. O formato plano de mandíbula é generalista e não serve para individualização de suspeitos em escala microscópica.",
          "Incorreto. Os dentes molares ficam no fundo do arco e raramente causam a gravação das marcas frontais em alimentos."
        ],
        curiosity: "A arcada dentária e o esmalte dos dentes resistem extraordinariamente a altas temperaturas e decomposição, servindo como poderoso recurso bioidentificador."
      }
    ],
    cases: [
      {
        id: "caso-lacif-01",
        title: "Veredito Criminal Final",
        story: "Com base em todas as provas técnicas levantadas na sua investigação:\n\n1. O DNA no botão do biométrico traseiro corresponde ao Suspeito B.\n2. O raiamento e estrias do projétil na parede coincidem com o calibre da pistola apreendida com o Suspeito B.\n3. O crachá falso com decalque gráfico de assinaturas era utilizado pelo Suspeito B.\n4. O Suspeito A apenas manuseou o cofre após o evento principal, deixando impressões de contato no topo.\n\nAssocie os vestígios, a autoria material dos laudos e emita seu veredito técnico oficial apontando o real autor que violou o laboratório central:",
        finalCulpritIndex: 1,
        culpritOptions: [
          "Suspeito A - Monitor de Biologia Forense",
          "Suspeito B - Monitor de Química Avançada",
          "Suspeito C - Estudante de Farmácia Visitante",
          "Suspeito D - Técnico Terceirizado de TI"
        ]
      }
    ],
    achievements: [
      { id: "ach-1", title: "Primeira Investigação", description: "Completou a primeira sala do laboratório.", icon: "Award" },
      { id: "ach-2", title: "Analista Forense", description: "Completou 3 salas sem esgotar o tempo.", icon: "Lock" },
      { id: "ach-3", title: "Especialista Criminal", description: "Concluiu o Escape Room com mais de 5000 pontos.", icon: "Zap" },
      { id: "ach-4", title: "Mestre da Investigação", description: "Escapou do laboratório sem cometer um único erro.", icon: "Trophy" }
    ]
  },
  escapeRoomRankings: [
    { name: 'Dr. Leonardo (Perito Geral)', score: 9500, time: '04:12', date: '30/05/2026', classification: 'Mestre das Ciências Forenses' },
    { name: 'Ana Bianca (LACiF UFF)', score: 8800, time: '05:45', date: '30/05/2026', classification: 'Perito Criminal' },
    { name: 'Maryana Oliveira', score: 7200, time: '07:18', date: '29/05/2026', classification: 'Perito Criminal' },
    { name: 'Marco Oliveira', score: 6500, time: '08:30', date: '29/05/2026', classification: 'Perito Júnior' }
  ],
  quizRankings: [
    { name: 'Dr. Leonardo (Perito Geral)', score: 10, totalQuestions: 10, date: '30/05/2026', classification: 'Perito Geral Sênior' },
    { name: 'Ana Bianca (LACiF UFF)', score: 9, totalQuestions: 10, date: '30/05/2026', classification: 'Perito Adjunto' },
    { name: 'Maryana Oliveira', score: 9, totalQuestions: 10, date: '29/05/2026', classification: 'Perito Adjunto' },
    { name: 'Alexandre Santos', score: 8, totalQuestions: 10, date: '28/05/2026', classification: 'Perito Assistente' }
  ]
};
