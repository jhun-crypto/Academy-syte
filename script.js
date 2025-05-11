const buttons = document.querySelectorAll('.thumbsp');

buttons.forEach(button => {
button.addEventListener('click', () => {
buttons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
});
});

const teachers = [
    {
      name: "Талашкина Олеся  – ",
      photo: "img/Ol.jpeg",
      desc: "коммерческий директор, специалист HR – менеджмента. В академии является экспертом по гибким навыкам",
      dope: " Олеся научит юных студентов грамотно организовывать свой день и эффективно распределять время",
      rec: "гибкие навыки (soft skills)",
      soft: "специалист HR-менеджмента"
    },
    {
        name: " Арина Антонова  –",
        photo: "img/arina.jpeg",
        desc: "Наставник юных академиков основатель Fortune Academy",
        dope: "Студентам Fortune Acadeту открыты все дороги для успеха: общение с известными предпринимателями города и области, знакомство с производственным процессом и вдохновение создавать свои бизнес-проекты",
        rec: " основатель Fortune Academy",
        soft: "бизнес-проекты"
    },
    {
      name: "Асланян Роберт  – ",
      photo: "img/robert.jpeg",
      desc: "основатель Fortune Academy и наставник по финансовой грамотности. Магистр экономики, специалист в финансовой сфере, действующий предприниматель. ",
      dope: "На занятиях Роберт расскажет и покажет, что значит рациональное распределение денег",
      rec: "основатель Fortune Academy",
      soft: " финансовая грамотность"
    },
    {
      name: "Шайкенова Айжана  – ",
      photo: "img/Aizhana.jpeg",
      desc: "наш наставник по ораторскому мастерству, дебатам и медиаграмотности. ",
      dope: "Она обладает знаниями, навыками и личными качествами, чтобы влюблять детей в Слово",
      rec: "ораторское мастерство",
      soft: "медиаграмотность"
    },
    {
      name: "Корнилова Анна  – ",
      photo: "img/Anna.jpeg",
      desc: "Мыслить как лидер, научит Анна Корнилова, наш наставник по гибким навыкам.",
      dope: "Лидера от других отличает особое мышление повышенная активность, инициативность, целеустремлённость, решительность, настойчивость и ответственность",
      rec: " гибкие навыки ",
      soft: "лидерское мышление"
    },
    {
      name: "Касенова Айгуль  –  ",
      photo: "img/AIgul.jpeg",
      desc: "эксперт по стилю, чей подход и взгляд на моду заслужил доверие и уважение в стране.",
      dope: "Стиль наших академиков мы доверили Айгуль, пригласив ее в качестве наставника.",
      rec: "наставник по стилю",
      soft: "эксперт по стилю"
    },
    {
      name: "Шарип Дания  – ",
      photo: "img/Zhuldyz.jpeg",
      desc: "наш эксперт по маркетингу и блогерству",
      dope: "дипломированный маркетолог, 4 года она занимается маркетинговым продвижением бизнес-проектов и блогеров-«миллионников». Вместе с Данией ребята узнают, как работают соцсети и как можно с пользой проводить время за смартфоном ",
      rec: "дипломированный маркетолог",
      soft: "Польза от смартфона "
    }
];

  function selectTeacher(index) {
    const info = teachers[index];
    document.getElementById('teacher-name').textContent = info.name;
    document.getElementById('teacher-photo').src = info.photo;
    document.getElementById('teacher-desc').textContent = info.desc;
    document.getElementById('btn_inf').textContent = info.rec;
    document.getElementById('dop').textContent = info.dope;
    document.getElementById('dopp').textContent = info.soft;

    document.querySelectorAll('.teacher-thumbs img').forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

fimg = document.images;
for(j=0;j<fimg.length;j++){
fimg[j].galleryimg = "no";
fimg[j].oncontextmenu = function(){return false;}
fimg[j].ondragstart = function(){return false;}
}


document.getElementById("registration-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValue = document.getElementById("name").value;
  const ageValue = document.getElementById("age").value;
  const phoneValue = document.getElementById("phone").value;

 

}) 


  document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault();

    
    const nameValue = document.getElementById("name").value;
    const ageValue = document.getElementById("age").value;
    const phoneValue = document.getElementById("phone").value;

    
    fetch("https://script.google.com/macros/s/AKfycby_be9BSdrJeka9_rOxubXwkoikhIN4hzT9vnT8LCjRqOYip6yxe3Q3g5uLovsOTRknXA/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        age: ageValue,
        phone: phoneValue
      }),
    })
      .then(() => {
        alert("Заявка успешно отправлена!");
        document.getElementById("registration-form").reset();
      })
      .catch((error) => {
        alert("Ошибка при отправке заявки.");
        console.error("Ошибка:", error);
      });
  });

