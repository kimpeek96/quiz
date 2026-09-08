const suppliedQuestions = [
  {
    "category": "Wiedza ogólna",
    "q": "Ile minut ma doba?",
    "a": [
      "1240",
      "1440",
      "1640",
      "1840"
    ],
    "c": 1,
    "audio": "pytania/11-wiedza-ogolna1-consolidated.mp3"
  },
  {
    "category": "Wiedza ogólna",
    "q": "Jaki pierwiastek chemiczny ma symbol Au?",
    "a": [
      "Srebro",
      "Miedź",
      "Złoto",
      "Aluminium"
    ],
    "c": 2,
    "audio": "pytania/12-wiedza-ogolna2-consolidated.mp3"
  },
  {
    "category": "Wiedza ogólna",
    "q": "Ile boków ma dwunastokąt?",
    "a": [
      "10",
      "11",
      "12",
      "14"
    ],
    "c": 2,
    "audio": "pytania/13-wiedza-ogolna3-consolidated.mp3"
  },
  {
    "category": "Wiedza ogólna",
    "q": "Który organ ludzkiego ciała pompuje krew?",
    "a": [
      "Wątroba",
      "Serce",
      "Płuco",
      "Nerka"
    ],
    "c": 1,
    "audio": "pytania/14-wiedza-ogolna4-consolidated.mp3"
  },
  {
    "category": "Wiedza ogólna",
    "q": "Ile wynosi 15 × 6?",
    "a": [
      "80",
      "85",
      "90",
      "95"
    ],
    "c": 2,
    "audio": "pytania/15-wiedza-ogolna5-consolidated.mp3"
  },
  {
    "category": "Historia",
    "q": "W którym roku rozpoczęła się II wojna światowa?",
    "a": [
      "1918",
      "1939",
      "1941",
      "1945"
    ],
    "c": 1,
    "audio": "pytania/46-historia1-consolidated.mp3"
  },
  {
    "category": "Historia",
    "q": "Kto był pierwszym królem Polski?",
    "a": [
      "Mieszko I",
      "Bolesław Chrobry",
      "Kazimierz Wielki",
      "Władysław Jagiełło"
    ],
    "c": 1,
    "audio": "pytania/47-historia2-consolidated.mp3"
  },
  {
    "category": "Historia",
    "q": "W którym roku odbył się chrzest Polski?",
    "a": [
      "966",
      "1000",
      "1025",
      "1410"
    ],
    "c": 0,
    "audio": "pytania/48-historia3-consolidated.mp3"
  },
  {
    "category": "Historia",
    "q": "Który polski król nosił przydomek „Wielki”?",
    "a": [
      "Kazimierz III",
      "Zygmunt III",
      "Władysław II",
      "Bolesław III"
    ],
    "c": 0,
    "audio": "pytania/49-historia4-consolidated.mp3"
  },
  {
    "category": "Historia",
    "q": "W którym roku upadł mur berliński?",
    "a": [
      "1979",
      "1981",
      "1989",
      "1991"
    ],
    "c": 2,
    "audio": "pytania/50-historia5-consolidated.mp3"
  },
  {
    "category": "Geografia",
    "q": "Jaka jest stolica Australii?",
    "a": [
      "Sydney",
      "Melbourne",
      "Canberra",
      "Perth"
    ],
    "c": 2,
    "audio": "pytania/36-geografia1-consolidated.mp3"
  },
  {
    "category": "Geografia",
    "q": "Który ocean jest największy?",
    "a": [
      "Atlantycki",
      "Indyjski",
      "Spokojny",
      "Arktyczny"
    ],
    "c": 2,
    "audio": "pytania/37-geografia2-consolidated.mp3"
  },
  {
    "category": "Geografia",
    "q": "Jaka jest stolica Kanady?",
    "a": [
      "Toronto",
      "Vancouver",
      "Montreal",
      "Ottawa"
    ],
    "c": 3,
    "audio": "pytania/38-geografia3-consolidated.mp3"
  },
  {
    "category": "Geografia",
    "q": "Na którym kontynencie leży większość terytorium Egiptu?",
    "a": [
      "Europa",
      "Afryka",
      "Azja",
      "Ameryka Południowa"
    ],
    "c": 1,
    "audio": "pytania/39-geografia4-consolidated.mp3"
  },
  {
    "category": "Geografia",
    "q": "Przez którą stolicę przepływa Tamiza?",
    "a": [
      "Paryż",
      "Berlin",
      "Londyn",
      "Rzym"
    ],
    "c": 2,
    "audio": "pytania/40-geografia5-consolidated.mp3"
  },
  {
    "category": "Filmy i seriale",
    "q": "Jak nazywa się szkoła Harry'ego Pottera?",
    "a": [
      "Narnia",
      "Hogwart",
      "Winterfell",
      "Nevermore"
    ],
    "c": 1,
    "audio": "pytania/31-filmyiseriale1-consolidated.mp3"
  },
  {
    "category": "Filmy i seriale",
    "q": "Kto zagrał Jacka w filmie „Titanic”?",
    "a": [
      "Brad Pitt",
      "Matt Damon",
      "Leonardo DiCaprio",
      "Tom Cruise"
    ],
    "c": 2,
    "audio": "pytania/32-filmyiseriale2-consolidated.mp3"
  },
  {
    "category": "Filmy i seriale",
    "q": "Jak nazywa się zielony ogr z filmu DreamWorks?",
    "a": [
      "Shrek",
      "Sid",
      "Sulley",
      "Olaf"
    ],
    "c": 0,
    "audio": "pytania/33-filmyiseriale3-consolidated.mp3"
  },
  {
    "category": "Filmy i seriale",
    "q": "Kim jest Walter White na początku serialu „Breaking Bad”?",
    "a": [
      "Lekarzem",
      "Nauczycielem chemii",
      "Policjantem",
      "Prawnikiem"
    ],
    "c": 1,
    "audio": "pytania/34-filmyiseriale4-consolidated.mp3"
  },
  {
    "category": "Filmy i seriale",
    "q": "Jak nazywa się kowboj z „Toy Story”?",
    "a": [
      "Buzz",
      "Woody",
      "Andy",
      "Rex"
    ],
    "c": 1,
    "audio": "pytania/35-filmyiseriale5-consolidated.mp3"
  },
  {
    "category": "Muzyka",
    "q": "Kto wykonywał utwór „Thriller”?",
    "a": [
      "Prince",
      "Michael Jackson",
      "George Michael",
      "Freddie Mercury"
    ],
    "c": 1,
    "audio": "pytania/76-Muzyka1-consolidated.mp3"
  },
  {
    "category": "Muzyka",
    "q": "Freddie Mercury był wokalistą którego zespołu?",
    "a": [
      "Queen",
      "ABBA",
      "Nirvana",
      "U2"
    ],
    "c": 0,
    "audio": "pytania/77-Muzyka2-consolidated.mp3"
  },
  {
    "category": "Muzyka",
    "q": "Ile strun ma standardowa gitara?",
    "a": [
      "4",
      "5",
      "6",
      "8"
    ],
    "c": 2,
    "audio": "pytania/78-Muzyka3-consolidated.mp3"
  },
  {
    "category": "Muzyka",
    "q": "Który instrument ma standardowo 88 klawiszy?",
    "a": [
      "Fortepian",
      "Skrzypce",
      "Trąbka",
      "Harfa"
    ],
    "c": 0,
    "audio": "pytania/79-Muzyka4-consolidated.mp3"
  },
  {
    "category": "Muzyka",
    "q": "Który zespół nagrał „Bohemian Rhapsody”?",
    "a": [
      "The Beatles",
      "Queen",
      "Metallica",
      "Pink Floyd"
    ],
    "c": 1,
    "audio": "pytania/80-Muzyka5-consolidated.mp3"
  },
  {
    "category": "Jedzenie i kuchnia",
    "q": "Z jakiego kraju pochodzi pizza w jej współczesnej formie?",
    "a": [
      "Francja",
      "Włochy",
      "Grecja",
      "Hiszpania"
    ],
    "c": 1,
    "audio": "pytania/61-Kuchnia1-consolidated.mp3"
  },
  {
    "category": "Jedzenie i kuchnia",
    "q": "Z czego tradycyjnie robi się hummus?",
    "a": [
      "Z soczewicy",
      "Z ciecierzycy",
      "Z fasoli",
      "Z ziemniaków"
    ],
    "c": 1,
    "audio": "pytania/62-Kuchnia2-consolidated.mp3"
  },
  {
    "category": "Jedzenie i kuchnia",
    "q": "Guacamole przygotowuje się przede wszystkim z:",
    "a": [
      "Awokado",
      "Ogórka",
      "Cukinii",
      "Szpinaku"
    ],
    "c": 0,
    "audio": "pytania/63-Kuchnia3-consolidated.mp3"
  },
  {
    "category": "Jedzenie i kuchnia",
    "q": "Głównym składnikiem klasycznej bezy są:",
    "a": [
      "Żółtka",
      "Białka jaj",
      "Drożdże",
      "Mleko"
    ],
    "c": 1,
    "audio": "pytania/64-Kuchnia4-consolidated.mp3"
  },
  {
    "category": "Jedzenie i kuchnia",
    "q": "Sushi najbardziej kojarzone jest z kuchnią:",
    "a": [
      "Chińską",
      "Japońską",
      "Tajską",
      "Koreańską"
    ],
    "c": 1,
    "audio": "pytania/65-Kuchnia5-consolidated.mp3"
  },
  {
    "category": "Nauka i technologia",
    "q": "Jaki jest wzór chemiczny wody?",
    "a": [
      "CO₂",
      "H₂O",
      "O₂",
      "NaCl"
    ],
    "c": 1,
    "audio": "pytania/06-technologie1-consolidated.mp3"
  },
  {
    "category": "Nauka i technologia",
    "q": "Która planeta znajduje się najbliżej Słońca?",
    "a": [
      "Wenus",
      "Ziemia",
      "Merkury",
      "Mars"
    ],
    "c": 2,
    "audio": "pytania/07-technologie2-consolidated.mp3"
  },
  {
    "category": "Nauka i technologia",
    "q": "Co oznacza skrót CPU?",
    "a": [
      "Central Processing Unit",
      "Computer Power Utility",
      "Core Program User",
      "Central Power Upload"
    ],
    "c": 0,
    "audio": "pytania/08-technologie3-consolidated.mp3"
  },
  {
    "category": "Nauka i technologia",
    "q": "Jaka jednostka służy do pomiaru natężenia prądu?",
    "a": [
      "Wat",
      "Wolt",
      "Amper",
      "Om"
    ],
    "c": 2,
    "audio": "pytania/09-technologie4-consolidated.mp3"
  },
  {
    "category": "Nauka i technologia",
    "q": "Który język programowania stworzył Guido van Rossum?",
    "a": [
      "Java",
      "Python",
      "C++",
      "PHP"
    ],
    "c": 1,
    "audio": "pytania/10-technologie5-consolidated.mp3"
  },
  {
    "category": "Sport",
    "q": "Ilu zawodników jednej drużyny znajduje się na boisku na początku meczu piłki nożnej?",
    "a": [
      "9",
      "10",
      "11",
      "12"
    ],
    "c": 2,
    "audio": "sport1.mp3"
  },
  {
    "category": "Sport",
    "q": "Ile punktów wart jest rzut wolny w koszykówce?",
    "a": [
      "1",
      "2",
      "3",
      "4"
    ],
    "c": 0,
    "audio": "sport2.mp3"
  },
  {
    "category": "Sport",
    "q": "Wimbledon jest turniejem:",
    "a": [
      "Golfowym",
      "Tenisowym",
      "Piłkarskim",
      "Siatkarskim"
    ],
    "c": 1,
    "audio": "sport3.mp3"
  },
  {
    "category": "Sport",
    "q": "Jak nazywa się dystans około 42,195 km?",
    "a": [
      "Sprint",
      "Triathlon",
      "Maraton",
      "Półmaraton"
    ],
    "c": 2,
    "audio": "sport4.mp3"
  },
  {
    "category": "Sport",
    "q": "W której dyscyplinie używa się krążka?",
    "a": [
      "Rugby",
      "Hokej na lodzie",
      "Baseball",
      "Piłka ręczna"
    ],
    "c": 1,
    "audio": "sport5.mp3"
  },
  {
    "category": "Zwierzęta",
    "q": "Jakie jest największe żyjące zwierzę na Ziemi?",
    "a": [
      "Słoń afrykański",
      "Płetwal błękitny",
      "Rekin wielorybi",
      "Żyrafa"
    ],
    "c": 1,
    "audio": "pytania/16-zwierzeta1-consolidated.mp3"
  },
  {
    "category": "Zwierzęta",
    "q": "Ile nóg ma pająk?",
    "a": [
      "6",
      "8",
      "10",
      "12"
    ],
    "c": 1,
    "audio": "pytania/17-zwierzeta2-consolidated.mp3"
  },
  {
    "category": "Zwierzęta",
    "q": "Który ssak składa jaja?",
    "a": [
      "Delfin",
      "Dziobak",
      "Nietoperz",
      "Foka"
    ],
    "c": 1,
    "audio": "pytania/18-zwierzeta3-consolidated.mp3"
  },
  {
    "category": "Zwierzęta",
    "q": "Najszybszym zwierzęciem lądowym jest:",
    "a": [
      "Lew",
      "Gepard",
      "Antylopa",
      "Struś"
    ],
    "c": 1,
    "audio": "pytania/19-zwierzeta4-consolidated.mp3"
  },
  {
    "category": "Zwierzęta",
    "q": "Jak nazywa się młode konia?",
    "a": [
      "Cielę",
      "Źrebię",
      "Jagnię",
      "Prosię"
    ],
    "c": 1,
    "audio": "pytania/20-zwierzeta5-consolidated.mp3"
  },
  {
    "category": "Polska",
    "q": "Jaka jest najdłuższa rzeka w Polsce?",
    "a": [
      "Odra",
      "Wisła",
      "Warta",
      "Bug"
    ],
    "c": 1
  },
  {
    "category": "Polska",
    "q": "Jakie miasto jest stolicą województwa mazowieckiego?",
    "a": [
      "Radom",
      "Płock",
      "Warszawa",
      "Siedlce"
    ],
    "c": 2
  },
  {
    "category": "Polska",
    "q": "Nad jakim morzem leży Polska?",
    "a": [
      "Północnym",
      "Bałtyckim",
      "Czarnym",
      "Adriatyckim"
    ],
    "c": 1
  },
  {
    "category": "Polska",
    "q": "Jak nazywa się najwyższy szczyt Polski?",
    "a": [
      "Giewont",
      "Śnieżka",
      "Rysy",
      "Kasprowy Wierch"
    ],
    "c": 2
  },
  {
    "category": "Polska",
    "q": "Które miasto słynie z koziołków na ratuszu?",
    "a": [
      "Poznań",
      "Kraków",
      "Gdańsk",
      "Wrocław"
    ],
    "c": 0
  },
  {
    "category": "Świat",
    "q": "W którym kraju znajdują się piramidy w Gizie?",
    "a": [
      "Maroko",
      "Egipt",
      "Jordania",
      "Tunezja"
    ],
    "c": 1,
    "audio": "pytania/01-swiat1-consolidated.mp3"
  },
  {
    "category": "Świat",
    "q": "Statua Wolności znajduje się w:",
    "a": [
      "Waszyngtonie",
      "Nowym Jorku",
      "Bostonie",
      "Chicago"
    ],
    "c": 1,
    "audio": "pytania/02-swiat2-consolidated.mp3"
  },
  {
    "category": "Świat",
    "q": "Wieża Eiffla znajduje się w:",
    "a": [
      "Paryżu",
      "Brukseli",
      "Madrycie",
      "Mediolanie"
    ],
    "c": 0,
    "audio": "pytania/03-swiat3-consolidated.mp3"
  },
  {
    "category": "Świat",
    "q": "Który kraj ma charakterystyczny kształt „buta”?",
    "a": [
      "Portugalia",
      "Włochy",
      "Chorwacja",
      "Grecja"
    ],
    "c": 1,
    "audio": "pytania/04-swiat4-consolidated.mp3"
  },
  {
    "category": "Świat",
    "q": "Machu Picchu znajduje się w:",
    "a": [
      "Peru",
      "Meksyku",
      "Brazylii",
      "Chile"
    ],
    "c": 0,
    "audio": "pytania/05-swiat5-consolidated.mp3"
  },
  {
    "category": "Gry komputerowe",
    "q": "Jak nazywa się główny bohater serii „Wiedźmin”?",
    "a": [
      "Geralt",
      "Talion",
      "Arthur",
      "Ezio"
    ],
    "c": 0,
    "audio": "pytania/41-gry1-consolidated.mp3"
  },
  {
    "category": "Gry komputerowe",
    "q": "Creeper występuje w grze:",
    "a": [
      "Terraria",
      "Minecraft",
      "Fortnite",
      "Roblox"
    ],
    "c": 1,
    "audio": "pytania/42-gry2-consolidated.mp3"
  },
  {
    "category": "Gry komputerowe",
    "q": "Firma Rockstar Games stworzyła serię:",
    "a": [
      "The Sims",
      "Grand Theft Auto",
      "Fallout",
      "Assassin's Creed"
    ],
    "c": 1,
    "audio": "pytania/43-gry3-consolidated.mp3"
  },
  {
    "category": "Gry komputerowe",
    "q": "Kratos jest bohaterem serii:",
    "a": [
      "God of War",
      "Halo",
      "Diablo",
      "Far Cry"
    ],
    "c": 0,
    "audio": "pytania/44-gry4-consolidated.mp3"
  },
  {
    "category": "Gry komputerowe",
    "q": "W której grze występuje mapa Summoner's Rift?",
    "a": [
      "Dota 2",
      "League of Legends",
      "Counter-Strike 2",
      "Overwatch 2"
    ],
    "c": 1,
    "audio": "pytania/45-gry5-consolidated.mp3"
  },
  {
    "category": "Internet i memy",
    "q": "Co oznacza skrót „LOL”?",
    "a": [
      "Lots of Links",
      "Laughing Out Loud",
      "Level of Logic",
      "Login Online"
    ],
    "c": 1,
    "audio": "pytania/51-internet1-consolidated.mp3"
  },
  {
    "category": "Internet i memy",
    "q": "Jak potocznie nazywa się symbol „#” używany do oznaczania tematów w mediach społecznościowych?",
    "a": [
      "Hashtag",
      "Slash",
      "Asterisk",
      "Ampersand"
    ],
    "c": 0,
    "audio": "pytania/52-internet2-consolidated.mp3"
  },
  {
    "category": "Internet i memy",
    "q": "Co oznacza „DM” w mediach społecznościowych?",
    "a": [
      "Direct Message",
      "Digital Mode",
      "Data Memory",
      "Double Mention"
    ],
    "c": 0,
    "audio": "pytania/53-internet3-consolidated.mp3"
  },
  {
    "category": "Internet i memy",
    "q": "Co oznacza skrót „POV”?",
    "a": [
      "Point of View",
      "Part of Video",
      "Post on View",
      "Picture over Video"
    ],
    "c": 0,
    "audio": "pytania/54-internet4-consolidated.mp3"
  },
  {
    "category": "Internet i memy",
    "q": "„Rickrolling” zwykle prowadzi do utworu którego artysty?",
    "a": [
      "Ricka Astleya",
      "Eltona Johna",
      "Stinga",
      "Phila Collinsa"
    ],
    "c": 0,
    "audio": "pytania/55-internet5-consolidated.mp3"
  },
  {
    "category": "Gwiazdy i celebryci",
    "q": "Która aktorka zagrała Hermionę Granger?",
    "a": [
      "Emma Stone",
      "Emma Watson",
      "Anne Hathaway",
      "Keira Knightley"
    ],
    "c": 1,
    "audio": "pytania/21-celebryci1-consolidated.mp3"
  },
  {
    "category": "Gwiazdy i celebryci",
    "q": "Kto zagrał Iron Mana w MCU?",
    "a": [
      "Chris Evans",
      "Robert Downey Jr.",
      "Chris Hemsworth",
      "Mark Ruffalo"
    ],
    "c": 1,
    "audio": "pytania/22-celebryci2-consolidated.mp3"
  },
  {
    "category": "Gwiazdy i celebryci",
    "q": "Która piosenkarka wydała album „21”?",
    "a": [
      "Adele",
      "Rihanna",
      "Beyoncé",
      "Lady Gaga"
    ],
    "c": 0,
    "audio": "pytania/23-celebryci3-consolidated.mp3"
  },
  {
    "category": "Gwiazdy i celebryci",
    "q": "Kto zagrał główną rolę w filmie „Forrest Gump”?",
    "a": [
      "Tom Hanks",
      "Tom Cruise",
      "Brad Pitt",
      "Nicolas Cage"
    ],
    "c": 0,
    "audio": "pytania/24-celebryci4-consolidated.mp3"
  },
  {
    "category": "Gwiazdy i celebryci",
    "q": "Która artystka znana jest jako Lady Gaga?",
    "a": [
      "Stefani Germanotta",
      "Katy Hudson",
      "Robyn Fenty",
      "Alicia Moore"
    ],
    "c": 0,
    "audio": "pytania/25-celebryci5-consolidated.mp3"
  },
  {
    "category": "Kto to powiedział?",
    "q": "Komu tradycyjnie przypisuje się słowa „Wiem, że nic nie wiem”?",
    "a": [
      "Sokrates",
      "Platon",
      "Arystoteles",
      "Pitagoras"
    ],
    "c": 0,
    "audio": "pytania/56-kto to powiedzial1-consolidated.mp3"
  },
  {
    "category": "Kto to powiedział?",
    "q": "Kto wygłosił słynne przemówienie „I Have a Dream”?",
    "a": [
      "Nelson Mandela",
      "Martin Luther King Jr.",
      "Barack Obama",
      "John F. Kennedy"
    ],
    "c": 1,
    "audio": "pytania/57-kto to powiedzial2-consolidated.mp3"
  },
  {
    "category": "Kto to powiedział?",
    "q": "Kto wypowiedział „Veni, vidi, vici”?",
    "a": [
      "Juliusz Cezar",
      "Neron",
      "August",
      "Spartakus"
    ],
    "c": 0,
    "audio": "pytania/58-kto to powiedzial3-consolidated.mp3"
  },
  {
    "category": "Kto to powiedział?",
    "q": "Kto powiedział „Ich bin ein Berliner” w przemówieniu z 1963 roku?",
    "a": [
      "Ronald Reagan",
      "John F. Kennedy",
      "Richard Nixon",
      "Winston Churchill"
    ],
    "c": 1,
    "audio": "pytania/59-kto to powiedzial4-consolidated.mp3"
  },
  {
    "category": "Kto to powiedział?",
    "q": "Kto jest autorem słynnego „Myślę, więc jestem”?",
    "a": [
      "Kartezjusz",
      "Kant",
      "Nietzsche",
      "Freud"
    ],
    "c": 0,
    "audio": "pytania/60-kto to powiedzial5-consolidated.mp3"
  },
  {
    "category": "Prawda czy fałsz",
    "q": "Które stwierdzenie jest prawdziwe?",
    "a": [
      "Słońce jest planetą",
      "Wieloryby są rybami",
      "Ziemia krąży wokół Słońca",
      "Człowiek ma trzy płuca"
    ],
    "c": 2,
    "audio": "pytania/81-prawdafalsz1-consolidated.mp3"
  },
  {
    "category": "Prawda czy fałsz",
    "q": "Które stwierdzenie jest prawdziwe?",
    "a": [
      "Pająki są owadami",
      "Nietoperze są ssakami",
      "Pingwiny potrafią latać",
      "Rekiny są ssakami"
    ],
    "c": 1,
    "audio": "pytania/82-prawdafalsz2-consolidated.mp3"
  },
  {
    "category": "Prawda czy fałsz",
    "q": "Które stwierdzenie jest prawdziwe?",
    "a": [
      "Warszawa leży nad Odrą",
      "Kraków jest stolicą Polski",
      "Wisła uchodzi do Bałtyku",
      "Polska graniczy z Francją"
    ],
    "c": 2,
    "audio": "pytania/83-prawdafalsz3-consolidated.mp3"
  },
  {
    "category": "Prawda czy fałsz",
    "q": "Które stwierdzenie jest prawdziwe?",
    "a": [
      "Mars ma pierścienie większe od Saturna",
      "Wenus jest księżycem",
      "Jowisz jest największą planetą Układu Słonecznego",
      "Słońce krąży wokół Ziemi"
    ],
    "c": 2,
    "audio": "pytania/84-prawdafalsz4-consolidated.mp3"
  },
  {
    "category": "Prawda czy fałsz",
    "q": "Które stwierdzenie jest prawdziwe?",
    "a": [
      "Lód jest gęstszy od ciekłej wody",
      "Woda zamarza przy około 0°C przy standardowym ciśnieniu",
      "Woda składa się wyłącznie z tlenu",
      "Para wodna jest metalem"
    ],
    "c": 1,
    "audio": "pytania/85-prawdafalsz5-consolidated.mp3"
  },
  {
    "category": "Lata 90. i 2000.",
    "q": "Który komunikator był w Polsce szczególnie popularny w latach 2000.?",
    "a": [
      "Gadu-Gadu",
      "Discord",
      "Telegram",
      "Signal"
    ],
    "c": 0,
    "audio": "pytania/66-lata20001-consolidated.mp3"
  },
  {
    "category": "Lata 90. i 2000.",
    "q": "Jak nazywał się przenośny odtwarzacz kaset firmy Sony?",
    "a": [
      "Walkman",
      "Discman",
      "iPod",
      "MiniDisc"
    ],
    "c": 0,
    "audio": "pytania/67-lata20002-consolidated.mp3"
  },
  {
    "category": "Lata 90. i 2000.",
    "q": "Która konsola Sony zadebiutowała w Europie w 1995 roku?",
    "a": [
      "PlayStation",
      "PlayStation 2",
      "PlayStation 3",
      "PSP"
    ],
    "c": 0,
    "audio": "pytania/68-lata20003-consolidated.mp3"
  },
  {
    "category": "Lata 90. i 2000.",
    "q": "Jak nazywała się cyfrowa zabawka wymagająca opieki nad wirtualnym stworzeniem?",
    "a": [
      "Tamagotchi",
      "Furby",
      "Game Boy",
      "Walkman"
    ],
    "c": 0,
    "audio": "pytania/69-lata20004-consolidated.mp3"
  },
  {
    "category": "Lata 90. i 2000.",
    "q": "Który telefon Nokii stał się jednym z symboli początku lat 2000.?",
    "a": [
      "Nokia 3310",
      "Nokia Lumia 920",
      "Nokia N9",
      "Nokia 808 PureView"
    ],
    "c": 0,
    "audio": "pytania/70-lata20005-consolidated.mp3"
  },
  {
    "category": "Dziwne fakty",
    "q": "Które zwierzę ma trzy serca?",
    "a": [
      "Ośmiornica",
      "Rekin",
      "Delfin",
      "Pingwin"
    ],
    "c": 0,
    "audio": "pytania/26-dziwnefakty1-consolidated.mp3"
  },
  {
    "category": "Dziwne fakty",
    "q": "Które zwierzę ma odciski palców niezwykle podobne do ludzkich?",
    "a": [
      "Koala",
      "Panda",
      "Tygrys",
      "Kangur"
    ],
    "c": 0,
    "audio": "pytania/27-dziwnefakty2-consolidated.mp3"
  },
  {
    "category": "Dziwne fakty",
    "q": "Który produkt może zachować przydatność do spożycia przez bardzo długi czas przy odpowiednim przechowywaniu?",
    "a": [
      "Miód",
      "Świeże mleko",
      "Surowa ryba",
      "Sałata"
    ],
    "c": 0,
    "audio": "pytania/28-dziwnefakty3-consolidated.mp3"
  },
  {
    "category": "Dziwne fakty",
    "q": "W której części ciała krewetki znajduje się serce?",
    "a": [
      "W odwłoku",
      "W głowotułowiu",
      "W ogonie",
      "W odnóżach"
    ],
    "c": 1,
    "audio": "pytania/29-dziwnefakty4-consolidated.mp3"
  },
  {
    "category": "Dziwne fakty",
    "q": "Który ptak potrafi aktywnie latać do tyłu?",
    "a": [
      "Koliber",
      "Orzeł",
      "Bocian",
      "Pingwin"
    ],
    "c": 0,
    "audio": "pytania/30-dziwnefakty5-consolidated.mp3"
  },
  {
    "category": "Obiadowy Mix",
    "q": "Ile wynosi 12²?",
    "a": [
      "124",
      "132",
      "144",
      "164"
    ],
    "c": 2,
    "audio": "pytania/71-mix1-consolidated.mp3"
  },
  {
    "category": "Obiadowy Mix",
    "q": "Z którym krajem najmocniej związany jest ser feta?",
    "a": [
      "Grecja",
      "Hiszpania",
      "Niemcy",
      "Belgia"
    ],
    "c": 0,
    "audio": "pytania/72-mix2-consolidated.mp3"
  },
  {
    "category": "Obiadowy Mix",
    "q": "Jak nazywa się naturalny satelita Ziemi?",
    "a": [
      "Europa",
      "Tytan",
      "Księżyc",
      "Fobos"
    ],
    "c": 2,
    "audio": "pytania/73-mix3-consolidated.mp3"
  },
  {
    "category": "Obiadowy Mix",
    "q": "Która postać nosi charakterystyczną zieloną czapkę i jest głównym bohaterem wielu gier z serii „The Legend of Zelda”?",
    "a": [
      "Zelda",
      "Link",
      "Luigi",
      "Yoshi"
    ],
    "c": 1,
    "audio": "pytania/74-mix4-consolidated.mp3"
  },
  {
    "category": "Obiadowy Mix",
    "q": "Jaki kolor otrzymamy po zmieszaniu niebieskiej i żółtej farby w tradycyjnym modelu malarskim?",
    "a": [
      "Fioletowy",
      "Zielony",
      "Pomarańczowy",
      "Różowy"
    ],
    "c": 1,
    "audio": "pytania/75-mix5-consolidated.mp3"
  }
];
