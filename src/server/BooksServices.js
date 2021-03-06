var express = require("express");
var path = require("path");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

let port = process.env.PORT || 4000;

// An harcoded JSON array containing the list of books.
// This array acts as the in-memory structure of the data based on which
// the front-end renders the content .
const books = [
  {
    id: 1,
    title: "Programming Microsoft Windows With C#",
    author: "Charles Petzold",
    price: "Rs.350",
    rating: 4.5,
    image: "pmwwc.jpg",
    description:
      "Programming Microsoft Windows with C# is a tutorial for programmers wishing to write applications for Windows using the C# programming language and the Windows Forms class library. C# is a new object-oriented programming language based on C, and Windows Forms is part of the Microsoft .NET framework. Knowledge of the C or C++ programming language is required; some familiarity with object-oriented programming is helpful but not necessary",
  },
  {
    id: 2,
    title: "Head First Design Patterns",
    author: "Elisabeth Freeman",
    price: "Rs.450",
    rating: 4,
    image: "hfdp.jpg",
    description:
      "This edition of Head First Design Patterns—now updated for Java 8—shows you the tried-and-true, road-tested patterns used by developers to create functional, elegant, reusable, and flexible software. By the time you finish this book, you’ll be able to take advantage of the best design practices and experiences of those who have fought the beast of software design and triumphed",
  },
  {
    id: 3,
    title: "Wings of Fire: An Autobiography",
    author: "A.P.J. Abdul Kalam",
    price: "Rs.150",
    rating: 5,
    image: "wings.jpg",
    description:
      "Avul Pakir Jainulabdeen Abdul Kalam, the son of a little-educated boat-owner in Rameswaram, Tamil Nadu, had an unparalleled career as a defence scientist, culminating in the highest civilian award of India, the Bharat Ratna. As chief of the country's defence research and development programme, Kalam demonstrated the great potential for dynamism and innovation that existed in seemingly moribund research establishments. This is the story of Kalam's rise from obscurity and his personal and professional struggles, as well as the story of Agni, Prithvi, Akash, Trishul and Nag-missiles that have become household names in India and that have raised the nation to the level of a missile power of international reckoning. This is also the saga of independent India's struggle for technological self-sufficiency and defensive autonomy-a story as much about politics, domestic and international, as it is about science.",
  },
  {
    id: 4,
    title: "Head First JavaScript",
    author: "Michael Morrison",
    price: "Rs.750",
    rating: 4,
    image: "hfjs.jpg",
    description:
      "This brain-friendly guide teaches you everything from JavaScript language fundamentals to advanced topics, including objects, functions, and the browser’s document object model. You won’t just be reading—you’ll be playing games, solving puzzles, pondering mysteries, and interacting with JavaScript in ways you never imagined. And you’ll write real code, lots of it, so you can start building your own web applications.",
  },
  {
    id: 5,
    title: "To Kill a Mocking Bird",
    author: "Harper Lee",
    price: "Rs.250",
    rating: 4,
    image: "tkamb.jpg",
    description:
      "To Kill a Mockingbird is a coming-of-age story, an anti-racist novel, a historical drama of the Great Depression and a sublime example of the Southern writing tradition.",
  },
  {
    id: 6,
    title: "Sila Nerangalil Sila Manithargal",
    author: "Jayakanthan",
    price: "Rs.350",
    rating: 4,
    image: "snsm.jpg",
    description:
      "It is based on the novel of same name, by Jayakanthan which was a detailed version of his short story Agni Pravesam.[6] Bhimsingh decided to adapt the novel into a feature film. Jayakanthan wrote the screenplay for the film discarding the traditional commercial elements.",
  },
  {
    id: 7,
    title: "Application Code and Markup",
    author: "Charles Petzold",
    price: "Rs.850",
    rating: 4,
    image: "wpf.jpg",
    description:
      "Get the definitive guide to the Windows Presentation Foundation (WPF), the new client programming interface for the Microsoft .NET Framework 3.0 and Windows Vista. Award-winning author Charles Petzold teaches you how to combine C# code and the Extensible Application Markup Language (XAML) to develop applications for the WPF.",
  },
  {
    id: 8,
    title: "Oru Manithan Oru Veedu Oru Ulagam ",
    author: "Jayakanthan",
    price: "Rs.150",
    rating: 4,
    image: "oru.jpg",
    description:
      "This novel is based on a character who does not know about the city, parents, caste, religion. Who understands the life through his experience.",
  },
  {
    id: 9,
    title: "Rishi Moolam",
    author: "Jayakanthan",
    price: "Rs.250",
    rating: 4,
    image: "rishi.jpg",
    description:
      "The eeriness of Jayakanthan's two novellas in this volume is overwhelming and disturbing. The protagonists are helpless victims of psychological maladies. Their suppressed libido and Oedipus complex are areas Tamil writers generally dared not enter - at any rate in the 1960s, when they were written.The brilliant introvert Rajaraman is the quintessential good boy. The play of circumstances kindles oedipal fancies in him. The incandescent consummation with Sarada Mami is a catharsis. A rishi is born looking at the world with a disdain at once benignly distant and compellingly personal.Well-educated and well-employed Janaki lives under the protective cover of her paranoid, possessive, puritanical mother. Her healthy friendship with a collegemate of yesteryear promises liberation. Her short-lived taste of freedom is stamped out and she is sucked back into her mother's bizarre, overwhelming orbit.",
  },
  {
    id: 10,
    title: "The Habbit of Winning",
    author: "Prakash Iyer",
    price: "Rs.250",
    rating: 5,
    image: "win.jpg",
    description:
      "Do you feel like throwing in the towel, but want to be a great leader? Would you like to build an organization? Do you want your child to be the best she can be? If you answered yes to any of these questions, The Habit of Winning is the book for you. It is a book that will change the way you think, work and live, with stories about self-belief and perseverance, leadership and teamwork—stories that will ignite a new passion and a renewed sense of purpose in your mind.",
  },
  {
    id: 11,
    title: "The Secret of Leadership",
    author: "Prakash Iyer",
    price: "Rs.150",
    rating: 5,
    image: "leader.jpg",
    description:
      "Bestselling author Prakash Iyer uses simple but powerful anecdotes and parables from all over the world to demonstrate what makes for effective personal and professional leadership. Iyer draws lessons from sources as diverse as his driver, a mother giraffe, Abraham Lincoln and footballers in the United Kingdom. He shows how an instinct to lead can be acquired even while flipping burgers at a fast-food chain. All of these stories come together in an explosive cocktail to unleash your inner leader.",
  },
  {
    id: 12,
    title: "YOU TOO CAN",
    author: "Prakash Iyer",
    price: "Rs.157",
    rating: 4,
    image: "can.jpg",
    description:
      "You Too Can is filled with stories that celebrate the entrepreneurial spirit. Stories of success, and struggle and survival too. Stories of people starting up, making progress, enjoying the ride and hoping they will make it to the finish line. If there is one, that is. Hopefully, you will find a story that rings a bell, connects, and inspires you. There are business lessons. And several life-lessons too. Success leaves tracks. Whether you are an entrepreneur or an employee, a housewife or a student, here’s your chance to learn from men and women who unleashed the entrepreneur within them. They did it. And now, You Too Can.",
  },
  {
    id: 13,
    title: "When the Penny Drops",
    author: "R Gopalakrishnan",
    price: "Rs.350",
    rating: 4,
    image: "penny.jpg",
    description:
      "An invaluable source of inspiration to help leaders understand themselves and overcome their barriers to success For centuries, we have learnt what’s not taught through our own experiences and the stories of others. Even today, only 3 per cent of leadership development occurs due to classroom training. In fact, for most managers, ‘the penny drops’ only when we are at the end of our careers. In this book, R. Gopalakrishnan shares some valuable learnings from his decades of corporate experience, through a series of engaging stories. When the Penny Drops encourages you to reflect on yourself, and will help you learn by identifying the success mantras embedded in you.",
  },
  {
    id: 14,
    title: "What the CEO Really Wants from You",
    author: "R Gopalakrishnan",
    price: "Rs.300",
    rating: 4,
    image: "ceo.jpg",
    description:
      "There are many books on leadership and how to lead. What the CEO Really Wants from You addresses the one key question that is uppermost in the mind of any manager: What should he or she do to make the boss a partner rather than perceive the boss as an extractor of work or an adversary? As Paul Polman, CEO of Unilever, points out in his foreword, partnerships with others, but above all, with your direct boss and organization, are more important than ever before. Few people are so well qualified as R. Gopalakrishnan to guide us on this journey. This is a book that will be of immense value to all managers, and one that just might evoke pragmatic answers to the question of what the CEO really expects from the team.",
  },
  {
    id: 15,
    title: "Outliers: The Story of Success",
    author: "Malcom Gladwell",
    price: "Rs.450",
    rating: 5,
    image: "outliers.jpg",
    description:
      "In this stunning new book, Malcolm Gladwell takes us on an intellectual journey through the world of outliers--the best and the brightest, the most famous and the most successful. He asks the question: what makes high-achievers different?",
  },
  {
    id: 16,
    title:
      "David and Goliath: Underdogs, Misfits, and the Art of Battling Giants",
    author: "Malcom Gladwell",
    price: "Rs.750",
    rating: 4,
    image: "dag.jpg",
    description:
      "In his #1 bestselling books The Tipping Point, Blink, and Outliers, Malcolm Gladwell has explored the ways we understand and change our world. Now he looks at the complex and surprising ways the weak can defeat the strong, the small can match up against the giant, and how our goals (often culturally determined) can make a huge difference in our ultimate sense of success. Drawing upon examples from the world of business, sports, culture, cutting-edge psychology, and an array of unforgettable characters around the world, David and Goliath is in many ways the most practical and provocative book Malcolm Gladwell has ever written.",
  },
  {
    id: 17,
    title: "The Tipping Point",
    author: "Malcom Galdwell",
    price: "Rs.450",
    rating: 5,
    image: "tip.jpg",
    description:
      "The tipping point is that magic moment when an idea, trend, or social behavior crosses a threshold, tips, and spreads like wildfire. Just as a single sick person can start an epidemic of the flu, so too can a small but precisely targeted push cause a fashion trend, the popularity of a new product, or a drop in the crime rate. This widely acclaimed bestseller, in which Malcolm Gladwell explores and brilliantly illuminates the tipping point phenomenon, is already changing the way people throughout the world think about selling products and disseminating ideas.",
  },
  {
    id: 18,
    title: "Head First Java",
    author: "Kathy Sierra",
    price: "Rs.650",
    rating: 5,
    image: "hfj.jpg",
    description:
      "Learning a complex new language is no easy task especially when it is an object-oriented computer programming language like Java. You might think the problem is your brain. It seems to have a mind of its own, a mind that doesn't always want to take in the dry, technical stuff you're forced to study.",
  },
  {
    id: 19,
    title: "Ignited Minds: Unleashing the Power Within India",
    author: "A.P.J. Abdul Kalam",
    price: "Rs.100",
    rating: 4,
    image: "minds.jpg",
    description:
      "The book examines why, given all our skills, resources and talents, we, so obviously capable of being the best, settle so often for the worst. What is it that we as a nation are missing? At the heart of the book is the belief that the people of a nation have the power, by dint od hard work, to realize their dream of a truly good life. Lalam takes up different issues and themes that struck him on his pilgrimage around the country as he met thousands of schoolchildren, teachers, scientists saints and seers in the course of two years. The result is a book that motivates usto get back on the winning track and unleash the energy within a nation that has not allowed itself full rein. Ignited minds will fire the minds of the young to whom it is promarly addressed Khuswant Singh in Outlook.",
  },
  {
    id: 20,
    title:
      "The Scientific Indian : A Twenty-First Century Guide To The World Around Us",
    author: "A.P.J. Abdul Kalam",
    price: "Rs.200",
    rating: 5,
    image: "sci.jpg",
    description:
      "Nuclear capability; self-sufficiency in food production; an array of indigenous satellites and missiles; an unmanned Moon mission—India’s achievements in the scientific domain in recent years have been spectacular. But; according to the country’s best-known scientist A.P.J. Abdul Kalam and his close associate Y.S. Rajan; we’ve only just begun. In a century that many experts predict may belong to India; the realization of the vision of a better future for everyone will require a keen understanding of our needs and this can only be achieved by tailoring our research and innovations to the goal of national development. India to the forefront of the world in the decades to come. The Scientific Indian will speak to every curious and adventurous mind; and especially to tomorrow’s scientists and technologists; encouraging us to dream big; and urging us to work hard to make our dreams come true. In The Scientific Indian; the authors of the path-breaking India 2020: A Vision for the New Millennium return after ten years to the core areas of scientific advancement that are crucial today: space exploration; satellite technology; missile development; earth and ocean resources; the biosphere; food production; energy and water harvesting; health care and communications; to name a few. For each aspect; the authors provide the context of recent progress on the global platform as well as Indian breakthroughs; before outlining a pragmatic vision of technological development that will propel.",
  },
  {
    id: 21,
    title:
      "Envisioning an Empowered Nation: Technology for Societal Transformation",
    author: "A.P.J. Abdul Kalam",
    price: "Rs.350",
    rating: 5,
    image: "nation.jpg",
    description:
      "India has a rich heritage and a talented workforce, and is emerging as a knowledge society. Yet, over 26% of the population is below the poverty line; illiteracy and large scale unemployment persist.      Over the years, the authors have interacted with people from all walks of life. During these interactions, they could perceive a strong desire of the people to live in a prosperous, peaceful and safe India. Moreover, they realised that technology is the engine which is capable of leading the nation towards growth and prosperity.",
  },
  {
    id: 22,
    title: "Kallikaattu Ithigaasam",
    author: "Vairamuthu",
    price: "Rs.150",
    rating: 4,
    image: "kalli.jpg",
    description:
      "Kallikkattu Edhihasam (the epic of Kallikkadu, in literal translation) is one of the novels written by the eminent Vairamuthu. It tells the agonising tale of a marginal farmer of a riverbed region of the Theni belt in southern Tamil Nadu. Kallikattu Ithikasam - a confluence of various emotions like sadness, sufferings and depression—crammed his mind for more than four decades. Finally, when it exploded, the natives of `Kallikadugal' found their biographies in the book. But with a silver lining. The novel won him the Sahitya Akademi award for Best Literary Work in 2003",
  },
  {
    id: 23,
    title: "Moondram Ulaga Por",
    author: "Vairamuthu",
    price: "Rs.350",
    rating: 4,
    image: "moonram.jpg",
    description:
      "Even now a war is going on. But this war is not face to face. This war is waged with hidden weapons. It is a war between the sky and the earth. War waged on the people and the nature. The world has not seen a war of this kind before. This is the war waged by global warming and globalisation against agriculture.",
  },
  {
    id: 24,
    title: "Thanneer Desam",
    author: "Vairamuthu",
    price: "Rs.75",
    rating: 4,
    image: "thaneer.jpg",
    description:
      "This work is about the 'sea odyssey'. Kalaivannan is the hero; Tamilroja is the heroine. A lot of scientific facts about the sea, water, and the universe are sown in this modern poetry(pudhuk kavidhai). The work depicts the adventure of fishermen's life at sea.",
  },
  {
    id: 25,
    title: "Sigarangalai Nokki",
    author: "Vairamuthu",
    price: "Rs.80",
    rating: 5,
    image: "nokki.jpg",
    description:
      "This book emphasizes on people moving against nature or nowadays ignoring natural laws and beauties. It carefully crafted highlighting the importance of pursuing hardwork in any job we do and also should take our time out to admire beauty of nature.",
  },
  {
    id: 26,
    title: "Vignana sirukathaigal",
    author: "Sujatha",
    price: "Rs.280",
    rating: 5,
    image: "vin.jpg",
    description:
      "This sturdy volume carries 50 sci-fi short stories of Sujatha published in various Tamil magazines. Apart from his unique style of writing, the stories are laced with humour. Sujatha’s use of Tamil is completely different from the way it is used by other story tellers.",
  },
  {
    id: 27,
    title: "Sylvia",
    author: "Sujatha",
    price: "Rs.180",
    rating: 4,
    image: "syl.jpg",
    description: "This has a novella and seven short stories.",
  },
  {
    id: 28,
    title:
      "Stuff Matters: Exploring the Marvelous Materials That Shape Our Man-Made World",
    author: "Mark Miodownik",
    price: "Rs.355",
    rating: 4,
    image: "stuff.jpg",
    description:
      "An eye-opening adventure deep inside the everyday materials that surround us, packed with surprising stories and fascinating science. Why is glass see-through? What makes elastic stretchy? Why does a paper clip bend? Why does any material look and behave the way it does? These are the sorts of questions that Mark Miodownik is constantly asking himself. A globally-renowned materials scientist, Miodownik has spent his life exploring objects as ordinary as an envelope and as unexpected as concrete cloth, uncovering the fascinating secrets that hold together our physical world.",
  },
];

app.use(cors(), bodyParser.urlencoded({ extended: false }), bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

/*
 * Returns the list of books. T
 * This api expects the parameters "page" and "limit".
 * Page:  the index of the page to be displayed.
 * limit: the size of the page.
 */
app.get("/books", paginatedResults(books), function (req, res) {
  res.json(res.paginatedResults);
});

/*
 * Returns the details of the book for the given id and also the list of the books from the same author.
 */
app.get("/books/:id", function (req, res) {
  const bookId = req.params.id;
  const book = books.filter((bk) => bk.id == bookId);

  const results = {};
  results.book = book;
  const author = book[0].author;

  const booksFromAuthor = books.filter(
    (bk) => bk.author == author && bk.id != bookId
  );
  results.booksFromAuthor = booksFromAuthor;

  res.json(results);
});

/*
 * A generic function to return a paginated result of the given model.
 * @param {model}: An array instance to which the pagination has to be applied.
 */
function paginatedResults(model) {
  return (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startNum = (page - 1) * limit;
    const endNum = page * limit;

    const results = {};
    results.booksCount = model.length;
    results.books = model.slice(startNum, endNum);

    res.paginatedResults = results;
    next();
  };
}

/*
 * Sets up the server and starts listening at the configured port number.
 */
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Server is listening at http://${host}/${port}`);
});
