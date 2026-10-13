import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

type Block = string | readonly string[];
export type LegalSection = { title: string; blocks: readonly Block[] };
export type LegalDocument = { intro?: string; sections: readonly LegalSection[] };
export type LegalPage = "privacy" | "consent";

const bin = "221240037945";
const email = site.email;
const phone = site.phone.display;
const whatsapp = site.whatsapp.display;

const operator: Record<Locale, string> = {
  ru: `ТОО «GSCSTUDY CORPORATION», БИН ${bin}`,
  kz: `«GSCSTUDY CORPORATION» ЖШС, БСН ${bin}`,
  en: `GSCSTUDY CORPORATION LLP, BIN ${bin}`,
};

const privacy: Record<Locale, LegalDocument> = {
  ru: {
    sections: [
      {
        title: "1. Кто обрабатывает ваши данные",
        blocks: [
          `1.1. Оператором персональных данных на сайте gscstudy.com (далее «Сайт») является ${operator.ru} (далее «GSC Study», «мы»).`,
          "1.2. GSC Study является собственником и оператором персональных данных, которые вы оставляете на Сайте, в смысле Закона Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите» (далее «Закон»).",
          `1.3. По вопросам обработки персональных данных пишите на ${email} или звоните по номеру ${phone}.`,
        ],
      },
      {
        title: "2. Какие данные мы собираем",
        blocks: [
          "2.1. Данные, которые вы указываете в формах Сайта:",
          [
            "имя (и имя родителя в заявке на лагерь);",
            "номер телефона, в том числе номер WhatsApp;",
            "город, выбранный филиал;",
            "интересующая программа или услуга, планируемый год поступления;",
            "возраст ребёнка, направление и город вылета (заявка на лагерь);",
            "ответы на онлайн-тесты уровня и их результаты.",
          ],
          "2.2. Технические данные, которые собираются автоматически: IP-адрес, тип устройства и браузера, страницы Сайта, которые вы посещали, источник перехода (включая UTM-метки), время посещения. Их собирают с помощью cookie сервисы аналитики и рекламы Meta Pixel, Google Analytics и Яндекс Метрика, а страницу и UTM-метки мы также сохраняем вместе с заявкой.",
          "2.3. Мы не просим и не собираем на Сайте ИИН, данные удостоверения личности, платёжные данные, сведения о здоровье. Документы для поступления (аттестаты, паспорта, сертификаты) передаются отдельно по договору, а не через Сайт.",
        ],
      },
      {
        title: "3. Зачем мы обрабатываем данные",
        blocks: [[
          "чтобы связаться с вами по заявке по телефону или в WhatsApp;",
          "провести консультацию, диагностику, пробный урок, подобрать программу и филиал;",
          "проверить онлайн-тест и сообщить результат;",
          "подготовить и заключить договор на обучение или услуги;",
          "сообщать о программах, наборах и мероприятиях GSC Study, если вы не отказались от таких сообщений;",
          "анализировать работу Сайта и рекламы, чтобы улучшать их.",
        ]],
      },
      {
        title: "4. Основание обработки",
        blocks: [
          "4.1. Мы обрабатываем персональные данные на основании вашего согласия, которое вы даёте, отмечая галочку в форме Сайта. Текст согласия: gscstudy.com/consent.",
          "4.2. Если вам нет 18 лет, согласие даёт ваш родитель или иной законный представитель (ст. 7 и 8 Закона).",
        ],
      },
      {
        title: "5. Кому мы передаём данные",
        blocks: [
          "5.1. Мы не продаём персональные данные и не публикуем их в общедоступных источниках без отдельного согласия.",
          "5.2. Данные могут передаваться только для целей из раздела 3:",
          [
            "Битрикс24: CRM-система, в которой хранятся и обрабатываются заявки;",
            "филиалам GSC Study в Астане и Алматы, если заявка относится к их филиалу;",
            "WhatsApp (Meta Platforms), если вы переписываетесь с нами в WhatsApp;",
            "Meta Platforms (Meta Pixel), Google LLC (Google Analytics) и Яндекс (Яндекс Метрика): технические данные из п. 2.2;",
            "государственным органам в случаях, прямо предусмотренных законами Республики Казахстан.",
          ],
          "5.3. Передача данных зарубежным университетам, школам и организаторам лагерей происходит только после заключения договора и по отдельному согласию, а не на основании заявки с Сайта.",
        ],
      },
      {
        title: "6. Трансграничная передача",
        blocks: [
          "6.1. Технические данные из п. 2.2 и переписка в WhatsApp обрабатываются сервисами Meta, Google и Яндекса на серверах за пределами Республики Казахстан. Это трансграничная передача персональных данных (ст. 16 Закона), на которую вы даёте согласие в п. 6 текста согласия.",
          "6.2. При первом посещении Сайт показывает уведомление об использовании cookie. Вы можете запретить cookie и сторонние скрипты в настройках браузера. Сайт при этом работает полностью.",
        ],
      },
      {
        title: "7. Где и сколько хранятся данные",
        blocks: [
          "7.1. Базы, содержащие персональные данные, хранятся на территории Республики Казахстан (ст. 12 Закона).",
          "7.2. Данные хранятся до достижения целей обработки. Если вы не заключили с нами договор, данные заявки удаляются или обезличиваются не позднее 3 лет с последнего обращения. Данные клиентов хранятся в течение срока действия договора и сроков, установленных законодательством Республики Казахстан.",
        ],
      },
      {
        title: "8. Как мы защищаем данные",
        blocks: [
          "Доступ к заявкам имеют только сотрудники, которым он нужен для работы с вашим обращением. Доступ к CRM предоставляется по персональным учётным записям. Соединение с Сайтом защищено протоколом HTTPS.",
        ],
      },
      {
        title: "9. Ваши права",
        blocks: [
          "Вы вправе:",
          [
            "узнать, обрабатываем ли мы ваши персональные данные, и получить их перечень;",
            "потребовать исправить или дополнить неточные данные;",
            "потребовать удалить данные, если их обработка не требуется по закону;",
            "отозвать согласие на обработку: мы прекратим обработку в течение 15 рабочих дней или направим мотивированный отказ (ст. 8 Закона);",
            "отказаться от сообщений о программах и мероприятиях;",
            "обжаловать наши действия в уполномоченный орган в сфере защиты персональных данных или в суд.",
          ],
          `Для этого напишите на ${email} или в WhatsApp ${whatsapp} с пометкой «Персональные данные».`,
        ],
      },
      {
        title: "10. Изменения политики",
        blocks: ["Мы можем обновлять политику. Действующая редакция всегда опубликована на этой странице с датой изменения."],
      },
    ],
  },
  kz: {
    sections: [
      {
        title: "1. Деректеріңізді кім өңдейді",
        blocks: [
          `1.1. gscstudy.com сайтындағы (бұдан әрі «Сайт») дербес деректердің операторы: ${operator.kz} (бұдан әрі «GSC Study», «біз»).`,
          "1.2. GSC Study Сайтта қалдыратын дербес деректеріңіздің «Дербес деректер және оларды қорғау туралы» Қазақстан Республикасының 2013 жылғы 21 мамырдағы № 94-V Заңы (бұдан әрі «Заң») мағынасындағы меншік иесі және операторы болып табылады.",
          `1.3. Дербес деректерді өңдеу мәселелері бойынша ${email} поштасына жазыңыз немесе ${phone} нөміріне қоңырау шалыңыз.`,
        ],
      },
      {
        title: "2. Біз қандай деректерді жинаймыз",
        blocks: [
          "2.1. Сайт формаларында көрсететін деректеріңіз:",
          [
            "аты (лагерьге өтінімде ата-ананың аты да);",
            "телефон нөмірі, соның ішінде WhatsApp нөмірі;",
            "қала, таңдалған филиал;",
            "қызықтыратын бағдарлама немесе қызмет, түсуді жоспарлаған жыл;",
            "баланың жасы, бағыт және ұшып шығатын қала (лагерьге өтінім);",
            "деңгейді анықтайтын онлайн-тесттерге берілген жауаптар және олардың нәтижелері.",
          ],
          "2.2. Автоматты түрде жиналатын техникалық деректер: IP-мекенжай, құрылғы мен браузер түрі, Сайтта қаралған беттер, өту көзі (UTM-белгілерін қоса алғанда), кіру уақыты. Оларды cookie файлдарының көмегімен Meta Pixel, Google Analytics және Яндекс Метрика аналитика және жарнама қызметтері жинайды, ал бет пен UTM-белгілерін біз өтініммен бірге де сақтаймыз.",
          "2.3. Біз Сайтта ЖСН, жеке куәлік деректерін, төлем деректерін, денсаулық туралы мәліметтерді сұрамаймыз және жинамаймыз. Түсуге арналған құжаттар (аттестаттар, төлқұжаттар, сертификаттар) Сайт арқылы емес, шарт бойынша бөлек беріледі.",
        ],
      },
      {
        title: "3. Деректерді не үшін өңдейміз",
        blocks: [[
          "өтінім бойынша сізбен телефон немесе WhatsApp арқылы байланысу;",
          "кеңес, диагностика, сынақ сабағын өткізу, бағдарлама мен филиал таңдау;",
          "онлайн-тестті тексеріп, нәтижесін хабарлау;",
          "оқу немесе қызмет көрсету шартын дайындау және жасасу;",
          "егер мұндай хабарламалардан бас тартпасаңыз, GSC Study бағдарламалары, қабылдау және іс-шаралары туралы хабарлау;",
          "Сайт пен жарнаманың жұмысын жақсарту үшін талдау.",
        ]],
      },
      {
        title: "4. Өңдеу негізі",
        blocks: [
          "4.1. Біз дербес деректерді Сайт формасында белгі қою арқылы беретін келісіміңіз негізінде өңдейміз. Келісім мәтіні: gscstudy.com/kz/consent.",
          "4.2. Егер сізге 18 жас толмаса, келісімді ата-анаңыз немесе өзге заңды өкіліңіз береді (Заңның 7 және 8-баптары).",
        ],
      },
      {
        title: "5. Деректерді кімге береміз",
        blocks: [
          "5.1. Біз дербес деректерді сатпаймыз және бөлек келісімсіз жалпыға қолжетімді көздерде жарияламаймыз.",
          "5.2. Деректер тек 3-бөлімдегі мақсаттар үшін беріледі:",
          [
            "Битрикс24: өтінімдер сақталатын және өңделетін CRM-жүйе;",
            "егер өтінім олардың филиалына қатысты болса, GSC Study-дің Астана мен Алматыдағы филиалдарына;",
            "WhatsApp (Meta Platforms), егер бізбен WhatsApp арқылы хат алмассаңыз;",
            "Meta Platforms (Meta Pixel), Google LLC (Google Analytics) және Яндекс (Яндекс Метрика): 2.2-тармақтағы техникалық деректер;",
            "Қазақстан Республикасының заңдарында тікелей көзделген жағдайларда мемлекеттік органдарға.",
          ],
          "5.3. Деректер шетелдік университеттерге, мектептерге және лагерь ұйымдастырушыларына Сайттағы өтінім негізінде емес, тек шарт жасалғаннан кейін және бөлек келісім бойынша беріледі.",
        ],
      },
      {
        title: "6. Трансшекаралық беру",
        blocks: [
          "6.1. 2.2-тармақтағы техникалық деректер мен WhatsApp-тағы хат алмасу Meta, Google және Яндекс қызметтерінде Қазақстан Республикасынан тыс серверлерде өңделеді. Бұл дербес деректерді трансшекаралық беру (Заңның 16-бабы), оған келісімді келісім мәтінінің 6-тармағында бересіз.",
          "6.2. Алғаш кіргенде Сайт cookie файлдарын пайдалану туралы хабарлама көрсетеді. Cookie файлдары мен бөгде скрипттерге браузер баптауларында тыйым салуға болады. Бұл жағдайда да Сайт толық жұмыс істейді.",
        ],
      },
      {
        title: "7. Деректер қайда және қанша уақыт сақталады",
        blocks: [
          "7.1. Дербес деректер бар базалар Қазақстан Республикасының аумағында сақталады (Заңның 12-бабы).",
          "7.2. Деректер өңдеу мақсаттарына жеткенге дейін сақталады. Егер бізбен шарт жасамасаңыз, өтінім деректері соңғы өтініштен кейін 3 жылдан кешіктірілмей жойылады немесе иесіздендіріледі. Клиенттердің деректері шарттың қолданылу мерзімі ішінде және Қазақстан Республикасының заңнамасында белгіленген мерзімдерде сақталады.",
        ],
      },
      {
        title: "8. Деректерді қалай қорғаймыз",
        blocks: [
          "Өтінімдерді тек өтінішіңізбен жұмыс істеуге қажет қызметкерлер ғана көре алады. CRM-ге қолжетімділік жеке есептік жазбалар арқылы беріледі. Сайтпен байланыс HTTPS хаттамасымен қорғалған.",
        ],
      },
      {
        title: "9. Сіздің құқықтарыңыз",
        blocks: [
          "Сіз:",
          [
            "дербес деректеріңізді өңдейтін-өңдемейтінімізді біліп, олардың тізбесін алуға;",
            "қате деректерді түзетуді немесе толықтыруды талап етуге;",
            "егер оларды өңдеу заң бойынша талап етілмесе, деректерді жоюды талап етуге;",
            "өңдеуге келісімді кері қайтарып алуға: біз 15 жұмыс күні ішінде өңдеуді тоқтатамыз немесе дәлелді бас тарту жібереміз (Заңның 8-бабы);",
            "бағдарламалар мен іс-шаралар туралы хабарламалардан бас тартуға;",
            "әрекеттерімізге дербес деректерді қорғау саласындағы уәкілетті органға немесе сотқа шағымдануға құқылысыз.",
          ],
          `Ол үшін ${email} поштасына немесе WhatsApp ${whatsapp} нөміріне «Дербес деректер» деген белгімен жазыңыз.`,
        ],
      },
      {
        title: "10. Саясаттағы өзгерістер",
        blocks: ["Біз саясатты жаңарта аламыз. Қолданыстағы редакция әрқашан осы бетте өзгерту күнімен жарияланады."],
      },
    ],
  },
  en: {
    sections: [
      {
        title: "1. Who processes your data",
        blocks: [
          `1.1. The operator of personal data on gscstudy.com (the “Website”) is ${operator.en} (“GSC Study”, “we”).`,
          "1.2. GSC Study is the owner and operator of the personal data you leave on the Website within the meaning of Law of the Republic of Kazakhstan No. 94-V of 21 May 2013 “On Personal Data and Their Protection” (the “Law”).",
          `1.3. For questions about personal data processing, write to ${email} or call ${phone}.`,
        ],
      },
      {
        title: "2. What data we collect",
        blocks: [
          "2.1. Data you enter in the Website forms:",
          [
            "your name (and a parent’s name in a camp request);",
            "phone number, including your WhatsApp number;",
            "city and chosen branch;",
            "the programme or service you are interested in and the planned year of admission;",
            "the child’s age, destination and departure city (camp request);",
            "answers to online level tests and their results.",
          ],
          "2.2. Technical data collected automatically: IP address, device and browser type, Website pages you visited, traffic source (including UTM tags) and time of visit. The analytics and advertising services Meta Pixel, Google Analytics and Yandex Metrica collect them using cookies; we also store the page and UTM tags together with your request.",
          "2.3. We do not ask for or collect your IIN, ID document details, payment details or health information on the Website. Admission documents (school certificates, passports, test certificates) are provided separately under a contract, not through the Website.",
        ],
      },
      {
        title: "3. Why we process data",
        blocks: [[
          "to contact you about your request by phone or WhatsApp;",
          "to hold a consultation, assessment or trial lesson and to choose a programme and branch;",
          "to check an online test and tell you the result;",
          "to prepare and sign a contract for studies or services;",
          "to tell you about GSC Study programmes, intakes and events, unless you have opted out of such messages;",
          "to analyse how the Website and advertising perform in order to improve them.",
        ]],
      },
      {
        title: "4. Legal basis",
        blocks: [
          "4.1. We process personal data on the basis of your consent, which you give by ticking the box in a Website form. Consent text: gscstudy.com/en/consent.",
          "4.2. If you are under 18, your parent or other legal representative gives consent (Articles 7 and 8 of the Law).",
        ],
      },
      {
        title: "5. Who we share data with",
        blocks: [
          "5.1. We do not sell personal data or publish it in publicly available sources without separate consent.",
          "5.2. Data may be shared only for the purposes in section 3:",
          [
            "Bitrix24: the CRM system where requests are stored and processed;",
            "GSC Study branches in Astana and Almaty, if the request concerns their branch;",
            "WhatsApp (Meta Platforms), if you message us on WhatsApp;",
            "Meta Platforms (Meta Pixel), Google LLC (Google Analytics) and Yandex (Yandex Metrica): the technical data in clause 2.2;",
            "government authorities in cases expressly provided for by the laws of the Republic of Kazakhstan.",
          ],
          "5.3. Data is shared with universities, schools and camp organisers abroad only after a contract is signed and with separate consent, not on the basis of a Website request.",
        ],
      },
      {
        title: "6. Cross-border transfer",
        blocks: [
          "6.1. The technical data in clause 2.2 and WhatsApp messages are processed by Meta, Google and Yandex services on servers outside the Republic of Kazakhstan. This is a cross-border transfer of personal data (Article 16 of the Law), to which you consent in clause 6 of the consent text.",
          "6.2. On your first visit, the Website shows a notice about cookies. You can block cookies and third-party scripts in your browser settings; the Website still works fully.",
        ],
      },
      {
        title: "7. Where and how long data is stored",
        blocks: [
          "7.1. Databases containing personal data are stored in the territory of the Republic of Kazakhstan (Article 12 of the Law).",
          "7.2. Data is stored until the purposes of processing are achieved. If you have not signed a contract with us, request data is deleted or anonymised no later than 3 years after your last contact. Client data is stored for the term of the contract and the periods set by the laws of the Republic of Kazakhstan.",
        ],
      },
      {
        title: "8. How we protect data",
        blocks: [
          "Only employees who need access to handle your request can see requests. CRM access is granted through personal accounts. Connections to the Website are protected by HTTPS.",
        ],
      },
      {
        title: "9. Your rights",
        blocks: [
          "You have the right to:",
          [
            "find out whether we process your personal data and receive a list of it;",
            "ask us to correct or complete inaccurate data;",
            "ask us to delete data if its processing is not required by law;",
            "withdraw your consent to processing: we will stop processing within 15 working days or send a reasoned refusal (Article 8 of the Law);",
            "opt out of messages about programmes and events;",
            "appeal against our actions to the authorised personal data protection body or to a court.",
          ],
          `To do so, write to ${email} or to WhatsApp ${whatsapp} with the subject “Personal data”.`,
        ],
      },
      {
        title: "10. Changes to this policy",
        blocks: ["We may update this policy. The current version is always published on this page with the date of the change."],
      },
    ],
  },
};

const consent: Record<Locale, LegalDocument> = {
  ru: {
    intro: "Отмечая галочку в форме на сайте gscstudy.com и отправляя заявку, я, лицо, указавшее своё имя в форме (далее «Субъект»), свободно, своей волей и в своём интересе даю согласие на сбор и обработку моих персональных данных на следующих условиях.",
    sections: [
      { title: "1. Собственник и оператор", blocks: [`${operator.ru}, сайт gscstudy.com, e-mail ${email} (далее «GSC Study»).`] },
      { title: "2. Перечень данных", blocks: ["Имя (имя родителя), номер телефона и WhatsApp, город, филиал, интересующая программа или услуга, год поступления, возраст ребёнка, направление и город вылета (для лагерей), ответы и результаты онлайн-тестов; технические данные: IP-адрес, данные устройства и браузера, посещённые страницы и источник перехода."] },
      { title: "3. Цели", blocks: ["Связь по заявке; консультация, диагностика, пробный урок; подбор программы и филиала; проверка теста и сообщение результата; подготовка и заключение договора; информирование о программах и мероприятиях GSC Study (от сообщений можно отказаться в любой момент); анализ работы сайта и рекламы."] },
      { title: "4. Действия с данными", blocks: ["Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача в случаях из п. 5, обезличивание, блокирование, удаление и уничтожение."] },
      { title: "5. Передача третьим лицам", blocks: ["Допускается Битрикс24 (CRM-система для хранения заявок), филиалам GSC Study в Астане и Алматы, а также Meta Platforms (WhatsApp, Meta Pixel), Google LLC (Google Analytics) и Яндексу (Яндекс Метрика) в объёме, необходимом для целей из п. 3, и государственным органам в случаях, предусмотренных законами Республики Казахстан."] },
      { title: "6. Трансграничная передача", blocks: ["Осуществляется. Технические данные и переписка в WhatsApp обрабатываются сервисами Meta, Google и Яндекса на серверах за пределами Республики Казахстан. Я даю согласие на такую трансграничную передачу."] },
      { title: "7. Распространение в общедоступных источниках", blocks: ["Не осуществляется. Публикация историй, фото и результатов студентов на сайте и в соцсетях возможна только по отдельному согласию."] },
      { title: "8. Срок действия согласия", blocks: ["До достижения целей обработки, но не более 3 лет с моего последнего обращения в GSC Study, если не заключён договор. При заключении договора: на срок его действия и сроки, установленные законодательством Республики Казахстан."] },
      { title: "9. Отзыв согласия", blocks: [`Я вправе отозвать согласие, написав на ${email} или в WhatsApp ${whatsapp}. GSC Study прекращает обработку в течение 15 рабочих дней либо направляет мотивированный отказ, если обработка требуется по законодательству Республики Казахстан или есть неисполненное обязательство (ст. 8 Закона РК «О персональных данных и их защите»).`] },
      { title: "10. Несовершеннолетние", blocks: ["Если Субъекту нет 18 лет, настоящее согласие даёт его родитель или иной законный представитель от своего имени и в отношении данных ребёнка. Отправляя форму, лицо подтверждает, что является совершеннолетним либо законным представителем Субъекта."] },
      { title: "11. Политика конфиденциальности", blocks: ["Я ознакомлен(а) с политикой конфиденциальности GSC Study."] },
      { title: "12. Подтверждение", blocks: ["Согласие дано в электронной форме отметкой в форме сайта. Дата, время, страница отправки и версия настоящего текста фиксируются в системе GSC Study."] },
    ],
  },
  kz: {
    intro: "gscstudy.com сайтындағы формада белгі қойып, өтінім жібере отырып, мен, формада өз атын көрсеткен тұлға (бұдан әрі «Субъект»), еркін, өз еркіммен және өз мүддем үшін дербес деректерімді жинауға және өңдеуге мына шарттармен келісім беремін.",
    sections: [
      { title: "1. Меншік иесі және оператор", blocks: [`${operator.kz}, gscstudy.com сайты, e-mail ${email} (бұдан әрі «GSC Study»).`] },
      { title: "2. Деректер тізбесі", blocks: ["Аты (ата-ананың аты), телефон және WhatsApp нөмірі, қала, филиал, қызықтыратын бағдарлама немесе қызмет, түсу жылы, баланың жасы, бағыт және ұшып шығатын қала (лагерьлер үшін), онлайн-тесттердің жауаптары мен нәтижелері; техникалық деректер: IP-мекенжай, құрылғы мен браузер деректері, қаралған беттер және өту көзі."] },
      { title: "3. Мақсаттар", blocks: ["Өтінім бойынша байланыс; кеңес, диагностика, сынақ сабағы; бағдарлама мен филиал таңдау; тестті тексеру және нәтижесін хабарлау; шартты дайындау және жасасу; GSC Study бағдарламалары мен іс-шаралары туралы хабарлау (хабарламалардан кез келген уақытта бас тартуға болады); сайт пен жарнаманың жұмысын талдау."] },
      { title: "4. Деректермен жасалатын әрекеттер", blocks: ["Жинау, жазу, жүйелеу, жинақтау, сақтау, нақтылау, пайдалану, 5-тармақтағы жағдайларда беру, иесіздендіру, бұғаттау, жою және құрту."] },
      { title: "5. Үшінші тұлғаларға беру", blocks: ["Битрикс24-ке (өтінімдерді сақтауға арналған CRM-жүйе), GSC Study-дің Астана мен Алматыдағы филиалдарына, сондай-ақ Meta Platforms (WhatsApp, Meta Pixel), Google LLC (Google Analytics) және Яндекске (Яндекс Метрика) 3-тармақтағы мақсаттарға қажетті көлемде, және Қазақстан Республикасының заңдарында көзделген жағдайларда мемлекеттік органдарға беруге жол беріледі."] },
      { title: "6. Трансшекаралық беру", blocks: ["Жүзеге асырылады. Техникалық деректер мен WhatsApp-тағы хат алмасу Meta, Google және Яндекс қызметтерінде Қазақстан Республикасынан тыс серверлерде өңделеді. Мен осындай трансшекаралық беруге келісім беремін."] },
      { title: "7. Жалпыға қолжетімді көздерде тарату", blocks: ["Жүзеге асырылмайды. Студенттердің оқиғаларын, фотоларын және нәтижелерін сайтта және әлеуметтік желілерде жариялау тек бөлек келісім бойынша мүмкін."] },
      { title: "8. Келісімнің қолданылу мерзімі", blocks: ["Өңдеу мақсаттарына жеткенге дейін, бірақ шарт жасалмаса, GSC Study-ге соңғы өтінішімнен бастап 3 жылдан аспайды. Шарт жасалған кезде: оның қолданылу мерзіміне және Қазақстан Республикасының заңнамасында белгіленген мерзімдерге."] },
      { title: "9. Келісімді кері қайтарып алу", blocks: [`Мен ${email} поштасына немесе WhatsApp ${whatsapp} нөміріне жазу арқылы келісімді кері қайтарып алуға құқылымын. GSC Study 15 жұмыс күні ішінде өңдеуді тоқтатады не егер өңдеу Қазақстан Республикасының заңнамасы бойынша талап етілсе немесе орындалмаған міндеттеме болса, дәлелді бас тарту жібереді («Дербес деректер және оларды қорғау туралы» ҚР Заңының 8-бабы).`] },
      { title: "10. Кәмелетке толмағандар", blocks: ["Егер Субъектіге 18 жас толмаса, осы келісімді оның ата-анасы немесе өзге заңды өкілі өз атынан және бала деректеріне қатысты береді. Форманы жіберу арқылы тұлға өзінің кәмелетке толғанын не Субъектінің заңды өкілі екенін растайды."] },
      { title: "11. Құпиялылық саясаты", blocks: ["Мен GSC Study құпиялылық саясатымен таныстым."] },
      { title: "12. Растау", blocks: ["Келісім электрондық түрде сайт формасында белгі қою арқылы берілді. Жіберу күні, уақыты, беті және осы мәтіннің нұсқасы GSC Study жүйесінде тіркеледі."] },
    ],
  },
  en: {
    intro: "By ticking the box in a form on gscstudy.com and sending a request, I, the person who entered their name in the form (the “Data Subject”), freely, of my own will and in my own interest, consent to the collection and processing of my personal data on the following terms.",
    sections: [
      { title: "1. Owner and operator", blocks: [`${operator.en}, website gscstudy.com, e-mail ${email} (“GSC Study”).`] },
      { title: "2. Data", blocks: ["Name (parent’s name), phone and WhatsApp number, city, branch, programme or service of interest, year of admission, child’s age, destination and departure city (for camps), online test answers and results; technical data: IP address, device and browser data, pages visited and traffic source."] },
      { title: "3. Purposes", blocks: ["Contacting me about my request; consultation, assessment, trial lesson; choosing a programme and branch; checking a test and reporting the result; preparing and signing a contract; informing me about GSC Study programmes and events (I can opt out of messages at any time); analysing how the website and advertising perform."] },
      { title: "4. Actions with data", blocks: ["Collection, recording, systematisation, accumulation, storage, clarification, use, transfer in the cases in clause 5, anonymisation, blocking, deletion and destruction."] },
      { title: "5. Transfer to third parties", blocks: ["Permitted to Bitrix24 (the CRM system for storing requests), GSC Study branches in Astana and Almaty, and to Meta Platforms (WhatsApp, Meta Pixel), Google LLC (Google Analytics) and Yandex (Yandex Metrica) to the extent necessary for the purposes in clause 3, and to government authorities in cases provided for by the laws of the Republic of Kazakhstan."] },
      { title: "6. Cross-border transfer", blocks: ["Carried out. Technical data and WhatsApp messages are processed by Meta, Google and Yandex services on servers outside the Republic of Kazakhstan. I consent to such cross-border transfer."] },
      { title: "7. Disclosure in publicly available sources", blocks: ["Not carried out. Students’ stories, photos and results are published on the website and social media only with separate consent."] },
      { title: "8. Term of consent", blocks: ["Until the purposes of processing are achieved, but no longer than 3 years after my last contact with GSC Study if no contract is signed. If a contract is signed: for its term and the periods set by the laws of the Republic of Kazakhstan."] },
      { title: "9. Withdrawal of consent", blocks: [`I may withdraw my consent by writing to ${email} or to WhatsApp ${whatsapp}. GSC Study stops processing within 15 working days or sends a reasoned refusal if processing is required by the laws of the Republic of Kazakhstan or there is an outstanding obligation (Article 8 of the Law of the Republic of Kazakhstan “On Personal Data and Their Protection”).`] },
      { title: "10. Minors", blocks: ["If the Data Subject is under 18, this consent is given by their parent or other legal representative on their own behalf and in respect of the child’s data. By sending the form, the person confirms that they are of age or the Data Subject’s legal representative."] },
      { title: "11. Privacy policy", blocks: ["I have read the GSC Study privacy policy."] },
      { title: "12. Confirmation", blocks: ["Consent is given electronically by ticking a box in a website form. The date, time, page and version of this text are recorded in GSC Study’s system."] },
    ],
  },
};

export const legalDocuments: Record<LegalPage, Record<Locale, LegalDocument>> = { privacy, consent };
