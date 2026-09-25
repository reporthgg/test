import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Каждый вопрос: [текст, [варианты], индекс правильного]
const tests = [
  {
    slug: "general-english",
    title: "General English 13+",
    kind: "placement",
    audience: "adults",
    description:
      "25 вопросов с нарастающей сложностью в формате Cambridge. Определяет уровень английского по шкале A1-C2 перед началом подготовки.",
    timeLimit: 20,
    order: 1,
    // Формат Cambridge General English: 25 вопросов, сложность нарастает A1 → C2.
    questions: [
      // A1
      ["Hello, ___ name is Anna.", ["my", "me", "I", "mine"], 0],
      ["There ___ two books on the table.", ["is", "are", "am", "be"], 1],
      ["She ___ from Italy.", ["am", "are", "is", "be"], 2],
      ["___ you speak English?", ["Do", "Are", "Does", "Is"], 0],
      ["I like ___ football at the weekend.", ["play", "plays", "playing", "played"], 2],
      // A2
      ["We ___ to the beach yesterday.", ["go", "went", "gone", "going"], 1],
      ["He is taller ___ his brother.", ["then", "as", "than", "that"], 2],
      ["There isn't ___ milk in the fridge.", ["some", "any", "many", "a"], 1],
      ["I have never ___ sushi before.", ["eat", "ate", "eaten", "eating"], 2],
      ["She is good ___ playing the piano.", ["in", "on", "at", "for"], 2],
      // B1
      ["If it rains tomorrow, we ___ at home.", ["stay", "will stay", "stayed", "would stay"], 1],
      ["She has been living here ___ ten years.", ["since", "for", "from", "during"], 1],
      ["You ___ smoke here; it's forbidden.", ["mustn't", "don't have to", "needn't", "could"], 0],
      ["This is the man ___ car was stolen.", ["who", "which", "whose", "whom"], 2],
      ["The film was ___ boring that I fell asleep.", ["so", "such", "too", "very"], 0],
      // B2
      ["By the time we arrived, the train ___.", ["left", "has left", "had left", "was leaving"], 2],
      ["I'd rather you ___ tell anyone about this.", ["don't", "didn't", "won't", "not"], 1],
      ["I wish I ___ more free time.", ["have", "will have", "had", "having"], 2],
      ["The report needs ___ before Friday.", ["finish", "finishing", "to finishing", "finish it"], 1],
      ["Choose the synonym of 'reluctant':", ["eager", "unwilling", "cheerful", "rapid"], 1],
      // C1
      ["Not until she left ___ how much he missed her.", ["he realised", "he did realise", "did he realise", "realised he"], 2],
      ["Had he studied harder, he ___ the exam.", ["would pass", "will pass", "would have passed", "passed"], 2],
      ["The new regulation will come into ___ next month.", ["affect", "effect", "result", "place"], 1],
      // C2
      ["Little ___ that his life was about to change forever.", ["he knew", "did he know", "he did know", "knew he"], 1],
      ["Her argument was so ___ that no one could refute it.", ["incoherent", "trivial", "cogent", "vague"], 2],
    ],
  },
  {
    slug: "kids-english",
    title: "English for Kids",
    kind: "kids",
    audience: "kids",
    description:
      "Игровой тест для детей 7-12 лет: простые слова и фразы, чтобы подобрать группу.",
    timeLimit: 10,
    order: 2,
    questions: [
      // colours
      ["What colour is the sun?", ["Yellow", "Blue", "Green"], 0],
      ["What colour is the grass?", ["Red", "Green", "Purple"], 1],
      // animals
      ["A cat says ___.", ["Meow", "Woof", "Moo"], 0],
      ["A dog says ___.", ["Meow", "Woof", "Moo"], 1],
      // numbers
      ["How many legs does a dog have?", ["Two", "Four", "Six"], 1],
      ["Count: one, two, ___.", ["three", "five", "ten"], 0],
      // to be / to have
      ["Choose the correct one: 'I ___ happy.'", ["am", "is", "are"], 0],
      ["Choose the correct one: 'She ___ a cat.'", ["have", "has", "haves"], 1],
      // family
      ["My father's wife is my ___.", ["mother", "sister", "brother"], 0],
      // plurals
      ["One dog, two ___.", ["dog", "dogs", "doges"], 1],
      // prepositions of place
      ["The cat is ___ the box. (inside)", ["in", "on", "under"], 0],
      ["The book is ___ the table. (on top)", ["under", "on", "in"], 1],
      // simple vocabulary
      ["An apple is a ___.", ["Fruit", "Animal", "Colour"], 0],
      ["The opposite of 'big' is ___.", ["Small", "Tall", "Long"], 0],
      ["The opposite of 'day' is ___.", ["night", "sun", "morning"], 0],
    ],
  },
  {
    slug: "ielts-placement",
    title: "IELTS Placement",
    kind: "ielts",
    audience: "adults",
    description:
      "Показывает примерный балл IELTS и сколько нужно готовиться до целевого результата.",
    timeLimit: 15,
    order: 3,
    // IELTS placement: academic grammar, collocations, linkers, synonyms and
    // transformation-style MCQs, difficulty rising B1 → C1.
    questions: [
      // B1
      ["The results were ___ with our expectations.", ["consistent", "consist", "consisting", "consistency"], 0],
      ["Choose the synonym of 'significant':", ["minor", "important", "quiet", "late"], 1],
      ["She has a wide ___ of vocabulary.", ["row", "range", "line", "scale"], 1],
      ["The graph ___ a sharp increase in prices.", ["show", "showing", "shows", "shown"], 2],
      ["It was expensive; ___, we bought it.", ["therefore", "however", "moreover", "because"], 1],
      ["Despite ___ hard, he failed the exam.", ["study", "studying", "studied", "to study"], 1],
      ["Choose the synonym of 'crucial':", ["optional", "minor", "essential", "rare"], 2],
      // B2
      ["He made a ___ decision to quit his job.", ["conscious", "conscience", "consciously", "consciousness"], 0],
      ["The two theories are broadly ___ with each other.", ["compatible", "compatibly", "compatibility", "comparing"], 0],
      ["___ the bad weather, the match went ahead.", ["Despite", "Because", "However", "Unless"], 0],
      ["It is difficult to ___ a firm conclusion from such limited data.", ["draw", "pull", "take", "catch"], 0],
      ["The findings ___ that exercise improves memory.", ["suggests", "suggest", "suggesting", "to suggest"], 1],
      ["Choose the synonym of 'abundant':", ["scarce", "plentiful", "tiny", "rare"], 1],
      ["___ finishing her degree, she moved abroad.", ["On", "In", "For", "To"], 0],
      // Transformation-style
      ["'He started working here five years ago.' = He ___ here for five years.", ["has worked", "worked", "is working", "works"], 0],
      ["'It is not necessary to bring your passport.' = You ___ bring your passport.", ["needn't", "mustn't", "can't", "shouldn't"], 0],
      ["'Perhaps she forgot the meeting.' = She ___ forgotten the meeting.", ["must have", "may have", "should have", "would have"], 1],
      // C1
      ["The proposal was rejected ___ its high cost.", ["owing to", "despite", "whereas", "unless"], 0],
      ["Choose the synonym of 'meticulous':", ["careless", "hasty", "thorough", "vague"], 2],
      ["Rarely ___ such a compelling argument.", ["have I heard", "I have heard", "I heard", "did I heard"], 0],
    ],
  },
  {
    slug: "sat-placement",
    title: "SAT Placement",
    kind: "sat",
    audience: "adults",
    description:
      "Оценивает готовность к Digital SAT по секциям Verbal и Math и показывает пробелы.",
    timeLimit: 15,
    order: 4,
    // Digital-SAT-style placement: balanced Verbal (grammar/usage, concision,
    // vocabulary-in-context) and Math (arithmetic, percentages, linear
    // equations, geometry, ratios). Every math answer is unambiguous.
    questions: [
      // --- Verbal ---
      ["Each of the students ___ a laptop.", ["have", "has", "having", "haved"], 1],
      ["Choose the most concise option:", ["Because", "Due to the fact that", "On account of the fact that", "In light of the fact that"], 0],
      ["Choose the synonym of 'ambiguous':", ["obvious", "unclear", "bright", "loud"], 1],
      ["The committee ___ its decision yesterday.", ["announce", "announced", "announcing", "announces"], 1],
      ["Neither the manager nor the employees ___ satisfied.", ["was", "were", "is", "has been"], 1],
      ["In 'a novel approach', 'novel' most nearly means:", ["new", "book", "ancient", "dull"], 0],
      ["Choose the correctly punctuated sentence:", ["We left early; the show was over.", "We left early, the show was over.", "We left early the show was over.", "We left, early; the show was over."], 0],
      ["The dog wagged ___ tail.", ["it's", "its", "its'", "it is"], 1],
      ["In 'compelling evidence', 'compelling' most nearly means:", ["convincing", "boring", "optional", "quiet"], 0],
      ["The report, along with the charts, ___ ready.", ["is", "are", "were", "have"], 0],
      // --- Math ---
      ["If 3x = 12, then x = ?", ["3", "4", "6", "9"], 1],
      ["What is 15% of 200?", ["30", "15", "20", "45"], 0],
      ["Solve: 2(x + 3) = 14. x = ?", ["5", "4", "7", "8"], 1],
      ["The average (arithmetic mean) of 4, 8 and 12 is:", ["6", "8", "12", "24"], 1],
      ["A rectangle has length 6 and width 4. Its area is:", ["10", "24", "20", "12"], 1],
      ["If the ratio of boys to girls is 2:3 and there are 10 boys, how many girls are there?", ["12", "15", "6", "20"], 1],
      ["A shirt costs $40 and is discounted 25%. Its new price is:", ["$30", "$35", "$32", "$10"], 0],
      ["Solve: 5x - 3 = 2x + 9. x = ?", ["4", "3", "6", "2"], 0],
      ["What is 20% of 20% of 100?", ["40", "4", "20", "8"], 1],
      ["A triangle has base 10 and height 6. Its area is:", ["60", "30", "16", "15"], 1],
    ],
  },
];

async function main() {
  for (const t of tests) {
    const test = await prisma.test.upsert({
      where: { slug: t.slug },
      update: {
        title: t.title,
        kind: t.kind,
        audience: t.audience,
        description: t.description,
        timeLimit: t.timeLimit,
        order: t.order,
        published: true,
      },
      create: {
        slug: t.slug,
        title: t.title,
        kind: t.kind,
        audience: t.audience,
        description: t.description,
        timeLimit: t.timeLimit,
        order: t.order,
        published: true,
      },
    });

    // пересоздаём вопросы
    await prisma.question.deleteMany({ where: { testId: test.id } });
    for (let qi = 0; qi < t.questions.length; qi++) {
      const [text, options, correctIdx] = t.questions[qi];
      await prisma.question.create({
        data: {
          testId: test.id,
          order: qi,
          text,
          options: {
            create: options.map((opt, oi) => ({
              order: oi,
              text: opt,
              correct: oi === correctIdx,
            })),
          },
        },
      });
    }
    console.log(`seeded: ${t.title} (${t.questions.length} questions)`);
  }

  // Лагеря — создаём только если их ещё нет (чтобы не затирать правки из админки)
  const campsCount = await prisma.camp.count();
  if (campsCount === 0) {
    const camps = [
      { city: "Лондон", country: "Великобритания", dates: "6-26 июля", ageRange: "13-17 лет", housing: "кампус, комнаты на 2", seats: 20, order: 1, image: "/camps/london.jpg", summary: "Проживание в кампусе университета, уроки английского в первой половине дня, поездки в Оксфорд, Кембридж и Брайтон." },
      { city: "Дубай", country: "ОАЭ", dates: "1-15 июня", ageRange: "12-16 лет", housing: "резиденция", seats: 16, order: 2, image: "/camps/dubai.jpg", summary: "Языковая практика и знакомство с кампусами филиалов британских вузов для тех, кто присматривается к поступлению в ОАЭ." },
      { city: "Торонто", country: "Канада", dates: "13-31 июля", ageRange: "14-17 лет", housing: "кампус", seats: 20, order: 3, image: "/camps/toronto.jpg", summary: "Академический английский с проектной работой и защитой в конце смены, плюс поездка на Ниагарский водопад." },
      { city: "Берлин", country: "Германия", dates: "3-17 августа", ageRange: "13-17 лет", housing: "резиденция", seats: 18, order: 4, image: "/camps/berlin.jpg", summary: "Английский и базовый немецкий, знакомство с системой немецких университетов и поездки по земле Бранденбург." },
    ];
    for (const c of camps) {
      await prisma.camp.create({ data: { ...c, published: true } });
    }
    console.log(`seeded: ${camps.length} camps`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
